import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PasswordResetSuccessful = () => {
  const navigation = useNavigation();

  const handleAdvanceToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Congratulations!</Text>
      <Text style={styles.subtitle}>Your password has been successfully reset.</Text>
      <Image
        source={require('../Assests/Frame_159.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <TouchableOpacity style={styles.button} onPress={handleAdvanceToLogin}>
        <Text style={styles.buttonText}>Advance to Log In</Text>
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
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#51CC62',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 70,
    textAlign: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 170,
  },
  button: {
    backgroundColor: '#51CC62',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
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

export default PasswordResetSuccessful;
