import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';

const TransactionHistory = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Transaction History</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>See Less</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.transactionList}>
        {[...Array(30)].map((_, index) => (
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
  circleImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10, 
  },
  seeAllText: {
    color: '#51CC62',
    fontSize: 16,
  },
  transactionList: {
    borderWidth: 0,
    borderColor: '#E0E0E0',
    borderRadius: 0,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#51CC62',
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
