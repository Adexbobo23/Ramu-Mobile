import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
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
      alert('Login Successful');

      // Redirect to the Dashboard
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
      <Image
        source={require('./Assests/Frame.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.welcomeText}>Welcome Back!</Text>
      <Text style={styles.description}>Login to your account with ease</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <View style={styles.inputWrapper}>
          <Ionicons name="mail-outline" size={24} color="#51CC62" style={styles.icon} />
          <TextInput
            placeholder="Enter your email address"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            textAlign="center"
            required
          />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordContainer}>
          <Ionicons name="lock-closed-outline" size={24} color="#51CC62" style={styles.icon} />
          <TextInput
            placeholder="Password"
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
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log in</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleCreateAccount}>
        <Text style={styles.createAccount}>
          New to Ramu? <Text style={styles.createAccount1}>Create an account</Text>
        </Text>
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
  logo: {
    width: 300,
    height: 300,
    marginBottom: 20,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#51CC62',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: 'grey',
    marginBottom: 20,
    textAlign: 'center',
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
    borderWidth: 0,
    borderColor: '#51CC62',
    paddingHorizontal: 40,
    borderRadius: 10,
    flex: 1,
  },
  input1: {
    height: 50,
    borderWidth: 0,
    borderColor: '#51CC62',
    paddingHorizontal: 10,
    borderRadius: 10,
    flex: 1,
  },
  loginButton: {
    backgroundColor: '#51CC62',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
    width: '80%',
    height: 52,
    marginTop: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  buttonText: {
    fontSize: 20,
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
    fontSize: 18,
    color: 'grey',
    textDecorationLine: 'none',
  },
  createAccount1: {
    fontSize: 18,
    color: '#51CC62',
    textDecorationLine: 'none',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#51CC62',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  icon: {
    padding: 10,
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
