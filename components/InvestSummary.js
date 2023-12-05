import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const InvestSummary = () => {
    const navigation = useNavigation();

    const handlePay = () => { 
        navigation.navigate('PaymentConfirm');
        console.log('Pay button clicked');
    };

    const navigateToInvest = () => {
        navigation.navigate('StockInvest');
    };

    const navigateToDashboard = () => {
        navigation.navigate('Dashboard');
    };

    const navigateToMore = () => {
        navigation.navigate('More');
    };

    const navigateToSell = () => {
        navigation.navigate('Sell');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Investment Summary</Text>
            <Text style={styles.paymentTitle}>Actual Payment</Text>
            <Text style={styles.amount}>N75,650</Text>

            <View style={styles.summaryContainer}>
                <Text style={styles.summaryItem}>Stock Name                             AbcandStock00213</Text>
                <Text style={styles.summaryItem}>Stock Units                                             226units</Text>
            </View>

            <View style={styles.paymentMethods}>
                <Text style={styles.payment}>Payment Method</Text>
                <View style={styles.walletContainer}>
                    <Ionicons name="wallet" size={24} color="black" />
                    <Text style={styles.iconText}>Wallet (N8000.00)</Text>
                    <TouchableOpacity style={styles.radioBox}>
                        <Ionicons name="radio-button-off" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={styles.hrLine} />

                <View style={styles.walletContainer}>
                    <Ionicons name="wallet" size={24} color="black" />
                    <Text style={styles.iconText}>Zenith Bank(***********89)</Text>
                    <TouchableOpacity style={styles.radioBox}>
                        <Ionicons name="radio-button-off" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={styles.hrLine} />
                <View style={styles.bankDetails}>
                    <Ionicons name="card" size={24} color="black" />
                    <Text style={styles.iconText}>Add payment method</Text>
                    <TouchableOpacity style={styles.radioBox}>
                    <Ionicons name="arrow-forward" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                <Text style={styles.fadeText}>Add a new card</Text>
            </View>

            <TouchableOpacity style={styles.payButton} onPress={handlePay}>
                <Text style={styles.payText}>Pay</Text>
            </TouchableOpacity>

            <View style={styles.navBar}>
                <TouchableOpacity style={styles.navBarItem} onPress={navigateToDashboard}>
                    <Ionicons name="home" size={26} color="white" />
                    <Text style={styles.navBarText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navBarItem} onPress={navigateToInvest}>
                    <Ionicons name="analytics" size={26} color="white" />
                    <Text style={styles.navBarText}>Invest</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navBarItem} onPress={navigateToSell}>
                    <Ionicons name="wallet" size={26} color="white" />
                    <Text style={styles.navBarText}>Sell</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navBarItem} onPress={navigateToMore}>
                    <Ionicons name="person" size={26} color="white" />
                    <Text style={styles.navBarText}>More</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FFFFFF',
        paddingVertical: 50,
    },
    title: {
        fontSize: 18,
        fontWeight: 'normal',
        marginBottom: 10,
        textAlign: 'center',
    },
    payment: {
        fontSize: 18,
        fontWeight: 'normal',
        marginBottom: 20,
        textAlign: 'left',
    },
    radioBox: {
        marginLeft: 'auto',
    },
    paymentTitle: {
        fontSize: 15,
        fontWeight: 'normal',
        textAlign: 'center',
        marginBottom: 10,
    },
    iconText: {
        marginLeft: 10, 
    },
    hrLine: {
        borderBottomColor: '#000',
        borderBottomWidth: 1,
        marginBottom: 20,
    },
    amount: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
    },
    summaryContainer: {
        borderWidth: 0,
        borderColor: '#000',
        padding: 10,
        marginBottom: 20,
        borderRadius: 15,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
    summaryItem: {
        fontSize: 16,
        marginBottom: 15,
    },
    paymentMethods: {
        padding: 10,
        marginBottom: 160,
        borderRadius: 15,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
    walletContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        
    },
    bankDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    fadeText: {
        color: '#A9A9A9',
    },
    payButton: {
        backgroundColor: '#51CC62',
        padding: 15,
        borderRadius: 8,
    },
    payText: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    navBar: {
        flexDirection: 'row',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
});

export default InvestSummary;
