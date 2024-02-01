import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, ScrollView, Image, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Modalize } from 'react-native-modalize';
import StockDetailsChart from './Charts/StockDetailsChart';

const Discover = () => {
  const navigation = useNavigation();
  const [topTrendingStocks, setTopTrendingStocks] = useState([]);
  const [userToken, setUserToken] = useState('');
  const [stockData, setStockData] = useState([]);
  const [selectedPopularStock, setSelectedPopularStock] = useState(null);
  const modalRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sectors, setSectors] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [usStocks, setUsStocks] = useState([]);
  const [ukStocks, setUkStocks] = useState([]);
  const [loadingPopularStocks, setLoadingPopularStocks] = useState(false);
  const [loadingSectors, setLoadingSectors] = useState(false);
  const [loadingUkStocks, setLoadingUkStocks] = useState(false);
  const [loadingUsStocks, setLoadingUsStocks] = useState(false);
  const [loadingBlogs, setLoadingBlogs] = useState(false);
  const [selectedSector, setSelectedSector] = useState(null);

  const handleSectorSelect = (sector) => {
    setSelectedSector(sector);
  };
  

  useEffect(() => {
    fetchUsStocks();
    fetchUkStocks();
  }, [userToken]);

  const fetchUsStocks = async () => {
    try {
      setLoadingUsStocks(true);
      const response = await axios.get(
        'https://api-staging.ramufinance.com/api/v1/get-stocks-market?exchange_code=NSDQ',
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      if (response.data.status) {
        setUsStocks(response.data.data);
      } else {
        console.error('Error fetching US stocks data:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching US stocks data:', error.message);
    } finally {
      setLoadingUsStocks(false);
    }
  };

  const fetchUkStocks = async () => {
    try {
      setLoadingUkStocks(true);
      const response = await axios.get(
        'https://api-staging.ramufinance.com/api/v1/get-stocks-market?exchange_code=LSE',
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      if (response.data.status) {
        setUkStocks(response.data.data);
      } else {
        console.error('Error fetching UK stocks data:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching UK stocks data:', error.message);
    } finally {
      setLoadingUkStocks(false);
    }
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoadingBlogs(true);
        const userToken = await AsyncStorage.getItem('userToken');

        if (!userToken) {
          console.error('User token not available.');
          return;
        }

        const response = await axios.get('https://api-staging.ramufinance.com/api/v1/blog-posts', {
          headers: { Authorization: `Bearer ${userToken}` },
        });

        if (response.data.status) {
          setBlogs(response.data.data.slice(0, 5));
        } else {
          console.error('Error fetching blogs:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoadingBlogs(false);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    const fetchSectors = async () => {
      try {
        const response = await axios.get('https://api-staging.ramufinance.com/api/v1/get-sectors', {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        if (response.data.status) {
          setSectors(response.data.data);
        } else {
          console.error('Error fetching sectors data:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching sectors data:', error.message);
      }
    };

    if (userToken) {
      fetchSectors();
    }
  }, [userToken]);

  const handleStockSelect = (stock) => {
    setSelectedPopularStock(stock);
    modalRef.current?.open();
  };

  useEffect(() => {
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

  useEffect(() => {
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

  const handleSeeAll = () => {
    navigation.navigate('AllStock');
  };

  const navigateTo = (screen) => {
    navigation.navigate(screen);
  };

  const navigateToBlogs = () => {
    navigation.navigate('Blogs');
  };

  const handleInvest = () => {
    console.log('Invest button pressed');
    navigation.navigate('StockInvest');
  };

  const handleSell = () => {
    console.log('Sell button pressed');
    navigation.navigate('Portfolio');
  };

  const filteredStocks = topTrendingStocks.filter((stock) =>
    stock.company_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stockLogos = [
    require("../Assests/stocks/Apple.png"),
    require("../Assests/stocks/Alphabet.png"),
    require("../Assests/stocks/nvidia.png"),
    require("../Assests/stocks/Meta_Logo.jpg"),
    require("../Assests/stocks/oracle.png"),
    require("../Assests/stocks/hsbc.png"),
  ];

  const stockUk = [
    require("../Assests/stocks/hsbc.png"),
  ];

  const stockUS = [
    require("../Assests/stocks/Apple.png"),
    require("../Assests/stocks/Alphabet.png"),
    require("../Assests/stocks/nvidia.png"),
    require("../Assests/stocks/Meta_Logo.jpg"),
  ];
  return (
    <>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Discover</Text>
  
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={24} color="#333" style={styles.searchIcon} />
          <TextInput
            placeholder="Search stock"
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
        </View>
  
        {/* Stocks Section */}
      <View style={styles.stocksSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular this week</Text>
          <TouchableOpacity onPress={handleSeeAll}>
            <Text style={styles.seeAll} onPress={() => navigateTo('Popular')}>
              See All
            </Text>
          </TouchableOpacity>
        </View>

        {/* Horizontal Scroll for Stocks List */}
        {loadingPopularStocks ? (
          <ActivityIndicator size="large" color="#51CC62" />
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.stocksList}>
            {filteredStocks.map((stock, index) => (
              <TouchableOpacity
                key={stock.ticker_id}
                style={styles.stockItem}
                onPress={() => handleStockSelect(stock)}
              >
                <Image source={stockLogos[index]} style={styles.stockImage1} />
                <Text style={styles.stockName}>{stock.company_name}</Text>
                <Text style={styles.stockDescription}>{stock.description}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>
  
      {/* Sectors Section */}
      <View style={styles.stocksSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Sectors</Text>
          <TouchableOpacity onPress={handleSeeAll}>
            <Text style={styles.seeAll} onPress={() => navigateTo('Sectors')}>
              See All
            </Text>
          </TouchableOpacity>
        </View>

        {/* Horizontal Scroll for Sectors List */}
        {loadingSectors ? (
          <ActivityIndicator size="large" color="#51CC62" />
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.stocksList}>
            {sectors.map((sector) => (
              <TouchableOpacity
                key={sector.id}
                style={styles.stockItem}
                onPress={() => handleSectorSelect(sector)}
              >
                {/* Use an appropriate image for the sector */}
                <Image source={require('../Assests/sector.jpg')} style={styles.stockImage3} />
                <Text style={styles.stockName}>{sector.name}</Text>
                <Text style={styles.stockDescription}>{sector.description || 'No description available'}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>


        {/* UK Stocks Section */}
        <View style={styles.stocksSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>UK Stocks</Text>
            <TouchableOpacity onPress={handleSeeAll}>
              <Text style={styles.seeAll} onPress={() => navigateTo('UKStock')}>
                See All
              </Text>
            </TouchableOpacity>
          </View>
  
          {/* Horizontal Scroll for UK Stocks List */}
          {loadingUkStocks ? (
            <ActivityIndicator size="large" color="#51CC62" />
          ) : (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.stocksList}>
              {ukStocks.map((stock, index) => (
                <TouchableOpacity
                  key={stock.ticker_id}
                  style={styles.stockItem}
                  onPress={() => handleStockSelect(stock)}
                >
                  <Image source={stockUk[index]} style={styles.stockImage1} />
                  <Text style={styles.stockName}>{stock.company_name}</Text>
                  <Text style={styles.stockDescription}>{stock.description}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>
  
        {/* US Stocks Section */}
        <View style={styles.stocksSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>US Stocks</Text>
            <TouchableOpacity onPress={handleSeeAll}>
              <Text style={styles.seeAll} onPress={() => navigateTo('USStock')}>
                See All
              </Text>
            </TouchableOpacity>
          </View>
  
          {/* Horizontal Scroll for US Stocks List */}
          {loadingUsStocks ? (
            <ActivityIndicator size="large" color="#51CC62" />
          ) : (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.stocksList}>
              {usStocks.map((stock, index) => (
                <TouchableOpacity
                  key={stock.ticker_id}
                  style={styles.stockItem}
                  onPress={() => handleStockSelect(stock)}
                >
                  <Image source={stockUS[index]} style={styles.stockImage1} />
                  <Text style={styles.stockName}>{stock.company_name}</Text>
                  <Text style={styles.stockDescription}>{stock.description}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>
  
        {/* Blogs Section */}
        <View style={styles.stocksSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Blogs</Text>
            <TouchableOpacity onPress={handleSeeAll}>
              <Text style={styles.seeAll} onPress={() => navigateTo('Blogs')}>
                See All
              </Text>
            </TouchableOpacity>
          </View>
  
          {/* Horizontal Scroll for Blogs List */}
          {loadingBlogs ? (
            <ActivityIndicator size="large" color="#51CC62" />
          ) : (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.stocksList}>
              {blogs.map((blog) => (
                <TouchableOpacity
                  key={blog.id}
                  style={styles.newsItem}
                  onPress={navigateToBlogs}
                >
                  <Image source={{ uri: blog.thumbnail_image }} style={styles.newsImage} />
                  <Text style={styles.newsTitle}>{blog.title}</Text>
                  <Text style={styles.stockDescription}>{blog.writer_info.user_name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>
      </ScrollView>
  
      <Modalize ref={modalRef}>
        {/* Content for the modal */}
        <View style={styles.modalContent}>
          {selectedPopularStock ? (
            <React.Fragment>
              <Text style={styles.modalTitle}>Stock Details</Text>
              <StockDetailsChart />
              <Text style={styles.stockDetailText}>{`Company Name: ${selectedPopularStock.company_name}`}</Text>
              <Text style={styles.stockDetailText}>{`Description: ${selectedPopularStock.description}`}</Text>
              <Text style={styles.stockDetailText}>{`Trade Price: $${selectedPopularStock.trade_price.toFixed(2)}`}</Text>
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
          ) : (
            <ActivityIndicator size="large" color="#51CC62" />
          )}
        </View>
      </Modalize>

      {/* Render a modal if a sector is selected */}
      {selectedSector && (
        <Modalize ref={modalRef}>
          {/* Content for the modal */}
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedSector.name} Stocks</Text>
            {/* Display stocks related to the selected sector */}
            {filteredStocks.map((stock) => {
              if (stock.sector && stock.sector.id === selectedSector.id) {
                return (
                  <View key={stock.ticker_id} style={styles.relatedStockItem}>
                    <Text style={styles.relatedStockName}>{stock.company_name}</Text>
                    <Text style={styles.relatedStockDescription}>{stock.description}</Text>
                  </View>
                );
              }
              return null;
            })}
          </View>
        </Modalize>
      )}
  
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
    </>
  );
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#51CC62',
    marginTop: 50
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: '#666',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  stocksSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#51CC62',
  },
  seeAll: {
    fontSize: 16,
    color: '#51CC62',
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
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    borderWidth: 0,
    borderColor: '#51CC62',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 16,
  },
  
  stockImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
  },
  stockImage1: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginBottom: 8,
  },
  stockImage3: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 8,
  },
  stockName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  stockDescription: {
    fontSize: 14,
    color: '#666',
  },
  newsList: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  newsItem: {
    marginRight: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    width: 200, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 100
  },
  newsImage: {
    width: '100%',
    height: 100, 
    borderRadius: 8,
    marginBottom: 8,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  stockDescription: {
    fontSize: 14,
    color: '#666',
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
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
  fontSize: 19,
  marginBottom: 8,
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
relatedStockItem: {
  marginTop: 8,
  backgroundColor: '#f0f0f0',
  padding: 8,
  borderRadius: 8,
},
relatedStockName: {
  fontSize: 14,
  fontWeight: 'bold',
  marginBottom: 4,
  color: '#333',
},
relatedStockDescription: {
  fontSize: 12,
  color: '#666',
},
});

export default Discover;