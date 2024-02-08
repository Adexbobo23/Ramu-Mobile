import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Modalize } from 'react-native-modalize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import StockChart from './Charts/StockChart';
import StockDetailsChart from './Charts/StockDetailsChart';
import PortfolioChart from './Charts/PortfolioChart';

const Portfolio = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [totalBalance, setTotalBalance] = useState(0);
  const [stockData, setStockData] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [sellQuantity, setSellQuantity] = useState('');
  const navigation = useNavigation();
  const modalizeRef = useRef(null);
  const [transactionPin, setTransactionPin] = useState('');
  const [actualBalance, setActualBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showTransactionPin, setShowTransactionPin] = useState(false); // State variable to track whether to show transaction pin field

  useEffect(() => {
    const fetchUserToken = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken');
        if (userToken) {
          fetchActualBalance(userToken); 
          fetchStockData(userToken);
        }
      } catch (error) {
        console.error('Error fetching user token:', error.message);
      }
    };

    fetchUserToken();
  }, []);

  const fetchActualBalance = async (userToken) => {
    try {
      const apiUrl = 'https://api-staging.ramufinance.com/api/v1/get-portfolio-balance';
  
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
  
      if (response.data.status) {
        const balances = response.data.data;
        const totalBalance = balances.reduce((acc, entry) => acc + parseFloat(entry.balance), 0);
        setActualBalance(totalBalance);
      } else {
        console.error('Error fetching actual balance:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching actual balance:', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Modify the useEffect that calculates total balance to use actualBalance
  useEffect(() => {
    setTotalBalance(actualBalance);
  }, [actualBalance]);

  const fetchStockData = async (userToken) => {
    try {
      const apiUrl = 'https://api-staging.ramufinance.com/api/v1/get-user-portfolio';

      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (response.data.status) {
        setStockData(response.data.data);
      } else {
        console.error('Error fetching stock data:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching stock data:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const totalAmount = stockData.reduce((acc, stock) => {
      const tradePrice = parseFloat(stock.trade_price);
      const quantity = parseInt(stock.quantity, 10);

      if (isNaN(tradePrice) || isNaN(quantity)) {
        console.warn(`Invalid trade_price or quantity for stock: ${stock.ticker_id}`);
        return acc;
      }

      const stockAmount = tradePrice * quantity;
      return acc + stockAmount;
    }, 0);

    setTotalBalance(totalAmount);
  }, [stockData]);

  // Filter stock data based on search query
  useEffect(() => {
    const filteredStocks = stockData.filter(
      (stock) =>
        (stock.company_name && stock.company_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (stock.ticker_id && stock.ticker_id.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    setStockData(filteredStocks);
  }, [searchQuery]);

  const navigateTo = (screen) => {
    navigation.navigate(screen);
  };

  const openSellModal = (stock) => {
    setSelectedStock(stock);
    modalizeRef.current?.open();
  };

  const closeSellModal = () => {
    setSelectedStock(null);
    modalizeRef.current?.close();
  };

  const handleSellButtonClick = () => {
    setShowTransactionPin(true); // Set state to true to show transaction pin field
  };

  const handleSell = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');

      if (!userToken) {
        console.error('User token not found.');
        return;
      }

      const apiUrl = 'https://api-staging.ramufinance.com/api/v1/create-order';

      const headers = {
        Authorization: `Bearer ${userToken}`,
      };

      const payload = {
        trade_price: (selectedStock?.trade_price || 0).toString(),
        quantity: sellQuantity,
        symbol: selectedStock?.ticker_id || '',
        exchange: selectedStock?.exchange_code || '',
        order_side: '2',
        stock_market_id: 1,
        transaction_pin: transactionPin,
      };
      
      const response = await axios.post(apiUrl, payload, { headers });

      console.log('API Response:', response.data);

      navigation.navigate('SellConfirm');

      closeSellModal();
    } catch (error) {
      console.error('API Error:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Title for Total Balance */}
      <Text style={styles.PortTitle}>Portfolio</Text>

      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <Ionicons name="search" size={20} color="black" style={styles.searchIcon} />
        <TextInput
          style={styles.searchBar}
          placeholder="Search Stock"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
      </View>

       {/* Account Balance */}
       <View style={styles.accountBalanceContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#51CC62" />
          ) : (
            <Text style={styles.totalBalanceText}>${totalBalance.toFixed(2)}</Text>
          )}
        </View>


      {/* Title for Total Balance */}
      <Text style={styles.totalBalanceTitle}>Total Balance</Text>

      <View style={styles.lossChartContainer}>
        {/* <StockChart /> */}
      </View>

      {/* Stock Data */}
      <ScrollView style={styles.stockList}>
        <PortfolioChart />
        {loading ? (
          <ActivityIndicator size="large" color="#51CC62" />
        ) : (
          stockData.map((stock) => (
            <TouchableOpacity key={stock.ticker_id} style={styles.stockItem} onPress={() => openSellModal(stock)}>
              <Image source={require('../Assests/trade.jpg')} style={styles.stockImage} />
              <View style={styles.stockDetails}>
                <Text style={styles.stockTitle}>{`${stock.key}`}</Text>
                <Text style={styles.additionalData}>{`Quantity: ${stock.quantity}`}</Text>
                <Text style={styles.additionalData}>{`Initial Trade Price: ${stock.initial_trade_price}`}</Text>
                <View style={styles.stockRow}>
                  <Image source={require('../Assests/chart.png')} style={styles.chartImage} />
                  <Text style={styles.stockPrice}>Market Price {`$${(parseFloat(stock.trade_price) || 0).toFixed(2)}`}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      {/* Sell Modal using Modalize */}
      <Modalize ref={modalizeRef} adjustToContentHeight>
      <Text style={styles.PortfolioTitle}>Portfolio Stock Details</Text>
        <PortfolioChart />
        {selectedStock && (
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedStock?.key}</Text>
            <Text style={styles.modalDescription}>{selectedStock?.ticker_id}</Text>
            <Text style={styles.additionalData}>{`Initial Trade Price: ${selectedStock?.initial_trade_price}`}</Text>
            <Text style={styles.modalPrice}>{`$${(selectedStock?.trade_price || 0).toFixed(2)}`}</Text>

            {/* Sell Form */}
            <View style={styles.formField}>
              <Text style={styles.label}>Quantity to Sell:</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter quantity"
                value={sellQuantity}
                onChangeText={(text) => setSellQuantity(text)}
              />
            </View>

            {/* Conditionally render the transaction pin field based on whether the sell button has been clicked */}
            {showTransactionPin && (
              <View style={styles.formField}>
                <Text style={styles.label}>Transaction Pin:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter transaction pin"
                  value={transactionPin}
                  onChangeText={(text) => setTransactionPin(text)}
                  keyboardType="numeric"
                  secureTextEntry={true}
                  maxLength={4}
                />
              </View>
            )}

            {/* Add more form fields as needed (e.g., stock price, total amount) */}

            {/* Show the sell button only if the transaction pin field is hidden */}
            {!showTransactionPin && (
              <TouchableOpacity style={styles.sellButton} onPress={handleSellButtonClick}>
                <Text style={styles.sellButtonText}>Proceed to Sell</Text>
              </TouchableOpacity>
            )}

            {/* Conditionally render the sell button only when the transaction pin field is visible */}
            {showTransactionPin && (
              <TouchableOpacity style={styles.sellButton} onPress={handleSell}>
                <Text style={styles.sellButtonText}>Sell</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </Modalize>

      {/* Navigation bar */}
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navBarItem} onPress={() => navigateTo('Dashboard')}>
          <Ionicons name="home" size={26} color="white" />
          <Text style={styles.navBarText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navBarItem} onPress={() => navigateTo('Discover')}>
          <Ionicons name="search" size={26} color="white" />
          <Text style={styles.navBarText}>Discover</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navBarItem} onPress={() => navigateTo('Portfolio')}>
          <Ionicons name="briefcase" size={26} color="white" />
          <Text style={styles.navBarText}>Portfolio</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navBarItem} onPress={() => navigateTo('More')}>
          <Ionicons name="ellipsis-horizontal" size={26} color="white" />
          <Text style={styles.navBarText}>More</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  PortTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#51CC62',
    marginTop: 40,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderColor: 'gray',
    borderWidth: 0,
    borderRadius: 10,
    backgroundColor: '#EFEEED',
    height: 50,
  },
  searchIcon: {
    marginRight: 10,
    marginLeft: 20,
  },
  searchBar: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 0,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  accountBalanceContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  totalBalanceText: {
    fontSize: 68,
    fontWeight: 'bold',
    color: '#51CC62',
  },
  totalBalanceTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    marginBottom: 30,
  },
  PortfolioTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    marginBottom: 30,
    color: '#51CC62',
    marginTop: 20,
  },
  stockList: {
    flex: 1,
    marginBottom: 80,
  },
  stockItem: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 10,
    borderColor: '#DDD',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },
  stockImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  stockDetails: {
    flex: 1,
  },
  stockTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  stockRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chartImage: {
    width: 30,
    height: 30,
    marginRight: 8,
  },
  stockPrice: {
    fontSize: 16,
    color: '#51CC62',
  },
  modalContent: {
    padding: 20,
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  modalDescription: {
    marginBottom: 16,
  },
  modalPrice: {
    fontSize: 16,
    color: '#51CC62',
    marginBottom: 16,
  },
  formField: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    height: 60,
    borderColor: '#51CC62',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  sellButton: {
    backgroundColor: '#51CC62',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    height: 60,
    marginBottom: 10,
  },
  sellButtonText: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: 'bold',
  },
  navBar: {
    flexDirection: 'row',
    backgroundColor: '#147603',
    padding: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 25,
  },
  navBarItem: {
    flex: 1,
    alignItems: 'center',
  },
  navBarText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Portfolio;
