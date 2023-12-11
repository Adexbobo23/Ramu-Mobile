import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Security = () => {
  const navigation = useNavigation();

  const navigateToChangePassword = () => {
    navigation.navigate('ChangePassword');
  };

  const navigateToSetPin = () => {
    navigation.navigate('SetPin');
  };

  const handleBiometricSwitch = (value) => {
    // Implement logic to enable/disable biometric authentication
    console.log('Biometric Switch:', value);
  };

  const handlePermissionsSwitch = (value) => {
    // Implement logic to manage app permissions
    console.log('Permissions Switch:', value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Security</Text>

      {/* Change Password */}
      <TouchableOpacity style={styles.securityOption} onPress={navigateToChangePassword}>
        <Text style={styles.securityOptionTitle}>Change Password</Text>
        <Text style={styles.securityOptionDesc}>Update your account password</Text>
      </TouchableOpacity>
      <View style={styles.hrLine} />

      {/* Enable Biometric Authentication */}
      {/* <View style={styles.securityOption}>
        <Text style={styles.securityOptionTitle}>Enable Biometric Authentication</Text>
        <Text style={styles.securityOptionDesc}>Use fingerprint or face recognition</Text>
        <Switch onValueChange={handleBiometricSwitch} value={false} />
      </View>
      <View style={styles.hrLine} /> */}

      {/* Account Recovery */}
      <TouchableOpacity style={styles.securityOption} onPress={navigateToSetPin}>
        <Text style={styles.securityOptionTitle}>Set Your Transactions Pin</Text>
        <Text style={styles.securityOptionDesc}>Set your transaction pin to transact</Text>
      </TouchableOpacity>
      <View style={styles.hrLine} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 50,
    textAlign: 'center',
    marginTop: 40,
    color: '#51CC62',
  },
  securityOption: {
    paddingVertical: 15,
  },
  securityOptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#51CC62',
  },
  securityOptionDesc: {
    fontSize: 16,
    color: '#555',
  },
  hrLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
    marginVertical: 10,
  },
});

export default Security;
