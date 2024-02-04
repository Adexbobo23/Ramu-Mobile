import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken');
        const walletApiUrl =
          'https://api-staging.ramufinance.com/api/v1/get-wallet-details';
        const response = await axios.get(walletApiUrl, {
          headers: { Authorization: `Bearer ${userToken}` },
        });

        const transactionRequests = response.data.data.map(async (wallet) => {
          const walletTransactionsApiUrl = `https://api-staging.ramufinance.com/api/v1/get-wallet-transactions/${wallet.wallet_address}`;
          const transactionResponse = await axios.get(
            walletTransactionsApiUrl,
            {
              headers: { Authorization: `Bearer ${userToken}` },
            }
          );

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

  const handleTransactionPress = (transaction) => {
    setSelectedTransaction(transaction);
    setModalVisible(true);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerText}>Transaction History</Text>

      {transactions.map((transaction) => (
        <TouchableOpacity
          key={transaction.id}
          style={styles.transactionDetailContainer}
          onPress={() => handleTransactionPress(transaction)}
        >
          <Text style={styles.transactionDetailText1}>Transaction</Text>
          <Text style={styles.transactionDetailText}>
            {transaction.narration}
          </Text>
          <Text style={styles.transactionDetailText}>
            Amount: {transaction.amount}
          </Text>
          <Text style={styles.transactionDetailText}>
            Transaction Reference: {transaction.transaction_reference}
          </Text>
          <Text style={styles.transactionDetailText}>
            Status: {transaction.status}
          </Text>
          <Text style={styles.transactionDetailText}>
            Type: {transaction.txn_type}
          </Text>
        </TouchableOpacity>
      ))}

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText1}>Transaction Details</Text>
            <Text style={styles.modalText}>
              Amount: {selectedTransaction?.amount}
            </Text>
            <Text style={styles.modalText}>
              Transaction Reference: {selectedTransaction?.transaction_reference}
            </Text>
            <Text style={styles.modalText}>Status: {selectedTransaction?.status}</Text>
            <Text style={styles.modalText}>Type: {selectedTransaction?.txn_type}</Text>
            <Text style={styles.modalText}>
              Narration: {selectedTransaction?.narration}
            </Text>
            {selectedTransaction?.txn_type === 'buy' && (
              <>
                <Text style={styles.modalText}>
                  Balance Before: {selectedTransaction?.balance_before}
                </Text>
                <Text style={styles.modalText}>
                  Balance After: {selectedTransaction?.balance_after}
                </Text>
                <Text style={styles.modalText}>
                  Quantity: {selectedTransaction?.quantity}
                </Text>
                <Text style={styles.modalText}>
                  Trade Price: {selectedTransaction?.trade_price}
                </Text>
              </>
            )}
            {selectedTransaction?.txn_type === 'sell' && (
              <>
                {/* Additional details for sell transaction */}
                <Text style={styles.modalText}>
                  Quantity Sold: {selectedTransaction?.quantity_sold}
                </Text>
                <Text style={styles.modalText}>
                  Sell Price: {selectedTransaction?.sell_price}
                </Text>
              </>
            )}
            {/* Add more details as needed */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: '#F4F4F4',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#51CC62',
    marginBottom: 20,
    marginTop: 30,
    marginLeft: 20,
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
    width: '90%',
  },
  transactionDetailText: {
    fontSize: 13,
  },
  transactionDetailText1: {
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#51CC62'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 13,
    marginBottom: 8,
  },
  modalText1: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold'
  },
  closeButton: {
    marginTop: 16,
    padding: 10,
    backgroundColor: '#51CC62',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    width: 100,
  },
});

export default TransactionHistory;
