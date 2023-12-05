import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  
  const handleSignup = () => {
    navigation.navigate('Signup');
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Image source={require('./Assests/Frame.png')} style={styles.logo} />
      <Text style={styles.text1}>Login Or</Text>
      <Text style={styles.text2}>Create An Account</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button1} onPress={handleSignup}>
          <Text style={styles.buttonText1}>Sign up</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2} onPress={handleLogin}>
          <Text style={styles.buttonText2}>Log in</Text>
        </TouchableOpacity>
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
  logo: {
    width: 300,
    height: 300,
    marginBottom: 30,
  },
  text1: {
    fontSize: 27,
    fontWeight: 'bold',
    marginBottom: 30,
    color: 'black',
    marginTop: 80,
    fontFamily: 'sans-serif',
  },

  text2: {
    fontSize: 27,
    fontWeight: 'bold',
    marginBottom: 30,
    color: 'black',
    marginTop: -20,
    fontFamily: 'sans-serif',
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 100,
  },
  button1: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 20,
    width: 130,
    height: 50,
    borderWidth: 2,
    borderColor: '#51CC62',
    marginTop: -20,
  },
  button2: {
    backgroundColor: '#51CC62',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 20,
    width: 130,
    height: 50,
    marginTop: -20,
  },
  buttonText1: {
    fontSize: 22,
    color: '#51CC62',
    textAlign: 'center',
  },
  buttonText2: {
    fontSize: 22,
    color: 'white',
    textAlign: 'center',
  },
});

export default WelcomeScreen;
