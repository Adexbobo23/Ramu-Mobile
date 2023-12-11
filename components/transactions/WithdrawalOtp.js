import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const WithdrawalOtp = ({ email }) => {
  const [otpCode1, setOtpCode1] = useState('');
  const [otpCode2, setOtpCode2] = useState('');
  const [otpCode3, setOtpCode3] = useState('');
  const [otpCode4, setOtpCode4] = useState('');
  const [remainingTime, setRemainingTime] = useState(60);
  const navigation = useNavigation();

  useEffect(() => {
    sendOtpCode();
  }, []);

  const sendOtpCode = () => {
    // Simulating sending OTP code to the email
    // In a real application, you would send the OTP code to the user's email address using a backend API

    // Start the countdown timer for 60 seconds
    let time = 60;
    const timer = setInterval(() => {
      time--;
      setRemainingTime(time);

      if (time === 0) {
        clearInterval(timer);
      }
    }, 1000);
  };

  const handleVerifyOtp = () => {
    // Validate input fields
    if (otpCode1 && otpCode2 && otpCode3 && otpCode4) {
      // Logic for handling the verification of the OTP code
      const otpCode = otpCode1 + otpCode2 + otpCode3 + otpCode4;
      console.log('OTP code:', otpCode);
      // ... your code here ...

      // Navigate to the EmailVerifySuccessful component
      navigation.navigate('AuthTrans');
    } else {
      // Display an error message
      Alert.alert('Error', 'Please enter the OTP code.');
    }
  };

  const handleResendOtp = () => {
    sendOtpCode();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verification</Text>
      <Text style={styles.subtitle}>Code has been sent to your email:</Text>
      <Text style={styles.email}>{email}</Text>
      <View style={styles.otpContainer}>
        <TextInput
          style={styles.otpInput}
          keyboardType="numeric"
          value={otpCode1}
          onChangeText={setOtpCode1}
          maxLength={1}
          required
        />
        <TextInput
          style={styles.otpInput}
          keyboardType="numeric"
          value={otpCode2}
          onChangeText={setOtpCode2}
          maxLength={1}
          required
        />
        <TextInput
          style={styles.otpInput}
          keyboardType="numeric"
          value={otpCode3}
          onChangeText={setOtpCode3}
          maxLength={1}
          required
        />
        <TextInput
          style={styles.otpInput}
          keyboardType="numeric"
          value={otpCode4}
          onChangeText={setOtpCode4}
          maxLength={1}
          required
        />
      </View>
      {remainingTime > 0 && (
        <Text style={styles.resendText}>
          Resend Code in {remainingTime} {remainingTime === 1 ? 'second' : 'seconds'}
        </Text>
      )}
      <TouchableOpacity style={styles.resendLink} onPress={handleResendOtp}>
        <Text style={styles.resendLinkText}>Resend Code</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.verifyButton} onPress={handleVerifyOtp}>
        <Text style={styles.verifyButtonText}>Verify</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#51CC62',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#51CC62',
  },
  otpContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 50,
  },
  otpInput: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: '#51CC62',
    borderRadius: 10,
    textAlign: 'center',
    marginRight: 10,
  },
  verifyButton: {
    backgroundColor: '#51CC62',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
    width: '80%',
    height: 52,
  },
  verifyButtonText: {
    fontSize: 22,
    fontWeight: 'normal',
    color: 'white',
    textAlign: 'center',
  },
  resendText: {
    fontSize: 14,
    marginBottom: 10,
  },
  resendLink: {
    marginBottom: 40,
  },
  resendLinkText: {
    fontSize: 20,
    color: '#51CC62',
    textDecorationLine: 'none',
  },
});

export default WithdrawalOtp;
