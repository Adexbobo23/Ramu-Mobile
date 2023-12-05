import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';

const PinComponent = ({ navigation }) => {
  const [pinCode, setPinCode] = useState('');

  const handlePinSubmit = () => {
    if (pinCode.length !== 4) {
      alert('Please enter a 4-digit PIN');
      return;
    }

    console.log('PIN code:', pinCode);
    // Send the pinCode to the backend API
    // ... your code here ...

    // Redirect to the Dashboard
    navigation.navigate('Dashboard');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('./Assests/Frame.png')} style={styles.logo} />
      <Text style={styles.title}>Enter Your PIN</Text>
      <Text style={styles.subtitle}>Please enter your 4-digit RAMU</Text>
      <Text style={styles.subtitle1}>PIN to log in securely</Text>
      <View style={styles.pinContainer}>
        <TextInput
          style={styles.pinInput}
          keyboardType="numeric"
          value={pinCode[0]}
          onChangeText={(text) => setPinCode([text, pinCode[1], pinCode[2], pinCode[3]])}
          maxLength={1}
          required
        />
        <TextInput
          style={styles.pinInput}
          keyboardType="numeric"
          value={pinCode[1]}
          onChangeText={(text) => setPinCode([pinCode[0], text, pinCode[2], pinCode[3]])}
          maxLength={1}
          required
        />
        <TextInput
          style={styles.pinInput}
          keyboardType="numeric"
          value={pinCode[2]}
          onChangeText={(text) => setPinCode([pinCode[0], pinCode[1], text, pinCode[3]])}
          maxLength={1}
          required
        />
        <TextInput
          style={styles.pinInput}
          keyboardType="numeric"
          value={pinCode[3]}
          onChangeText={(text) => setPinCode([pinCode[0], pinCode[1], pinCode[2], text])}
          maxLength={1}
          required
        />
      </View>
      <TouchableOpacity style={styles.continueButton} onPress={handlePinSubmit}>
        <Text style={styles.buttonText}>Continue</Text>
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
    width: 200,
    height: 200,
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'green',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: 'green',
    textAlign: 'center',
  },
  subtitle1: {
    fontSize: 16,
    marginBottom: 30,
    color: 'green',
    textAlign: 'center',
    marginTop: -20,
  },
  pinContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  pinInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 10,
    textAlign: 'center',
    marginRight: 10,
    fontSize: 24,
    marginBottom: 50,
  },
  continueButton: {
    backgroundColor: '#51CC62',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '80%',
    height: 52,
  },
  buttonText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});

export default PinComponent;
