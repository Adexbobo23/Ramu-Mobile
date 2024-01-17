import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const WelcomeScreen = ({ navigation }) => {
  
  const handleSignup = () => {
    navigation.navigate('Signup');
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const handlePrivacyPolicy = () => {
    navigation.navigate('PrivacyPolicy');
  };

  const handleTermsOfService = () => {
    navigation.navigate('TermsOfServices');
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../Assests/Frame.png')} style={styles.logo} />
      </View>
      <Text style={styles.text1}>Let's Get Started</Text>
      <Text style={styles.text2}>Log in into your account</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button1} onPress={handleSignup}>
          <Text style={styles.buttonText1}>Sign up</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2} onPress={handleLogin}>
          <Text style={styles.buttonText2}>Log in</Text>
        </TouchableOpacity>
        <View style={styles.policyContainer}>
          <TouchableOpacity style={styles.policyItem} onPress={handlePrivacyPolicy}>
            <Ionicons name="ellipse" size={18} color="#51CC62" style={styles.icon} />
            <Text style={styles.policyText}>Privacy Policy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.policyItem} onPress={handleTermsOfService}>
            <Ionicons name="ellipse" size={18} color="#51CC62" style={styles.icon} />
            <Text style={styles.policyText}>Terms of Service</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logoContainer: {
    marginBottom: 10,
    elevation: 25, 
  },
  logo: {
    width: 390,
    height: 250,
  },
  text1: {
    fontSize: 27,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#51CC62',
    marginTop: 10,
    fontFamily: 'sans-serif',
  },
  text2: {
    fontSize: 16,
    fontWeight: 'normal',
    marginBottom: 30,
    color: 'black',
    marginTop: -20,
    fontFamily: 'sans-serif',
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    marginTop: 30,
  },
  button1: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 50,
    width: 250,
    height: 55,
    borderWidth: 1,
    borderColor: '#51CC62',
    marginTop: -20,
    elevation: 25, 
  },
  button2: {
    backgroundColor: '#51CC62',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 20,
    width: 250,
    height: 55,
    marginTop: -20,
    elevation: 25, 
  },
  buttonText1: {
    fontSize: 27,
    color: '#51CC62',
    textAlign: 'center',
  },
  buttonText2: {
    fontSize: 27,
    color: 'white',
    textAlign: 'center',
  },
  policyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: 70,
  },
  policyItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 5,
  },
  policyText: {
    fontSize: 16,
    color: 'black',
  },
});

export default WelcomeScreen;
