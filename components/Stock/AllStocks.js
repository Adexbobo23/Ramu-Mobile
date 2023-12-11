import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AllStocks = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredStocks, setFeaturedStocks] = useState([]);
  const [stockData, setStockData] = useState([]);

  
  useEffect(() => {
    // Assuming you fetch or set featured stocks in useEffect
    // For now, we'll just set it to an empty array
    setFeaturedStocks([]);
  }, []);

  const filteredStocks = stockData.filter(
    (stock) =>
      stock.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    // Update stockData when the component mounts or when featuredStocks change
    setStockData(featuredStocks);
  }, [featuredStocks]);

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
