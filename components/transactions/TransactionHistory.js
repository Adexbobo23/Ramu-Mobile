import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken');
        const walletApiUrl = 'https://api-staging.ramufinance.com/api/v1/get-wallet-details';
        const response = await axios.get(walletApiUrl, {
          headers: { Authorization: `Bearer ${userToken}` },
        });

        const transactionRequests = response.data.data.map(async (wallet) => {
          const walletTransactionsApiUrl = `https://api-staging.ramufinance.com/api/v1/get-wallet-transactions/${wallet.wallet_address}`;
          const transactionResponse = await axios.get(walletTransactionsApiUrl, {
            headers: { Authorization: `Bearer ${userToken}` },
          });

          return transactionResponse.data.data;
        });

        const transactionsData = await Promise.all(transactionRequests);
        const flattenedTransactions = transactionsData.flat();
        setTransactions(flattenedTransactions);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerText}>Transaction History</Text>

      {transactions.map((transaction) => (
        <View key={transaction.id} style={styles.transactionDetailContainer}>
          {/* <Text style={styles.transactionDetailText}>ID: {transaction.id}</Text> */}
          <Text style={styles.transactionDetailText}>Amount: {transaction.amount}</Text>
          <Text style={styles.transactionDetailText}>Type: {transaction.descriptions}</Text>
          {/* Add more transaction details as needed */}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F4F4F4',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#51CC62',
    marginBottom: 20,
    marginTop: 30,
  },
  transactionDetailContainer: {
    marginBottom: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 16,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  transactionDetailText: {
    fontSize: 16,
  },
});

export default TransactionHistory;
