import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const OtpVerification = ({ email }) => {
  const [otpCode1, setOtpCode1] = useState('');
  const [otpCode2, setOtpCode2] = useState('');
  const [otpCode3, setOtpCode3] = useState('');
  const [otpCode4, setOtpCode4] = useState('');
  const [remainingTime, setRemainingTime] = useState(60);
  const navigation = useNavigation();
  const otpInputRef1 = useRef(null);
  const otpInputRef2 = useRef(null);
  const otpInputRef3 = useRef(null);
  const otpInputRef4 = useRef(null);

  useEffect(() => {
    sendOtpCode();
    // Focus on the first input when the component mounts
    otpInputRef1.current.focus();
  }, []);

  const sendOtpCode = () => {
    let time = 60;
    const timer = setInterval(() => {
      time--;
      setRemainingTime(time);

      if (time === 0) {
        clearInterval(timer);
      }
    }, 1000);
  };

  // const handleVerifyOtp = async () => {
  //   if (otpCode1 && otpCode2 && otpCode3 && otpCode4) {
  //     try {
  //       const otpCode = otpCode1 + otpCode2 + otpCode3 + otpCode4;
  //       const apiUrl = `https://api-staging.ramufinance.com/api/v1/account/verify/${otpCode}`;
  //       const response = await fetch(apiUrl, {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       });
  
  //       console.log('Response status:', response.status);
  
  //       if (response.ok) {
  //         // API call successful, navigate to success screen
  //         navigation.navigate('EmailVerifySuccessful');
  //       } else {
  //         // API call failed, handle the error
  //         const errorData = await response.json();
  //         console.error('Error response data:', errorData);
  //         Alert.alert('Error', errorData.message || 'Verification failed. Please try again.');
  //       }
  //     } catch (error) {
  //       console.error('Error while verifying OTP:', error);
  //       Alert.alert('Error', 'An error occurred while verifying OTP. Please try again.');
  //     }
  //   } else {
  //     Alert.alert('Error', 'Please enter the OTP code.');
  //   }
  // };
  
  const handleVerifyOtp = () => {
    const otpCode = otpCode1 + otpCode2 + otpCode3 + otpCode4;
    navigation.navigate('EmailVerifySuccessful');
  };
  

  const handleResendOtp = () => {
    sendOtpCode();
    otpInputRef1.current.focus();
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Email Verification</Text>
        <Text style={styles.subtitle}>Enter the code sent to your email:</Text>
        <Text style={styles.email}>{email}</Text>
        <View style={styles.otpContainer}>
          <TextInput
            ref={otpInputRef1}
            style={styles.otpInput}
            keyboardType="numeric"
            value={otpCode1}
            onChangeText={(text) => {
              setOtpCode1(text);
              if (text.length === 1) {
                otpInputRef2.current.focus();
              }
            }}
            maxLength={1}
            required
          />
          <TextInput
            ref={otpInputRef2}
            style={styles.otpInput}
            keyboardType="numeric"
            value={otpCode2}
            onChangeText={(text) => {
              setOtpCode2(text);
              if (text.length === 1) {
                otpInputRef3.current.focus();
              }
            }}
            maxLength={1}
            required
          />
          <TextInput
            ref={otpInputRef3}
            style={styles.otpInput}
            keyboardType="numeric"
            value={otpCode3}
            onChangeText={(text) => {
              setOtpCode3(text);
              if (text.length === 1) {
                otpInputRef4.current.focus();
              }
            }}
            maxLength={1}
            required
          />
          <TextInput
            ref={otpInputRef4}
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
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
    height: 60,
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
    width: '100%',
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

export default OtpVerification;
