import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView, Linking} from 'react-native';
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

    let ussdCode = '';

    // Generate USSD code based on the selected payment method
    switch (selectedPaymentMethod) {
      case 'GTBank':
        ussdCode = '*737*amount#'; 
        break;
      case 'Polaris':
        ussdCode = '*833*amount#'; 
        break;
      case 'Access Bank':
        ussdCode = '*901*amount#'; 
        break;
      case 'Zenith':
        ussdCode = '*966*amount#'; 
        break;
      case 'Wema Bank':
        ussdCode = '*945*amount#'; 
        break;
      case 'UBA':
        ussdCode = '*919*amount#'; 
        break;
      // Add more cases as needed
      default:
        break;
    }

    if (ussdCode) {
      // Dial the USSD code
      Linking.openURL(`tel:${ussdCode}`);
      alert(`Dialing USSD code: ${ussdCode}`);
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
      <Ionicons name="card" size={32} color="black" />
      <Text style={styles.paymentMethodText}>Credit/Debit Card</Text>
    </TouchableOpacity>

    {/* Payment Methods */}
    <Text style={styles.paymentMethodTitle}>Bank Payment</Text>

    {/* GTBank */}
    <TouchableOpacity
      style={[styles.paymentMethod, selectedPaymentMethod === 'GTBank' && styles.selectedPaymentMethod]}
      onPress={() => setSelectedPaymentMethod('GTBank')}
    >
      <Image source={require('./Assests/gtbank.png')} style={styles.paymentMethodLogo} />
      <Text style={styles.paymentMethodText}>GTBank</Text>
    </TouchableOpacity>

    {/* Polaris */}
    <TouchableOpacity
      style={[styles.paymentMethod, selectedPaymentMethod === 'Polaris' && styles.selectedPaymentMethod]}
      onPress={() => setSelectedPaymentMethod('Polaris')}
    >
      <Image source={require('./Assests/polaris.png')} style={styles.paymentMethodLogo} />
      <Text style={styles.paymentMethodText}>Polaris</Text>
    </TouchableOpacity>

    {/* Access Bank */}
    <TouchableOpacity
      style={[styles.paymentMethod, selectedPaymentMethod === 'Access Bank' && styles.selectedPaymentMethod]}
      onPress={() => setSelectedPaymentMethod('Access Bank')}
    >
      <Image source={require('./Assests/accessbank.png')} style={styles.paymentMethodLogo} />
      <Text style={styles.paymentMethodText}>Access Bank</Text>
    </TouchableOpacity>

    {/* Zenith */}
    <TouchableOpacity
      style={[styles.paymentMethod, selectedPaymentMethod === 'Zenith' && styles.selectedPaymentMethod]}
      onPress={() => setSelectedPaymentMethod('Zenith')}
    >
      <Image source={require('./Assests/zenith.png')} style={styles.paymentMethodLogo} />
      <Text style={styles.paymentMethodText}>Zenith</Text>
    </TouchableOpacity>

    {/* Wema Bank */}
    <TouchableOpacity
      style={[styles.paymentMethod, selectedPaymentMethod === 'Wema Bank' && styles.selectedPaymentMethod]}
      onPress={() => setSelectedPaymentMethod('Wema Bank')}
    >
      <Image source={require('./Assests/wema.png')} style={styles.paymentMethodLogo} />
      <Text style={styles.paymentMethodText}>Wema Bank</Text>
    </TouchableOpacity>

    {/* UBA */}
    <TouchableOpacity
      style={[styles.paymentMethod, selectedPaymentMethod === 'UBA' && styles.selectedPaymentMethod]}
      onPress={() => setSelectedPaymentMethod('UBA')}
    >
      <Image source={require('./Assests/uba.png')} style={styles.paymentMethodLogo} />
      <Text style={styles.paymentMethodText}>UBA</Text>
    </TouchableOpacity>

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
