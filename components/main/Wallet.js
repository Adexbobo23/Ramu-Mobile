import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Modalize } from 'react-native-modalize';
import { MaterialIcons } from '@expo/vector-icons'; 


const Wallet = () => {
  const navigation = useNavigation();
  const [showBalance, setShowBalance] = useState(true);
  const [selectedAccount, setSelectedAccount] = useState('naira');
  const [walletDetails, setWalletDetails] = useState(null);
  const switchAccountModalRef = React.useRef(null);
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [cardDetails, setCardDetails] = useState(null);

  useEffect(() => {
    const fetchCard = async () => {
      const cardDetails = await fetchCardDetails();
      setCardDetails(cardDetails);
    };

    fetchCard();
  }, []);

  useEffect(() => {
    fetchWalletDetails();
  }, [selectedAccount]);

  const handleToggleBalance = () => {
    setShowBalance(!showBalance);
  };

  const handleSave = () => {
    navigation.navigate('AddCard');
  };

  const handleFundWallet = () => {
    navigation.navigate('FundWallet');
  };

  const fetchWalletDetails = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const response = await axios.get(
        'https://api-staging.ramufinance.com/api/v1/get-wallet-details',
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
  
      // Assuming NGN is for Naira and USD is for Dollar
      const nairaDetails = response.data.data.find((wallet) => wallet.currency_code === 'NGN');
      const dollarDetails = response.data.data.find((wallet) => wallet.currency_code === 'USD');
  
      setWalletDetails({
        naira: nairaDetails,
        dollar: dollarDetails,
      });
    } catch (error) {
      console.error('Error fetching wallet details:', error);
      Alert.alert('Error', 'Failed to fetch wallet details.');
    }
  };

  const renderSwitchAccountButton = () => (
    <TouchableOpacity onPress={() => switchAccountModalRef.current?.open()}>
      <View style={styles.switchAccountContainer}>
        {selectedAccount === 'naira' ? (
          <Image source={require('../Assests/nigeria.png')} style={styles.countryLogo} />
        ) : (
          <Image source={require('../Assests/usa.png')} style={styles.countryLogo} />
        )}
        <MaterialIcons name="keyboard-arrow-down" size={24} color="white" />
      </View>
    </TouchableOpacity>
  );

  const handleAccountSelection = (accountType) => {
    if (accountType === selectedAccount) {
      // If the clicked account is already selected, close the modal
      switchAccountModalRef.current?.close();
    } else {
      // If a different account is selected, update the state and perform any other actions
      setSelectedAccount(accountType);
      // Fetch wallet details for the selected account
      fetchWalletDetails();
    }
  };


  const fetchCardDetails = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const apiUrl = 'https://api-staging.ramufinance.com/api/v1/get-cards';

      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      const cardData = response.data.data;

      // Assuming you have only one card for simplicity
      const cardDetails = cardData.length > 0 ? cardData[0] : null;

      return cardDetails;
    } catch (error) {
      console.error('Error fetching card details:', error);
      return null;
    }
  };


  
  const toggleBalanceVisibility = () => {
    setBalanceVisible(!balanceVisible);
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

      <View style={styles.balanceContainer}>
          <View style={styles.balanceHeader}>
            <Text style={styles.balanceHeaderText}>Account Balance</Text>
            <TouchableOpacity onPress={toggleBalanceVisibility} style={styles.eyeIconContainer}>
              {balanceVisible ? (
                <Ionicons name="eye-off" size={24} color="black" />
              ) : (
                <Ionicons name="eye" size={24} color="black" />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.balanceContent}>
            <TouchableOpacity onPress={toggleBalanceVisibility} style={styles.balanceContentWrapper}>
              {renderSwitchAccountButton()}
              <Text style={styles.balanceText}>
               {balanceVisible ? (
                  selectedAccount === 'naira' ? (
                    `₦${walletDetails?.naira?.balance}`
                  ) : (
                    `$${walletDetails?.dollar?.balance}`
                  )
                ) : (
                  '*******'
                )}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.fundButton} onPress={handleFundWallet}>
              <Text style={styles.fundButtonText}>Fund Your Wallet</Text>
            </TouchableOpacity>
          </View>
        </View>


      {/* Bank Card Section */}
      <Text style={styles.bankCardTitle}>Bank Card</Text>
      <View style={styles.cardContainer}>
        {/* Replace the logo and card details with your actual data */}
        <Ionicons name="card" size={48} color="#51CC62" />
        <View style={styles.cardDetails}>
          <Text style={styles.cardName}>{cardDetails?.email}</Text>
          {/* Replace other details accordingly */}
          <Text style={styles.cardNumber}>{`**** **** **** ${cardDetails?.id}`}</Text>
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

      {/* Switch Account Button */}
      {/* <TouchableOpacity onPress={() => switchAccountModalRef.current?.open()} style={styles.switchAccountButton}>
        <Image source={selectedAccount === 'naira' ? require('./Assests/nigeria.png') : require('./Assests/usa.png')} style={styles.countryLogo} />
        <Text style={styles.switchAccountText}>
          Switch to {selectedAccount === 'naira' ? 'Dollar Account' : 'Naira Account'}
        </Text>
      </TouchableOpacity> */}

      {/* Modalize for switching account */}
      <Modalize ref={switchAccountModalRef} adjustToContentHeight>
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={() => handleAccountSelection('naira')} style={styles.modalOptionContainer}>
            <Image source={require('../Assests/nigeria.png')} style={styles.countryLogo} />
            <Text style={styles.modalOption}>Switch to Naira Account</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleAccountSelection('dollar')} style={styles.modalOptionContainer}>
            <Image source={require('../Assests/usa.png')} style={styles.countryLogo} />
            <Text style={styles.modalOption}>Switch to Dollar Account</Text>
          </TouchableOpacity>
        </View>
      </Modalize>

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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'left',
    marginTop: 70,
    color: '#51CC62'
  },
  balanceContainer: {
    backgroundColor: 'rgba(0, 255, 0, 0.2)',
    padding: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#51CC62',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 0,
    height: 150,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  balanceContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  balanceText: {
    fontSize: 18,
    color: 'black',
  },
  balanceContentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchAccountButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.5)',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  switchAccountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchAccountText: {
    fontSize: 16,
    marginLeft: 10,
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
  countryLogo: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  modalContainer: {
    padding: 20,
  },
  modalOptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalOption: {
    marginLeft: 10,
    fontSize: 16,
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

export default Wallet;
