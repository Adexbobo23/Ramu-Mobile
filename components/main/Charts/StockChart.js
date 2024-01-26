import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator, Text } from 'react-native';
import {
  VictoryChart,
  VictoryArea,
  VictoryAxis,
  VictoryTheme,
  VictoryVoronoiContainer,
  VictoryTooltip,
} from 'victory-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StockChart = () => {
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        // Fetch user token from AsyncStorage
        const userToken = await AsyncStorage.getItem('userToken');
        
        if (!userToken) {
          console.error('User token not found.');
          setLoading(false);
          return;
        }

        // Replace the URL with the actual API endpoint
        const apiUrl = 'https://api-staging.ramufinance.com/api/v1/get-stock-graph?exchange_code=NSDQ&key=NSDQ~AAPL&range=1';

        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        if (response.data.status) {
          // Assuming the response data is an array of stock points
          setStockData(response.data.data);
        } else {
          console.error('Error fetching stock data:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching stock data:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStockData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#51CC62" />
      </View>
    );
  }

  return (
    <ScrollView horizontal>
      <View style={styles.lossChartContainer}>
        {stockData.length === 0 ? (
          <Text>No stock data available</Text>
        ) : (
          <VictoryChart
            theme={VictoryTheme.material}
            containerComponent={
              <VictoryVoronoiContainer
                labels={({ datum }) => `${datum.x}: ${datum.y}`} 
                labelComponent={<VictoryTooltip />}
              />
            }
            width={stockData.length * 50}
          >
            <VictoryAxis
              tickValues={[1, 7, 30, 90, 365]}
              tickFormat={(tick) => {
                switch (tick) {
                  case 1:
                    return '1D';
                  case 7:
                    return '1W';
                  case 30:
                    return '1M';
                  case 90:
                    return '3M';
                  case 365:
                    return '1Y';
                  default:
                    return tick;
                }
              }}
            />
            <VictoryAxis dependentAxis />
            <VictoryArea
              data={stockData}
              style={{
                data: {
                  fill: '#51CC62',
                  fillOpacity: 0.3,
                  stroke: '#51CC62',
                  strokeWidth: 2,
                },
              }}
            />
          </VictoryChart>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  lossChartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StockChart;
