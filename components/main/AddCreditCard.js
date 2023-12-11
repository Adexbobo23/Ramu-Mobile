import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const AddCreditCard = () => {
  const navigation = useNavigation();
  const [cardHolderName, setCardHolderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  const handleSave = () => {
    navigation.navigate('Wallet');
    console.log('Card details saved:', { cardHolderName, cardNumber, expiry, cvc });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Credit or Debit Card</Text>

      {/* Card Form */}
      <View style={styles.cardForm}>
        <View style={styles.formField}>
          <Text style={styles.label}>Card Holder Name</Text>
          <TextInput
            style={styles.input}
            placeholder="John Doe"
            value={cardHolderName}
            onChangeText={setCardHolderName}
          />
        </View>

        <View style={styles.formField}>
          <Text style={styles.label}>Card Number</Text>
          <View style={styles.cardNumberContainer}>
            <Ionicons name="card" size={24} color="black" style={styles.cardIcon} />
            <TextInput
              style={styles.cardNumberInput}
              placeholder="1234 5678 9012 3456"
              value={cardNumber}
              onChangeText={setCardNumber}
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.formRow}>
          <View style={styles.formField}>
            <Text style={styles.label}>CVC</Text>
            <TextInput
              style={styles.input1}
              placeholder="123"
              value={cvc}
              onChangeText={setCvc}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.formField}>
            <Text style={styles.label}>Expiry (MM/YY)</Text>
            <TextInput
              style={styles.input}
              placeholder="12/23"
              value={expiry}
              onChangeText={setExpiry}
              keyboardType="numeric"
            />
          </View>
        </View>
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
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
    marginTop: 70,
  },
  cardForm: {
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  formField: {
    marginBottom: 20,
  },
  formRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#51CC62',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  input1: {
    height: 50,
    borderWidth: 1,
    borderColor: '#51CC62',
    borderRadius: 8,
    paddingHorizontal: 12,
    width: 110
  },
  cardNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIcon: {
    marginRight: 10,
  },
  cardNumberInput: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: '#51CC62',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  saveButton: {
    backgroundColor: '#51CC62',
    padding: 15,
    borderRadius: 8,
    height: 52,
  },
  saveButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'normal',
    fontSize: 22,
  },
});

export default AddCreditCard;
