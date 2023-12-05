import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const Portfolio = () => {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState('Stock Portfolio');

  const handleTabPress = (tab) => {
    setSelectedTab(tab);
    // Add logic to fetch and display data based on the selected tab
  };

  const navigateToMore = () => {
    navigation.navigate('More');
  };

  const navigateToDashboard = () => {
    navigation.navigate('Dashboard');
  };

  const navigateToDiscover = () => {
    navigation.navigate('Discover');
  };

  const navigateToPortfolio = () => {
    navigation.navigate('Portfolio');
};

  const handleStockItemPress = (item) => {
    // Handle stock item press logic here
    console.log(`Stock item ${item.title} pressed!`);
    // You can navigate or perform any other action based on the pressed item
  };

  // Sample data for individual stocks
  const stockData = [
    {
      id: 1,
      title: 'Stock A',
      description: 'This is the description for Stock A.',
      image: require('./Assests/apple.png'),
      chartImage: require('./Assests/chart.png'),
      price: '₦100.00',
    },
    {
      id: 2,
      title: 'Stock B',
      description: 'This is the description for Stock B.',
      image: require('./Assests/stock.png'),
      chartImage: require('./Assests/chart.png'),
      price: '₦150.00',
    },
    // Add more stock data as needed
  ];

  const sectorStockData = [
    // Add data for sector stock portfolio
    // Example:
    {
      id: 3,
      title: 'Sector Stock C',
      description: 'This is the description for Sector Stock C.',
      image: require('./Assests/stock.png'),
      chartImage: require('./Assests/chart.png'),
      price: '₦200.00',
    },
  ];

  const renderStockItems = (data) => {
    return data.map((stock) => (
      <TouchableOpacity
        key={stock.id}
        style={styles.listItem}
        onPress={() => handleStockItemPress(stock)}
      >
        {/* Stock Image */}
        <Image source={stock.image} style={styles.listItemImage} />
        <View style={styles.listItemDetails}>
          <Text style={styles.listItemText}>{stock.title}</Text>
          <Text style={styles.listItemText}>{stock.description}</Text>
          <View style={styles.stockRow}>
            <Image source={stock.chartImage} style={styles.chartImage} />
            <Text style={styles.stockPrice}>{stock.price}</Text>
          </View>
        </View>
      </TouchableOpacity>
    ));
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Portfolio</Text>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          {['Stock Portfolio', 'Sector Stock Portfolio'].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, selectedTab === tab && styles.selectedTab]}
              onPress={() => handleTabPress(tab)}
            >
              <Text style={styles.tabText}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Render stock items based on the selected tab */}
        {selectedTab === 'Stock Portfolio' && renderStockItems(stockData)}
        {selectedTab === 'Sector Stock Portfolio' && renderStockItems(sectorStockData)}
      </ScrollView>

      {/* Navigation Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navBarItem} onPress={navigateToDashboard}>
          <Ionicons name="home" size={26} color="white" />
          <Text style={styles.navBarText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navBarItem} onPress={navigateToDiscover}>
          <Ionicons name="trending-up" size={26} color="white" />
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
    flexGrow: 1,
    backgroundColor: '#F4F4F4',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'left',
    marginTop: 30,
    color: '#51CC62'
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.1)'
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 0,
    borderColor: '#51CC62',
  },
  selectedTab: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  tabText: {
    color: '#000',
    fontWeight: 'bold',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 10,
  },
  listItemImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  listItemDetails: {
    flex: 1,
    marginLeft: 10,
  },
  listItemText: {
    fontSize: 14,
  },
  stockRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  chartImage: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  stockPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  navBar: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
