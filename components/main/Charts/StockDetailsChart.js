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

const StockDetailsChart = () => {
  const [stockDetailsData, setStockDetailsData] = useState([
    { x: 'Jan', y: 100 },
    { x: 'Feb', y: 120 },
    { x: 'Mar', y: 90 },
    { x: 'Apr', y: 110 },
    { x: 'May', y: 130 },
    { x: 'Jun', y: 115 },
  ]);

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

export default StockDetailsChart;
