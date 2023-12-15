import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const Notification = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: 'You just invested in a stock.',
    },
    {
        id: 2,
        message: 'You just sell a stock.',
    },
    {
        id: 3,
        message: 'A new stock was added to your portfolio.',
    },
  ]);

  const clearNotification = (id) => {
    setNotifications((prevNotifications) => prevNotifications.filter((notif) => notif.id !== id));
  };

  const renderItem = ({ item }) => (
    <View style={styles.notificationItem}>
      <Text style={styles.notificationText}>{item.message}</Text>
      <Text style={styles.clearButton} onPress={() => clearNotification(item.id)}>
        Clear
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Notifications</Text>
      {/* List of Notifications */}
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        style={styles.notificationList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#51CC62',
    marginTop: 30,
  },
  notificationList: {
    flex: 1,
  },
  notificationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF', 
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    elevation: 2,
    height: 60,
  },
  notificationText: {
    flex: 1,
    marginRight: 8,
    color: '#000',
    fontSize: 17,
  },
  clearButton: {
    color: 'red',
    fontWeight: 'bold',
  },
});

export default Notification;
