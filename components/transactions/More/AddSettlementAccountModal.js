import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const AddSettlementAccountModal = ({ isVisible, onClose }) => {
  const navigation = useNavigation();
  const [bankCode, setBankCode] = useState('101');
  const [accountNumber, setAccountNumber] = useState('');
  const [beneficiaryAccountName, setBeneficiaryAccountName] = useState('');
  const [beneficiaryBankName, setBeneficiaryBankName] = useState('');

  const handleAddAccount = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
  
      const accountData = {
        bank_code: bankCode,
        account_number: accountNumber,
        beneficiary_account_name: beneficiaryAccountName,
        beneficiary_bank_name: beneficiaryBankName,
      };
  
      const response = await axios.post(
        'https://api-staging.ramufinance.com/api/v1/add-settlement-account',
        accountData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
  
      if (response.status === 201) {
        Alert.alert('Success', 'Settlement account added successfully!');

        // Redirect to Withdraw component
        navigation.navigate('Withdraw');
      } else {
        console.error('Add account failed - Response:', response);
        if (response.data && response.data.message) {
          Alert.alert('Error', `Failed to add account. Reason: ${response.data.message}`);
        } else {
          Alert.alert('Error', 'Failed to add account. Please try again later.');
        }
      }
    } catch (error) {
      console.error('Error adding account:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again later.');
    }
  };
  

  return (
    <View style={styles.modalContainer}>
      <Text style={styles.modalOption}>Add Settlement Account</Text>
      <TextInput
        style={styles.input}
        placeholder="Bank Code"
        value={bankCode}
        onChangeText={(text) => setBankCode(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Beneficiary Account Number"
        value={accountNumber}
        onChangeText={(text) => setAccountNumber(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Beneficiary Account Name"
        value={beneficiaryAccountName}
        onChangeText={(text) => setBeneficiaryAccountName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Bank Name"
        value={beneficiaryBankName}
        onChangeText={(text) => setBeneficiaryBankName(text)}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddAccount}>
        <Text style={styles.buttonText}>Add Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    padding: 20,
  },
  modalOption: {
    fontSize: 25,
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
    fontWeight: 'bold',
    marginTop: 40,
    color: '#51CC62',
    textAlign: 'center'
  },
  input: {
    height: 60,
    borderColor: '#51CC62',
    borderWidth: 1.5,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 15,
  },
  addButton: {
    backgroundColor: '#51CC62',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    height: 52,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 22,
  },
});

export default AddSettlementAccountModal;
