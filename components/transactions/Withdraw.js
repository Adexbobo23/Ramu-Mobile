import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TextInput,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Modalize } from 'react-native-modalize';
import axios from 'axios';


const Withdraw = () => {
  const navigation = useNavigation();
  const transactionPinModalRef = useRef(null);

  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [walletDetails, setWalletDetails] = useState(null);
  const [userToken, setUserToken] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [transactionPin, setTransactionPin] = useState('');
  const [transactionPinModalVisible, setTransactionPinModalVisible] = useState(false);


  useEffect(() => {
    fetchWalletDetails();
  }, []);

  const fetchWalletDetails = async () => {
    try {
      setIsLoading(true);

      const userToken = await AsyncStorage.getItem('userToken');
      const response = await axios.get(
        'https://api-staging.ramufinance.com/api/v1/get-wallet-details',
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      const nairaDetails = response.data.data.find((wallet) => wallet.currency_code === 'NGN');
      const dollarDetails = response.data.data.find((wallet) => wallet.currency_code === 'USD');

      setWalletDetails({
        naira: nairaDetails,
        dollar: dollarDetails,
      });

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Error fetching wallet details:', error);
      Alert.alert('Error', 'Failed to fetch wallet details.');
    }
  };

  const toggleBalanceVisibility = () => {
    setBalanceVisible((prevVisible) => !prevVisible);
  };

  const renderSwitchAccountButton = () => (
    <TouchableOpacity onPress={handleSwitchAccount}>
      <View style={styles.switchAccountContainer}>
        {selectedAccount === 'naira' ? (
          <Image source={require('../Assests/nigeria.png')} style={styles.countryLogo} />
        ) : (
          <Image source={require('../Assests/usa.png')} style={styles.countryLogo} />
        )}
        <Feather name="chevron-down" size={24} color="white" />
      </View>
    </TouchableOpacity>
  );

  const handleSwitchAccount = () => {
    switchAccountModalRef.current?.open();
  };

  // const handleAccountSelection = (accountType) => {
  //   if (accountType === selectedAccount) {
  //     switchAccountModalRef.current?.close();
  //   } else {
  //     setSelectedAccount(accountType);
  //   }
  // };

  const handleWithdraw = async () => {
    if (!withdrawAmount) {
      Alert.alert('Hey', 'Please enter the amount to withdraw.');
      return;
    }

    const amount = parseFloat(withdrawAmount);

    if (amount < 1000) {
      Alert.alert('Hey', 'Minimum withdrawal amount is ₦1000.00');
      return;
    }

    if (amount > 1000000) {
      Alert.alert('Hey', 'Maximum withdrawal amount is ₦1,000,000.00');
      return;
    }

    // Make sure the modal is visible when calling the open method
    if (transactionPinModalRef.current) {
      transactionPinModalRef.current.open();
    }

    setTransactionPinModalVisible(true);
  };

  const handleConfirmWithdrawal = async () => {
    if (!transactionPin) {
      Alert.alert('Hey', 'Please enter the 4-digit transaction PIN.');
      return;
    }
  
    try {
      setIsLoading(true);
  
      const userToken = await AsyncStorage.getItem('userToken');
  
      const withdrawData = {
        amount: parseFloat(withdrawAmount),
        wallet_address: walletDetails?.naira?.wallet_address,
        transaction_pin: parseInt(transactionPin),
        narration: 'Default narration text',
      };
  
      const response = await axios.post(
        'https://api-staging.ramufinance.com/api/v1/withdraw-to-bank',
        withdrawData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
  
      if (response.status === 200 && response.data.status) {
        navigation.navigate('PaymentConfirm');
      } else {
        console.error('Withdrawal failed - Response:', response);
        if (response.data && response.data.message) {
          Alert.alert('Hey', `Failed to withdraw. Reason: ${response.data.message}`);
        } else {
          Alert.alert('Hey', 'Failed to withdraw. Please try again later.');
        }
      }
    } catch (error) {
      console.error('Error withdrawing:', error);
    
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
    
        if (error.response.data && error.response.data.message) {
          Alert.alert('Hey', `Failed to withdraw. Reason: ${error.response.data.message}`);
        } else {
          Alert.alert('Hey', `Failed to withdraw. Server error: ${error.response.status}`);
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
        Alert.alert('Hey', 'Failed to withdraw. No response received from the server.');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message:', error.message);
        Alert.alert('Hey', 'Failed to withdraw. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }    
  };
  
  const handleCreateSettlementAccount = () => {
    navigation.navigate('AddSettle');
  };

  function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.Title}>Withdraw</Text>
        <View style={styles.topBar}>
          <View style={styles.hideen}>
            <Text style={styles.acoountbalance}>Account Balance</Text>
            <TouchableOpacity onPress={toggleBalanceVisibility} style={styles.eyeIconContainer}>
              {balanceVisible ? (
                <Feather name="eye-off" size={24} color="white" />
              ) : (
                <Feather name="eye" size={24} color="white" />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.balanceContainer}>
            <TouchableOpacity onPress={toggleBalanceVisibility}>
            {isLoading ? (
                <ActivityIndicator size="small" color="white" />
            ) : (
                <Text style={styles.balanceText}>
                    {balanceVisible ? `₦${formatNumberWithCommas(walletDetails?.naira?.balance)}` : '*******'}
                </Text>
            )}
            </TouchableOpacity>
          </View>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Enter the amount to withdraw"
          keyboardType="numeric"
          value={withdrawAmount}
          onChangeText={(text) => setWithdrawAmount(text)}
        />

        <Text style={styles.transactionLimits}>
          1. Minimum per transaction: N1000.00{'\n'}
          2. Maximum per transaction: N1000000.00
        </Text>

        <TouchableOpacity style={styles.withdrawButton} onPress={handleWithdraw}>
          <Text style={styles.buttonText}>Withdraw</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settlementContainer} onPress={handleCreateSettlementAccount}>
          <Text style={styles.settlementText}>
            Yet to add a settlement account? Add now
          </Text>
        </TouchableOpacity>

      </View>

      {/* Transaction Pin Modal */}
      <Modalize
        ref={transactionPinModalRef}
        adjustToContentHeight
        snapPoint={500}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalOption}>Enter 4-digit transaction PIN</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            secureTextEntry
            maxLength={4}
            value={transactionPin}
            onChangeText={(text) => setTransactionPin(text)}
          />
          <TouchableOpacity style={styles.withdrawButton} onPress={handleConfirmWithdrawal}>
            <Text style={styles.buttonText}>Confirm Withdrawal</Text>
          </TouchableOpacity>
        </View>
      </Modalize>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#51CC62',
    marginTop: 30,
  },
  topBar: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    height: 170,
    backgroundColor: '#147603',
    borderRadius: 30,
    marginTop: 30,
    width: '100%',
    marginLeft: 10,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 10,
    marginBottom: 40,
  },
  countryLogo: {
    width: 30,
    height: 20,
    marginRight: 5,
    marginTop: 10,
  },
  modalContainer: {
    padding: 20,
  },
  modalOption: {
    fontSize: 18,
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  modalOptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 40,
  },
  eyeIconContainer: {
    marginLeft: 100,
    marginTop: 30,
  },
  acoountbalance: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 30,
    marginLeft: 20,
  },
  balanceText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 10,
  },
  hideen: {
    flexDirection: 'row'
  },
  switchAccountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  input: {
    height: 60,
    borderColor: '#51CC62',
    borderWidth: 1.5,
    marginBottom: 30,
    paddingLeft: 10,
    width: '100%',
    borderRadius: 15,
  },
  transactionLimits: {
    fontSize: 17,
    marginBottom: 40,
    textAlign: 'left',
  },
  withdrawButton: {
    backgroundColor: '#51CC62',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    height: 52,
    width: '100%',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 22,
  },
  settlementContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  settlementText: {
    fontSize: 16,
    color: '#51CC62',
    marginLeft: 5,
  },
  
});

export default Withdraw;
