import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, LayoutAnimation, UIManager } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const FAQ = () => {
    const navigation = useNavigation();
    const [expandedIndex, setExpandedIndex] = useState(null);


    const faqData = [
        {
          question: 'What is Ramu?',
          answer: 'Ramu is a trading app for equity, where you can buy UK STOCKS, US STOCKS AND NIGERIA STOCKS, at fractional prices.',
        },
        {
          question: 'Is there a minimum on how much I can invest?',
          answer: 'Yes, the minimum is $1.',
        },
        {
          question: 'How do I trade with Ramu?',
          answer: 'Fund your account and start trading.',
        },
        {
          question: 'What are the benefits of trading on Ramu app?',
          answer: 'You get #200 immediately you register with us. Unlike some trading apps, we don’t charge foreign exchange fees every time you make a trade. We also don’t charge commissions on your trades during regular stock market hours. We’re dedicated to creating a more transparent investing experience where our incentives are aligned with those of our members.',
        },
        {
          question: 'How long do funds take to reflect in my bank account after I request a payout?',
          answer: 'If you place your request before the end of the trading day, you will receive your fund in your Ramu wallet immediately, but if trading has closed, you will get your funding on the next trading day.',
        },
        {
            question: 'What is a fractional share?',
            answer: 'Fractional share is a portion of one whole share of a company. Which you to invest in small portions of shares giving greater flexibility and control over your investments, and also allows you to invest exactly as much as you want, no matter the price of a given stock and diversify your portfolio across a wider range of stocks.',
        },
        {
            question: 'Are there any fees?',
            answer: ' NO fees, NO commission.',
        },
        {
            question: 'How do I fund my account?',
            answer: 'You can fund your account through credit card or bank transfer.',
        },
        {
            question: 'When will my fund be available to invest?',
            answer: 'Immediately it reflects on your Ramu wallet.',
        },
        {
            question: 'Is intraday trading possible?',
            answer: 'Yes, you can buy and sell securities on the same day. You can also see real-time prices of the securities.',
        },
        {
            question: 'Does Ramu gives financial or investment advice?',
            answer: 'No we don’t give financial or investment advice, but if you have any questions about our service, please contact us by email, chat, or telephone.',
        },
        {
            question: 'Is your question missing?',
            answer: 'Email or chat with us and our team will be ready to answer you.',
        },
      ];
      

      useEffect(() => {
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        // Trigger the layout animation on component mount
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      }, []);

      const renderItem = ({ item, index }) => {
        const isExpanded = index === expandedIndex;
        return (
          <TouchableOpacity
            style={[styles.faqItem, isExpanded && styles.expandedItem]}
            onPress={() => setExpandedIndex(isExpanded ? null : index)}
          >
            <Text style={styles.faqQuestion}>{item.question}</Text>
            {isExpanded && <Text style={styles.faqAnswer}>{item.answer}</Text>}
          </TouchableOpacity>
        );
      };

  const handleContact = () => {
    navigation.navigate('Contact');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FAQ</Text>

      <FlatList
        data={faqData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />

      {/* Contact Us Button */}
      <TouchableOpacity style={styles.contactButton} onPress={handleContact}>
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
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#51CC62',
    marginTop: 30,  
  },
  faqItem: {
    marginBottom: 20,
    overflow: 'hidden',
    borderColor: '#51CC62',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
  },
  expandedItem: {
    height: 'auto', // Adjust as needed
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
