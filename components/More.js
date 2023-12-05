import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Modalize } from 'react-native-modalize';
import WebView from 'react-native-webview';

const More = () => {
  const navigation = useNavigation();
  const modalizeRef = React.useRef(null);
  const [isChatModalVisible, setChatModalVisible] = useState(false);

  const toggleChatModal = () => {
    setChatModalVisible(!isChatModalVisible);
    if (modalizeRef.current) {
      modalizeRef.current.open();
    }
  };

  const navigateTo = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>More</Text>

        {/* Navigation options */}
        <TouchableOpacity style={styles.option} onPress={() => navigateTo('Wallet')}>
          <Text style={styles.optionText}>Wallets</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => navigateTo('Transactions')}>
          <Text style={styles.optionText}>Transactions</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => navigateTo('Withdraw')}>
          <Text style={styles.optionText}>Withdrawal</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => navigateTo('Tools')}>
          <Text style={styles.optionText}>Tools</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => navigateTo('StockMarket')}>
          <Text style={styles.optionText}>Stocks Market</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => navigateTo('StockExchange')}>
          <Text style={styles.optionText}>Stocks Exchange</Text>
        </TouchableOpacity>

        {/* Logout option */}
        <TouchableOpacity style={styles.logoutOption} onPress={() => navigateTo('Login')}>
          <Ionicons name="log-out" size={24} color="red" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Live chat button */}
      <TouchableOpacity style={styles.liveChatButton} onPress={toggleChatModal}>
        <Ionicons name="chatbubble-ellipses" size={37} color="white" />
      </TouchableOpacity>

      {/* Navigation bar */}
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navBarItem} onPress={() => navigateTo('Dashboard')}>
          <Ionicons name="home" size={26} color="white" />
          <Text style={styles.navBarText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navBarItem} onPress={() => navigateTo('Discover')}>
          <Ionicons name="trending-up" size={26} color="white" />
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

      {/* Chat Modal */}
      <Modalize
        ref={modalizeRef}
        adjustToContentHeight
        modalStyle={styles.modal}
        handlePosition="inside"
        HeaderComponent={<Text style={styles.modalHeader}>Live Chat</Text>}
      >
        <WebView
        source={{ uri: 'https://embed.tawk.to/656a4193ff45ca7d4785dc57/default' }}
        onLoad={() => console.log('WebView loaded')}
        onError={(error) => console.error('WebView error:', error)}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />

      </Modalize>
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
    marginTop: 50,
  },
  logoutText: {
    fontSize: 18,
    color: 'red',
    marginLeft: 10,
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
  liveChatButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#51CC62',
    borderRadius: 30,
    padding: 10,
    marginBottom: 100,

  },
  modal: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 15,
    backgroundColor: '#51CC62',
    color: 'white',
  },
});

export default More;
