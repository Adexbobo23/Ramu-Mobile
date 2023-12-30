import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const CustomDropdown = ({ options, selectedValue, onValueChange }) => {
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.dropdownContainer}>
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setVisible(!visible)}
      >
        <Text>{options.find((option) => option.value === selectedValue)?.label}</Text>
      </TouchableOpacity>
      {visible && (
        <View style={styles.dropdownList}>
          {options.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={styles.dropdownItem}
              onPress={() => {
                onValueChange(option.value);
                setVisible(false);
              }}
            >
              <Text>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const ConvertFunds = () => {
  const navigation = useNavigation();

  const [convertAmount, setConvertAmount] = useState('');
  const [convertFrom, setConvertFrom] = useState('NGN');
  const [convertTo, setConvertTo] = useState('USD');
  const [exchangeRate, setExchangeRate] = useState(null);

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
          'What transaction do you wish to perform?',
          [
            {
              text: 'Invest',
              onPress: () => navigation.navigate('StockInvest'),
            },
            {
              text: 'Withdraw',
              onPress: () => navigation.navigate('Withdraw'),
            },
          ],
          { cancelable: false }
        );
      } else {
        console.error('Conversion failed - Response:', response);
        if (response.data && response.data.message) {
          Alert.alert('Error', `Conversion failed. Reason: ${response.data.message}`);
        } else {
          Alert.alert('Error', 'Conversion failed. Please try again later.');
        }
      }
    } catch (error) {
      console.error('Error converting funds:', error);
      Alert.alert('Error', 'Failed to convert funds. Please try again later.');
    }
  };

  const calculateConvertedAmount = () => {
    if (!exchangeRate || !convertAmount) {
      return 'Exchange rate not available';
    }

    const rate = convertTo === 'USD' ? exchangeRate.ngn_usd : exchangeRate.usd_ngn;
    const convertedAmount = parseFloat(convertAmount) * parseFloat(rate);

    return `Converted Amount: ${convertedAmount.toFixed(2)} ${convertTo}`;
  };

  const currencyOptions = [
    { label: 'NGN', value: 'NGN' },
    { label: 'USD', value: 'USD' },
  ];

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
        Exchange Rate: 1 {convertFrom} = {exchangeRate?.[`${convertFrom.toLowerCase()}_to_${convertTo.toLowerCase()}`]} {convertTo}
      </Text>

      <Text style={styles.convertedAmount}>
        {calculateConvertedAmount()}
      </Text>

      <Text style={styles.label}>Select From Currency</Text>
      <CustomDropdown
        options={currencyOptions}
        selectedValue={convertFrom}
        onValueChange={setConvertFrom}
      />

      <Text style={styles.label1}>Select To Currency</Text>
      <CustomDropdown
        options={currencyOptions}
        selectedValue={convertTo}
        onValueChange={setConvertTo}
      />

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
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#51CC62',
    marginBottom: 50,
    marginTop: -100,
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
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: '#51CC62',
    alignSelf: 'flex-start',
  },
  label1: {
    fontSize: 18,
    marginBottom: 10,
    color: '#51CC62',
    alignSelf: 'flex-start',
    marginTop: 50
  },
  dropdownContainer: {
    width: '100%',
    borderColor: '#51CC62',
    borderWidth: 1.5,
    borderRadius: 15,
    marginBottom: 20,
    position: 'relative',
    height: 50,
  },
  dropdownButton: {
    width: '100%',
    padding: 10,
  },
  dropdownList: {
    position: 'absolute',
    top: '100%',
    left: 0,
    width: '100%',
    borderColor: '#51CC62',
    borderWidth: 1.5,
    borderRadius: 15,
    marginTop: 2,
    backgroundColor: '#51CC62',
    zIndex: 2,
  },
  dropdownItem: {
    padding: 10,
  },
  exchangeRate: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  convertedAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#51CC62',
    marginBottom: 40,
  },
  convertButton: {
    backgroundColor: '#51CC62',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 80,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ConvertFunds;
