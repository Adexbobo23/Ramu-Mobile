import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const PaymentFailed = () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulating loading delay for demonstration purposes
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const handleBackToHome = () => {
        navigation.navigate('Dashboard');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Transaction Failed</Text>
            <Text style={styles.subtitle}>Your Payment was Unsuccessful</Text>

            {loading ? (
                <ActivityIndicator size="large" color="#FF0000" style={styles.loading} />
            ) : (
                <Ionicons name="close-circle" size={100} color="#FF0000" style={styles.closeIcon} />
            )}

            <TouchableOpacity style={styles.backButton} onPress={handleBackToHome}>
                <Text style={styles.backButtonText}>Back to Home</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 20,
    },
    title: {
        fontSize: 39,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#FF0000',
    },
    subtitle: {
        fontSize: 17,
        marginBottom: 80,
        textAlign: 'center',
    },
    loading: {
        marginBottom: 20,
    },
    closeIcon: {
        marginBottom: 20,
    },
    backButton: {
        backgroundColor: '#51CC62',
        padding: 15,
        borderRadius: 8,
        width: '80%',
        marginTop: 270,
        height: 52,
    },
    backButtonText: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: 'normal',
        fontSize: 22,
    },
});

export default PaymentFailed;
