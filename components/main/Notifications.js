import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      // Get userToken from AsyncStorage
      const userToken = await AsyncStorage.getItem('userToken');

      if (userToken) {
        const apiUrl = 'https://api-staging.ramufinance.com/api/v1/notifications';
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        if (response.data.status) {
          setNotifications(response.data.data);
        } else {
          Alert.alert('Failed to fetch notifications', response.data.message || 'Please try again.');
        }
      } else {
        Alert.alert('Failed to fetch notifications', 'User token not found.');
      }
    } catch (error) {
      console.error('Error while fetching notifications:', error);
      Alert.alert('Failed to fetch notifications', 'An error occurred. Please try again.');
    }
  };

  const markAsRead = async () => {
    try {
      // Get userToken from AsyncStorage
      const userToken = await AsyncStorage.getItem('userToken');

      if (userToken) {
        const apiUrl = 'https://api-staging.ramufinance.com/api/v1/mark-as-read';

        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        if (response.data.status) {
          setNotifications([]);
        } else {
          Alert.alert('Failed to mark notifications as read', response.data.message || 'Please try again.');
        }
      } else {
        Alert.alert('Failed to mark notifications as read', 'User token not found.');
      }
    } catch (error) {
      console.error('Error while marking notifications as read:', error);
      Alert.alert('Failed to mark notifications as read', 'An error occurred. Please try again.');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.notificationItem}>
      <Text style={styles.notificationText}>{item.data.message}</Text>
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

      {notifications.length > 0 && (
        <TouchableOpacity style={styles.markAsReadButton} onPress={markAsRead}>
          <Text style={styles.markAsReadButtonText}>Mark all as read</Text>
        </TouchableOpacity>
      )}
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
    height: 80,
  },
  notificationText: {
    flex: 1,
    marginRight: 8,
    color: '#000',
    fontSize: 17,
  },
  markAsReadButton: {
    backgroundColor: '#51CC62',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
    width: '100%',
    height: 52,
    alignItems: 'center',
  },
  markAsReadButtonText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Notification;
