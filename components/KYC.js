import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const KYC = () => {
  const [bvn, setBVN] = useState('');
  const [nin, setNIN] = useState('');

  const handleKYCSubmit = async () => {
    try {
      // Retrieve the user's token from AsyncStorage
      const userToken = await AsyncStorage.getItem('userToken');

      // Prepare the request payload
      const requestBody = {
        bvn,
        nin,
      };

      // Make a POST request to the KYC API
      const response = await fetch('https://api-staging.ramufinance.com/api/v1/add-id-number', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify(requestBody),
      });

      // Handle the response
      const responseData = await response.json();

      // Display the response message in an alert popup
      Alert.alert('KYC Verification', responseData.message);

      // You can handle success or error cases based on the API response
      if (response.ok) {
        // KYC success
        console.log('KYC Success:', responseData);
      } else {
        // KYC error
        console.error('KYC Error:', responseData);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>KYC Verification</Text>
      <Text style={styles.description}>
        Complete your KYC (Know Your Customer) verification by providing your BVN (Bank Verification Number) or NIN (National Identity Number).
      </Text>


      {/* BVN Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter BVN"
        keyboardType="numeric"
        value={bvn}
        onChangeText={setBVN}
      />

      {/* NIN Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter NIN"
        keyboardType="numeric"
        value={nin}
        onChangeText={setNIN}
      />

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleKYCSubmit}>
        <Text style={styles.submitButtonText}>Submit KYC</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  submitButton: {
    backgroundColor: '#51CC62',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default KYC;
