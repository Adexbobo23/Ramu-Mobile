import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Linking, Clipboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FundWallets = () => {
  const navigation = useNavigation();
  const [amount, setAmount] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [bankList, setBankList] = useState([]);
  const [nairaWallet, setNairaWallet] = useState(null);

  useEffect(() => {
    fetchWalletDetails();
    fetchBankList();
  }, []);


  const fetchWalletDetails = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const response = await axios.get(
        'https://api-staging.ramufinance.com/api/v1/get-wallet-details',
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      const nairaWalletData = response.data.data.find(wallet => wallet.currency_code === 'NGN');

      setNairaWallet(nairaWalletData);
    } catch (error) {
      console.error('Error fetching wallet details:', error);
    }
  };


  const fetchBankList = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const response = await axios.get(
        'https://api-staging.ramufinance.com/api/v1/fetch-bank-ussd',
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
  
      const bankListData = response.data.data;
      setBankList(bankListData);
    } catch (error) {
      if (error.message === 'Network Error') {
        console.error('Network error. Please check your internet connection.');
        // Handle network error
      } else if (error.response) {
        // The request was made, but the server responded with an error status
        if (error.response.status === 401) {
          console.error('Unauthorized. Please check your authentication token.');
          // Handle unauthorized error
        } else {
          console.error('API error:', error.response.status, error.response.data);
          // Handle other API errors
        }
      } else if (error.request) {
        // The request was made, but no response was received
        console.error('No response received from the server.');
        // Handle no response
      } else {
        console.error('Error fetching bank list:', error);
        // Handle other errors
      }
    }
  };

  const copyAccountNumber = () => {
    if (nairaWallet) {
      Clipboard.setString(nairaWallet.virtual_account_number);
      alert('Account number copied to clipboard!');
    }
  };
  

  const handlePayment = () => {
    if (!amount) {
      alert('Please enter the amount.');
      return;
    }
  
    if (!selectedPaymentMethod) {
      alert('Please select a payment method.');
      return;
    }
  
    const selectedBank = bankList.find((bank) => bank.name === selectedPaymentMethod);
  
    if (selectedBank) {
      const ussdCode = selectedBank.ussdTemplate.replace('Amount', amount).replace('AccountNumber', nairaWallet.virtual_account_number);
      
      if (ussdCode) {
        // Dial the USSD code
        Linking.openURL(`tel:${ussdCode}`);
        alert(`Dialing USSD code: ${ussdCode}`);
      }
    }
  
    navigation.navigate('TopUpReceipt');
  };
  

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Fund Wallet</Text>

      {/* Amount Input */}
      <TextInput
        style={styles.amountInput}
        placeholder="Enter Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={(text) => setAmount(text)}
      />

       {/* Virtual Account Details */}
       <View style={styles.BalanceContainer}>
        <Text style={styles.balanceHeaderText}>Virtual Account Details</Text>
        {nairaWallet && (
          <>
            <View style={styles.virtualAccountDetails}>
              <Text style={styles.virtualAccountLabel}>Account Name:</Text>
              <Text style={styles.virtualAccountValue}>{nairaWallet.virtual_account_name}</Text>
            </View>
            <View style={styles.virtualAccountDetails}>
              <Text style={styles.virtualAccountLabel}>Account Number:</Text>
              <Text style={styles.virtualAccountValue}>{nairaWallet.virtual_account_number}</Text>
              <TouchableOpacity onPress={copyAccountNumber}>
                <Ionicons name="copy" size={20} color="#FFF" />
              </TouchableOpacity>
            </View>
            <View style={styles.virtualAccountDetails}>
              <Text style={styles.virtualAccountLabel}>Bank Name:</Text>
              <Text style={styles.virtualAccountValue}>{nairaWallet.bank_name}</Text>
            </View>
          </>
        )}
      </View>

      {/* Payment Methods */}
      <Text style={styles.paymentMethodTitle}>Card Payment</Text>
      {/* Bank Card */}
      <TouchableOpacity
        style={[styles.paymentMethod, selectedPaymentMethod === 'Card' && styles.selectedPaymentMethod]}
        onPress={() => setSelectedPaymentMethod('Card')}
      >
        <Ionicons name="card" size={32} color="#51CC62" />
        <Text style={styles.paymentMethodText}>Credit/Debit Card</Text>
      </TouchableOpacity>

      {/* Payment Methods */}
      <Text style={styles.paymentMethodTitle}>Bank Payment</Text>

      {/* Bank List */}
      {bankList.map((bank) => (
        <TouchableOpacity
          key={bank.code}
          style={[styles.paymentMethod, selectedPaymentMethod === bank.name && styles.selectedPaymentMethod]}
          onPress={() => setSelectedPaymentMethod(bank.name)}
        >
          <Text style={styles.paymentMethodText}>{bank.name}</Text>
        </TouchableOpacity>
      ))}

      {/* Fund Button */}
      <TouchableOpacity style={styles.fundButton} onPress={handlePayment}>
        <Text style={styles.fundButtonText}>Fund Wallet</Text>
      </TouchableOpacity>

      {/* Back to Wallet Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back to Wallet</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'left',
    color: '#51CC62',
    marginTop: 50,
  },
  amountInput: {
    height: 70,
    borderColor: '#BDC3C7',
    borderWidth: 0,
    marginBottom: 20,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#ECEAE9',
  },
  BalanceContainer: {
    backgroundColor: '#51CC62',
    padding: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#51CC62',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
    height: 200,
  },
  balanceHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  virtualAccountDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  virtualAccountLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  virtualAccountValue: {
    fontSize: 17,
  },
  paymentMethodTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    backgroundColor: '#FFFFFF', 
  },
  selectedPaymentMethod: {
    borderColor: '#51CC62',
    backgroundColor: '#51CC62',
  },
  paymentMethodLogo: {
    width: 32,
    height: 32,
    marginRight: 10,
  },
  paymentMethodText: {
    fontSize: 16,
  },
  fundButton: {
    backgroundColor: '#51CC62',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  fundButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#51CC62',
    fontSize: 16,
  },
});

export default FundWallets;
