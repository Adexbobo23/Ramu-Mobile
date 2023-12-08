import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';

const TransactionHistory = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Transaction History</Text>
      </View>

      <View style={styles.transactionList}>
        {[...Array(20)].map((_, index) => (
          <View key={index} style={styles.transactionItem}>
            <Image source={require('./Assests/apple.png')} style={styles.circleImage} />
            <View style={styles.textContainer}>
              <Text style={styles.transactionName}>Transaction {index + 1}</Text>
              <Text style={styles.transactionDescription}>Description of the transaction</Text>
            </View>
            <Text style={styles.transactionAmount}>$150.09</Text>
          </View>
        ))}
      </View>
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
    color: '#333',
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
    color: '#333',
  },
  transactionDescription: {
    color: '#666',
  },
  transactionAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default TransactionHistory;
