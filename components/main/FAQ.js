import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

const FAQ = () => {
  const faqData = [
    {
      question: 'Question 1?',
      answer: 'Answer to Question 1.',
    },
    {
      question: 'Question 2?',
      answer: 'Answer to Question 2.',
    },
    // ... Repeat for other questions and answers
  ];

  const renderItem = ({ item }) => (
    <View style={styles.faqItem}>
      <Text style={styles.faqQuestion}>{item.question}</Text>
      <Text style={styles.faqAnswer}>{item.answer}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={faqData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />

      {/* Contact Us Button */}
      <TouchableOpacity style={styles.contactButton}>
        <Text style={styles.contactButtonText}>Contact Us</Text>
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
  faqItem: {
    marginBottom: 20,
  },
  faqQuestion: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#51CC62',
    marginBottom: 8,
  },
  faqAnswer: {
    fontSize: 16,
    color: '#333333',
  },
  contactButton: {
    backgroundColor: '#51CC62',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  contactButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FAQ;
