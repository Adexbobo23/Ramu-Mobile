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
  const switchAccountModalRef = React.useRef(null); 
  const chatModalRef = React.useRef(null); 
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

 

  const renderSwitchAccountButton = () => (
    <TouchableOpacity onPress={() => switchAccountModalRef.current?.open()}>
      {selectedAccount === 'naira' ? (
        <Image source={require('./Assests/nigeria.png')} style={styles.countrylogo} />
      ) : (
        <Image source={require('./Assests/usa.png')} style={styles.countrylogo} />
      )}
    </TouchableOpacity>
  );

  const handleAccountSelection = (accountType) => {
  if (accountType === selectedAccount) {
    // If the clicked account is already selected, close the modal
    switchAccountModalRef.current?.close();
  } else {
    // If a different account is selected, update the state and perform any other actions
    setSelectedAccount(accountType);
    // ... Additional logic if needed
  }
};

  const toggleChatModal = () => {
    setChatModalVisible(!isChatModalVisible);
    if (chatModalRef.current) {
      chatModalRef.current.open();
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

const handleNotification = () => {
  console.log('Notification icon pressed');
};


  return (
    <View style={styles.container}>
      <ScrollView>
      <View style={styles.container1}>
      <View style={styles.mainWelcome}>
      <Image source={require('./Assests/icon.png')} style={styles.comlogo} />
      <Text style={styles.welcomeText}>Hi, Oliyide</Text>
      {/* <Text>{walletDetails?.virtual_account_name}</Text> */}
      <TouchableOpacity style={styles.notificationIconContainer} onPress={handleSeeAll}>
        <Ionicons name="search" size={28} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.notificationIconContainer} onPress={handleNotification}>
        <Ionicons name="notifications-outline" size={28} color="black" />
      </TouchableOpacity>
    </View>
      <View style={styles.topBar}>
          <Text style={styles.acoountbalance}>Account Balance</Text>
          <View style={styles.balanceContainer}>
            {renderSwitchAccountButton()}
            <TouchableOpacity onPress={toggleBalanceVisibility}>
              <Text style={styles.balanceText}>
                {balanceVisible ? `${selectedAccount === 'naira' ? '₦' : '$'}${walletDetails?.balance}` : '*******'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleBalanceVisibility} style={styles.eyeIconContainer}>
              {balanceVisible ? (
                <Ionicons name="eye-off" size={24} color="white" />
              ) : (
                <Ionicons name="eye" size={24} color="white" />
              )}
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
        </View>

        <View style={styles.stockcontainer}>
            {/* Stocks Section */}
          <View style={styles.stocksSection}>
          <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Top Trending</Text>
                {/* <TouchableOpacity onPress={handleSeeAll}>
                <Text style={styles.seeAll} onPress={() => navigateTo('Sectors')}>See All</Text>
                </TouchableOpacity> */}
            </View>

            {/* Horizontal Scroll for Stocks List */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.stocksList}>
              {/* Sample Stock Item (repeat this for each stock) */}
              <View style={styles.stockItem}>
                <Image source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDX0lzryMjrYOwRt4sT80B7U00fcxmQ-vO152amG-4cEHH4E_oLqukR37WFvyr06hchbg&usqp=CAU' }} style={styles.stockImage3} />
                <Text style={styles.stockName}>Facebook</Text>
                <Text style={styles.stockDescription}>Stock Description</Text>
              </View>
              {/* Repeat... */}
              {/* Sample Stock Item (repeat this for each stock) */}
              <View style={styles.stockItem}>
                <Image source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmvXQRuCtTuXhJjMBHFyx1heks159k1KqwQJZ_mCCmi9e4BRIQ2vMq6JlUEgs_QYW6EIw&usqp=CAU' }} style={styles.stockImage3} />
                <Text style={styles.stockName}>Netflix</Text>
                <Text style={styles.stockDescription}>Stock Description</Text>
              </View>
              {/* Sample Stock Item (repeat this for each stock) */}
              <View style={styles.stockItem}>
                <Image source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjC23i8oLAAunknKBsfvaN_QDv5CyUfHx3QYKSvLZvrsvUeBQKZmOPwjZX8b-x3aqD1dk&usqp=CAU' }} style={styles.stockImage3} />
                <Text style={styles.stockName}>Tesla</Text>
                <Text style={styles.stockDescription}>Stock Description</Text>
              </View>
              {/* Sample Stock Item (repeat this for each stock) */}
              <View style={styles.stockItem}>
                <Image source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTP7vl0YPQ7CPk48qX72enLmfoocaG21M6Hjndj1EeBfwT2-xi_WUz005LgVk8WT_DGcBI&usqp=CAU' }} style={styles.stockImage3} />
                <Text style={styles.stockName}>Amazon</Text>
                <Text style={styles.stockDescription}>Stock Description</Text>
              </View>
              {/* Sample Stock Item (repeat this for each stock) */}
              <View style={styles.stockItem}>
                <Image source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFqJre8P409R-XExxvW-V9XZRple1PUwIYtYGZzYfAAINjgzdZN1Nb5M7Aq4HZpHmgkBA&usqp=CAU' }} style={styles.stockImage3} />
                <Text style={styles.stockName}>Google</Text>
                <Text style={styles.stockDescription}>Stock Description</Text>
              </View>
            </ScrollView>
            
          </View>
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
        </View>
      </ScrollView>
      {/* Live chat button */}
      <TouchableOpacity style={styles.liveChatButton} onPress={toggleChatModal}>
        <Ionicons name="chatbubble-ellipses" size={37} color="white" />
      </TouchableOpacity>

      {/* Chat Modal */}
        <Modalize
          ref={chatModalRef}
          adjustToContentHeight
          modalStyle={styles.modal}
          handlePosition="inside"
          HeaderComponent={<Text style={styles.modalHeader}>Live Chat</Text>}
        >
          <WebView source={{ uri: 'https://embed.tawk.to/656a4193ff45ca7d4785dc57/default' }} />
        </Modalize>

        {/* Modalize for switching account */}
        <Modalize ref={switchAccountModalRef} adjustToContentHeight>
          <View style={styles.modalContainer}>
            <TouchableOpacity onPress={() => handleAccountSelection('naira')} style={styles.modalOptionContainer}>
              <Image source={require('./Assests/nigeria.png')} style={styles.countrylogo} />
              <Text style={styles.modalOption}>Switch to Naira Account</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleAccountSelection('dollar')} style={styles.modalOptionContainer}>
              <Image source={require('./Assests/usa.png')} style={styles.countrylogo} />
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
    backgroundColor: 'white',
  },
  container1: {
    flex: 1,
    backgroundColor: 'white',
  },
  stockcontainer: {
    flex: 1,
    padding: 20,
  },
  topBar: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    height: 200,
    backgroundColor: '#147603',
    borderRadius: 30,
    marginTop: 30,
    width: '93%',
    marginLeft: 10,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 100,
  },
  countrylogo: {
    width: 30,
    height: 20, 
    marginRight: 5, 
  },
  modalContainer: {
    padding: 20,
  },
  modalOption: {
    fontSize: 18,
    paddingVertical: 15,
    borderBottomWidth: 0,
    borderBottomColor: '#ccc',
  },
  modalOptionContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingVertical: 15,
  borderBottomWidth: 1,
  borderBottomColor: '#ccc',
},
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10, 
    marginBottom: 20,
  },
  eyeIconContainer: {
    marginLeft: 50,
  },
  acoountbalance: {
    fontSize: 17,
    fontWeight: 'normal',
    color: 'white',
    marginTop: 30,
    marginLeft: 20,
  },
  balanceText: {
    fontSize: 18,
    color: 'white',
  },
  mainWelcome: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 50,
  },
  comlogo: {
    width: 30,
    height: 30, 
    marginRight: 5, 
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'normal',
    color: 'black',
    flex: 2,
    fontFamily: 'sans-serif'
  },
  notificationIconContainer: {
    marginRight: 10,
  },
  searchIconContainer: {
    marginLeft: 10,
    marginTop: 50,
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
    fontWeight: 'normal',
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
    backgroundColor: '#1FAE05',
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '45%',
    height: 50,
    textAlign: 'center',
    marginTop: 80,
    marginLeft: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 25,
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
    marginTop: 80,
    marginLeft: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 25,
  },
  buttonTextInvest: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
  buttonTextSell: {
    fontSize: 20,
    color: '#000',
    textAlign: 'center',
  },
  stocksSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    marginTop: 20,
  },
  seeAll: {
    fontSize: 16,
    color: '#51CC62',
    marginTop: 20,
    fontWeight: 'bold',
  },
  stocksList: {
    flexDirection: 'row',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  stockItem: {
    marginRight: 16,
  },
  stockImage: {
    width: 100,
    height: 50,
    borderRadius: 50,
    marginBottom: 8,
  },
  stockImage1: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 8,
  },
  stockImage3: {
    width: 100,
    height: 80,
    borderRadius: 10,
    marginBottom: 8,
  },
  stockName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
    textAlign: 'center',
  },
  stockDescription: {
    fontSize: 14,
    color: '#666',
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
    backgroundColor: '#147603', 
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
    backgroundColor: 'green',
    borderRadius: 50,
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
