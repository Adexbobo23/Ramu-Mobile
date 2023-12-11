import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Withdraw = () => {
  const navigation = useNavigation();
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [selectedWithdrawalMethod, setSelectedWithdrawalMethod] = useState('');
  const [isBankModalVisible, setBankModalVisible] = useState(false);

  const handleWithdraw = () => {
    if (!selectedWithdrawalMethod) {
      alert('Please select a withdrawal method');
      return;
    }

    if (selectedWithdrawalMethod === 'Bank Transfer') {
      // Show bank modal
      setBankModalVisible(true);
    } else {
      // Handle Credit Card/Debit Card withdrawal
      navigation.navigate('WithdrawOtp');
      console.log(`Withdraw amount: ${withdrawAmount}`);
    }
  };

  const handleBankSelection = (bankName) => {
    // Handle bank selection
    console.log('Selected Bank:', bankName);

    // Close the bank modal
    setBankModalVisible(false);

    // Proceed to transfer modal (implement your logic here)
    // navigation.navigate('TransferConfirmation', { bankName, withdrawAmount });
  };

  const renderBankModal = () => {
    return (
      <Modal visible={isBankModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Select Bank</Text>
          <ScrollView>
            {banks.map((bank) => (
              <TouchableOpacity
                key={bank.name}
                style={styles.bankItem}
                onPress={() => handleBankSelection(bank.name)}
              >
                <Image source={bank.logo} style={styles.bankLogo} />
                <Text>{bank.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity onPress={() => setBankModalVisible(false)} style={styles.closeButton}>
            <Text style={{ color: '#51CC62' }}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };

  const banks = [
    { name: 'GTbank', logo: require('../Assests/gtbank.png') },
    { name: 'Wema', logo: require('../Assests/wema.png') },
    { name: 'Zennith', logo: require('../Assests/zenith.png') },
    { name: 'Access Bank', logo: require('../Assests/accessbank.png') },
    { name: 'Polaris', logo: require('../Assests/polaris.png') },
    { name: 'UBA', logo: require('../Assests/uba.png') },
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Withdraw</Text>
        <Text>{"\n\n"}</Text>
        <Text style={styles.balanceText}>Balance: N56799.00</Text>
        <Text style={styles.ablewithdraw}>Withdrawable Balance: N33400.00</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter amount to withdraw"
          keyboardType="numeric"
          value={withdrawAmount}
          onChangeText={(text) => setWithdrawAmount(text)}
        />

        <Text style={styles.transactionLimits}>
          1. Minimum per transaction: N1000.00{'\n'}
          2. Maximum per transaction: N1000000.00
        </Text>
        <Text style={styles.paymentMethodTitle}>Withdraw Methods</Text>
        <TouchableOpacity
          style={[
            styles.withdrawMethodButton,
            selectedWithdrawalMethod === 'Bank Transfer' && styles.selectedWithdrawMethodButton,
          ]}
          onPress={() => setSelectedWithdrawalMethod('Bank Transfer')}
        >
          <Text style={styles.withdrawMethodText}>Withdraw to Bank</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.withdrawMethodButton,
            selectedWithdrawalMethod === 'Credit Card/Debit Card' && styles.selectedWithdrawMethodButton,
          ]}
          onPress={() => setSelectedWithdrawalMethod('Credit Card/Debit Card')}
        >
          <Text style={styles.withdrawMethodText}>Withdraw to Credit Card/Debit Card</Text>
        </TouchableOpacity>

        {renderBankModal()}

        <TouchableOpacity style={styles.withdrawButton} onPress={handleWithdraw}>
          <Text style={styles.buttonText}>Withdraw</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'left',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#51CC62',
    marginTop: 20,
  },
  paymentMethodTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
    
  },
  balanceText: {
    fontSize: 16,
    marginBottom: 10,
  },
  ablewithdraw: {
    fontSize: 16,
    marginBottom: 20,
  },
  input: {
    height: 60,
    borderColor: '#51CC62',
    borderWidth: 1.5,
    marginBottom: 30,
    paddingLeft: 10,
    width: '100%',
    borderRadius: 6,
  },
  transactionLimits: {
    fontSize: 14,
    marginBottom: 40,
    textAlign: 'left',
  },
  withdrawMethodButton: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#51CC62',
    marginBottom: 10,
  },
  selectedWithdrawMethodButton: {
    backgroundColor: '#51CC62',
  },
  withdrawMethodText: {
    color: '#000',
    fontSize: 18,
    textAlign: 'center',
  },
  withdrawButton: {
    backgroundColor: '#51CC62',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    height: 52,
    width: '100%',
    marginTop: 200,
  },
  buttonText: {
    color: 'white',
    fontSize: 22,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#51CC62',
    marginBottom: 10,
  },
  bankItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  bankLogo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  closeButton: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default Withdraw;
