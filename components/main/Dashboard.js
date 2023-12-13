import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Modalize } from 'react-native-modalize';
// import WebView from 'react-native-webview';
import axios from 'axios';
import { MaterialIcons } from '@expo/vector-icons'; 


const Dashboard = () => {
  const navigation = useNavigation();
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [isKYCCompleted, setKYCCompleted] = useState(false);
  const [walletDetails, setWalletDetails] = useState(null);
  const switchAccountModalRef = React.useRef(null); 
  const chatModalRef = React.useRef(null); 
  const [isChatModalVisible, setChatModalVisible] = useState(false);
  // const [featuredStocks, setFeaturedStocks] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState('naira');
  const [stockData, setStockData] = useState([]);


  useEffect(() => {
    // Check KYC status from AsyncStorage or your API
    checkKYCStatus();
    // Fetch wallet details initially
    fetchWalletDetails(selectedAccount);
  }, [selectedAccount]);

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
          <Image source={require('../Assests/nigeria.png')} style={styles.countrylogo} />
        ) : (
          <Image source={require('../Assests/usa.png')} style={styles.countrylogo} />
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


const handleNotification = () => {
  console.log('Notification icon pressed');
};

const StockData = {
  status: true,
  message: 'Success',
  data: [
    {
      key: 'NSDQ~AAPL',
      ticker_id: 'AAPL',
      exchange_code: 'NSDQ',
      company_name: 'Apple Inc',
      display_name: 'Apple Inc',
      description: 'Technology company that designs, manufactures, and markets consumer electronics, computer software, and online services.',
      logo: null,
      trade_price: 189.91,
    },
    {
      key: 'NSDQ~GOOG',
      ticker_id: 'GOOG',
      exchange_code: 'NSDQ',
      company_name: 'Alphabet Inc Class C',
      display_name: 'Alphabet Inc Class C',
      description: 'Multinational conglomerate that is the parent company of Google.',
      logo: null,
      trade_price: 133.91,
    },
    {
      key: 'NSDQ~NVDA',
      ticker_id: 'NVDA',
      exchange_code: 'NSDQ',
      company_name: 'NVIDIA Corp',
      display_name: 'NVIDIA Corp',
      description: 'Technology company that designs GPUs for gaming and professional markets.',
      logo: null,
      trade_price: 467.7,
    },
    {
      key: 'NSDQ~META',
      ticker_id: 'META',
      exchange_code: 'NSDQ',
      company_name: 'Meta Platforms Inc',
      display_name: 'Meta Platforms Inc',
      description: 'Technology company that focuses on the development of social media and virtual reality platforms.',
      logo: null,
      trade_price: 327.15,
    },
    {
      key: 'NYSE~ORCL',
      ticker_id: 'ORCL',
      exchange_code: 'NYSE',
      company_name: 'Oracle Corp',
      display_name: 'Oracle Corp',
      description: 'Multinational computer technology corporation that sells database software and technology.',
      logo: null,
      trade_price: 116.12,
    },
    {
      key: 'LSE~HSBA',
      ticker_id: 'HSBA',
      exchange_code: 'LSE',
      company_name: 'HSBC Holdings plc',
      display_name: 'HSBC Holdings plc',
      description: 'British multinational investment bank and financial services holding company.',
      logo: null,
      trade_price: 602.1602,
    },
    {
      key: 'NSDQ~NFLX',
      ticker_id: 'NFLX',
      exchange_code: 'NSDQ',
      company_name: 'Netflix Inc',
      display_name: 'Netflix Inc',
      description: 'Entertainment company specializing in streaming media and video-on-demand online.',
      logo: null,
      trade_price: 589.91,
    },
    // Add more stock data as needed
  ],
};


  return (
    <View style={styles.container}>
      <ScrollView>
      <View style={styles.container1}>
      <View style={styles.mainWelcome}>
      <Image source={require('../Assests/icon.png')} style={styles.comlogo} />
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
                <TouchableOpacity onPress={handleSeeAll}>
                <Text style={styles.seeAll} onPress={() => navigateTo('Sectors')}>See All</Text>
                </TouchableOpacity>
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
                <Image source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDX0lzryMjrYOwRt4sT80B7U00fcxmQ-vO152amG-4cEHH4E_oLqukR37WFvyr06hchbg&usqp=CAU' }} style={styles.stockImage3} />
                <Text style={styles.stockName}>Facebook</Text>
                <Text style={styles.stockDescription}>Stock Description</Text>
              </View>
              {/* Sample Stock Item (repeat this for each stock) */}
              <View style={styles.stockItem}>
                <Image source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmvXQRuCtTuXhJjMBHFyx1heks159k1KqwQJZ_mCCmi9e4BRIQ2vMq6JlUEgs_QYW6EIw&usqp=CAU' }} style={styles.stockImage3} />
                <Text style={styles.stockName}>Netflix</Text>
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
          <Image source={require('../Assests/pana.png')} style={styles.getToKnowYouImage} />
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
           <Image source={require('../Assests/pana.png')} style={styles.getToKnowYouImage} />
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
        {/* Stock Data */}
        <ScrollView style={styles.stockListContainer}>
          {StockData.data.map((stock) => (
            <View key={stock.ticker_id} style={styles.stockItemContainer}>
              {/* Replace the following image with your logic for displaying the stock logo */}
              <Image source={require('../Assests/trade.jpg')} style={styles.stockImage} />
              <View style={styles.stockDetailsContainer}>
                <Text style={styles.stockTitleText}>{stock.company_name}</Text>
                <Text style={styles.stockDescriptionText}>{stock.description}</Text>
                <View style={styles.stockRowContainer}>
                  {/* Replace the following image with your logic for displaying the chart image */}
                  <Image source={require('../Assests/chart.png')} style={styles.chartImage} />
                  <Text style={styles.stockPriceText}>{`$${stock.trade_price.toFixed(2)}`}</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
        </View>
      </ScrollView>

        {/* Modalize for switching account */}
        <Modalize ref={switchAccountModalRef} adjustToContentHeight>
          <View style={styles.modalContainer}>
            <TouchableOpacity onPress={() => handleAccountSelection('naira')} style={styles.modalOptionContainer}>
              <Image source={require('../Assests/nigeria.png')} style={styles.countrylogo} />
              <Text style={styles.modalOption}>Switch to Naira Account</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleAccountSelection('dollar')} style={styles.modalOptionContainer}>
              <Image source={require('../Assests/usa.png')} style={styles.countrylogo} />
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
    height: 170,
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
    marginTop: 10, 
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
  switchAccountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
    marginTop: -30,
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
    marginBottom: 20,
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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    marginTop: 90,
  },
  seeAll: {
    fontSize: 16,
    color: '#51CC62',
    marginTop: 90,
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
  featuredStockText: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
  },
  seeAllText: {
    color: '#51CC62',
    fontSize: 18,
    fontWeight: 'normal',
  },
  stockListContainer: {
    flex: 1,
    padding: 16,
  },
  stockItemContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 10,
    borderColor: '#DDD',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },
  stockImage: {
    width: 50,
    height: 50,
    marginRight: 16,
  },
  stockDetailsContainer: {
    flex: 1,
  },
  stockTitleText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  stockDescriptionText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  stockRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chartImage: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  stockPriceText: {
    fontSize: 18,
    fontWeight: 'bold',
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
