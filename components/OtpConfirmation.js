import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const OtpConfirmation = ({ route }) => {
  const [otpCode, setOtpCode] = useState(['', '', '', '']);
  const [remainingTime, setRemainingTime] = useState(60);
  const navigation = useNavigation();
  const { email } = route.params;

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
    if (otpCode.every((code) => code.trim().length > 0)) {
      // Logic for handling the verification of the OTP code
      const otp = otpCode.join('');
      console.log('OTP code:', otp);
      // ... your code here ...

      // Navigate to the PasswordReset component
      navigation.navigate('PasswordReset');
    } else {
      // Display an error message
      Alert.alert('Error', 'Please enter the OTP code.');
    }
  };

  const handleResendOtp = () => {
    sendOtpCode();
  };

  const handleOtpCodeChange = (index, value) => {
    const updatedOtpCode = [...otpCode];
    updatedOtpCode[index] = value;
    setOtpCode(updatedOtpCode);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verification</Text>
      <Text style={styles.subtitle}>Code has been sent to your email:</Text>
      <Text style={styles.email}>{email}</Text>
      <View style={styles.otpContainer}>
        {otpCode.map((value, index) => (
          <TextInput
            key={index}
            style={styles.otpInput}
            keyboardType="numeric"
            value={value}
            onChangeText={(text) => handleOtpCodeChange(index, text)}
            maxLength={1}
            required
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
