import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Modalize } from 'react-native-modalize';
import WebView from 'react-native-webview';
import axios from 'axios';


const Dashboard = () => {
  const navigation = useNavigation();
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [isKYCCompleted, setKYCCompleted] = useState(false);
  const [walletDetails, setWalletDetails] = useState(null);
  const modalizeRef = React.useRef(null);
  const [isChatModalVisible, setChatModalVisible] = useState(false);
  const [featuredStocks, setFeaturedStocks] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState('naira');


  useEffect(() => {
    // Check KYC status from AsyncStorage or your API
    checkKYCStatus();
  }, []);

  const checkKYCStatus = async () => {
    try {
      // Retrieve KYC status from AsyncStorage or make an API request
      const kycStatus = await AsyncStorage.getItem('kycStatus');

      if (kycStatus === 'completed') {
        setKYCCompleted(false);
      }
    } catch (error) {
      console.error('Error checking KYC status:', error);
    }
  };

  const fetchWalletDetails = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const response = await axios.get(
        `https://api-staging.ramufinance.com/api/v1/get-wallet-details?account_type=${selectedAccount}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      setWalletDetails(response.data.data);
    } catch (error) {
      console.error('Error fetching wallet details:', error);
    }
  };

 

  const switchAccount = () => {
    const newAccount = selectedAccount === 'naira' ? 'dollar' : 'naira';
    setSelectedAccount(newAccount);
    // Fetch wallet details for the selected account
    fetchWalletDetails();
  };

  const toggleChatModal = () => {
    setChatModalVisible(!isChatModalVisible);
    if (modalizeRef.current) {
      modalizeRef.current.open();
    }
  };

  const handleInvestButton = () => {
    navigation.navigate('StockInvest');
    console.log('Invest button clicked');
  };

  const handleSellButton = () => {
    navigation.navigate('Sell');
    console.log('Sell button clicked');
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


const handlePressKyc = () => {
  navigation.navigate('KYC');
  console.log('Complete your KYC clicked');
  setKYCCompleted(true);
    // Save KYC status to AsyncStorage or make an API request
    AsyncStorage.setItem('kycStatus', 'completed');
};

const handleSeeAll = () => {
  // Navigate to the AllStocks screen
  navigation.navigate('AllStock');
};

useEffect(() => {
  // Fetch featured stocks with user token
  fetchFeaturedStocks();
}, []);

const fetchFeaturedStocks = async () => {
  try {
    // Retrieve user token from AsyncStorage
    const userToken = await AsyncStorage.getItem('userToken');

    // Make API request with user token
    const response = await fetch('https://api-staging.ramufinance.com/api/v1/get-featured-stocks', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${userToken}`,
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();

    if (response.ok) {
      // Set the featured stocks in state
      setFeaturedStocks(result.data);
    } else {
      console.error('Failed to fetch featured stocks:', result.message);
    }
  } catch (error) {
    console.error('Error fetching featured stocks:', error);
  }
};

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.topBar}>
          <Text style={styles.welcomeText}>Welcome, {walletDetails?.virtual_account_name}</Text>
          <TouchableOpacity style={styles.searchIconContainer} onPress={handleSeeAll}>
            <Ionicons name="search" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.balanceContainer} onPress={toggleBalanceVisibility}>
          <Text style={styles.balanceText}>
            {balanceVisible ? `${selectedAccount === 'naira' ? '₦' : '$'}${walletDetails?.balance}` : '*******'}
          </Text>
          {balanceVisible ? (
            <Ionicons name="eye-off" size={24} color="white" />
          ) : (
            <Ionicons name="eye" size={24} color="white" />
          )}
        </TouchableOpacity>
        <View style={styles.totalBalanceContainer}>
          <Text style={styles.accountTitle}>Account Number</Text>
          <Text style={styles.accountNumber}>{walletDetails?.virtual_account_number}</Text>
          <TouchableOpacity style={styles.switchAccountButton} onPress={switchAccount}>
            <Text style={styles.switchAccountButtonText}>
              Switch to {selectedAccount === 'naira' ? 'Dollar Account' : 'Naira Account'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.buttonContainer} onPress={handleInvestButton}>
            <Text style={styles.buttonTextInvest}>INVEST</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer1} onPress={handleSellButton}>
            <Text style={styles.buttonTextSell}>SELL</Text>
          </TouchableOpacity>
        </View>
        {/* {isKYCCompleted ? (
        <Text style={styles.accountActivatedText}>
          Account activated. Start trading in UK, US, and Nigeria stocks.
        </Text>
      ) : (
        <View style={styles.progressBarContainer}>
          <TouchableOpacity onPress={handlePressKyc}>
            <Text style={styles.progressBarText}>Complete your KYC</Text>
          </TouchableOpacity>
          
        </View>
      )} */}
        
        {isKYCCompleted ? (
          <View style={styles.getToKnowYouContainer}>
          <View style={styles.getToKnowYouTextContainer}>
            <Text style={styles.getToKnowYouText}>CONGRATULATIONS</Text>
            <Text style={styles.getToKnowYouSubText}>
            Account activated.
            </Text>
            <Text style={styles.getToKnowYouSubText}>
            Start trading in UK, US, and Nigeria stocks.
            </Text>
          </View>
          <Image source={require('./Assests/pana.png')} style={styles.getToKnowYouImage} />
        </View>
        ) : (
          <TouchableOpacity onPress={handlePressKyc}>
           <View style={styles.getToKnowYouContainer}>
           <View style={styles.getToKnowYouTextContainer}>
             <Text style={styles.getToKnowYouText}>LET'S GET TO KNOW YOU</Text>
             <Text style={styles.getToKnowYouSubText}>
               Provide the necessary information to
             </Text>
             <Text style={styles.getToKnowYouSubText}>
               make your transactions secure
             </Text>
           </View>
           <Image source={require('./Assests/pana.png')} style={styles.getToKnowYouImage} />
         </View>
         </TouchableOpacity>
        )}
        
        <View style={styles.lossChartContainer}>
          {/* Loss Chart */}
          <Text style={styles.lossPercentageText}>-10%</Text>
        </View>
        <View style={styles.featuredStockContainer1}>
          <Text style={styles.featuredStockText}>Featured Stocks</Text>
          <TouchableOpacity  onPress={handleSeeAll}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.featuredStockContainer}>
          {/* Featured Stocks List */}
          {featuredStocks.map((stock) => (
            <View key={stock.ticker_id} style={styles.stockListItem}>
              {/* Assuming you have the image URL in your featuredStocks data */}
              <Image source={require('./Assests/trade.jpg')} style={styles.circleImage} />
              <View style={styles.textContainer}>
                <Text style={styles.stockListName}>{stock.company_name}</Text>
                <Text style={styles.stockListDescription}>{stock.description}</Text>
              </View>
              <Text style={styles.stockListPrice}>{`$${stock.trade_price}`}</Text>
            </View>
          ))}
        </View>

      </ScrollView>
      {/* Live chat button */}
      <TouchableOpacity style={styles.liveChatButton} onPress={toggleChatModal}>
        <Ionicons name="chatbubble-ellipses" size={37} color="white" />
      </TouchableOpacity>

      {/* Chat Modal */}
      <Modalize
        ref={modalizeRef}
        adjustToContentHeight
        modalStyle={styles.modal}
        handlePosition="inside"
        HeaderComponent={<Text style={styles.modalHeader}>Live Chat</Text>}
      >
        <WebView source={{ uri: 'https://embed.tawk.to/656a4193ff45ca7d4785dc57/default' }} />
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
    backgroundColor: 'white',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    height: 250,
    backgroundColor: 'green',
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
  },
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -130,
    marginBottom: 20,
  },
  hiddenIcon: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    opacity: 0.5,
  },
  switchAccountButton: {
    backgroundColor: '#51CC62',
    borderRadius: 8,
    padding: 10,
    marginTop: 40,
  },
  switchAccountButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  balanceText: {
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 10,
    color: 'white',
    paddingRight: 10,
    paddingLeft: 10,
    marginTop: 10,
  },
  accountTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 15,
  },

  accountNumber: {
    fontSize: 18,
    fontWeight: 'normal',
    color: 'white',
    marginTop: 7,
  }, 
  circleImage: {
    width: 50,
    height: 40,
    borderRadius: 25,
    marginRight: 10, 
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'normal',
    color: 'white',
    marginTop: -50,
    
  },
  searchIconContainer: {
    padding: 10,
    marginTop: -50,
  },
  totalBalanceContainer: {
    backgroundColor: 'linear-gradient(green, lightgreen)',
    borderRadius: 10,
    paddingVertical: 10,
    marginTop: -25,
    marginHorizontal: 20,
    marginBottom: 50,
  },
  totalBalanceText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 10,
    padding: 10,
    marginBottom: 20,
    marginTop: -50,
  },
  buttonContainer: {
    backgroundColor: '#51CC62',
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '45%',
    height: 50,
    textAlign: 'center',
  },
  buttonContainer1: {
    backgroundColor: 'white',
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '45%',
    height: 50,
    textAlign: 'center',
    borderWidth: 2,
    borderColor: '#51CC62',
  },
  buttonTextInvest: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
  buttonTextSell: {
    fontSize: 20,
    color: '#51CC62',
    textAlign: 'center',
  },
  progressBarContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  progressBarText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#51CC62',
  },
  accountActivatedText: {
    fontSize: 18,
    color: 'green', 
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 10
  },
  getToKnowYouContainer: {
    backgroundColor: 'green',
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 20,
    height: 100,
  },
  getToKnowYouTextContainer: {},
  getToKnowYouText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  getToKnowYouSubText: {
    fontSize: 14,
    color: 'white',
  },
  getToKnowYouImage: {
    width: 70,
    height: 70,
  },
  lossChartContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#51CC62',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    marginBottom: 20,
  },
  lossPercentageText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'red',
  },
  featuredStockContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  featuredStockContainer1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  stockListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#51CC62',
  },
  stockListName: {
    fontSize: 16,
    color: 'black',
  },
  stockListDescription: {
    fontSize: 14,
    color: 'gray',
  },
  stockListPrice: {
    fontSize: 16,
    color: 'black',
  },
  navBar: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    paddingHorizontal: 20,
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
  liveChatButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#51CC62',
    borderRadius: 30,
    padding: 10,
    marginBottom: 100,

  },
  modal: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 15,
    backgroundColor: '#51CC62',
    color: 'white',
  },
});

export default Dashboard;
