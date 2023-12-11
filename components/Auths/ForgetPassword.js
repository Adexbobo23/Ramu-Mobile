import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  const handleResetPassword = async () => {
    // Perform validation here
    if (!email) {
      alert('Please fill in all required fields');
      return;
    }
  
    try {
      // Send the resetData to the backend API
      const apiUrl = 'https://api-staging.ramufinance.com/api/v1/send-password-reset-otp';
      const response = await axios.post(apiUrl, { email });
  
      console.log('Password reset response:', response.data);
  
      if (response.status === 200) {
        if (response.data.status) {
          // Navigate to the OTP Confirmation page
          navigation.navigate('OtpConfirmation', { email });
        } else {
          alert('Failed to initiate password reset. Please try again.');
        }
      } else {
        // Check if the response has error details
        if (response.data && response.data.error) {
          alert(`Failed to initiate password reset. ${response.data.error}`);
        } else {
          alert(`Failed to initiate password reset. Server returned status ${response.status}`);
        }
      }
    } catch (error) {
      console.error('Error while initiating password reset:', error.message);
  
      // Check if the error has a response with error details
      if (error.response && error.response.data && error.response.data.error) {
        alert(`Failed to initiate password reset. ${error.response.data.error}`);
      } else {
        alert('Failed to initiate password reset. Please try again.');
      }
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Forgot Password?</Text>
      <Text style={styles.description}>We can help you get your password back</Text>
      <Text style={styles.description1}>just enter your email address</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email *</Text>
        <TextInput
          placeholder="Enter your email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          required
        />
      </View>
      <TouchableOpacity style={styles.resetButton} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#51CC62',
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    color: 'black',
    textAlign: 'center',
  },
  description1: {
    fontSize: 16,
    marginBottom: 30,
    color: 'black',
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
    color: '#51CC62',
  },
  input: {
    height: 60,
    borderWidth: 2,
    borderColor: '#51CC62',
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  resetButton: {
    backgroundColor: '#51CC62',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
    width: '100%',
    height: 52
  },
  buttonText: {
    fontSize: 22,
    fontWeight: 'normal',
    color: 'white',
    textAlign: 'center',
  },
});

export default ForgetPassword;
