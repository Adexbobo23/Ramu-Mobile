import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Portfolio = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [totalBalance, setTotalBalance] = useState(0);
  const [selectedTab, setSelectedTab] = useState('All');
  const [stockData, setStockData] = useState([]);

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

  const handleTabPress = (tab) => {
    setSelectedTab(tab);
    // Implement logic to filter stock data based on the selected tab
    // For now, let's assume 'All' tab shows all stocks
    if (tab === 'All') {
      setStockData(sampleStockData.data);
    } else {
      // Implement logic to filter stocks based on the selected tab
      // For example, filter by currency or exchange
      // Modify this logic according to your requirements
      const filteredStocks = sampleStockData.data.filter((stock) => stock.exchange_code === tab);
      setStockData(filteredStocks);
    }
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

      {/* Account Balance */}
      <View style={styles.accountBalanceContainer}>
        <Text style={styles.totalBalanceText}>${totalBalance.toFixed(2)}</Text>
      </View>

      {/* Title for Total Balance */}
      <Text style={styles.totalBalanceTitle}>Total Balance</Text>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'All' && styles.selectedTab]}
          onPress={() => handleTabPress('All')}
        >
          <Text style={styles.tabText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'New' && styles.selectedTab]}
          onPress={() => handleTabPress('New')}
        >
          <Text style={styles.tabText}>New</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'Old' && styles.selectedTab]}
          onPress={() => handleTabPress('Old')}
        >
          <Text style={styles.tabText}>Old</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'Overview' && styles.selectedTab]}
          onPress={() => handleTabPress('Overview')}
        >
          <Text style={styles.tabText}>Overview</Text>
        </TouchableOpacity>
      </View>

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
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 25,
  },
  selectedTab: {
    backgroundColor: '#51CC62',
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
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
});

export default Portfolio;
