import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ReportScam = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [userToken, setUserToken] = useState('');

  useEffect(() => {
    // Fetch user token when the component mounts
    fetchUserToken();
  }, []); // Empty dependency array, so it only runs once on mount

  const fetchUserToken = async () => {
    try {
      // Retrieve the user token from AsyncStorage
      const token = await AsyncStorage.getItem('userToken');

      // Set the userToken state
      setUserToken(token || ''); // Set to an empty string if token is null or undefined
    } catch (error) {
      console.error('Error fetching user token:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!userToken) {
        // Check if the user token is available
        console.error('User token not found');
        return;
      }
  
      const apiUrl = 'https://api-staging.ramufinance.com/api/v1/report-spam';
  
      // Make a POST request to the API with the Authorization header
      const response = await axios.post(apiUrl, {
        email,
        description,
      }, {
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
      });
  
      // Check if the report was successfully submitted
      if (response.data && response.data.status) {
        // Navigate to the success screen
        navigation.navigate('ReportScamSuccess');
        console.log('Report submitted successfully');
      } else {
        // Handle other status codes or errors
        Alert.alert('Failed to submit report', response.data?.message || 'Please try again.');
        console.error('Failed to submit report:', response.data);
      }
  
      // Reset the form fields after submission
      setEmail('');
      setDescription('');
    } catch (error) {
      console.error('Axios Error:', error);
  
      // Show a more detailed error message
      if (error.response) {
        Alert.alert('Error', error.response.data?.message || 'An error occurred. Please try again.');
        console.error('Error Response:', error.response.data);
      } else {
        Alert.alert('Error', 'An error occurred. Please try again.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Report Scam</Text>

        <View>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="example@example.com"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>

        {/* Info text for email */}
        <Text style={styles.infoText}>We will respond to you through this email.</Text>

        <View>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input1}
            placeholder=""
            multiline
            numberOfLines={4}
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
        </View>
        <Text style={styles.infoText}>Kindly enter a well-detailed explanation of the scam attempt.</Text>

        {/* Submit button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 60,
    textAlign: 'center',
    marginTop: 40,
  },
  input: {
    borderWidth: 1,
    borderColor: '#51CC62',
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
  },
  input1: {
    borderWidth: 1,
    borderColor: '#51CC62',
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
    height: 150,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  infoText: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
    marginBottom: 30,
  },
  submitButton: {
    backgroundColor: '#51CC62',
    padding: 12,
    borderRadius: 8,
    marginTop: 200,
    height: 52,
  },
  submitButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'normal',
    fontSiz: 22,
  },
});

export default ReportScam;
