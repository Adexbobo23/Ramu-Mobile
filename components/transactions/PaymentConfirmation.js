import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const PaymentConfirmation = () => {
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
            <Text style={styles.title}>Confirmation</Text>
            <Text style={styles.subtitle}>Your Payment was Successful</Text>

            {loading ? (
                <ActivityIndicator size="large" color="#51CC62" style={styles.loading} />
            ) : (
                <Ionicons name="checkmark-circle" size={100} color="#51CC62" style={styles.checkmark} />
            )}

            <TouchableOpacity style={styles.backButton} onPress={handleBackToHome}>
                <Text style={styles.backButtonText}>Home</Text>
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
        color: '#51CC62'
    },
    subtitle: {
        fontSize: 17,
        marginBottom: 80,
        textAlign: 'center',
    },
    loading: {
        marginBottom: 20,
    },
    checkmark: {
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
        fontSize: 15,
    },
});

export default PaymentConfirmation;
