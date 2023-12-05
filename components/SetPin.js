import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SetPin = ({ navigation }) => {
  const [enterPin, setEnterPin] = useState(['', '', '', '']);
  const [confirmPin, setConfirmPin] = useState(['', '', '', '']);
  const enterPinRefs = useRef([]);
  const confirmPinRefs = useRef([]);
  const [userToken, setUserToken] = useState('');

  useEffect(() => {
    // Fetch user token from AsyncStorage
    const fetchUserToken = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          setUserToken(token);
        } else {
          // Handle the case where the token is not available
          console.error('User token not found in AsyncStorage');
        }
      } catch (error) {
        console.error('Error fetching user token:', error);
      }
    };

    fetchUserToken();
  }, []);

  const handlePinChange = (index, value, pinType) => {
    const setPinFunction = pinType === 'enter' ? setEnterPin : setConfirmPin;
    const pinRefs = pinType === 'enter' ? enterPinRefs : confirmPinRefs;

    const newPins = [...(pinType === 'enter' ? enterPin : confirmPin)];
    newPins[index] = value;

    // If the current box is filled, move focus to the next box
    if (value.length === 1 && index < 3) {
      pinRefs.current[index + 1].focus();
    }

    setPinFunction(newPins);
  };

  const handleSetPin = async () => {
    const enteredPin = enterPin.join('');
    const confirmedPin = confirmPin.join('');
  
    if (enteredPin.length !== 4 || confirmedPin.length !== 4) {
      Alert.alert('Invalid PIN', 'Please enter a 4-digit PIN in both fields.');
      return;
    }
  
    try {
      const response = await fetch('https://api-staging.ramufinance.com/api/v1/setup-pin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          pin: enteredPin,
          pin_confirmation: confirmedPin, // Add confirmation PIN
        }),
      });
  
      const result = await response.json();
  
      if (response.status === 200) {
        // Save the PIN to AsyncStorage or your preferred storage method
        await AsyncStorage.setItem('userPin', enteredPin);
        Alert.alert('PIN Set', 'Your PIN has been set successfully.');
        // Navigate to the Dashboard or any other screen
        navigation.navigate('Dashboard');
      } else if (response.status === 422) {
        // Handle validation error
        Alert.alert('Validation Error', result.message.pin_confirmation[0]);
      } else {
        // Handle other status codes or show detailed error messages
        console.error('API error:', result);
        Alert.alert('Error', `Error setting PIN: ${result.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error setting PIN:', error);
      Alert.alert('Error', 'An error occurred while setting the PIN. Please try again.');
    }
  };
  
  
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set PIN</Text>

      <View style={styles.pinContainer}>
        {/* Enter PIN */}
        {enterPin.map((pin, index) => (
          <TextInput
            key={index}
            style={styles.pinInput}
            placeholder="0"
            secureTextEntry
            keyboardType="numeric"
            maxLength={1}
            value={pin}
            onChangeText={(text) => handlePinChange(index, text, 'enter')}
            ref={(input) => (enterPinRefs.current[index] = input)}
          />
        ))}
      </View>
        
      <Text style={styles.title}>Confirm PIN</Text>
      <View style={styles.pinContainer}>
        {/* Confirm PIN */}
        {confirmPin.map((pin, index) => (
          <TextInput
            key={index}
            style={styles.pinInput}
            placeholder="0"
            secureTextEntry
            keyboardType="numeric"
            maxLength={1}
            value={pin}
            onChangeText={(text) => handlePinChange(index, text, 'confirm')}
            ref={(input) => (confirmPinRefs.current[index] = input)}
          />
        ))}
      </View>

      {/* Set PIN button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSetPin}>
        <Text style={styles.submitButtonText}>Set PIN</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    marginTop: 40,
  },
  pinContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  pinInput: {
    borderWidth: 1,
    borderColor: '#51CC62',
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 5,
    textAlign: 'center',
    width: 60,
  },
  submitButton: {
    backgroundColor: '#51CC62',
    padding: 15,
    borderRadius: 8,
    marginTop: 30,
    width: '100%',
    height: 52,
  },
  submitButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'normal',
    fontSize: 22,
  },
});

export default SetPin;
