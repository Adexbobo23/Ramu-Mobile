import React, { useState, useEffect, useRef  } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, ActivityIndicator, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Modalize } from 'react-native-modalize';
// import WebView from 'react-native-webview';
import axios from 'axios';
import { MaterialIcons } from '@expo/vector-icons'; 
import StockChart from './Charts/StockChart';
import StockDetailsChart from './Charts/StockDetailsChart';


const Dashboard = () => {
  const navigation = useNavigation();
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [isKYCCompleted, setKYCCompleted] = useState(false);
  const [walletDetails, setWalletDetails] = useState(null);
  const switchAccountModalRef = React.useRef(null); 
  const chatModalRef = React.useRef(null); 
  const [isChatModalVisible, setChatModalVisible] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState('naira');
  const [stockData, setStockData] = useState([]);
  const [userToken, setUserToken] = useState('');
  const [topTrendingStocks, setTopTrendingStocks] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [selectedStockInModal, setSelectedStockInModal] = useState(null);
  const featuredStockModalRef = useRef(null);
  const topTrendingStockModalRef = useRef(null);
  const [selectedTopTrendingStock, setSelectedTopTrendingStock] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const chartData = [50, 45, 40, 30, 35, 45, 50, 55, 60];

  // Calculate the maximum value in the chart data
  const maxDataValue = Math.max(...chartData);
  

  useEffect(() => {
    fetchUserName();
  }, []);

  const fetchUserName = async () => {
    try {
      const storedUserName = await AsyncStorage.getItem('firstName');
      if (storedUserName) {
        setUserName(storedUserName);
      }
    } catch (error) {
      console.error('Error fetching userName from AsyncStorage:', error.message);
    }
  };

  const handleStockSelect = (stock) => {
    setSelectedStock(stock);
    featuredStockModalRef.current?.open();
  };

  const handleTrendingStockSelect = (stock) => {
    setSelectedTopTrendingStock(stock);
    topTrendingStockModalRef.current?.open();
  };
  
  

  useEffect(() => {
    // Fetch top trending stocks data when the component mounts and user token is available
    const fetchTopTrendingStocks = async () => {
      try {
        const response = await fetch('https://api-staging.ramufinance.com/api/v1/top-trending-stocks', {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        if (response.ok) {
          const result = await response.json();
          if (result.status) {
            setTopTrendingStocks(result.data);
          } else {
            console.error('Error fetching top trending stocks data:', result.message);
          }
        } else {
          console.error('Error fetching top trending stocks data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching top trending stocks data:', error.message);
      }
    };

    if (userToken) {
      fetchTopTrendingStocks();
    }
  }, [userToken]);


  useEffect(() => {
    // Fetch user token from AsyncStorage
    const fetchUserToken = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          setUserToken(token);
        }
      } catch (error) {
        console.error('Error fetching user token:', error.message);
      }
    };

    fetchUserToken();
  }, []);

  // useEffect(() => {
  //   // Fetch stock data when the component mounts and user token is available
  //   const fetchStockData = async () => {
  //     try {
  //       const response = await fetch('https://api-staging.ramufinance.com/api/v1/get-featured-stocks', {
  //         headers: {
  //           Authorization: `Bearer ${userToken}`,
  //         },
  //       });

  //       if (response.ok) {
  //         const result = await response.json();
  //         if (result.status) {
  //           // Set only the first 5 stocks
  //           setStockData(result.data.slice(0, 5));
  //         } else {
  //           console.error('Error fetching stock data:', result.message);
  //         }
  //       } else {
  //         console.error('Error fetching stock data:', response.statusText);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching stock data:', error.message);
  //     }
  //   };

  //   if (userToken) {
  //     fetchStockData();
  //   }
  // }, [userToken]);

  useEffect(() => {
    // Fetch stock data when the component mounts and user token is available
    const fetchStockData = async () => {
      try {
        const response = await fetch('https://api-staging.ramufinance.com/api/v1/get-featured-stocks', {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        if (response.ok) {
          const result = await response.json();
          if (result.status) {
            setStockData(result.data);
          } else {
            console.error('Error fetching stock data:', result.message);
          }
        } else {
          console.error('Error fetching stock data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching stock data:', error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (userToken) {
      fetchStockData();
    }
  }, [userToken]);

  const filteredStocks = stockData.filter(
    (stock) =>
      stock.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.description.toLowerCase().includes(searchQuery.toLowerCase())
  );


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
      setIsLoading(true); 

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

      setIsLoading(false); 
    } catch (error) {
      setIsLoading(false); 
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
    navigation.navigate('Portfolio');
    console.log('Sell button clicked');
  };

  const handleCashButton = () => {
    navigation.navigate('FundWallet');
    console.log('Sell button clicked');
  };

  const handleConvertButton = () => {
    navigation.navigate('ConvertFund');
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


const handlePressKyc = async () => {
  console.log('Complete your KYC clicked');

  try {
    // Save KYC status to AsyncStorage or make an API request
    await AsyncStorage.setItem('kycStatus', 'completed');
    setKYCCompleted(true);

    // Open the specified URL in the user's browser
    await Linking.openURL('https://ramufinance.com/kyc.html');
  } catch (error) {
    console.error('Error saving KYC status or opening URL:', error);
  }
};

const handleSeeAll = () => {
  // Navigate to the AllStocks screen
  navigation.navigate('AllStock');
};


const handleNotification = () => {
  navigation.navigate('Notification');
  console.log('Notification icon pressed');
};

const handleInvest = () => {
  console.log('Invest button pressed');
  navigation.navigate('StockInvest');
};

const handleSell = () => {
  console.log('Sell button pressed');
  navigation.navigate('Portfolio');
};

const navigateTo = (screen) => {
  navigation.navigate(screen);
};

const stockLogos = [
  require("../Assests/stocks/Apple.png"),
  require("../Assests/stocks/Alphabet.png"),
  require("../Assests/stocks/nvidia.png"),
  require("../Assests/stocks/Meta_Logo.jpg"),
  require("../Assests/stocks/oracle.png"),
  require("../Assests/stocks/hsbc.png"),
];
  return (
    <View style={styles.container}>
      <ScrollView>
      <View style={styles.container1}>
      <View style={styles.mainWelcome}>
      <Image source={require('../Assests/icon.png')} style={styles.comlogo} />
      <Text style={styles.welcomeText}>Hi, {userName || 'Guest'}</Text>
      {/* <Text>{walletDetails?.virtual_account_name}</Text> */}
      <TouchableOpacity style={styles.notificationIconContainer} onPress={handleSeeAll}>
        <Ionicons name="search" size={28} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.notificationIconContainer} onPress={handleNotification}>
        <Ionicons name="notifications-outline" size={28} color="black" />
      </TouchableOpacity>
    </View>
      <View style={styles.topBar}>
        <View style={styles.hideen}>
          <Text style={styles.acoountbalance}>Account Balance</Text>
          <TouchableOpacity onPress={toggleBalanceVisibility} style={styles.eyeIconContainer}>
              {balanceVisible ? (
                <Ionicons name="eye-off" size={24} color="white" />
              ) : (
                <Ionicons name="eye" size={24} color="white" />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.balanceContainer}>
            {renderSwitchAccountButton()}
            <TouchableOpacity onPress={toggleBalanceVisibility}>
              {isLoading ? ( 
                <ActivityIndicator size="small" color="white" />
              ) : (
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
              )}
            </TouchableOpacity>
            
          </View>
          <View style={styles.buttonsContainerCash}>
            <TouchableOpacity style={styles.buttonContainerNew} onPress={handleCashButton}>
              <Ionicons name="cash-outline" size={27} color="white" />
              <Text style={styles.buttonTextCash}>Add Cash</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainerNew1} onPress={handleConvertButton}>
              <Ionicons name="repeat" size={33} color="black" />
              <Text style={styles.buttonTextConvert}>Convert</Text>
            </TouchableOpacity>
          </View>

        </View>
        </View>

        <View style={styles.stockcontainer}>
          {/* Stocks Section */}
          <View style={styles.stocksSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Top Trending</Text>
              <TouchableOpacity onPress={handleSeeAll}>
                <Text style={styles.seeAll} onPress={() => navigateTo('Popular')}>
                  See All
                </Text>
              </TouchableOpacity>
            </View>

            {/* Horizontal Scroll for Top Trending Stocks List */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.stocksList}>
              {topTrendingStocks.map((stock, index) => (
                <TouchableOpacity
                  key={stock.ticker_id}
                  style={styles.stockItem}
                  onPress={() => handleTrendingStockSelect(stock)}
                >
                  <Image
                    source={stockLogos[index]}
                    style={styles.stockImage1}
                  />
                  <Text style={styles.stockName}>{stock.company_name}</Text>
                  <Text style={styles.stockDescription}>{stock.description}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
        <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.buttonContainer} onPress={handleInvestButton}>
              <Text style={styles.buttonTextInvest}>INVEST</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer1} onPress={handleSellButton}>
              <Text style={styles.buttonTextSell}>SELL</Text>
            </TouchableOpacity>
        </View>
        
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
          <TouchableOpacity>
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
        
        {/* Stock Chart */}
        {/* <View style={styles.lossChartContainer}>
            <StockChart />
        </View>  */}
        <View style={styles.featuredStockContainer1}>
          <Text style={styles.featuredStockText}>Featured Stocks</Text>
          <TouchableOpacity  onPress={handleSeeAll}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        {/* Stock Data */}
        {isLoading ? (
        <ActivityIndicator size="large" color="#51CC62" />
        ) : (
          <ScrollView style={styles.stockListContainer}>
            {filteredStocks.map((stock, index) => (
              <TouchableOpacity
                key={stock.ticker_id}
                style={styles.stockItemContainer}
                onPress={() => handleStockSelect(stock)}
              >
                <Image
                  source={stockLogos[index]}
                  style={styles.stockImage}
                />

                <View style={styles.stockDetailsContainer}>
                  <View style={styles.stockRowContainer1}>
                    <Text style={styles.stockTitleText}>{stock.company_name}</Text>
                    <Text style={styles.stockPriceText}>{`$${stock.trade_price.toFixed(2)}`}</Text>
                  </View>
                  <Text style={styles.stockDescriptionText}>{stock.description}</Text>
                </View>
              </TouchableOpacity>
            ))}
        </ScrollView>
        )}
        {/* <ScrollView style={styles.stockListContainer}>
          {stockData.map((stock) => (
            <TouchableOpacity
              key={stock.ticker_id}
              style={styles.stockItemContainer}
              onPress={() => handleStockSelect(stock)}
            >
              <Image
                source={{ uri: "https://assets.stickpng.com/images/580b57fcd9996e24bc43c516.png" }}
                style={styles.stockImage}
              />
              <View style={styles.stockDetailsContainer}>
                <View style={styles.stockRowContainer1}>
                  <Text style={styles.stockTitleText}>{stock.company_name}</Text>
                  <Text style={styles.stockPriceText}>{`$${stock.trade_price.toFixed(2)}`}</Text>
                </View>
                <Text style={styles.stockDescriptionText}>{stock.description}</Text>
                <View style={styles.stockRowContainer}>
                 
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView> */}
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

        <Modalize ref={featuredStockModalRef}>
        {/* Content for the modal */}
        <View style={styles.modalContent}>
          {selectedStock && (
            <React.Fragment>
              <Text style={styles.modalTitle}>Stock Details</Text>
              <StockDetailsChart />
              <Text style={styles.stockDetailText}>{`Company Name: ${selectedStock.company_name}`}</Text>
              <Text style={styles.stockDetailText}>{`Description: ${selectedStock.description}`}</Text>
              <Text style={styles.stockDetailText}>{`Trade Price: $${selectedStock.trade_price.toFixed(2)}`}</Text>
              {/* Add more details as needed */}

              {/* Buttons */}
              <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.investButton} onPress={handleInvest}>
                  <Text style={styles.buttonText}>Invest</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sellButton} onPress={handleSell}>
                  <Text style={styles.buttonText}>Sell</Text>
                </TouchableOpacity>
              </View>
            </React.Fragment>
          )}
        </View>
      </Modalize>

        <Modalize ref={topTrendingStockModalRef}>
          <View style={styles.modalContent}>
            {selectedTopTrendingStock && (
              <React.Fragment>
                <Text style={styles.modalTitle}>Stock Details</Text>
                <StockDetailsChart />
                <Text style={styles.stockDetailText}>{`Company Name: ${selectedTopTrendingStock.company_name}`}</Text>
                <Text style={styles.stockDetailText}>{`Description: ${selectedTopTrendingStock.description}`}</Text>
                <Text style={styles.stockDetailText}>{`Trade Price: $${selectedTopTrendingStock.trade_price.toFixed(2)}`}</Text>
              

                <View style={styles.buttonsContainer}>
                  <TouchableOpacity style={styles.investButton} onPress={handleInvest}>
                    <Text style={styles.buttonText}>Invest</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.sellButton} onPress={handleSell}>
                    <Text style={styles.buttonText}>Sell</Text>
                  </TouchableOpacity>
                </View>
              </React.Fragment>
            )}
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
    marginTop: -90
  },
  topBar: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    height: 200,
    backgroundColor: '#63E185',
    borderRadius: 30,
    marginTop: 20,
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
  hideen: {
    flexDirection: 'row'
  },
  eyeIconContainer: {
    marginLeft: 100,
    marginTop: 25,
  },
  acoountbalance: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 30,
    marginLeft: 20,
  },
  balanceText: {
    fontSize: 18,
    color: 'black',
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
    color: 'black',
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
  buttonsContainerCash: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 10,
    padding: 10,
    marginBottom: 20,
    marginTop: -90,
    marginRight: 65,
  },
  buttonContainerNew: {
    backgroundColor: '#00BB33',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '65%',
    height: 50,
    textAlign: 'center',
    marginTop: 80,
    marginLeft: 3,
    marginBottom: 20,
    elevation : 5,
    flexDirection: 'row',
  },
  buttonContainerNew1: {
    backgroundColor: 'white',
    flexDirection: 'row',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '65%',
    height: 50,
    textAlign: 'center',
    borderWidth: 2,
    borderColor: '#51CC62',
    marginTop: 80,
    marginLeft: 10,
    elevation : 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 10,
    padding: 10,
    marginBottom: 20,
    marginTop: -90,
  },
  iconStyle: {
    marginRight: 5,
  },
  buttonContainer: {
    backgroundColor: '#1FAE05',
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '35%',
    height: 50,
    textAlign: 'center',
    marginTop: -60,
    marginLeft: 40,
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
    width: '35%',
    height: 50,
    textAlign: 'center',
    borderWidth: 2,
    borderColor: '#51CC62',
    marginTop: -60,
    marginLeft: 20,
    marginRight: 20,
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
  buttonTextCash: {
    fontSize: 15,
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
    marginLeft: 5,
    marginTop: 4,
    marginRight: 10,
  },
  buttonTextConvert: {
    fontSize: 15,
    color: '#000',
    textAlign: 'center',
    fontWeight: 'bold',
    marginLeft: 5,
    marginTop: 6,
    marginRight: 10,
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
    marginBottom: 5,
    // backgroundColor: '#FFFFFF',
    // borderRadius: 10,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.2,
    // shadowRadius: 5,
    // elevation: 3,
    borderWidth: 0,
    borderColor: '#51CC62',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 16,
  },
  stockImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginBottom: 8,
  },
  stockImage1: {
    width: 60,
    height: 60,
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
    marginBottom: 10,
    marginTop: -80,
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
    marginTop: 30,
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
  stockRowContainer1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    height: 80,
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
  modalContent: {
    padding: 16,
    flexDirection: 'column',
    alignItems: 'center'
  },
  modalTitle: {
    fontSize: 38,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#51CC62'
  },
  stockDetailText: {
    fontSize: 20,
    marginBottom: 8,
    fontWeight: 'bold',
    color: '#333'
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  investButton: {
    flex: 1,
    backgroundColor: '#51CC62',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
    alignItems: 'center',
  },
  sellButton: {
    flex: 1,
    backgroundColor: '#FF6347',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  lossChartContainer: {
    marginTop: 20,
    flexDirection: 'row',
    marginLeft: 20,
  },
  yAxisLabelContainer: {
    alignItems: 'flex-end',
    paddingRight: 5,
    paddingTop: 5,
  },
  yAxisLabel: {
    fontSize: 12,
    color: '#888',
  },
  lineChartContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    flex: 1,
  },
  dataPoint: {
    width: 20,
    backgroundColor: '#51CC62',
  },
  xAxisLabelsContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  xAxisLabel: {
    flex: 1,
    fontSize: 12,
    textAlign: 'center',
    color: '#888',
  },
});

export default Dashboard;
