import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FundWallets = () => {
  const navigation = useNavigation();
  const [amount, setAmount] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [bankList, setBankList] = useState([]);

  useEffect(() => {
    fetchBankList();
  }, []);

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
      console.error('Error fetching bank list:', error);
      // Handle error
    }
  };

  const handlePayment = () => {
    if (!selectedPaymentMethod) {
      alert('Please select a payment method.');
      return;
    }

    const selectedBank = bankList.find((bank) => bank.name === selectedPaymentMethod);

    if (selectedBank) {
      const ussdCode = selectedBank.ussdTemplate.replace('Amount', amount).replace('AccountNumber', 'YourAccountNumber');
      
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

      {/* Payment Methods */}
      <Text style={styles.paymentMethodTitle}>Virtual Payment</Text>
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
