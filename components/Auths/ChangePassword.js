import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const ChangePassword = () => {
  const navigation = useNavigation();
  const [previousPassword, setPreviousPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChangePassword = async () => {
    try {
      const user_id = await AsyncStorage.getItem('userId');
      const userToken = await AsyncStorage.getItem('userToken');
  
      if (!user_id || !userToken) {
        console.error('User ID or token not found in AsyncStorage');
        return;
      }
  
      // Check if new password matches the confirmation
      if (newPassword !== confirmPassword) {
        Alert.alert('Error', 'New password and confirmation do not match.');
        return;
      }
  
      const apiUrl = 'https://api-staging.ramufinance.com/api/v1/change-password';
  
      const requestData = {
        // Change the key from 'old_password' to 'current_password'
        current_password: previousPassword,
        new_password: newPassword,
        new_password_confirmation: confirmPassword,
      };
  
      const response = await axios.post(apiUrl, requestData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`,
        },
      });
  
      console.log('API Response:', response.data);
  
      if (response.data && response.data.status) {
        // Check if the 'status' field is true
        // Show success alert
        Alert.alert('Success', response.data.message || 'Password changed successfully!');
        navigation.navigate('ChangePasswordSuccess');
      } else {
        // Handle API error response
        console.error('API Error:', response.data);
        Alert.alert('Error', response.data.message || 'An error occurred while changing the password. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again later.');
    }
  
    // Reset the form fields after handling the password change
    setPreviousPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Change Password</Text>

      {/* Previous Password Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Previous Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={!showPassword}
          value={previousPassword}
          onChangeText={(text) => setPreviousPassword(text)}
        />
        <TouchableOpacity
          style={styles.showPasswordIcon}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Ionicons
            name={showPassword ? 'eye-off' : 'eye'}
            size={24}
            color={showPassword ? 'black' : 'gray'}
          />
        </TouchableOpacity>
      </View>

      {/* New Password Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>New Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={!showPassword}
          value={newPassword}
          onChangeText={(text) => setNewPassword(text)}
        />
        <TouchableOpacity
          style={styles.showPasswordIcon}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Ionicons
            name={showPassword ? 'eye-off' : 'eye'}
            size={24}
            color={showPassword ? 'black' : 'gray'}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.description}>
        At least 8 characters with uppercase letters, numbers, and special symbols
      </Text>

      {/* Confirm Password Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={!showPassword}
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
        />
        <TouchableOpacity
          style={styles.showPasswordIcon}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Ionicons
            name={showPassword ? 'eye-off' : 'eye'}
            size={24}
            color={showPassword ? 'black' : 'gray'}
          />
        </TouchableOpacity>
      </View>

      {/* Change Password Button */}
      <TouchableOpacity style={styles.changePasswordButton} onPress={handleChangePassword}>
        <Text style={styles.changePasswordButtonText}>Change Password</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 40,
  },
  inputContainer: {
    marginBottom: 15,
    position: 'relative',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#51CC62',
    borderRadius: 8,
    padding: 10,
  },
  showPasswordIcon: {
    position: 'absolute',
    right: 10,
    top: '50%', 
    transform: [{ translateY: -12 }],
    marginTop: 10,
  },
  description: {
    fontSize: 14,
    color: '#888',
    marginBottom: 15,
  },
  changePasswordButton: {
    backgroundColor: '#51CC62',
    padding: 12,
    borderRadius: 8,
    marginTop: 250,
    height: 52,
  },
  changePasswordButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'normal',
    fontSize: 22,
  },
});

export default ChangePassword;
