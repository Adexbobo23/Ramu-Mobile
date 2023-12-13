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

const navigateToPortfolio = () => {
      navigation.navigate('Portfolio');
};

const navigateToDiscover = () => {
      navigation.navigate('Discover');
  };

  return (
    <View style={styles.container}>
      <View>
  <Text style={styles.title}>Transaction Summary</Text>
  <Text style={styles.description}>A summary of your recent transaction details.</Text>
</View>
      
      <View style={styles.summaryContainer}>
          <View style={styles.summaryItemContainer}>
            <Text style={styles.summaryLabel}>Company Stock:</Text>
            <Text style={styles.summaryText}>ABC Company</Text>
          </View>
          <View style={styles.hrLine} />
          <View style={styles.summaryItemContainer}>
            <Text style={styles.summaryLabel}>Volume of the Stock Sold:</Text>
            <Text style={styles.summaryText}>100 shares</Text>
          </View>
          <View style={styles.hrLine} />
          <View style={styles.summaryItemContainer}>
            <Text style={styles.summaryLabel}>Total Amount:</Text>
            <Text style={styles.summaryText}>N956,866.00</Text>
          </View>
      </View>


      <TouchableOpacity style={styles.sellButton} onPress={handleSell}>
        <Text style={styles.sellButtonText}>Sell</Text>
      </TouchableOpacity>

      <View style={styles.navBar}>
          <TouchableOpacity style={styles.navBarItem} onPress={navigateToDashboard}>
            <Ionicons name="home" size={26} color="white" />
            <Text style={styles.navBarText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navBarItem} onPress={navigateToDiscover}>
            <Ionicons name="search" size={26} color="white" />
            <Text style={styles.navBarText}>Discover</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navBarItem} onPress={navigateToPortfolio}>
            <Ionicons name="briefcase" size={26} color="white" />
            <Text style={styles.navBarText}>Portfolio</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navBarItem} onPress={navigateToMore}>
            <Ionicons name="ellipsis-horizontal" size={26} color="white" />
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
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#51CC62',
  },
  description: {
    fontSize: 15,
    color: '#888', 
    textAlign: 'center',
    marginBottom: 70, 
  },
  summaryContainer: {
    borderWidth: 1,
    borderColor: '#51CC62',
    padding: 20,
    borderRadius: 15,
    backgroundColor: '#F5F5F5',  
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
    marginBottom: 30,
  },
  summaryItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  
  summaryLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#51CC62',
  },
  
  summaryText: {
    fontSize: 16,
  },

  hrLine: {
    borderBottomColor: '#51CC62',
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
    backgroundColor: '#147603',
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
