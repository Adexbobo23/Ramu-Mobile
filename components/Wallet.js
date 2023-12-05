import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Wallet = () => {
const navigation = useNavigation();
const [showBalance, setShowBalance] = useState(true);
const balance = 1524.0; // Replace with your actual balance

  const handleToggleBalance = () => {
    setShowBalance(!showBalance);
  };

const handleSave = () => {
    navigation.navigate('AddCard');
};

const navigateToMore = () => {
  navigation.navigate('More');
};

const navigateToDashboard = () => {
  navigation.navigate('Dashboard');
};

const navigateToPortfolio = () => {
  navigation.navigate('Portfolio');
};

const navigateToDiscover = () => {
  navigation.navigate('Discover');
};
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wallet</Text>

      {/* Balance Container */}
      <View style={styles.balanceContainer}>
        <View style={styles.balanceHeader}>
          <Text style={styles.balanceHeaderText}>Balance</Text>
          <TouchableOpacity onPress={handleToggleBalance}>
            <Ionicons name={showBalance ? 'eye-off' : 'eye'} size={24} color="black" />
          </TouchableOpacity>
        </View>
        <Text style={styles.balanceAmount}>{showBalance ? `₦${balance.toFixed(2)}` : '****'}</Text>
        <TouchableOpacity style={styles.fundButton}>
          <Text style={styles.fundButtonText}>Fund Your Wallet</Text>
        </TouchableOpacity>
      </View>

      {/* Bank Card Section */}
      <Text style={styles.bankCardTitle}>Bank Card</Text>
      <View style={styles.cardContainer}>
        {/* Replace the logo and card details with your actual data */}
        <Ionicons name="card" size={48} color="black" />
        <View style={styles.cardDetails}>
          <Text style={styles.cardName}>Your Card Name</Text>
          <Text style={styles.cardNumber}>**** **** **** 1234</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="trash" size={24} color="red" />
        </TouchableOpacity>
      </View>

      {/* Add New Card Button */}
      <TouchableOpacity style={styles.addCardButton} onPress={handleSave}>
        <Ionicons name="card-outline" size={24} color="black" />
        <Text style={styles.addCardText}>Add New Card</Text>
      </TouchableOpacity>

      <View style={styles.navBar}>
                <TouchableOpacity style={styles.navBarItem} onPress={navigateToDashboard}>
                    <Ionicons name="home" size={26} color="white" />
                    <Text style={styles.navBarText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navBarItem} onPress={navigateToDiscover}>
                    <Ionicons name="trending-up" size={26} color="white" />
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 70,
  },
  balanceContainer: {
    backgroundColor: 'rgba(0, 255, 0, 0.2)',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  balanceHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 10,
  },
  fundButton: {
    backgroundColor: '#51CC62',
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  fundButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  bankCardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  cardDetails: {
    flex: 1,
    marginLeft: 10,
  },
  cardName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardNumber: {
    fontSize: 14,
    color: 'gray',
  },
  addCardButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.5)',
    padding: 15,
    borderRadius: 10,
  },
  addCardText: {
    fontSize: 16,
    marginLeft: 10,
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

export default Wallet;
