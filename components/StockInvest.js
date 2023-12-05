import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const StockInvest = () => {
    const navigation = useNavigation();
    const [selectedStock, setSelectedStock] = useState('');
    const [amount, setAmount] = useState('');
    const [showStockModal, setShowStockModal] = useState(false);
  
    const stockData = ['Apple', 'Microsoft', 'Google'];
  
    const handleContinue = () => {
      navigation.navigate('InvestSummary');
      console.log('Continue button clicked');
    };
  
    const navigateToMore = () => {
      navigation.navigate('More');
    };
  
    const navigateToDashboard = () => {
      navigation.navigate('Dashboard');
    };
  
    const navigateToPortfolio = () => {
      navigation.navigate('Portfolio');
    };
  
    const navigateToDiscover = () => {
      navigation.navigate('Discover');
    };
  
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.title}>INVEST</Text>
          <View style={styles.formField}>
            <Text style={styles.label}>Select Stock</Text>
            {/* Stock dropdown */}
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => setShowStockModal(true)}
            >
              <Text style={selectedStock ? styles.selectedText : styles.placeholderText}>
                {selectedStock || 'Select Stock'}
              </Text>
              <Ionicons name="caret-down" size={20} color='rgba(0, 0, 0, 0.5)' style={styles.icon} />
            </TouchableOpacity>
            <Modal
              animationType="slide"
              transparent={true}
              visible={showStockModal}
              onRequestClose={() => setShowStockModal(false)}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  {stockData.map((stock, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        setSelectedStock(stock);
                        setShowStockModal(false);
                      }}
                      style={styles.modalItem}
                    >
                      <Text>{stock}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </Modal>
          </View>
          <View style={styles.formField}>
            <Text style={styles.label}>Amount</Text>
            {/* Amount field */}
            <TextInput
              style={styles.input}
              placeholder="Enter amount"
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
            />
          </View>
          <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </ScrollView>
        <View style={styles.navBar}>
          <TouchableOpacity style={styles.navBarItem} onPress={navigateToDashboard}>
            <Ionicons name="home" size={26} color="white" />
            <Text style={styles.navBarText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navBarItem} onPress={navigateToDiscover}>
            <Ionicons name="trending-up" size={26} color="white" />
            <Text style={styles.navBarText}>Discover</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navBarItem} onPress={navigateToPortfolio}>
            <Ionicons name="briefcase" size={26} color="white" />
            <Text style={styles.navBarText}>Portfolio</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navBarItem} onPress={navigateToMore}>
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
        justifyContent: 'center',
        paddingVertical: 50,
    },
    scrollContainer: {
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#51CC62',
        marginBottom: 70,
        textAlign: 'center',
    },
    formField: {
        marginBottom: 20,
        width: '90%',
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#51CC62',
        borderRadius: 8,
        paddingHorizontal: 12,
        width: '100%',
        marginBottom: 220,
    },
    dropdown: {
        height: 50,
        borderWidth: 1,
        borderColor: '#51CC62',
        borderRadius: 8,
        paddingHorizontal: 12,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
    },
    label: {
        color: '#000',
        marginBottom: 5,
    },
    placeholderText: {
        color: 'gray',
        flex: 1,
    },
    selectedText: {
        color: '#000',
        flex: 1,
    },
    icon: {
        paddingRight: 5,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
        margin: 20,
        padding: 20,
        borderRadius: 8,
    },
    modalItem: {
        paddingVertical: 10,
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
        height: 52,
    },
    continueButtonText: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: 'normal',
        fontSize: 22,
    },
});

export default StockInvest;
