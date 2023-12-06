import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const FundWallets = () => {
  const navigation = useNavigation();
  const [amount, setAmount] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  const handlePayment = () => {
    if (!selectedPaymentMethod) {
      alert('Please select a payment method.');
      return;
    }
  
    // Implement logic to initiate payment with the selected method
    alert(`Initiating payment with ${selectedPaymentMethod}. Amount: ${amount}`);
  };

  return (
    <View style={styles.container}>
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
      <Text style={styles.paymentMethodTitle}>Payment Methods</Text>
      {/* Bank Card */}
      <TouchableOpacity
        style={[styles.paymentMethod, selectedPaymentMethod === 'Card' && styles.selectedPaymentMethod]}
        onPress={() => setSelectedPaymentMethod('Card')}
      >
        <Ionicons name="card" size={32} color="black" />
        <Text style={styles.paymentMethodText}>Credit/Debit Card</Text>
      </TouchableOpacity>
      {/* Bank Transfer */}
      <TouchableOpacity
        style={[styles.paymentMethod, selectedPaymentMethod === 'Bank Transfer' && styles.selectedPaymentMethod]}
        onPress={() => setSelectedPaymentMethod('Bank Transfer')}
      >
        <Ionicons name="bank" size={32} color="black" />
        <Text style={styles.paymentMethodText}>Bank Transfer</Text>
      </TouchableOpacity>
      {/* PayPal */}
      <TouchableOpacity
        style={[styles.paymentMethod, selectedPaymentMethod === 'PayPal' && styles.selectedPaymentMethod]}
        onPress={() => setSelectedPaymentMethod('PayPal')}
      >
        <Ionicons name="logo-paypal" size={32} color="black" />
        <Text style={styles.paymentMethodText}>PayPal</Text>
      </TouchableOpacity>
      {/* Bitcoin */}
      <TouchableOpacity
        style={[styles.paymentMethod, selectedPaymentMethod === 'Bitcoin' && styles.selectedPaymentMethod]}
        onPress={() => setSelectedPaymentMethod('Bitcoin')}
      >
        <Ionicons name="logo-bitcoin" size={32} color="black" />
        <Text style={styles.paymentMethodText}>Bitcoin</Text>
      </TouchableOpacity>

      {/* Fund Button */}
      <TouchableOpacity style={styles.fundButton} onPress={handlePayment}>
        <Text style={styles.fundButtonText}>Fund Wallet</Text>
      </TouchableOpacity>

      {/* Back to Wallet Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back to Wallet</Text>
      </TouchableOpacity>
    </View>
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
    height: 60,
    borderColor: '#BDC3C7',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 8,
  },
  paymentMethodTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  selectedPaymentMethod: {
    borderColor: '#51CC62',
    backgroundColor: 'rgba(81, 204, 98, 0.2)',
  },
  paymentMethodText: {
    marginLeft: 10,
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
