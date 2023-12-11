import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AuthenticateTransaction = () => {
  const navigation = useNavigation();

  const [pin1, setPin1] = useState('');
  const [pin2, setPin2] = useState('');
  const [pin3, setPin3] = useState('');
  const [pin4, setPin4] = useState('');

  const handleConfirm = () => {
    navigation.navigate('PaymentConfirm');
    const pin = pin1 + pin2 + pin3 + pin4;
    console.log('Pin confirmed:', pin);
  };

  const handleCancel = () => {
    navigation.navigate('Sell');
    console.log('Transaction authentication cancelled');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Kindly Authenticate with your pin</Text>
      
      <Text style={styles.description}>
        Your pin is required for this transaction{'\n'}
        Kindly provide the pin to proceed
      </Text>

      <View style={styles.pinContainer}>
        {/* You can customize the number of TextInput boxes as needed */}
        <TextInput
          style={styles.pinInput}
          value={pin1}
          onChangeText={setPin1}
          keyboardType="numeric"
          maxLength={1}
          secureTextEntry
        />
        <TextInput
          style={styles.pinInput}
          value={pin2}
          onChangeText={setPin2}
          keyboardType="numeric"
          maxLength={1}
          secureTextEntry
        />
        <TextInput
          style={styles.pinInput}
          value={pin3}
          onChangeText={setPin3}
          keyboardType="numeric"
          maxLength={1}
          secureTextEntry
        />
        <TextInput
          style={styles.pinInput}
          value={pin4}
          onChangeText={setPin4}
          keyboardType="numeric"
          maxLength={1}
          secureTextEntry
        />
      </View>

      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
        <Text style={styles.buttonText}>Confirm</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#51CC62'
  },
  description: {
    fontSize: 16,
    marginBottom: 70,
    textAlign: 'center',
  },
  pinContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 200,
  },
  pinInput: {
    borderWidth: 1,
    borderColor: '#51CC62',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 60,
    width: '18%',
    textAlign: 'center',
    fontSize: 18,
  },
  confirmButton: {
    backgroundColor: '#51CC62',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    height: 52,
  },
  cancelButton: {
    backgroundColor: '#FF4949',
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'normal',
    fontSize: 22
  },
});

export default AuthenticateTransaction;
