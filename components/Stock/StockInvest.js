import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, Modal, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StockInvest = () => {
  const navigation = useNavigation();
  const [selectedStock, setSelectedStock] = useState('');
  const [amount, setAmount] = useState('');
  const [quantity, setQuantity] = useState('');
  const [stockPrice, setStockPrice] = useState('');
  const [showStockModal, setShowStockModal] = useState(false);
  const [featuredStocks, setFeaturedStocks] = useState([]);
  const [dollarBalance, setDollarBalance] = useState(null);
  const [isLoadingFeaturedStocks, setIsLoadingFeaturedStocks] = useState(true);
  const [isLoadingDollarBalance, setIsLoadingDollarBalance] = useState(true);
  const [totalAmount, setTotalAmount] = useState('');


  const fetchUserToken = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      return token;
    } catch (error) {
      console.error('Error fetching user token:', error.message);
    }
  };

  const fetchFeaturedStocks = async () => {
    setIsLoadingFeaturedStocks(true);
    const userToken = await fetchUserToken();
    if (!userToken) {
      // Handle the case where userToken is not available
      setIsLoadingFeaturedStocks(false);
      return;
    }

    try {
      const response = await fetch('https://api-staging.ramufinance.com/api/v1/get-stocks-market', {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const stockData = await response.json();
      setFeaturedStocks(stockData.data);
    } catch (error) {
      console.error('Error fetching featured stocks:', error.message);
      Alert.alert('Error', 'Failed to fetch featured stocks.');
    } finally {
      setIsLoadingFeaturedStocks(false);
    }
  };

  const fetchDollarBalance = async () => {
    try {
      setIsLoadingDollarBalance(true);
      const userToken = await fetchUserToken();
      if (!userToken) {
        setIsLoadingDollarBalance(false);
        return null;
      }
  
      const response = await fetch('https://api-staging.ramufinance.com/api/v1/get-wallet-details', {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
  
      const walletData = await response.json();
      const dollarWallet = walletData.data.find(wallet => wallet.currency_code === 'USD');
  
      if (dollarWallet) {
        setDollarBalance(parseFloat(dollarWallet.balance));
        return parseFloat(dollarWallet.balance); // Return the balance
      }
    } catch (error) {
      console.error('Error fetching dollar wallet balance:', error.message);
      return null;
    } finally {
      setIsLoadingDollarBalance(false);
    }
  };
  
  
  useEffect(() => {
    // Fetch featured stocks on component mount
    fetchFeaturedStocks();
  }, []);

  const handleContinue = async () => {
    try {
      // Fetch the latest dollar balance and calculate stock price concurrently
      const [balance, calculatedStockPrice] = await Promise.all([
        fetchDollarBalance(),
        calculateStockPrice(),
      ]);
  
      console.log('Dollar Balance:', balance);
      console.log('Calculated Stock Price:', calculatedStockPrice);
  
      if (!isNaN(calculatedStockPrice)) {
        // Verify if the calculated stock price is greater than the dollar wallet balance
        if (calculatedStockPrice <= parseFloat(balance)) {
          console.log('Sufficient Funds. Proceeding with the order...');
  
          // Create order
          const success = await createOrder(calculatedStockPrice);
          if (success) {
            console.log('Order created successfully.');
  
            // Continue with any additional steps or navigation here
            navigation.navigate('InvConfirm');
          } else {
            // Handle order creation failure
            console.log('Failed to create order.');
            Alert.alert('Order Creation Failed', 'Failed to create the investment order.');
          }
        } else {
          // Insufficient funds
          console.log('Insufficient Funds. Calculated:', calculatedStockPrice, 'Balance:', balance);
          Alert.alert('Insufficient Funds', 'You do not have sufficient funds for this investment.');
        }
      } else {
        // Handle the case where the calculated stock price is NaN
        console.log('Error calculating stock price. Calculated:', calculatedStockPrice);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  
  
// Helper function to calculate stock price
const calculateStockPrice = async () => {
  try {
    const selectedStockObject = featuredStocks.find(stock => stock.ticker_id === selectedStock);

    if (!selectedStockObject) {
      console.log('Selected stock not found.');
      return 0;
    }

    const lastPrice = parseFloat(selectedStockObject.last_price);
    const parsedQuantity = parseFloat(quantity);

    if (isNaN(lastPrice) || isNaN(parsedQuantity)) {
      console.log('Error: Invalid last price or quantity');
      return 0;
    }

    const calculatedStockPrice = lastPrice * parsedQuantity;
    console.log('Calculated Stock Price:', calculatedStockPrice);
    return calculatedStockPrice;
  } catch (error) {
    console.error('Error calculating stock price:', error.message);
    return 0;
  }
};

// Function to create an order
const createOrder = async (calculatedStockPrice) => {
  try {
    const userToken = await fetchUserToken();
    if (!userToken) {
      return false;
    }

    const orderPayload = {
      trade_price: calculatedStockPrice.toFixed(4), 
      quantity: quantity,
      symbol: selectedStock,
      exchange: 'NSDQ',
      order_side: '1',
      stock_market_id: 1
    };

    const response = await fetch('https://api-staging.ramufinance.com/api/v1/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify(orderPayload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error creating order:', errorData.message);
      return false;
    }

    const orderData = await response.json();
    console.log('Order creation response:', orderData);

    return orderData.status === true;
  } catch (error) {
    console.error('Error creating order:', error.message);
    return false;
  }
};


const handleQuantityChange = (quantityValue) => {
    setQuantity(quantityValue);
    const selectedStockObject = featuredStocks.find(stock => stock.ticker_id === selectedStock);
    
    if (selectedStockObject) {
      const calculatedStockPrice = parseFloat(selectedStockObject.trade_price) * parseFloat(quantityValue);
  
      if (!isNaN(calculatedStockPrice)) {
        setStockPrice(calculatedStockPrice.toFixed(2));
        setTotalAmount(calculatedStockPrice.toFixed(2));
      } else {
        setStockPrice('');
        setTotalAmount('');
      }
    } else {
      setStockPrice('');
      setTotalAmount('');
    }
  };
  

  const navigateToMore = () => {
    navigation.navigate('More');
  };

  const navigateToDashboard = () => {
    navigation.navigate('Dashboard');
  };

  const navigateToPortfolio = () => {
    navigation.navigate('Portfolio');
  };

  const navigateToDiscover = () => {
    navigation.navigate('Discover');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>INVEST</Text>
        <View style={styles.formField}>
          <Text style={styles.label}>Select Stock</Text>
          {/* Stock dropdown */}
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setShowStockModal(true)}
          >
            <Text style={selectedStock ? styles.selectedText : styles.placeholderText}>
              {selectedStock || 'Select Stock'}
            </Text>
            <Ionicons name="caret-down" size={20} color='rgba(0, 0, 0, 0.5)' style={styles.icon} />
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={showStockModal}
            onRequestClose={() => setShowStockModal(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                {isLoadingFeaturedStocks ? (
                  <ActivityIndicator size="large" color="#51CC62" />
                ) : (
                  featuredStocks.map((stock, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        setSelectedStock(stock.ticker_id);
                        setShowStockModal(false);
                      }}
                      style={styles.modalItem}
                    >
                      <Text>{stock.company_name} ({stock.ticker_id})</Text>
                    </TouchableOpacity>
                  ))
                )}
              </View>
            </View>
          </Modal>
        </View>
        <View style={styles.formField}>
          <Text style={styles.label}>Quantity</Text>
          {/* Quantity field */}
          <TextInput
            style={styles.input}
            placeholder="Enter quantity"
            value={quantity}
            onChangeText={handleQuantityChange}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.formField}>
          <Text style={styles.label}>Stock Price</Text>
          {/* Display Stock Price */}
          <TextInput
            style={[styles.input, styles.stockPriceInput]}  
            value={stockPrice}
            editable={false}
          />
        </View>
        <View style={styles.formField}>
          <Text style={styles.label}>Total Amount</Text>
          {/* Total Amount field */}
          <TextInput
            style={[styles.input, styles.stockPriceInput]}
            value={totalAmount}
            editable={false}
          />
        </View>
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navBarItem} onPress={navigateToDashboard}>
          <Ionicons name="home" size={26} color="white" />
          <Text style={styles.navBarText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navBarItem} onPress={navigateToDiscover}>
          <Ionicons name="search" size={26} color="white" />
          <Text style={styles.navBarText}>Discover</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navBarItem} onPress={navigateToPortfolio}>
          <Ionicons name="briefcase" size={26} color="white" />
          <Text style={styles.navBarText}>Portfolio</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navBarItem} onPress={navigateToMore}>
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
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    paddingVertical: 50,
  },
  scrollContainer: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#51CC62',
    marginBottom: 70,
    textAlign: 'center',
  },
  formField: {
    marginBottom: 20,
    width: '90%',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#51CC62',
    borderRadius: 8,
    paddingHorizontal: 12,
    width: '100%',
  },
  stockPriceInput: {
    color: 'black', 
    fontWeight: 'normal',  
    fontSize: 16,  
  },
  dropdown: {
    height: 50,
    borderWidth: 1,
    borderColor: '#51CC62',
    borderRadius: 8,
    paddingHorizontal: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  label: {
    color: '#000',
    marginBottom: 5,
  },
  placeholderText: {
    color: 'gray',
    flex: 1,
  },
  selectedText: {
    color: '#000',
    flex: 1,
  },
  icon: {
    paddingRight: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    padding: 20,
    borderRadius: 8,
  },
  modalItem: {
    paddingVertical: 10,
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
  continueButton: {
    backgroundColor: '#51CC62',
    padding: 12,
    borderRadius: 8,
    width: '90%',
    height: 52,
  },
  continueButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'normal',
    fontSize: 22,
  },
});

export default StockInvest;
