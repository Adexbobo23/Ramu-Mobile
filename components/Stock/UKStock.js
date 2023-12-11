import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UKStock = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredStocks, setFeaturedStocks] = useState([]);

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

  const filteredStocks = featuredStocks.filter(
    (stock) =>
      stock.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>UK Stocks</Text>
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color="black" style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder="Search stocks below"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
      </View>
      <ScrollView style={styles.stockList}>
        {filteredStocks.map((stock) => (
          <View key={stock.ticker_id} style={styles.stockItem}>
            {/* Replace the following image with your logic for displaying the stock logo */}
            <Image source={require('../Assests/stock.png')} style={styles.stockImage} />
            <View style={styles.stockDetails}>
              <Text style={styles.stockTitle}>{stock.company_name}</Text>
              <Text style={styles.stockDescription}>{stock.description}</Text>
              <View style={styles.stockRow}>
                {/* Replace the following image with your logic for displaying the chart image */}
                <Image source={require('../Assests/chart.png')} style={styles.chartImage} />
                <Text style={styles.stockPrice}>{`₦${stock.trade_price}`}</Text>
              </View>
            </View>
          </View>
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
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 60,
    height: 50
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
  },
  stockList: {
    flex: 1,
  },
  stockItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  stockImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  stockDetails: {
    flex: 1,
  },
  stockTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  stockDescription: {
    color: '#555',
    marginBottom: 8,
  },
  stockRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chartImage: {
    width: 30,
    height: 30,
    marginRight: 8,
  },
  stockPrice: {
    fontSize: 16,
    color: '#51CC62',
  },
});

export default UKStock;
