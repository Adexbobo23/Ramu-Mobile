import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import App from '../Router/Push';

const FirstOpenPage = () => {
  const navigation = useNavigation();

  const handleContinue = () => {
    navigation.navigate('WelcomeScreen');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../Assests/onboard.jpg')} style={styles.logo} />
      <View style={styles.contentContainer}>
        <Text style={styles.welcomeText}>Welcome to Ramu</Text>
        <Text style={styles.subText}>
          Get hold of your finances{'\n'}
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
        {/* <View>
          <App />
        </View> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  contentContainer: {
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    backgroundColor: '#51CC62',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 50,
    elevation: 85,
    alignItems: 'center',
    width: '100%',
    height: 350,
  },
  logo: {
    width: 350,
    height: 320,
    marginBottom: 20,
    borderRadius: 5,
  },
  welcomeText: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
    fontFamily: 'Roboto',
    marginTop: 20,
  },
  subText: {
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
    fontFamily: 'sans-serif',
    textAlign: 'center',
  },
  subText1: {
    fontSize: 15,
    color: 'black',
    marginBottom: 20,
    fontFamily: 'sans-serif',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#FFF',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 20,
    width: '100%',
    marginTop: 85,
    elevation: 25,
    height: 60,
  },
  buttonText: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#51CC62',
    textAlign: 'center',
  },
});

export default FirstOpenPage;
