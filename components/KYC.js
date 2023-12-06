import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as DocumentPicker from 'expo-document-picker';

const KYC = () => {
  const [bvn, setBVN] = useState('');
  const [nin, setNIN] = useState('');
  const [selectedDocument, setSelectedDocument] = useState(null);

  const handleKYCSubmit = async () => {
    try {
      // Retrieve the user's token from AsyncStorage
      const userToken = await AsyncStorage.getItem('userToken');

      // Prepare the request payload
      const requestBody = {
        bvn,
        nin,
        document: selectedDocument, // Add the selected document to the payload
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

  const handleDocumentPicker = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({});

      if (result.type === 'success') {
        // Update the selected document
        setSelectedDocument(result);
      }
    } catch (error) {
      console.error('DocumentPicker Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>KYC Verification</Text>
      <Text style={styles.description}>
        Complete your KYC (Know Your Customer) verification by providing your BVN (Bank Verification Number) or NIN (National Identity Number) and a document.
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

      {/* Document Picker */}
      <TouchableOpacity style={styles.documentPickerButton} onPress={handleDocumentPicker}>
        <Text style={styles.documentPickerButtonText}>Upload NIN Or BVN</Text>
      </TouchableOpacity>

      {/* Display Selected Document */}
      {selectedDocument && (
        <View style={styles.selectedDocument}>
          <Text>Selected Document: {selectedDocument.name}</Text>
        </View>
      )}

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
  documentPickerButton: {
    backgroundColor: '#51CC62',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  documentPickerButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  selectedDocument: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
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
