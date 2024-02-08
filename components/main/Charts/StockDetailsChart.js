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

const StockDetailsChart = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  // Demo stock data
  const stockDetailsData = [
    { x: '9:00 AM', y: 100 },
    { x: '9:30 AM', y: 105 },
    { x: '10:00 AM', y: 110 },
    { x: '10:30 AM', y: 115 },
    { x: '11:00 AM', y: 120 },
    { x: '11:30 AM', y: 125 },
    { x: '12:00 PM', y: 130 },
    { x: '12:30 PM', y: 135 },
    { x: '1:00 PM', y: 125 },
    { x: '1:30 PM', y: 120 },
    { x: '2:00 PM', y: 115 },
    { x: '2:30 PM', y: 110 },
    { x: '3:00 PM', y: 105 },
    { x: '3:30 PM', y: 100 },
    { x: '4:00 PM', y: 110 },
    { x: '4:30 PM', y: 105 },
    { x: '5:00 PM', y: 100 },
    { x: '5:30 PM', y: 95 },
    { x: '6:00 PM', y: 90 },
    { x: '6:30 PM', y: 85 },
    { x: '7:00 PM', y: 95 },
    { x: '7:30 PM', y: 90 },
    { x: '8:00 PM', y: 85 },
    { x: '8:30 PM', y: 90 },
    { x: '9:00 PM', y: 95 },
    { x: '9:30 PM', y: 100 },
    { x: '10:00 PM', y: 105 },
    { x: '10:30 PM', y: 110 },
    { x: '11:00 PM', y: 115 },
    { x: '11:30 PM', y: 120 },
    { x: '12:00 AM', y: 125 },
  ];

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
        width={stockDetailsData.length * 50} 
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
