import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Tools = () => {
    const navigation = useNavigation();
    const [darkMode, setDarkMode] = useState(false);

    const navigateToPersonalInfo = () => {
        navigation.navigate('Personal');
    };

    const navigateToEditProfile = () => {
        navigation.navigate('EditProfile');
    };

    const navigateToSecurity = () => {
        navigation.navigate('Security');
    };

    const navigateToHelp = () => {
        navigation.navigate('Help');
    };

    const navigateToReportScam = () => {
        navigation.navigate('ReportScam');
    };

    const handleLogout = () => {
        navigation.navigate('Login');
    };

    const handleDarkModeToggle = () => {
        // Toggle dark mode
        setDarkMode(!darkMode);

        // Implement logic to apply dark mode theme to the app
        // ...

        // For demonstration purposes, you can console.log the current dark mode state
        console.log('Dark Mode:', darkMode);
    };



    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.title}>Tools</Text>

                {/* Navigation options */}
                <TouchableOpacity style={styles.option} onPress={navigateToPersonalInfo}>
                    <Text style={styles.optionText}>Personal Info</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.option} onPress={navigateToEditProfile}>
                    <Text style={styles.optionText}>Edit Profile</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.option} onPress={navigateToSecurity}>
                    <Text style={styles.optionText}>Security</Text>
                </TouchableOpacity>

                {/* Switch for dark mode */}
                {/* <View style={styles.darkModeSwitchContainer}>
                    <Text style={styles.darkModeText}>Change Mode</Text>
                    <Switch value={darkMode} onValueChange={handleDarkModeToggle} />
                </View> */}

                <TouchableOpacity style={styles.option} onPress={navigateToHelp}>
                    <Text style={styles.optionText}>Help</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.option} onPress={navigateToReportScam}>
                    <Text style={styles.optionText}>Report Scam</Text>
                </TouchableOpacity>

                {/* Logout option */}
                <TouchableOpacity style={styles.logoutOption} onPress={handleLogout}>
                    <Ionicons name="log-out" size={24} color="red" />
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    scrollContainer: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        marginTop: 40,
        color: '#51CC62'
    },
    option: {
        borderBottomWidth: 1,
        borderBottomColor: '#51CC62',
        paddingVertical: 15,
        marginTop: 20,
    },
    optionText: {
        fontSize: 18,
        color: 'black',
    },
    logoutOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 150,
        marginLeft: 120,
    },
    logoutText: {
        fontSize: 18,
        color: 'red',
        marginLeft: 10,
    },
    continueButton: {
        backgroundColor: '#51CC62',
        padding: 12,
        borderRadius: 8,
        width: '90%',
    },
    continueButtonText: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: 'bold',
    },

    darkModeSwitchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
        marginTop: 20,
    },
    darkModeText: {
        fontSize: 18,
        color: 'black',
    },
});

export default Tools;
