import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  VictoryChart,
  VictoryArea,
  VictoryAxis,
  VictoryTheme,
  VictoryVoronoiContainer,
  VictoryTooltip,
} from 'victory-native';

const StockChart = () => {
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user token from AsyncStorage
        const userToken = await AsyncStorage.getItem('userToken');

        // If user token is not available, handle accordingly (e.g., redirect to login)
        if (!userToken) {
          console.error('User token not found. Redirect to login or handle authentication.');
          return;
        }

        const exchangeCode = 'NSDQ';
        const symbol = 'GOOG';
        const range = 7;

        const apiUrl = `https://api-staging.ramufinance.com/api/v1/get-stock-graph?exchange_code=${exchangeCode}&key=${exchangeCode}~${symbol}&range=${range}`;
        const response = await fetch(apiUrl, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`,
          },
        });

        if (response.ok) {
          const result = await response.json();
          const stockChartData = result.data.map(item => ({
            x: new Date(item.TRADE_TIME).toLocaleTimeString(),
            y: item.CLOSE,
          }));
          setStockData(stockChartData);
        } else {
          console.error('Error fetching stock graph data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching stock graph data:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#51CC62" />;
  }

  return (
    <ScrollView horizontal>
      <View style={styles.lossChartContainer}>
        <VictoryChart
          theme={VictoryTheme.material}
          containerComponent={
            <VictoryVoronoiContainer
              labels={({ datum }) => `${datum.x}: ${datum.y}`}
              labelComponent={<VictoryTooltip />}
            />
          }
          width={200}
        >
          <VictoryAxis
            tickFormat={(x) => new Date(x).toLocaleTimeString()}
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
});

export default StockChart;
