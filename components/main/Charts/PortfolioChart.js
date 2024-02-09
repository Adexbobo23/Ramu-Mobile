import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
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

const PortfolioChart = () => {
  const [stockDetailsData, setStockDetailsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken');

        if (!userToken) {
          console.error('User token not found.');
          return;
        }

        const apiUrl = 'https://api-staging.ramufinance.com/api/v1/get-portfolio-graph';

        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        if (response.data.status) {
          const portfolioData = response.data.data;
          const formattedData = Object.keys(portfolioData).map((key) => ({
            x: key,
            y: portfolioData[key].value,
          }));
          setStockDetailsData(formattedData);
        } else {
          console.error('Error fetching portfolio graph data:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching portfolio graph data:', error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <ScrollView horizontal>
      <View style={styles.chartContainer}>
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
      </View>
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

export default PortfolioChart;
