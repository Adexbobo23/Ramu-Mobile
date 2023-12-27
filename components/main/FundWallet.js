import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Linking,
  Clipboard,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Modalize } from 'react-native-modalize';

const FundWallets = () => {
  const navigation = useNavigation();
  const [amount, setAmount] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [bankList, setBankList] = useState([]);
  const [nairaWallet, setNairaWallet] = useState(null);
  const [cards, setCards] = useState([]);
  const [cardModalVisible, setCardModalVisible] = useState(false);

  useEffect(() => {
    fetchWalletDetails();
    fetchBankList();
    fetchCards();
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

      const nairaWalletData = response.data.data.find(
        (wallet) => wallet.currency_code === 'NGN'
      );

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
      // Handle error
    }
  };

  const fetchCards = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const response = await axios.get(
        'https://api-staging.ramufinance.com/api/v1/get-cards',
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      const cardsData = response.data.data;
      setCards(cardsData);
    } catch (error) {
      // Handle error
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

    if (selectedPaymentMethod === 'Card') {
      // Perform card payment logic
      const selectedCard = cards.find((card) => card.id === selectedPaymentMethod);
      if (selectedCard) {
        // Implement your card payment logic here
        // If successful, navigate to PaymentConfirm
        navigation.navigate('PaymentConfirm');
      } else {
        // If card is not found, navigate to PaymentFailed
        navigation.navigate('PaymentFailed');
      }
    } else {
      const selectedBank = bankList.find((bank) => bank.name === selectedPaymentMethod);

      if (selectedBank) {
        const ussdCode = selectedBank.ussdTemplate
          .replace('Amount', amount)
          .replace('AccountNumber', nairaWallet.virtual_account_number);

        if (ussdCode) {
          // Dial the USSD code
          Linking.openURL(`tel:${ussdCode}`);
          alert(`Dialing USSD code: ${ussdCode}`);
        }
      }

      // Navigate to PaymentConfirm or PaymentFailed based on your logic
    }
  };

  const handleCardPayment = async (card) => {
    try {
      // Implement card payment logic here using the selected card
      // You may need to use a payment gateway or external library
      // If successful, navigate to PaymentConfirm
      navigation.navigate('PaymentConfirm');
    } catch (error) {
      console.error('Card payment failed:', error);
      // If card payment fails, navigate to PaymentFailed
      navigation.navigate('PaymentFailed');
    }
  };

  const renderCardModal = () => {
    return (
      <Modalize
        ref={(ref) => (this.cardModal = ref)}
        adjustToContentHeight
        onClosed={() => setCardModalVisible(false)}
      >
        <ScrollView>
          {cards.map((card) => (
            <TouchableOpacity
              key={card.id}
              style={[
                styles.paymentMethod,
                selectedPaymentMethod === card.id && styles.selectedPaymentMethod,
              ]}
              onPress={() => {
                setSelectedPaymentMethod(card.id);
                handleCardPayment(card); 
                this.cardModal?.close();
              }}
            >
              <Ionicons name="card" size={32} color="#51CC62" />
              <Text style={styles.paymentMethodText}>{`Card ****${card.masked_pan}`}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Modalize>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fund Wallet</Text>
      <ScrollView>

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
          style={[
            styles.paymentMethod,
            selectedPaymentMethod === 'Card' && styles.selectedPaymentMethod,
          ]}
          onPress={() => {
            setCardModalVisible(true);
            this.cardModal?.open();
          }}
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
            style={[
              styles.paymentMethod,
              selectedPaymentMethod === bank.name && styles.selectedPaymentMethod,
            ]}
            onPress={() => setSelectedPaymentMethod(bank.name)}
          >
            <Text style={styles.paymentMethodText}>{bank.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Fund Button */}
      <TouchableOpacity style={styles.fundButton} onPress={handlePayment}>
        <Text style={styles.fundButtonText}>Fund Wallet</Text>
      </TouchableOpacity>

      {renderCardModal()}
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
    marginTop: 20,
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
  cardModal: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

export default FundWallets;
