import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import {
  VictoryChart,
  VictoryLine,
  VictoryArea,
  VictoryAxis,
  VictoryTheme,
  VictoryVoronoiContainer,
  VictoryScatter,
  VictoryTooltip,
  VictoryLabel,
} from 'victory-native';

const StockChart = () => {
  const [stockData, setStockData] = useState([
    { x: 1, y: 10 },
    { x: 2, y: 15 },
    { x: 3, y: 8 },
    { x: 4, y: 12 },
    { x: 5, y: 18 },
    { x: 6, y: 15 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newPoint = { x: stockData.length + 1, y: Math.floor(Math.random() * 30) + 10 };
      setStockData((prevData) => [...prevData, newPoint]);
    }, 1000);

    return () => clearInterval(interval);
  }, [stockData]);

  return (
    <ScrollView horizontal>
      <View style={styles.lossChartContainer}>
        <VictoryChart
          theme={VictoryTheme.material}
          containerComponent={
            <VictoryVoronoiContainer
              labels={({ datum }) => `${datum.x}: ${datum.y}`} // Customize the label
              labelComponent={<VictoryTooltip />} // Use VictoryTooltip for labels
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
          <VictoryLine
            data={stockData}
            style={{
              data: {
                stroke: '#51CC62',
                strokeWidth: 2,
              },
            }}
          />
          <VictoryScatter
            data={stockData}
            style={{
              data: {
                fill: '#51CC62',
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
