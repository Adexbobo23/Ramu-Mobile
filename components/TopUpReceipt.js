import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TopUpReceipt = () => {
    const navigation = useNavigation();


    const navigateTo = (screen) => {
        navigation.navigate(screen);
      };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.title}>Top Up Receipt</Text>

      {/* Investment Image */}
      <Image source={require('./Assests/just.png')} style={styles.investmentImage} />

      {/* Transaction Complete */}
      <Text style={styles.subtitle}>Transaction Complete</Text>
      <Text style={styles.description}>
        Your mutual funds transaction has been{'\n'}completed.
      </Text>

      {/* Detailed Transactions */}
      <View style={styles.detailedTransactions}>
        <Text style={styles.detailedTransactionsTitle}>Detailed Transactions</Text>
        {/* Transaction Details Container */}
        <View style={styles.transactionDetailsContainer}>
          {/* Placeholder Transaction Details Summary */}
          <Text style={styles.transactionDetailsText}>Transaction Type: Purchase</Text>
          <Text style={styles.transactionDetailsText}>Amount: $500</Text>
          <Text style={styles.transactionDetailsText}>Date: 2023-12-07</Text>
          {/* Replace the above lines with actual transaction details */}
        </View>
      </View>

      {/* Back to Home Button */}
      <TouchableOpacity style={styles.backToHomeButton}>
        <Text style={styles.backToHomeButtonText} onPress={() => navigateTo('Dashboard')}>Back to Home</Text>
      </TouchableOpacity>

      {/* Top Up More Link */}
      <Text style={styles.topUpMoreLink} onPress={() => navigateTo('TopUpReceipt')}>Top Up More</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#51CC62',
    marginTop: 50,
    textAlign: 'center',
  },
  investmentImage: {
    width: '100%',
    height: 300,
    marginBottom: 20,
    borderRadius: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  detailedTransactions: {
    marginBottom: 20,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: 'white',
    padding: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 25,
  },
  detailedTransactionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 25,
  },
  transactionDetailsContainer: {
    borderWidth: 1,
    borderColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    
  },
  transactionDetailsText: {
    fontSize: 16,
    marginBottom: 8,
  },
  backToHomeButton: {
    backgroundColor: '#51CC62',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 100,
  },
  backToHomeButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  topUpMoreLink: {
    color: '#51CC62',
    fontSize: 16,
    textDecorationLine: 'underline',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default TopUpReceipt;
