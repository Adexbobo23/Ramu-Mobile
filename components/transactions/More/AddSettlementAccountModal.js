import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, FlatList, StyleSheet, Alert, ActivityIndicator } from 'react-native';
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
  const [loading, setLoading] = useState(false);
  const [accloading, setAccnameloading] = useState(false)

  const fetchBanks = async () => {
    try {
      setLoading(true);
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
    }  finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchBanks();
  }, []);

  const resolveAccountName = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const resolveUrl = `https://api-staging.ramufinance.com/api/v1/resolve-bank-account?account_number=${accountNumber}&bank_code=${selectedBank.code}`;
  
      console.log('Account Number:', accountNumber);
      console.log('Bank Code:', selectedBank.code);
      console.log('Resolve URL:', resolveUrl);
  
      const response = await axios.get(resolveUrl, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
  
      console.log('Complete Response from resolveAccountName:', response);
  
      if (response.data && response.data.status) {
        const responseBody = response.data.data;
        const resolvedAccountName = responseBody ? responseBody.accountName : null;
  
        if (resolvedAccountName) {
          console.log('Resolved Account Name:', resolvedAccountName);
  
          // Set the resolved account name to the state
          setBeneficiaryAccountName(resolvedAccountName);
        } else {
          console.error('Failed to resolve account name - responseBody is undefined:', response);
        }
      } else {
        console.error('Failed to resolve account name - Response:', response);
        console.error('Response data:', response.data);
      }
    } catch (error) {
      console.error('Error resolving account name:', error);
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response headers:', error.response.headers);
      }
    }
  };
  
  
  const handleAccountNumberChange = async (text) => {
    setAccountNumber(text);
  
    if (text.length > 0) {
      try {
        setAccnameloading(true);
  

        await resolveAccountName();
      } finally {
        setAccnameloading(false);
      }
    }
  };

  
  const handleAddAccount = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');

      if (!selectedBank || !accountNumber || !beneficiaryAccountName) {
        Alert.alert('Validation Error', 'Please fill in all the fields.');
        return;
      }

      // Resolve account name before making the API call
      await resolveAccountName();
      setLoading(true);

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
        Alert.alert('Success', 'Settlement account added successfully! you will receive a mail from us once your account is approved');

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
    } finally {
      setLoading(false); 
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
        {/* Update the styles of modalDropdown */}
        <View style={styles.modalDropdown}>
          {loading && <ActivityIndicator size="large" color="#51CC62" />} 
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

      {/* Updated the TextInput for account number */}
      <TextInput
        style={styles.input}
        placeholder="Beneficiary Account Number"
        value={accountNumber}
        onChangeText={handleAccountNumberChange}
        maxLength={10} 
        keyboardType="numeric" 
      />

      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input1}
          placeholder="Beneficiary Account Name"
          value={beneficiaryAccountName}
          onChangeText={(text) => setBeneficiaryAccountName(text)}
          editable={false}
        />
        
        {accloading && (
          <ActivityIndicator size="large" color="#51CC62" style={styles.loadingIndicator} />
        )}
      </View>

      <TouchableOpacity style={styles.addButton} onPress={handleAddAccount}>
        <Text style={styles.buttonText}>Add Account</Text>
      </TouchableOpacity>

      {loading && (
      <Modal transparent={true} visible={loading}>
        <View style={styles.modalLoader}>
          <ActivityIndicator size="large" color="#51CC62" />
        </View>
      </Modal>
    )}
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
  inputWrapper: {
    position: 'relative',
    marginBottom: 20,
  },
  
  input1: {
    height: 60,
    borderColor: '#51CC62',
    borderWidth: 1.5,
    paddingLeft: 10,
    borderRadius: 15,
    fontWeight: 'normal',
    color: '#000',
  },
  
  loadingIndicator: {
    position: 'absolute',
    right: 16,
    top: '50%', 
    transform: [{ translateY: -12 }],
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
    backgroundColor: '#FFF',
    marginTop: 20, 
    marginBottom: 20,
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
  modalLoader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default AddSettlementAccountModal;
