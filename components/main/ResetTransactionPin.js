import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ResetTransactionForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSendMessage = async () => {
    try {
      // Fetch user token from AsyncStorage
      const userToken = await AsyncStorage.getItem('userToken');

      if (!name || !email || !message) {
        Alert.alert('Error', 'Please fill in all fields.');
        return;
      }

      // Make the API call with authentication headers
      const response = await axios.post(
        'https://api-staging.ramufinance.com/api/v1/contact-us',
        {
          name,
          email,
          message,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      // Clear form fields after successful submission
      setName('');
      setEmail('');
      setMessage('');

      // Display a success message to the user
      Alert.alert('Success', 'Message sent successfully!');

      // Redirect to the dashboard (you should replace 'Dashboard' with your actual dashboard route)
      // navigation.navigate('Dashboard');
    } catch (error) {
      console.error('Error sending message:', error);

      // Handle errors and display an appropriate message to the user
      Alert.alert('Error', 'Failed to send message. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Your Transactions Pin</Text>
      <Text style={styles.description}>
        Please provide the necessary information below to reset your transactions pin.
      </Text>

      {/* Name Input */}
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      {/* Message Input */}
      <TextInput
        style={[styles.input, styles.messageInput]}
        placeholder="Your Message"
        multiline
        numberOfLines={4}
        value={message}
        onChangeText={(text) => setMessage(text)}
      />

      {/* Send Message Button */}
      <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
        <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' }}>
          Send Message
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#51CC62',
    marginTop: 50,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#777',
  },
  input: {
    height: 50,
    borderColor: '#51CC62',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#FFF',
  },
  messageInput: {
    height: 100,
  },
  sendButton: {
    backgroundColor: '#51CC62',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
});

export default ResetTransactionForm;
