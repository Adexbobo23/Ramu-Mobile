import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Image, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Modalize } from 'react-native-modalize';
import StockDetailsChart from '../main/Charts/StockDetailsChart';

const SectorStock = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredStocks, setFeaturedStocks] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const modalRef = useRef(null);

  useEffect(() => {
    // Fetch featured stocks with user token
    fetchFeaturedStocks();
  }, []);

  const fetchFeaturedStocks = async () => {
    try {
      // Retrieve user token from AsyncStorage
      const userToken = await AsyncStorage.getItem('userToken');

      // Make API request with user token
      const response = await fetch('https://api-staging.ramufinance.com/api/v1/get-stocks-market', {
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
    } finally {
      setIsLoading(false);
    }
  };

  const handleStockSelect = (stock) => {
    // Store the selected stock in the state
    setSelectedStock(stock);
    // Open the modal when a stock is selected
    modalRef.current?.open();
  };

  const filteredStocks = featuredStocks.filter(
    (stock) =>
      stock.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Popular Sectors</Text>
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color="black" style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder="Search stocks below"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" color="#51CC62" />
      ) : (
        <ScrollView style={styles.stockList}>
          {filteredStocks.map((stock) => (
            <TouchableOpacity
              key={stock.ticker_id}
              style={styles.stockItem}
              onPress={() => handleStockSelect(stock)}
            >
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
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
      <Modalize ref={modalRef}>
        {/* Content for the modal */}
        <View style={styles.modalContent}>
          {selectedStock && (
            <React.Fragment>
              <Text style={styles.modalTitle}>Stock Details</Text>
              <StockDetailsChart />
              <Text style={styles.stockDetailText}>{`Company Name: ${selectedStock.company_name}`}</Text>
              <Text style={styles.stockDetailText}>{`Description: ${selectedStock.description}`}</Text>
              <Text style={styles.stockDetailText}>{`Trade Price: ₦${selectedStock.trade_price}`}</Text>
              {/* Add more details as needed */}
            </React.Fragment>
          )}
        </View>
      </Modalize>
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
    color: '#51CC62',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 60,
    height: 50,
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
  modalContent: {
    padding: 16,
    flexDirection: 'column',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 38,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#51CC62',
  },
  stockDetailText: {
    fontSize: 19,
    marginBottom: 8,
  },
});

export default SectorStock;
