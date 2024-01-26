import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const PasswordReset = ({ route }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigation = useNavigation();
  const { email, otp } = route.params;

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevShowConfirmPassword) => !prevShowConfirmPassword);
  };

  const handlePasswordReset = async () => {
    if (password === '') {
      Alert.alert('Please enter a password');
      return;
    }

    if (confirmPassword === '') {
      Alert.alert('Please confirm your password');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match');
      return;
    }

    try {
      const apiUrl = 'https://api-staging.ramufinance.com/api/v1/reset-password';
      const response = await axios.post(apiUrl, {
        email,
        password,
        password_confirmation: confirmPassword,
        otp,
      });

      console.log('Password reset response:', response.data);

      if (response.data.status) {
        Alert.alert('Success', 'Password reset successfully.');
        navigation.navigate('PasswordResetSuccessful');
      } else {
        Alert.alert('Failed to reset password', response.data.message || 'Please try again.');
      }
    } catch (error) {
      console.error('Error while resetting password:', error);

      if (error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);

        if (error.response.status === 422) {
          Alert.alert('Failed to reset password', 'Invalid OTP. Please try again.');
        } else {
          Alert.alert('Failed to reset password', 'Please try again.');
        }
      } else if (error.request) {
        console.error('No response received');
        console.error('Request data:', error.request);
        Alert.alert('Failed to reset password', 'No response received. Please try again.');
      } else {
        console.error('Error setting up the request:', error.message);
        Alert.alert('Failed to reset password', 'An error occurred. Please try again.');
      }
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
