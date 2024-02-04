import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const OtpConfirmation = ({ route }) => {
  const [remainingTime, setRemainingTime] = useState(60);
  const navigation = useNavigation();
  const { email } = route.params;
  const otpInputs = useRef([]);

  useEffect(() => {
    sendOtpCode();
  }, []);

  const sendOtpCode = async () => {
    try {
      const response = await axios.post(
        'https://api-staging.ramufinance.com/api/v1/resend-password-reset-otp',
        {
          email: email,
        }
      );

      if (response.data.status) {
        // Start the countdown timer for 60 seconds
        let time = 60;
        const timer = setInterval(() => {
          time--;
          setRemainingTime(time);

          if (time === 0) {
            clearInterval(timer);
          }
        }, 1000);
      } else {
        console.error('Error sending OTP:', response.data.message);
        Alert.alert('Error', 'Error sending OTP. Please try again.');
      }
    } catch (error) {
      console.error('An error occurred while sending OTP:', error);
      Alert.alert('Error', 'An error occurred while sending OTP. Please try again.');
    }
  };

  const handleVerifyOtp = () => {
    const otp = otpInputs.current.map((input) => input.value).join('');

    if (otp.trim().length > 0) {
      // Pass email and otp as part of navigation state
      navigation.navigate('PasswordReset', { email, otp });
    } else {
      Alert.alert('Error', 'Please enter the OTP code.');
    }
  };

  const handleResendOtp = () => {
    sendOtpCode();
  };

  const handleOtpCodeChange = (index, value) => {
    if (index < otpInputs.current.length - 1 && value.trim().length > 0) {
      otpInputs.current[index + 1].focus();
    }

    const updatedOtpInputs = [...otpInputs.current];
    updatedOtpInputs[index].value = value;
    otpInputs.current = updatedOtpInputs;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verification</Text>
      <Text style={styles.subtitle}>
        We have sent a mail with the verification code to your email:
      </Text>
      <Text style={styles.email}>{email}</Text>
      <View style={styles.otpContainer}>
        {Array(4)
          .fill(0)
          .map((_, index) => (
            <TextInput
              key={index}
              ref={(input) => (otpInputs.current[index] = input)}
              style={styles.otpInput}
              keyboardType="numeric"
              onChangeText={(text) => handleOtpCodeChange(index, text)}
              maxLength={1}
            />
          ))}
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
    textAlign: 'center',
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
    fontWeight: 'bold',
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

export default OtpConfirmation;
