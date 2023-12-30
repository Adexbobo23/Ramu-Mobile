import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Modalize } from 'react-native-modalize';

const Discover = () => {
    const navigation = useNavigation();
    const [topTrendingStocks, setTopTrendingStocks] = useState([]);
    const [userToken, setUserToken] = useState('');
    const [stockData, setStockData] = useState([]);
    const [selectedPopularStock, setSelectedPopularStock] = useState(null);
    const modalRef = useRef(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [sectors, setSectors] = useState([]);


    useEffect(() => {
      // Fetch sectors data when the component mounts and user token is available
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
      // Store the selected stock in the state
      setSelectedPopularStock(stock);
      // Open the modal when a stock is selected
      modalRef.current?.open();
    };
    


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
      // Navigate to the AllStocks screen
      navigation.navigate('AllStock');
    };

    const navigateTo = (screen) => {
      navigation.navigate(screen);
    };

    const handleInvest = () => {
      // Logic for handling investment
      console.log('Invest button pressed');
      // Add your logic here
    };
    
    const handleSell = () => {
      // Logic for handling selling
      console.log('Sell button pressed');
      // Add your logic here
    };

    const filteredStocks = topTrendingStocks.filter((stock) =>
      stock.company_name.toLowerCase().includes(searchQuery.toLowerCase())
    );


    const handleSectorSelect = (sector) => {
      // Add your logic for handling sector selection
      console.log('Selected sector:', sector);
      // Add more actions as needed
    };


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
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.stocksList}>
          {filteredStocks.map((stock) => (
            <TouchableOpacity
              key={stock.ticker_id}
              style={styles.stockItem}
              onPress={() => handleStockSelect(stock)}
            >
              <Image source={require('../Assests/trade.jpg')} style={styles.stockImage1} />
              <Text style={styles.stockName}>{stock.company_name}</Text>
              <Text style={styles.stockDescription}>{stock.description}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

      </View>


      {/* Sectors Section */}
      <View style={styles.stocksSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Sectors</Text>
          <TouchableOpacity onPress={handleSeeAll}>
            <Text style={styles.seeAll} onPress={() => navigateTo('Sectors')}>See All</Text>
          </TouchableOpacity>
        </View>

        {/* Horizontal Scroll for Sectors List */}
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
              {/* You can customize the sector description as needed */}
              <Text style={styles.stockDescription}>{sector.description || 'No description available'}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Stocks Section */}
      <View style={styles.stocksSection}>
      <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>UK Stocks</Text>
            <TouchableOpacity onPress={handleSeeAll}>
            <Text style={styles.seeAll} onPress={() => navigateTo('UKStock')}>See All</Text>
            </TouchableOpacity>
      </View>

        {/* Horizontal Scroll for Stocks List */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.stocksList}>
          {filteredStocks.map((stock) => (
            <TouchableOpacity
              key={stock.ticker_id}
              style={styles.stockItem}
              onPress={() => handleStockSelect(stock)}
            >
              <Image source={require('../Assests/trade.jpg')} style={styles.stockImage1} />
              <Text style={styles.stockName}>{stock.company_name}</Text>
              <Text style={styles.stockDescription}>{stock.description}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

      </View>

      {/* Stocks Section */}
      <View style={styles.stocksSection}>
      <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>US Stocks</Text>
            <TouchableOpacity onPress={handleSeeAll}>
            <Text style={styles.seeAll} onPress={() => navigateTo('USStock')}>See All</Text>
            </TouchableOpacity>
        </View>

        {/* Horizontal Scroll for Stocks List */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.stocksList}>
          {filteredStocks.map((stock) => (
            <TouchableOpacity
              key={stock.ticker_id}
              style={styles.stockItem}
              onPress={() => handleStockSelect(stock)}
            >
              <Image source={require('../Assests/trade.jpg')} style={styles.stockImage1} />
              <Text style={styles.stockName}>{stock.company_name}</Text>
              <Text style={styles.stockDescription}>{stock.description}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView> 
      </View>

      {/* News Section */}
      <View style={styles.newsSection}>
      <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Stocks News</Text>
            <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
        </View>
        <Text style={styles.sectionTitle}>News</Text>

        {/* List of Stock News */}
        <ScrollView style={styles.newsList}>
          {/* Sample News Item (repeat this for each news) */}
          <View style={styles.newsItem}>
            <Image source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIMqIF9VPmuROuNlAIaZnIdZrgs-Y6GZ4fQLOXlKl9pbdTmf9DKM9B9EfsehuPpm6deWE&usqp=CAU' }} style={styles.newsImage} />
            <Text style={styles.newsTitle}>News Title</Text>
            <Text style={styles.stockDescription}>Stock Description</Text>
          </View>
           {/* Sample News Item (repeat this for each news) */}
           <View style={styles.newsItem}>
            <Image source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIMqIF9VPmuROuNlAIaZnIdZrgs-Y6GZ4fQLOXlKl9pbdTmf9DKM9B9EfsehuPpm6deWE&usqp=CAU' }} style={styles.newsImage} />
            <Text style={styles.newsTitle}>News Title</Text>
            <Text style={styles.stockDescription}>Stock Description</Text>
          </View>
          {/* Repeat... */}
        </ScrollView>
      </View>
    </ScrollView>


    <Modalize ref={modalRef}>
  {/* Content for the modal */}
  <View style={styles.modalContent}>
    {/* Display full details of the selected popular stock */}
    {selectedPopularStock && (
      <React.Fragment>
        <Text style={styles.modalTitle}>Stock Details</Text>
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
    color: '#333',
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
  },
  stockImage: {
    width: 100,
    height: 100,
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
  newsSection: {},
  newsList: {},
  newsItem: {
    marginBottom: 16,
  },
  newsImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
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
});

export default Discover;
