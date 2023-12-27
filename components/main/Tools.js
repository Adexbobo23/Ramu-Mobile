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

    const navigateToFAQ = () => {
        navigation.navigate('FAQ');
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

    const navigateTo = (screen) => {
        navigation.navigate(screen);
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

                <TouchableOpacity style={styles.option} onPress={navigateToFAQ}>
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

export default Tools;
