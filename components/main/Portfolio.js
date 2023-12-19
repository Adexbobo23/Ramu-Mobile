import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Portfolio = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [totalBalance, setTotalBalance] = useState(0);
  const [stockData, setStockData] = useState([]);
  const navigation = useNavigation();

  // Sample stock data
  const sampleStockData = {
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
      // Add more stock data as needed
    ],
  };

  useEffect(() => {
    // Set the initial stock data
    setStockData(sampleStockData.data);
    // Calculate and set total balance
    const total = sampleStockData.data.reduce((acc, stock) => acc + stock.trade_price, 0);
    setTotalBalance(total);
  }, []);

  useEffect(() => {
    // Filter stock data based on search query
    const filteredStocks = sampleStockData.data.filter(
      (stock) =>
        stock.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stock.ticker_id.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setStockData(filteredStocks);
  }, [searchQuery]);

  const navigateTo = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      {/* Title for Total Balance */}
      <Text style={styles.PortTitle}>Portfolio</Text>

      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <Ionicons name="search" size={20} color="black" style={styles.searchIcon} />
        <TextInput
          style={styles.searchBar}
          placeholder="Search Stock"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
      </View>

      <View>
          {/* */}
      </View>
      {/* Account Balance */}
      <View style={styles.accountBalanceContainer}>
        <Text style={styles.totalBalanceText}>${totalBalance.toFixed(2)}</Text>
      </View>

      {/* Title for Total Balance */}
      <Text style={styles.totalBalanceTitle}>Total Balance</Text>

      {/* Stock Data */}
      <ScrollView style={styles.stockList}>
        {stockData.map((stock) => (
          <View key={stock.ticker_id} style={styles.stockItem}>
            {/* Replace the following image with your logic for displaying the stock logo */}
            <Image source={require('../Assests/trade.jpg')} style={styles.stockImage} />
            <View style={styles.stockDetails}>
              <Text style={styles.stockTitle}>{stock.company_name}</Text>
              <Text style={styles.stockDescription}>{stock.description}</Text>
              <View style={styles.stockRow}>
                {/* Replace the following image with your logic for displaying the chart image */}
                <Image source={require('../Assests/chart.png')} style={styles.chartImage} />
                <Text style={styles.stockPrice}>{`$${stock.trade_price.toFixed(2)}`}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Navigation bar */}
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navBarItem} onPress={() => navigateTo('Dashboard')}>
          <Ionicons name="home" size={26} color="white" />
          <Text style={styles.navBarText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navBarItem} onPress={() => navigateTo('Discover')}>
          <Ionicons name="search" size={26} color="white" />
          <Text style={styles.navBarText}>Discover</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navBarItem} onPress={() => navigateTo('Portfolio')}>
          <Ionicons name="briefcase" size={26} color="white" />
          <Text style={styles.navBarText}>Portfolio</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navBarItem} onPress={() => navigateTo('More')}>
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
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  PortTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#51CC62',
    marginTop: 40,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderColor: 'gray',
    borderWidth: 0,
    borderRadius: 10,
    backgroundColor: '#EFEEED',
    height: 50,
  },
  searchIcon: {
    marginRight: 10,
    marginLeft: 20,
  },
  searchBar: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 0,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  accountBalanceContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  totalBalanceText: {
    fontSize: 68,
    fontWeight: 'bold',
    color: '#51CC62',
  },
  totalBalanceTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    marginBottom: 30,
  },
  stockList: {
    flex: 1,
  },
  stockItem: {
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
});

export default Portfolio;
