import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TransactionItem = ({ transaction, onPress }) => (
  <TouchableOpacity
    style={styles.transactionItem}
    onPress={() => onPress(transaction.wallet_address)}
  >
    <View style={styles.textContainer}>
      <Text style={styles.transactionName}>{transaction.currency_code}</Text>
      <Text style={styles.transactionDescription}>
        Balance: {transaction.balance}
      </Text>
    </View>
    <Text style={styles.transactionAmount}>{`$${transaction.balance}`}</Text>
  </TouchableOpacity>
);

const TransactionDetails = ({ transactionDetails, onCloseDetails }) => (
  <View style={styles.detailsContainer}>
    <Text style={styles.detailsTitle}>Transaction Details</Text>
    {transactionDetails &&
      transactionDetails.map((detail) => (
        <View key={detail.id} style={styles.transactionDetailContainer}>
          <Text style={styles.transactionDetailText}>
            Transaction Type: {detail.txn_type}
          </Text>
          <Text style={styles.transactionDetailText}>
            Amount: ${detail.amount}
          </Text>
          <Text style={styles.transactionDetailText}>
            Transaction Reference: {detail.transaction_reference}
          </Text>
          {/* Add more details as needed */}
        </View>
      ))}
    <TouchableOpacity style={styles.closeButton} onPress={onCloseDetails}>
      <Text style={styles.buttonText}>Close Details</Text>
    </TouchableOpacity>
  </View>
);

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [transactionDetails, setTransactionDetails] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken');
        const walletApiUrl =
          'https://api-staging.ramufinance.com/api/v1/get-wallet-details';
        const response = await axios.get(walletApiUrl, {
          headers: { Authorization: `Bearer ${userToken}` },
        });

        setTransactions(response.data.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  const handleTransactionSelect = async (walletAddress) => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const walletTransactionsApiUrl = `https://api-staging.ramufinance.com/api/v1/get-wallet-transactions/${walletAddress}`;
      const response = await axios.get(walletTransactionsApiUrl, {
        headers: { Authorization: `Bearer ${userToken}` },
      });

      setTransactionDetails(response.data.data);
      setSelectedTransaction(walletAddress);
    } catch (error) {
      console.error('Error fetching wallet transactions:', error);
    }
  };

  const handleCloseDetails = () => {
    setSelectedTransaction(null);
    setTransactionDetails(null);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Transaction History</Text>
      </View>

      <View style={styles.transactionList}>
        {transactions.map((transaction) => (
          <TransactionItem
            key={transaction.id}
            transaction={transaction}
            onPress={handleTransactionSelect}
          />
        ))}
      </View>

      {selectedTransaction && (
        <TransactionDetails
          transactionDetails={transactionDetails}
          onCloseDetails={handleCloseDetails}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F4F4F4',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 50,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#51CC62',
  },
  transactionList: {
    borderWidth: 0,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    padding: 5,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  textContainer: {
    flex: 1,
  },
  transactionName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#51CC62',
  },
  transactionDescription: {
    color: '#666',
  },
  transactionAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  detailsContainer: {
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
  detailsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#51CC62',
  },
  transactionDetailContainer: {
    marginBottom: 8,
  },
  transactionDetailText: {
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: '#51CC62',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default TransactionHistory;
