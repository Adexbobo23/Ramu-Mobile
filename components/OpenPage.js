import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const FirstOpenPage = () => {
  const navigation = useNavigation();

  const handleContinue = () => {
    navigation.navigate('WelcomeScreen');
  };

  return (
    <View style={styles.container}>
      <Image source={require('./Assests/icon.png')} style={styles.logo} />
      <Text style={styles.welcomeText}>Welcome to Ramu</Text>
      <Text style={styles.subText}>Start training and building a future with us.</Text>
      <Text style={styles.subText1}>Enjoy maximum trading with 0% commission {'\n'}on all stocks.</Text>
      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continue</Text>
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
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    borderRadius: 5,
  },
  welcomeText: {
    fontSize: 27,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
    fontFamily: 'Roboto'
  },
  subText: {
    fontSize: 15,
    color: 'black',
    marginBottom: 0,
    fontFamily: 'sans-serif',
  },
  subText1: {
    fontSize: 15,
    color: 'black',
    marginBottom: 20,
    fontFamily: 'sans-serif',
    textAlign: 'center'
  },
  button: {
    backgroundColor: '#51CC62',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '80%',
    height: 52,
    marginTop: 30,
    
  },
  buttonText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});

export default FirstOpenPage;
