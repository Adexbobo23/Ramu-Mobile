import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

const StocksExchange = () => {
  const [userToken, setUserToken] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [exchanges, setExchanges] = useState([]);

  useEffect(() => {
    // Fetch user token from AsyncStorage
    const fetchUserToken = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token !== null) {
          setUserToken(token);
          fetchStockExchanges(token);
        }
      } catch (error) {
        console.error('Error fetching user token:', error);
      }
    };

    fetchUserToken();
  }, []);

  const fetchStockExchanges = async (token) => {
    try {
      const response = await axios.get('https://api-staging.ramufinance.com/api/v1/get-stock-exchanges', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.status) {
        setExchanges(response.data.data);
      } else {
        console.error('Failed to fetch stock exchanges:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching stock exchanges:', error.message);
    }
  };

  const filteredExchanges = exchanges.filter(
    (exchange) =>
      exchange.exchange_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exchange.exchange_code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Stock Exchanges</Text>
      <View style={styles.searchBar}>
      <Ionicons name="search" size={20} color="black" style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder="Search exchanges"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
      </View>
      <FlatList
        data={filteredExchanges}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.exchangeItem}>
            <Text style={styles.exchangeName}>{item.exchange_name}</Text>
            <Text style={styles.exchangeDescription}>{item.description}</Text>
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
    borderColor: '#51CC62',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    height: 50
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  input: {
    flex: 1,
  },
  exchangeItem: {
    marginBottom: 16,
  },
  exchangeName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  exchangeDescription: {
    color: '#555',
  },
});

export default StocksExchange;
