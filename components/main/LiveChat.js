import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const LiveChat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (newMessage.trim() === '') {
      return;
    }

    setMessages([...messages, { id: messages.length.toString(), text: newMessage, type: 'user' }]);
    setNewMessage('');
  };

  const receiveMessage = () => {
    setMessages([...messages, { id: messages.length.toString(), text: 'Hello! How can I help you?', type: 'agent' }]);
  };

  useEffect(() => {
    receiveMessage();
  }, []);

  const simulateAgentResponse = () => {
    setTimeout(() => {
      receiveMessage();
    }, 1000);
  };

  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].type === 'user') {
      simulateAgentResponse();
    }
  }, [messages]);

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={item.type === 'user' ? styles.userMessageContainer : styles.agentMessageContainer}>
              <Text style={styles.messageText}>{item.text}</Text>
            </View>
          )}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    marginTop: 50,
  },
  userMessageContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#51CC62',
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
    maxWidth: '70%',
  },
  agentMessageContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
    maxWidth: '70%',
  },
  messageText: {
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    height: 50,
  },
  sendButton: {
    backgroundColor: '#51CC62',
    padding: 12,
    borderRadius: 8,
    height: 50,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'normal',
    fontSize: 20,
  },
});

export default LiveChat;
