import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, FlatList, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const AddSettlementAccountModal = ({ isVisible, onClose }) => {
  const navigation = useNavigation();
  const [banks, setBanks] = useState([]);
  const [selectedBank, setSelectedBank] = useState(null);
  const [accountNumber, setAccountNumber] = useState('');
  const [beneficiaryAccountName, setBeneficiaryAccountName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const fetchBanks = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const response = await axios.get('https://api-staging.ramufinance.com/api/v1/fetch-bank-ussd', {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (response.data && response.data.status) {
        setBanks(response.data.data);
      } else {
        console.error('Failed to fetch banks - Response:', response);
      }
    } catch (error) {
      console.error('Error fetching banks:', error);
    }
  };

  useEffect(() => {
    // Fetch bank names and codes
    fetchBanks();
  }, []);

  const handleAddAccount = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');

      if (!selectedBank || !accountNumber || !beneficiaryAccountName) {
        Alert.alert('Validation Error', 'Please fill in all the fields.');
        return;
      }

      const accountData = {
        bank_code: selectedBank.code,
        account_number: accountNumber,
        beneficiary_account_name: beneficiaryAccountName,
        beneficiary_bank_name: selectedBank.name,
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

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.dropdownItem}
      onPress={() => {
        setSelectedBank(item);
        setModalVisible(false);
      }}
    >
      <Text style={styles.dropdownItemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.modalContainer}>
      <Text style={styles.modalOption}>Add Settlement Account</Text>

      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.dropdownButtonText}>{selectedBank ? selectedBank.name : 'Select Bank'}</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalDropdown}>
          <FlatList
            data={banks}
            renderItem={renderItem}
            keyExtractor={(item) => item.code.toString()}
          />
          <TouchableOpacity
            style={styles.modalCloseButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.modalCloseButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

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
  dropdownButton: {
    height: 60,
    borderColor: '#51CC62',
    borderWidth: 1.5,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 15,
    justifyContent: 'center',
  },
  dropdownButtonText: {
    fontSize: 16,
    color: '#333',
  },
  modalDropdown: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  dropdownItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#333',
  },
  modalCloseButton: {
    width: '100%',
    backgroundColor: '#51CC62',
    padding: 15,
    alignItems: 'center',
  },
  modalCloseButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default AddSettlementAccountModal;
