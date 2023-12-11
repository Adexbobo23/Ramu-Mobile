import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const EmailVerifySuccessful = ({ navigation }) => {
  const handleGoToDashboard = () => {
    // Logic for handling "Dashboard" button press
    console.log('Go to Dashboard');
    // Navigate to the Dashboard page
    navigation.navigate('Dashboard');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.congratsText}>Congratulations!</Text>
      <Text style={styles.messageText}>Your email has successfully been verified.</Text>
      <Text style={styles.messageText1}>Let's get some business done!</Text>
      <Image source={require('../Assests/Frame_158.png')} style={styles.image} />
      <TouchableOpacity style={styles.dashboardButton} onPress={handleGoToDashboard}>
        <Text style={styles.buttonText}>Dashboard</Text>
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
  },
  congratsText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#51CC62',
    marginTop: -150,
  },
  messageText: {
    fontSize: 16,
    marginBottom: 20,
  },
  messageText1: {
    fontSize: 16,
    marginTop: -20,
    marginBottom: 90,
  },
  image: {
    width: 270,
    height: 270,
    marginBottom: 20,
  },
  dashboardButton: {
    backgroundColor: '#51CC62',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '80%',
    marginTop: 50,
    height: 52,
  },
  buttonText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});

export default EmailVerifySuccessful;
