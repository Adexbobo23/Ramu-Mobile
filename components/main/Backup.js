import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import OtpVerification from './OtpVerification';

const SignupComponent = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [nationality, setNationality] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [transactionPin, setTransactionPin] = useState('');
  const [confirmTransactionPin, setConfirmTransactionPin] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showTransactionPin, setShowTransactionPin] = useState(false);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await axios.get('https://restcountries.com/v3.1/all');
      setCountries(response.data);
      setLoading(false);
    } catch (error) {
      console.log('Error fetching countries:', error);
    }
  };

  const handleSignup = async () => {
    // Logic for handling signup button press
    const signupData = {
      username,
      firstName,
      lastName,
      phoneNumber,
      email,
      nationality,
      address,
      password,
      confirmPassword,
      transactionPin,
      confirmTransactionPin,
      acceptTerms,
    };
    console.log('Signup data:', signupData);

    try {
      const response = await axios.post('http://54.175.145.162:32785/api/v1/sign-up', signupData);
      console.log('Signup response:', response.data);
      // Redirect to OTPVerification component
      setSubmitted(true);
    } catch (error) {
      console.log('Signup error:', error);
      // Handle error here
    }
  };

  const loginLinked = () => {
    // Logic for handling "Create an Account" link
    console.log('Login Account link pressed');
    // Navigate to the Signup page
    navigation.navigate('Login');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleTransactionPinVisibility = () => {
    setShowTransactionPin(!showTransactionPin);
  };

  if (submitted) {
    return <OtpVerification email={email} />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
        style={styles.input}
      />
      <TextInput
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
        style={styles.input}
      />
      <TextInput
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <View style={styles.inputContainer}>
        {loading ? (
          <Text>Loading countries...</Text>
        ) : (
          <Picker
            selectedValue={nationality}
            onValueChange={(itemValue) => setNationality(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select Nationality" value="" style={styles.select} />
            {countries.map((country) => (
              <Picker.Item
                key={country.cca3}
                label={country.name.common}
                value={country.name.common}
              />
            ))}
          </Picker>
        )}
      </View>
      <TextInput
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
        style={styles.input}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          style={styles.passwordInput}
        />
        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconButton}>
          <Ionicons name={showPassword ? 'eye' : 'eye-off'} size={24} color="green" />
        </TouchableOpacity>
      </View>
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showPassword}
          style={styles.passwordInput}
        />
        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconButton}>
          <Ionicons name={showPassword ? 'eye' : 'eye-off'} size={24} color="green" />
        </TouchableOpacity>
      </View>
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Transaction PIN"
          value={transactionPin}
          onChangeText={setTransactionPin}
          secureTextEntry={!showTransactionPin}
          style={styles.passwordInput}
        />
        <TouchableOpacity onPress={toggleTransactionPinVisibility} style={styles.iconButton}>
          <Ionicons name={showTransactionPin ? 'eye' : 'eye-off'} size={24} color="green" />
        </TouchableOpacity>
      </View>
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Confirm Transaction PIN"
          value={confirmTransactionPin}
          onChangeText={setConfirmTransactionPin}
          secureTextEntry={!showTransactionPin}
          style={styles.passwordInput}
        />
        <TouchableOpacity onPress={toggleTransactionPinVisibility} style={styles.iconButton}>
          <Ionicons name={showTransactionPin ? 'eye' : 'eye-off'} size={24} color="green" />
        </TouchableOpacity>
      </View>
      <View style={styles.checkboxContainer}>
        <TouchableOpacity
          style={[styles.checkbox, acceptTerms ? styles.checkboxActive : null]}
          onPress={() => setAcceptTerms(!acceptTerms)}
        />
        <Text style={styles.checkboxLabel}>Accept Terms of Use & Policy</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Signup</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginLink} onPress={loginLinked}>
        <Text style={styles.loginLinkText}>Already have a Ramu account? Log in</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  input: {
    height: 50,
    borderColor: 'green',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  inputContainer: {
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'green',
  },
  select: {
    color: 'grey',
  },
  label: {
    marginBottom: 5,
    color: 'green',
  },
  picker: {
    height: 50,
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderColor: 'green',
    borderWidth: 1,
    borderRadius: 10,
  },
  passwordInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: 10,
  },
  iconButton: {
    padding: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: 'green',
    marginRight: 10,
    borderRadius: 3,
  },
  checkboxActive: {
    backgroundColor: 'green',
  },
  checkboxLabel: {
    fontSize: 16,
  },
  button: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  loginLink: {
    alignItems: 'center',
  },
  loginLinkText: {
    fontSize: 16,
    color: 'green',
  },
});

export default SignupComponent;
