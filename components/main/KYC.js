import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as DocumentPicker from 'expo-document-picker';
import { Picker } from '@react-native-picker/picker';

const KYC = () => {
  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [bankName, setBankName] = useState('');
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [selectedDocumentType, setSelectedDocumentType] = useState('NIN'); // Default to NIN

  const handleKYCSubmit = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');

      const requestBody = {
        bankAccount: {
          accountName,
          accountNumber,
          bankName,
        },
        document: selectedDocument,
        documentType: selectedDocumentType, // Include document type in the request
      };

      const response = await fetch('https://api-staging.ramufinance.com/api/v1/add-id-number', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify(requestBody),
      });

      const responseData = await response.json();

      Alert.alert('KYC Verification', responseData.message);

      if (response.ok) {
        console.log('KYC Success:', responseData);
      } else {
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
        setSelectedDocument(result);
      }
    } catch (error) {
      console.error('DocumentPicker Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>KYC VERIFICATION</Text>
      <Text style={styles.description}>
        Complete your KYC (Know Your Customer) verification by providing your Identity Card and Bank Account Details.
      </Text>
      {/* Label for the form */}
      <Text style={styles.formLabel}>Select Your Legal Document</Text>

      {/* Document Type Dropdown */}
      <Picker
        selectedValue={selectedDocumentType}
        onValueChange={(itemValue) => setSelectedDocumentType(itemValue)}
        style={styles.input}
        itemStyle={styles.pickerItem} 
      >
        <Picker.Item label="Driver License" value="Driver License" />
        <Picker.Item label="NIN" value="NIN" />
        <Picker.Item label="BVN" value="BVN" />
      </Picker>

      <TextInput
        style={styles.input}
        placeholder="Enter Account Name"
        value={accountName}
        onChangeText={setAccountName}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter Account Number"
        keyboardType="numeric"
        value={accountNumber}
        onChangeText={setAccountNumber}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter Bank Name"
        value={bankName}
        onChangeText={setBankName}
      />


      <TouchableOpacity style={styles.documentPickerButton} onPress={handleDocumentPicker}>
        <Text style={styles.documentPickerButtonText}>Upload Document</Text>
      </TouchableOpacity>

      {selectedDocument && (
        <View style={styles.selectedDocument}>
          <Text>Selected Document: {selectedDocument.name}</Text>
        </View>
      )}

      <TouchableOpacity style={styles.submitButton} onPress={handleKYCSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
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
    color: '#51CC62',
  },
  description: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#51CC62',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  formLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'left',
    color: '#51CC62',
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
    fontSize: 20,
  },
});

export default KYC;
