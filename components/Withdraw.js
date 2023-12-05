import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Withdraw = () => {
  const navigation = useNavigation();
  const [withdrawAmount, setWithdrawAmount] = useState('');

  const handleWithdraw = () => {
    navigation.navigate('WithdrawOtp');
    console.log(`Withdraw amount: ${withdrawAmount}`);
  };

  return (
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

      <TouchableOpacity style={styles.withdrawButton} onPress={handleWithdraw}>
        <Text style={styles.buttonText}>Withdraw</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'left',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
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
    marginBottom: 320,
    textAlign: 'left',
  },
  withdrawButton: {
    backgroundColor: '#51CC62',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    height: 52,
    width: '100%'
  },
  buttonText: {
    color: 'white',
    fontSize: 22,
  },
});

export default Withdraw;
