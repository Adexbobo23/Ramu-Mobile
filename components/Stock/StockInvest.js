import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Modal,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Modalize } from 'react-native-modalize';

const StockInvest = () => {
  const navigation = useNavigation();
  const [selectedStock, setSelectedStock] = useState('');
  const [amount, setAmount] = useState('');
  const [quantity, setQuantity] = useState('');
  const [stockPrice, setStockPrice] = useState('');
  const [showStockModal, setShowStockModal] = useState(false);
  const [featuredStocks, setFeaturedStocks] = useState([]);
  const [isLoadingFeaturedStocks, setIsLoadingFeaturedStocks] = useState(true);
  const [transactionPin, setTransactionPin] = useState('');
  const [transactionPinModalVisible, setTransactionPinModalVisible] = useState(false);

  useEffect(() => {
    // Fetch featured stocks on component mount
    fetchFeaturedStocks();
  }, []);

  const handleAmountChange = (amountValue) => {
    setAmount(amountValue);
    calculateQuantityAndStockPrice(amountValue);
  };

  const calculateQuantityAndStockPrice = (amountValue) => {
    const selectedStockObject = featuredStocks.find((stock) => stock.ticker_id === selectedStock);

    if (selectedStockObject) {
      const lastPrice = parseFloat(selectedStockObject.trade_price);

      if (!isNaN(lastPrice)) {
        const calculatedQuantity = parseFloat(amountValue) / lastPrice;
        const calculatedStockPrice = lastPrice * calculatedQuantity;

        setQuantity(calculatedQuantity.toFixed(2));
        setStockPrice(calculatedStockPrice.toFixed(2));
      } else {
        setQuantity('');
        setStockPrice('');
      }
    } else {
      setQuantity('');
      setStockPrice('');
    }
  };

  const handleContinue = async () => {
    try {
      // Fetch the latest dollar balance and calculate stock price concurrently
      const [balance, calculatedStockPrice] = await Promise.all([
        fetchDollarBalance(),
        calculateStockPrice(),
      ]);
  
      console.log('Dollar Balance:', balance);
      console.log('Calculated Stock Price:', calculatedStockPrice);
  
      if (!isNaN(calculatedStockPrice) && calculatedStockPrice <= parseFloat(balance)) {
        console.log('Sufficient Funds. Proceeding with the order...');
  
        // Calculate quantity and stock price after selecting the stock
        calculateQuantityAndStockPrice(amount);
  
        // Show the Transaction Pin modal
        setTransactionPinModalVisible(true);
      } else {
        // Insufficient funds or invalid calculatedStockPrice
        console.log('Insufficient Funds or Invalid Calculated Stock Price.');
        Alert.alert('Invalid Amount', 'Please enter a valid amount.');
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  
  
  

  const handleStockSelect = (stockId) => {
    setSelectedStock(stockId);
    setShowStockModal(false);

    // Calculate quantity and stock price after selecting the stock
    calculateQuantityAndStockPrice(amount);
  };


  const handleTransactionPinSubmit = async () => {
    try {
      // Create order
      const calculatedStockPrice = await calculateStockPrice();
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

      // Clear the transaction pin after submission
      setTransactionPin('');
      // Hide the Transaction Pin modal
      setTransactionPinModalVisible(false);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };


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
      const userToken = await fetchUserToken();
      if (!userToken) {
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
      const dollarWallet = walletData.data.find((wallet) => wallet.currency_code === 'USD');

      if (dollarWallet) {
        return parseFloat(dollarWallet.balance);
      }
    } catch (error) {
      console.error('Error fetching dollar wallet balance:', error.message);
      return null;
    }
  };

  const calculateStockPrice = async () => {
    try {
      const selectedStockObject = featuredStocks.find((stock) => stock.ticker_id === selectedStock);
  
      if (!selectedStockObject) {
        console.log('Selected stock not found.');
        return 0;
      }
  
      // Log the raw trade_price value
      console.log('Raw Trade Price:', selectedStockObject.trade_price);
  
      // Ensure trade_price is defined and is a valid number
      if (selectedStockObject.trade_price === undefined || isNaN(selectedStockObject.trade_price)) {
        console.log('Error: Invalid or undefined trade price for the selected stock:', selectedStockObject.ticker_id);
        return 0;
      }
  
      const tradePrice = parseFloat(selectedStockObject.trade_price);
  
      // Ensure quantity is a valid number
      const parsedQuantity = parseFloat(quantity);
      if (isNaN(parsedQuantity)) {
        console.log('Error: Invalid quantity');
        return 0;
      }
  
      const calculatedStockPrice = tradePrice * parsedQuantity;
      console.log('Calculated Stock Price:', calculatedStockPrice);
      return calculatedStockPrice;
    } catch (error) {
      console.error('Error calculating stock price:', error.message);
      return 0;
    }
  };
  

  const createOrder = async (calculatedStockPrice) => {
    try {
      const userToken = await fetchUserToken();

      if (!userToken) {
        console.error('Failed to fetch user token. Unable to proceed with order.');
        return false;
      }

      const orderPayload = {
        trade_price: calculatedStockPrice.toFixed(4),
        quantity: quantity,
        symbol: selectedStock,
        exchange: 'NSDQ',
        order_side: '1',
        stock_market_id: 1,
        transaction_pin: transactionPin,
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
        console.error('Failed to create order. Server error:', errorData.error);
        console.error('Response data:', errorData);

        if (response.status === 401) {
          console.error('Unauthorized access. Please check your credentials.');
        } else if (response.status === 403) {
          console.error('Forbidden. You may not have the necessary permissions.');
        }

        return false;
      }

      return true;
    } catch (error) {
      console.error('Error creating order:', error.message);
      return false;
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
            <Text
              style={selectedStock ? styles.selectedText : styles.placeholderText}
            >
              {selectedStock || 'Select Stock'}
            </Text>
            <Ionicons
              name="caret-down"
              size={20}
              color="rgba(0, 0, 0, 0.5)"
              style={styles.icon}
            />
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
                      onPress={() => handleStockSelect(stock.ticker_id)}
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
          <Text style={styles.label}>Amount</Text>
          {/* Amount field */}
          <TextInput
            style={styles.input}
            placeholder="Enter amount"
            value={amount}
            onChangeText={handleAmountChange}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.formField}>
          <Text style={styles.label}>Quantity</Text>
          {/* Quantity field */}
          <TextInput
             style={[styles.input, styles.boldText, styles.largeFont]}
            value={quantity}
            editable={false}
          />
        </View>
        <View style={styles.formField}>
          <Text style={styles.label}>Stock Price</Text>
          {/* Stock Price field */}
          <TextInput
            style={[styles.input, styles.stockPriceInput]}
            value={stockPrice}
            editable={false}
          />
        </View>
    
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modalize
        adjustToContentHeight
        isOpen={transactionPinModalVisible}
        onClosed={() => setTransactionPinModalVisible(false)}
        ScrollViewProps={{ showsVerticalScrollIndicator: false }}
      >
        <View style={styles.formField}>
          <Text style={styles.label}>Transaction Pin</Text>
          <View style={styles.transactionPinContainer}>
            {[...Array(4)].map((_, index) => (
              <TextInput
                key={index}
                style={styles.transactionPinInput}
                placeholder="●"
                secureTextEntry
                maxLength={1}
                keyboardType="numeric"
                value={transactionPin.charAt(index)}
                onChangeText={(pin) => setTransactionPin(pin)}
              />
            ))}
          </View>
          <TouchableOpacity style={styles.transactionPinSubmitButton} onPress={handleTransactionPinSubmit}>
            <Text style={styles.transactionPinSubmitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </Modalize>

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
    marginBottom: 20,
    textAlign: 'center',
  },
  Title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#51CC62',
    textAlign: 'center',
    marginBottom: 20,
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
  input1: {
    height: 60,
    borderColor: '#51CC62',
    borderWidth: 1.5,
    marginBottom: 30,
    paddingLeft: 10,
    width: '90%',
    borderRadius: 15,
    marginLeft: 15
  },
  boldText: {
    fontWeight: 'normal',
  },
  largeFont: {
    fontSize: 18,
    color: 'black'
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
    width: '100%',
    height: 52,
    marginTop: 10,
  },
  continueButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'normal',
    fontSize: 22,
  },
  transactionPinContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  transactionPinInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#51CC62',
    borderRadius: 8,
    paddingHorizontal: 12,
    width: '20%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
  },
  modalItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  transactionPinContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  transactionPinInput: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: '#51CC62',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 10,
  },
  transactionPinSubmitButton: {
    backgroundColor: '#51CC62',
    padding: 12,
    borderRadius: 8,
    width: '100%',
    height: 52,
    marginTop: 20,
  },
  transactionPinSubmitButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'normal',
    fontSize: 22,
  },
});

export default StockInvest;
