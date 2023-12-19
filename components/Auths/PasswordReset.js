import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const PasswordReset = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigation = useNavigation();

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevShowConfirmPassword) => !prevShowConfirmPassword);
  };

  const handlePasswordReset = async () => {
    // Perform validation here
    if (password === '') {
      alert('Please enter a password');
      return;
    }

    if (confirmPassword === '') {
      alert('Please confirm your password');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      // Send the resetData to the backend API
      const apiUrl = 'https://api-staging.ramufinance.com/api/v1/reset-password';
      const response = await axios.post(apiUrl, { password });

      console.log('Password reset response:', response.data);

      // Check if the API request was successful
      if (response.data.status) {
        // Navigate to the PasswordResetSuccessful page
        navigation.navigate('PasswordResetSuccessful');
      } else {
        // Display an error message
        Alert.alert('Failed to reset password', 'Please try again.');
      }
    } catch (error) {
      console.error('Error while resetting password:', error);
    
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received');
        console.error('Request data:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error setting up the request:', error.message);
      }
    
      // Display a generic error message to the user
      Alert.alert('Failed to reset password', 'Please try again.');
    }
    
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Password Reset</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>New Password *</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="Create a password"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            required
          />
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconButton}>
            <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color="#51CC62" />
          </TouchableOpacity>
        </View>
        <Text style={styles.passwordRequirements}>
          At least 8 characters with uppercase letters, numbers, and special characters
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Confirm Password *</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="Confirm password"
            secureTextEntry={!showConfirmPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            required
          />
          <TouchableOpacity onPress={toggleConfirmPasswordVisibility} style={styles.iconButton}>
            <Ionicons name={showConfirmPassword ? 'eye-off' : 'eye'} size={24} color="#51CC62" />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.resetButton} onPress={handlePasswordReset}>
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
    marginBottom: 50,
    color: '#51CC62',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
    color: '#000',
  },
  input: {
    height: 50,
    borderWidth: 0,
    borderColor: '#51CC62',
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#51CC62',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  iconButton: {
    padding: 10,
  },
  passwordRequirements: {
    fontSize: 12,
    color: '#000',
  },
  resetButton: {
    backgroundColor: '#51CC62',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
    width: '100%',
    height: 52,
  },
  buttonText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});

export default PasswordReset;
