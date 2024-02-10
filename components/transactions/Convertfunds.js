import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const ConvertFunds = () => {
  const navigation = useNavigation();

  const [convertAmount, setConvertAmount] = useState('');
  const [convertFrom, setConvertFrom] = useState('NGN');
  const [convertTo, setConvertTo] = useState('USD');
  const [exchangeRate, setExchangeRate] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchExchangeRate();
  }, []);

  const fetchExchangeRate = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const response = await axios.get(
        'https://api-staging.ramufinance.com/api/v1/exchange-rate',
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      if (response.data && response.data.status) {
        setExchangeRate(response.data.data);
      } else {
        console.error('Failed to fetch exchange rate - Response:', response);
        Alert.alert('Error', 'Failed to fetch exchange rate. Please try again later.');
      }
    } catch (error) {
      console.error('Error fetching exchange rate:', error);
      Alert.alert('Error', 'Failed to fetch exchange rate. Please try again later.');
    }
  };

  const handleConvert = async () => {
    try {
      // Check if convertAmount is empty
      if (!convertAmount) {
        Alert.alert('Enter Amount', 'Please enter the amount to convert.', [{ text: 'Close', onPress: () => navigation.navigate('Home') }]);
        return;
      }
      // Check if both convertFrom and convertTo have been selected
      if (convertFrom === 'NGN' && convertTo === 'NGN' || convertFrom === 'USD' && convertTo === 'USD') {
        Alert.alert('Please Select Currencies', 'Please select both "From" and "To" currencies before converting.', [{ text: 'Close', onPress: () => navigation.navigate('Home') }]);
        return;
      }
  
      const userToken = await AsyncStorage.getItem('userToken');
  
      const convertData = {
        amount: parseFloat(convertAmount),
        from_cur: convertFrom,
        to_cur: convertTo,
      };
  
      const response = await axios.post(
        'https://api-staging.ramufinance.com/api/v1/convert-fund',
        convertData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
  
      if (response.data && response.data.status) {
        Alert.alert(
          'Conversion Successful',
          'What action do you wish to perform?',
          [
            {
              text: 'Invest',
              onPress: () => navigation.navigate('StockInvest'),
            },
            {
              text: 'Withdraw',
              onPress: () => navigation.navigate('Withdraw'),
            },
            {
              text: 'Home',
              onPress: () => navigation.navigate('Dashboard')
            }
          ],
          { cancelable: true }
        );
      } else {
        console.error('Conversion failed - Response:', response);
        if (response.data && response.data.message) {
          Alert.alert('Error', `Conversion failed. Reason: ${response.data.message}`, [{ text: 'Close', onPress: () => navigation.navigate('Home') }]);
        } else {
          Alert.alert('Error', 'Conversion failed. Please try again later.', [{ text: 'Close', onPress: () => navigation.navigate('Home') }]);
        }
      }
    } catch (error) {
      console.error('Error converting funds:', error);
      Alert.alert('Hey', 'Failed to convert funds. Insufficient Fund.', [{ text: 'Close', onPress: () => navigation.navigate('Home') }]);
    }
  };
  

  
  const renderCurrencyModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
        <View style={styles.modalOverlay} />
      </TouchableWithoutFeedback>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Select Currencies</Text>
        <TouchableOpacity
          style={styles.currencyButton}
          onPress={() => {
            setConvertFrom('NGN');
            setConvertTo('USD');
            setModalVisible(false);
          }}
        >
          <Text style={styles.currencyButtonText}>NGN to USD</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.currencyButton}
          onPress={() => {
            setConvertFrom('USD');
            setConvertTo('NGN');
            setModalVisible(false);
          }}
        >
          <Text style={styles.currencyButtonText}>USD to NGN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.modalCloseButton}
          onPress={() => setModalVisible(false)}
        >
          <Text style={styles.modalCloseButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Convert Funds</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter amount to convert"
        keyboardType="numeric"
        value={convertAmount}
        onChangeText={(text) => setConvertAmount(text)}
      />

      <Text style={styles.exchangeRate}>
        Exchange Rate: {exchangeRate ? (
          convertFrom === 'NGN'
            ? `1 USD = ${exchangeRate.ngn_usd} NGN`
            : `1 USD = ${exchangeRate.usd_ngn} NGN`
        ) : (
          'Fetching exchange rate...'
        )}
      </Text>

      <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Select Currencies</Text>
      </TouchableOpacity>

      {renderCurrencyModal()}

      <TouchableOpacity style={styles.convertButton} onPress={handleConvert}>
        <Text style={styles.buttonText}>Convert</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#51CC62',
    marginBottom: 20,
  },
  input: {
    height: 60,
    borderColor: '#51CC62',
    borderWidth: 1.5,
    marginBottom: 20,
    paddingLeft: 10,
    width: '100%',
    borderRadius: 15,
  },
  exchangeRate: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: '#51CC62',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#51CC62',
    marginBottom: 20,
    textAlign: 'center',
  },
  currencyButton: {
    backgroundColor: '#51CC62',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  currencyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalCloseButton: {
    backgroundColor: '#51CC62',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalCloseButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  convertButton: {
    backgroundColor: '#51CC62',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
});

export default ConvertFunds;
