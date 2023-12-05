import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const TransactionSummary = () => {
  const navigation = useNavigation();

  const handleSell = () => {
    navigation.navigate('AuthTrans');
    console.log('Sell button clicked');
  };

  const navigateToInvest = () => {
    navigation.navigate('StockInvest');
    };

const navigateToDashboard = () => {
    navigation.navigate('Dashboard');
    };

const navigateToMore = () => {
    navigation.navigate('More');
    };

const navigateToSell = () => {
    navigation.navigate('Sell');
    };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transaction Summary</Text>
      
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryItem}>Company Stock:                             ABC Company</Text>
        <View style={styles.hrLine} />
        <Text style={styles.summaryItem}>Volume of the Stock Sold:                  100 shares</Text>
        <View style={styles.hrLine} />
        <Text style={styles.summaryItem}>Total Amount:                                      N956,866.00</Text>
      </View>

      <TouchableOpacity style={styles.sellButton} onPress={handleSell}>
        <Text style={styles.sellButtonText}>Sell</Text>
      </TouchableOpacity>

      <View style={styles.navBar}>
                <TouchableOpacity style={styles.navBarItem} onPress={navigateToDashboard}>
                    <Ionicons name="home" size={26} color="white" />
                    <Text style={styles.navBarText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navBarItem} onPress={navigateToInvest}>
                    <Ionicons name="analytics" size={26} color="white" />
                    <Text style={styles.navBarText}>Invest</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navBarItem} onPress={navigateToSell}>
                    <Ionicons name="wallet" size={26} color="white" />
                    <Text style={styles.navBarText}>Sell</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navBarItem} onPress={navigateToMore}>
                    <Ionicons name="person" size={26} color="white" />
                    <Text style={styles.navBarText}>More</Text>
                </TouchableOpacity>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 150,
    textAlign: 'center',
  },
  summaryContainer: {
    borderWidth: 0,
    borderColor: '#FFF',
    padding: 10,
    borderRadius: 15,
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  summaryItem: {
    fontSize: 16,
    marginBottom: 10,
  },
  hrLine: {
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  sellButton: {
    backgroundColor: '#51CC62',
    padding: 15,
    borderRadius: 8,
    marginTop: 120,
  },
  sellButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  navBar: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 25,
},
navBarItem: {
    flex: 1,
    alignItems: 'center',
},
navBarText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
},
});

export default TransactionSummary;
