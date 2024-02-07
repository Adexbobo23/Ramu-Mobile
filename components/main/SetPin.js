import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, ActivityIndicator, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SetPin = ({ navigation }) => {
  const [enterPin, setEnterPin] = useState(['', '', '', '']);
  const [confirmPin, setConfirmPin] = useState(['', '', '', '']);
  const enterPinRefs = useRef([]);
  const confirmPinRefs = useRef([]);
  const [userToken, setUserToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEnterPin, setIsEnterPin] = useState(true);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  useEffect(() => {
    const fetchUserToken = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          setUserToken(token);
        } else {
          console.error('User token not found in AsyncStorage');
        }
      } catch (error) {
        console.error('Error fetching user token:', error);
      }
    };

    fetchUserToken();
  }, []);

  const handlePinChange = (index, value) => {
    const pinType = isEnterPin ? 'enter' : 'confirm';
    const setPinFunction = isEnterPin ? setEnterPin : setConfirmPin;
    const pinRefs = isEnterPin ? enterPinRefs : confirmPinRefs;

    const newPins = [...(isEnterPin ? enterPin : confirmPin)];
    newPins[index] = value;

    if (value.length === 1 && index < 3) {
      pinRefs.current[index + 1].focus();
    }

    setPinFunction(newPins);
  };

  const handleTogglePinType = () => {
    setIsEnterPin(!isEnterPin);
  };

  const handleSetPin = async () => {
    if (isEnterPin) {
      handleTogglePinType();
    } else {
      const enteredPin = enterPin.join('');
      const confirmedPin = confirmPin.join('');
  
      if (enteredPin !== confirmedPin) {
        Alert.alert('PIN Mismatch', 'Entered PINs do not match. Please try again.');
        return;
      }
  
      try {
        setIsLoading(true);
        setShowModal(true); // Show modal when data submission starts
        
        const response = await fetch('https://api-staging.ramufinance.com/api/v1/setup-pin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`,
          },
          body: JSON.stringify({
            pin: enteredPin,
            pin_confirmation: confirmedPin,
          }),
        });
    
        const result = await response.json();
    
        if (response.status === 200) {
          await AsyncStorage.setItem('userPin', enteredPin);
          Alert.alert('PIN Set', 'Your PIN has been set successfully.');
          navigation.navigate('Login');
        } else if (response.status === 422) {
          Alert.alert('Validation Error', result.message.pin_confirmation[0]);
        } else {
          console.error('API error:', result);
          Alert.alert('Error', `Error setting PIN: ${result.message || 'Unknown error'}`);
        }
      } catch (error) {
        console.error('Error setting PIN:', error);
        Alert.alert('Error', 'An error occurred while setting the PIN. Please try again.');
      } finally {
        setIsLoading(false);
        setShowModal(false); // Hide modal when data submission completes
      }
    }
  };
  
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.NewTitle}>Set transactions PIN</Text>
        <Text style={styles.description}>Secure your transactions with a 4-digit PIN</Text>

        <Text style={styles.title}>{isEnterPin ? 'Enter' : 'Confirm'} PIN</Text>

        <View style={styles.pinContainer}>
          {(isEnterPin ? enterPin : confirmPin).map((pin, index) => (
            <TextInput
              key={index}
              style={styles.pinInput}
              placeholder="0"
              secureTextEntry
              keyboardType="numeric"
              maxLength={1}
              value={pin}
              onChangeText={(text) => handlePinChange(index, text)}
              ref={(input) => (isEnterPin ? (enterPinRefs.current[index] = input) : (confirmPinRefs.current[index] = input))}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSetPin}>
          <Text style={styles.submitButtonText}>
            {isEnterPin ? 'Next' : 'Set PIN'}
          </Text>
        </TouchableOpacity>

        {/* Modal for loader */}
        <Modal visible={showModal} transparent={true} animationType="fade">
          <View style={styles.modalContainer}>
            <ActivityIndicator size="large" color="#51CC62" />
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#51CC62',
  },
  NewTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#51CC62',
    marginTop: 0,
  },
  description: {
    fontSize: 18,
    color: '#777777',
    textAlign: 'center',
    marginBottom: 50,
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
    height: 60,
  },
  submitButton: {
    backgroundColor: '#51CC62',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    width: '90%',
    height: 60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 25,
    marginLeft: 20,
  },
  submitButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 22,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default SetPin;
