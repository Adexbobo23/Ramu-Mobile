import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const StockMarket = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to fetch userToken from AsyncStorage
    const getUserToken = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken');
        if (userToken) {
          // Call the function to fetch stocks data with the userToken
          fetchStocks(userToken);
        } else {
          console.log('User token not found');
        }
      } catch (error) {
        console.error('Error fetching userToken from AsyncStorage:', error);
      }
    };

    getUserToken();

  }, []);

  const fetchStocks = async (userToken) => {
    try {
      const response = await axios.get(
        'https://api-staging.ramufinance.com/api/v1/get-stocks-market?exchange=NYSE',
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      setStocks(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching stocks:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Stock Market Data:</Text>
      <FlatList
        data={stocks}
        keyExtractor={(item) => item.symbol}
        renderItem={({ item }) => (
          <View style={styles.stockItem}>
            <Text>{`Symbol: ${item.symbol}, Price: ${item.price}`}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFF', 
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#51CC62',
    marginTop: 40,
  },
  loadingText: {
    fontSize: 18,
    color: '#51CC62',
    marginTop: 40, 
  },
  stockItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#51CC62',
    paddingVertical: 10,
  },
});

export default StockMarket;
