import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AddCreditCard from '../main/AddCreditCard';

const InvestSummary = () => {
  const navigation = useNavigation();
  const [isBankModalVisible, setBankModalVisible] = useState(false);

  const handlePay = () => {
    navigation.navigate('PaymentConfirm');
    console.log('Pay button clicked');
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

  const handleBankModal = () => {
    setBankModalVisible(true);
  };

  const handleAddCard = () => {
    // Navigate to the AddCard component
    navigation.navigate('AddCard');
  };

  const banks = [
    { name: 'GTbank', logo: require('../Assests/gtbank.png') },
    { name: 'Wema', logo: require('../Assests/wema.png') },
    { name: 'Zennith', logo: require('../Assests/zenith.png') },
    { name: 'Access Bank', logo: require('../Assests/accessbank.png') },
    { name: 'Polaris', logo: require('../Assests/polaris.png') },
    { name: 'UBA', logo: require('../Assests/uba.png') },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Investment Summary</Text>
      <Text style={styles.paymentTitle}>Actual Payment</Text>
      <Text style={styles.amount}>N75,650</Text>

      <View style={styles.summaryContainer}>
        <Text style={styles.summaryItem}>Stock Name:  Apple</Text>
        <Text style={styles.summaryItem}>Stock Units:  226 units</Text>
      </View>

      <View style={styles.paymentMethods}>
        <Text style={styles.payment}>Payment Method</Text>

        <TouchableOpacity style={styles.walletContainer}>
          <Ionicons name="wallet" size={24} color="#51CC62" />
          <Text style={styles.iconText}>Wallet (N8000.00)</Text>
          <TouchableOpacity style={styles.radioBox}>
            <Ionicons name="radio-button-off" size={24} color="#51CC62" />
          </TouchableOpacity>
        </TouchableOpacity>
        <View style={styles.hrLine} />

        <TouchableOpacity style={styles.walletContainer} onPress={handleBankModal}>
          <Ionicons name="business" size={24} color="#51CC62" />
          <Text style={styles.iconText}>Select a bank of choice</Text>
          <TouchableOpacity style={styles.radioBox}>
            <Ionicons name="radio-button-off" size={24} color="#51CC62" />
          </TouchableOpacity>
        </TouchableOpacity>
        <View style={styles.hrLine} />

        <TouchableOpacity style={styles.bankDetails} onPress={handleAddCard}>
          <Ionicons name="card" size={24} color="#51CC62" />
          <Text style={styles.iconText}>Credit/Debit Card</Text>
          <TouchableOpacity style={styles.radioBox}>
            <Ionicons name="arrow-forward" size={24} color="#51CC62" />
          </TouchableOpacity>
        </TouchableOpacity>
        <Text style={styles.fadeText}>Add a new card</Text>
      </View>

      <TouchableOpacity style={styles.payButton} onPress={handlePay}>
        <Text style={styles.payText}>Pay</Text>
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

      <Modal visible={isBankModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Select Bank</Text>
          <ScrollView>
            {banks.map((bank) => (
              <TouchableOpacity
                key={bank.name}
                style={styles.bankItem}
                onPress={() => setBankModalVisible(false)}
              >
                <Image source={bank.logo} style={styles.bankLogo} />
                <Text>{bank.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity onPress={() => setBankModalVisible(false)} style={styles.closeButton}>
            <Text style={{ color: '#51CC62' }}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FFFFFF',
        paddingVertical: 50,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: '#51CC62',
    },
    payment: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'left',
        color: '#51CC62',
    },
    radioBox: {
        marginLeft: 'auto',
    },
    paymentTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    iconText: {
        marginLeft: 10, 
    },
    hrLine: {
        borderBottomColor: '#000',
        borderBottomWidth: 1,
        marginBottom: 20,
    },
    amount: {
        fontSize: 70,
        marginBottom: 20,
        textAlign: 'center',
        color: '#51CC62',
        fontWeight: 'bold',
    },
    summaryContainer: {
        borderWidth: 1,
        borderColor: '#51CC62',
        padding: 10,
        marginBottom: 20,
        borderRadius: 15,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 150,
    },
    summaryItem: {
        fontSize: 16,
        marginBottom: 15,
    },
    paymentMethods: {
        borderWidth: 1,
        borderColor: '#51CC62',
        padding: 10,
        marginBottom: 80,
        borderRadius: 15,
        backgroundColor: '#FFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 55,
    },
    walletContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        
    },
    bankDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    fadeText: {
        color: '#A9A9A9',
        marginTop: 10,
        fontSize: 18,
    },
    payButton: {
        backgroundColor: '#51CC62',
        padding: 15,
        borderRadius: 8,
    },
    payText: {
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
    continueButton: {
        backgroundColor: '#51CC62',
        padding: 12,
        borderRadius: 8,
        width: '90%',
    },
    continueButtonText: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 20,
      },
      modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#51CC62',
        marginBottom: 10,
      },
      bankItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
      },
      bankLogo: {
        width: 40,
        height: 40,
        marginRight: 10,
      },
      closeButton: {
        marginTop: 20,
        alignItems: 'center',
      },
});

export default InvestSummary;
