import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, Modal } from 'react-native';

const TransactionHistory = () => {
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const handleTransactionSelect = (index) => {
    setSelectedTransaction(index);
  };

  const handleCloseModal = () => {
    setSelectedTransaction(null);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Transaction History</Text>
      </View>

      <View style={styles.transactionList}>
        {[...Array(10)].map((_, index) => (
          <TouchableOpacity
            key={index}
            style={styles.transactionItem}
            onPress={() => handleTransactionSelect(index)}
          >
            <Image source={require('../Assests/apple.png')} style={styles.circleImage} />
            <View style={styles.textContainer}>
              <Text style={styles.transactionName}>Transaction {index + 1}</Text>
              <Text style={styles.transactionDescription}>Description of the transaction</Text>
            </View>
            <Text style={styles.transactionAmount}>$150.09</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={selectedTransaction !== null}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Display detailed information for the selected transaction */}
            <Text style={styles.modalTitle}>Transaction Details</Text>
            <Text style={styles.transactionDetailText}>{`Transaction Name: Transaction ${selectedTransaction + 1}`}</Text>
            <Text style={styles.transactionDetailText}>Description of the transaction</Text>
            <Text style={styles.transactionDetailText}>{`Amount: $150.09`}</Text>
            {/* Add more details as needed */}

            {/* Close button */}
            <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
              <Text style={styles.buttonText}>Close</Text>
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
  
  circleImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#51CC62',
  },
  transactionDetailText: {
    fontSize: 16,
    marginBottom: 8,
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
