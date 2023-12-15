import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AllStocks = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [stockData, setStockData] = useState([]);
  const [userToken, setUserToken] = useState('');

  const handleStockSelect = (stockKey) => {
    navigation.navigate('StockDetails', { stockKey, stockData });
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Stocks</Text>
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color="black" style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder="Search stocks below"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
      </View>
      <ScrollView style={styles.stockListContainer}>
        {filteredStocks.map((stock) => (
          <TouchableOpacity
            key={stock.ticker_id}
            style={styles.stockItemContainer}
            onPress={() => handleStockSelect(stock.key)}
          >
            <Image source={require('../Assests/trade.jpg')} style={styles.stockImage} />
            <View style={styles.stockDetailsContainer}>
              <Text style={styles.stockTitleText}>{stock.company_name}</Text>
              <Text style={styles.stockDescriptionText}>{stock.description}</Text>
              <View style={styles.stockRowContainer}>
              <Image source={require('../Assests/chart.png')} style={styles.chartImage} />
                <Text style={styles.stockPriceText}>{`$${stock.trade_price.toFixed(2)}`}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
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
    marginBottom: 16,
    marginTop: 70,
    color: '#51CC62'
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 0,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 20,
    height: 50,
    backgroundColor: '#EFEEED',
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
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
});

export default AllStocks;
