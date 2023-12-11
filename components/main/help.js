import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Help = () => {
    const navigation = useNavigation();

    const handleContactSupport = () => {
        navigation.navigate('LiveChat');
        console.log('Contacting support...');
      };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Help Center</Text>
      <Text style={styles.content}>
        If you have any questions or encounter issues, our support team is here to assist you.
      </Text>
      <TouchableOpacity style={styles.button} onPress={() => handleContactSupport()}>
        <Text style={styles.buttonText}>Contact Support</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '',
  },
  content: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#000', 
  },
  button: {
    backgroundColor: '#51CC62',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Help;
