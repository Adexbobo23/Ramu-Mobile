import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const Security = () => {
  const navigation = useNavigation();

  const navigateToChangePassword = () => {
    navigation.navigate('ChangePassword');
  };

  const navigateToSetPin = () => {
    navigation.navigate('ResetTrans');
  };

  const handleBiometricSwitch = (value) => {
    // Implement logic to enable/disable biometric authentication
    console.log('Biometric Switch:', value);
  };

  const handlePermissionsSwitch = (value) => {
    // Implement logic to manage app permissions
    console.log('Permissions Switch:', value);
  };

  const navigateTo = (screen) => {
    navigation.navigate(screen);
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
        <Text style={styles.securityOptionTitle}>Reset Transactions Pin</Text>
        <Text style={styles.securityOptionDesc}>Reset your transaction pin to transact</Text>
      </TouchableOpacity>
      <View style={styles.hrLine} />

      {/* Navigation bar */}
      <View style={styles.navBar}>
                <TouchableOpacity style={styles.navBarItem} onPress={() => navigateTo('Dashboard')}>
                <Ionicons name="home" size={26} color="white" />
                <Text style={styles.navBarText}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navBarItem} onPress={() => navigateTo('Discover')}>
                <Ionicons name="search" size={26} color="white" />
                <Text style={styles.navBarText}>Discover</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navBarItem} onPress={() => navigateTo('Portfolio')}>
                <Ionicons name="briefcase" size={26} color="white" />
                <Text style={styles.navBarText}>Portfolio</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navBarItem} onPress={() => navigateTo('More')}>
                <Ionicons name="ellipsis-horizontal" size={26} color="white" />
                <Text style={styles.navBarText}>More</Text>
                </TouchableOpacity>
            </View>
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
  navBar: {
    flexDirection: 'row',
    backgroundColor: '#147603',
    padding: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 25,
  },
  navBarItem: {
    flex: 1,
    alignItems: 'center',
  },
  navBarText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Security;
