import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberPassword, setRememberPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


  const handleLogin = async () => {
    // Perform validation here
    if (!email || !password) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const loginData = {
        email,
        password,
        rememberPassword,
      };

      // Make the API call using Axios
      const apiUrl = 'https://api-staging.ramufinance.com/api/v1/login';
      const response = await axios.post(apiUrl, loginData);

      console.log('Login response:', response.data);
      // Save the token to AsyncStorage upon successful login
      await AsyncStorage.setItem('userToken', response.data.data.token);
      await AsyncStorage.setItem('userId', response.data.data.id);
      alert('Login Successfull');

      // Redirect to the PinComponent
      navigation.navigate('Dashboard');
    } catch (error) {
      alert('Login failed. Please check your credentials.');
    }
  };

  const handleForgotPassword = () => {
    console.log('Forgot Password link pressed');
    navigation.navigate('ForgetPassword');
  };

  const handleCreateAccount = () => {
    console.log('Create an Account link pressed');
    navigation.navigate('Signup');
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const renderPasswordIcon = () => {
    if (showPassword) {
      return (
        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconButton}>
          <Ionicons name="eye-off" size={24} color="grey" />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconButton}>
          <Ionicons name="eye" size={24} color="grey" />
        </TouchableOpacity>
      );
    }
  };

  const handleToggleRememberPassword = () => {
    setRememberPassword((prevState) => !prevState);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* <Text style={styles.heading}>Log in</Text> */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="Enter your email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          required
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Enter your password"
            secureTextEntry={!showPassword}
            style={styles.input1}
            value={password}
            onChangeText={setPassword}
            required
          />
          {renderPasswordIcon()}
        </View>
      </View>
      <Text style={styles.text}>At least 8 characters with uppercase letters and numbers</Text>
      {/* <View style={styles.checkboxContainer}>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={handleToggleRememberPassword}
        >
          {rememberPassword ? (
            <Ionicons name="checkbox" size={24} color="51CC62" />
          ) : (
            <Ionicons name="checkbox-outline" size={24} color="51CC62" />
          )}
        </TouchableOpacity>
        <Text style={styles.checkboxLabel}>Remember Password</Text>
      </View> */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log in</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleCreateAccount}>
        <Text style={styles.createAccount}>New to Ramu? <Text style={styles.createAccount1}>Create an account</Text></Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 50,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#51CC62',
  },
  inputContainer: {
    width: '80%',
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
    color: '#51CC62',
    fontSize: 16,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#51CC62',
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  input1: {
    height: 50,
    borderWidth: 0,
    borderColor: '#51CC62',
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  loginButton: {
    backgroundColor: '#51CC62',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
    width: '80%',
    height: 52,
    marginTop: 50,
  },
  buttonText: {
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
  },
  forgotPassword: {
    fontSize: 14,
    color: 'black',
    textDecorationLine: 'none',
    marginBottom: 20,
    marginTop: -15,
  },
  text: {
    fontSize: 16,
    color: 'grey',
    marginTop: -15,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  createAccount: {
    marginTop: 170,
    fontSize: 18,
    color: 'grey',
    textDecorationLine: 'none',
  },
  createAccount1: {
    marginTop: 170,
    fontSize: 18,
    color: '#51CC62',
    textDecorationLine: 'none',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 0,
    borderColor: '#51CC62',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxLabel: {
    fontSize: 18,
    color: '#51CC62',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#51CC62',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  iconButton: {
    padding: 10,
  },
});

export default Login;
