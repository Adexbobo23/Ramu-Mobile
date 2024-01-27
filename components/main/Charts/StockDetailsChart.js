import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
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

const StockDetailsChart = () => {
  const [stockDetailsData, setStockDetailsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user token from AsyncStorage
        const userToken = await AsyncStorage.getItem('userToken');

        // If user token is not found, log an error and stop loading
        if (!userToken) {
          console.error('User token not found.');
          setLoading(false);
          return;
        }

        // Define the API URL
        const apiUrl =
          'https://api-staging.ramufinance.com/api/v1/get-stock-graph?exchange_code=NSDQ&key=NSDQ~GOOG&range=7';

        // Make the API request with the user token
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        // Check if the API request was successful
        if (response.data.status) {
          // Process the stock data from the API response
          const stockData = response.data.data;
          const formattedData = formatStockData(stockData);
          setStockDetailsData(formattedData);
        } else {
          // Log an error if the API request was not successful
          console.error(
            'Error fetching stock graph data:',
            response.data.message
          );
        }
      } catch (error) {
        // Log an error if there is any issue with the API request
        console.error('Error fetching stock graph data:', error.message);
      } finally {
        // Set loading to false regardless of success or failure
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to format stock data for VictoryChart
  const formatStockData = (stockData) => {
    return stockData.map((dataPoint) => ({
      x: new Date(dataPoint.TRADE_TIME).toLocaleTimeString(),
      y: dataPoint.CLOSE,
    }));
  };

  // Function to render the VictoryChart component
  const renderChart = () => {
    if (loading) {
      // Display loading indicator while data is being fetched
      return <ActivityIndicator size="large" color="#51CC62" />;
    }

    // Render VictoryChart component with VictoryArea
    return (
      <VictoryChart
        theme={VictoryTheme.material}
        containerComponent={
          <VictoryVoronoiContainer
            labels={({ datum }) => `${datum.x}: ${datum.y}`}
            labelComponent={<VictoryTooltip />}
          />
        }
        width={stockDetailsData.length * 70}
      >
        <VictoryAxis />
        <VictoryAxis dependentAxis />
        <VictoryArea
          data={stockDetailsData}
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
    );
  };

  return (
    <ScrollView horizontal>
      <View style={styles.chartContainer}>{renderChart()}</View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StockDetailsChart;
