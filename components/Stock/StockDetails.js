import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const StockDetails = ({ route, stockData }) => {
  const { stockKey } = route.params;
  const [stockDetails, setStockDetails] = useState(null);

  useEffect(() => {
    console.log('stockData:', stockData);
    if (!stockData) {
      // Handle the case where stockData is not available yet
      console.log('stockData not available');
      return;
    }
  
    // Fetch stock details based on the stock key
    const stockDetail = stockData.find((stock) => stock.key === stockKey);
    console.log('stockDetail:', stockDetail);
    setStockDetails(stockDetail);
  }, [stockKey, stockData]);

  
  // If stock details are not loaded yet
  if (!stockDetails) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={require('../Assests/trade.jpg')} style={styles.stockImage} />
      <View style={styles.detailsContainer}>
        <Text style={styles.stockTitleText}>{stockDetails.company_name}</Text>
        <Text style={styles.stockDescriptionText}>{stockDetails.description}</Text>
        <View style={styles.stockRowContainer}>
          <Image source={require('../Assests/chart.png')} style={styles.chartImage} />
          <Text style={styles.stockPriceText}>{`$${stockDetails.trade_price.toFixed(2)}`}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stockImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 16,
  },
  detailsContainer: {
    flex: 1,
  },
  stockTitleText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  stockDescriptionText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
  stockRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chartImage: {
    width: 30,
    height: 30,
    marginRight: 8,
  },
  stockPriceText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default StockDetails;
