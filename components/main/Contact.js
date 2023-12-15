import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';


const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    // You can implement your logic for sending the message here
    if (!name || !email || !message) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    // Example: Log the message details
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Message:', message);

    // Clear form fields after submitting
    setName('');
    setEmail('');
    setMessage('');

    // Display a success message to the user
    Alert.alert('Success', 'Message sent successfully!');
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contact Us</Text>

      {/* Name Input */}
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      {/* Message Input */}
      <TextInput
        style={[styles.input, styles.messageInput]}
        placeholder="Your Message"
        multiline
        numberOfLines={4}
        value={message}
        onChangeText={(text) => setMessage(text)}
      />

      {/* Send Message Button */}
      <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
        <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' }}>
          Send Message
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#51CC62',
    marginTop: 40,
  },
  input: {
    height: 50,
    borderColor: '#51CC62',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#FFF',
  },
  messageInput: {
    height: 100,
  },
  sendButton: {
    backgroundColor: '#51CC62',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
});

export default ContactForm;
