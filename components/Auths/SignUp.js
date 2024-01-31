import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignupComponent = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [userNameAvailable, setUserNameAvailable] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [address, setAddress] = useState('');
  const [nationality, setNationality] = useState([]);
  const [isNationalityModalVisible, setNationalityModalVisible] = useState(false);
  const [selectedNationality, setSelectedNationality] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [nationalitySearch, setNationalitySearch] = useState('');
  const [filteredNationality, setFilteredNationality] = useState([]);
  const [isGenderModalVisible, setGenderModalVisible] = useState(false);

  const openGenderModal = () => {
    setGenderModalVisible(true);
  };

  const closeGenderModal = () => {
    setGenderModalVisible(false);
  };

  const handleGenderSelect = (selectedGender) => {
    setGender(selectedGender);
    closeGenderModal();
  };

  useEffect(() => {
    const filteredList = nationality.filter((item) =>
      item.name.toLowerCase().includes(nationalitySearch.toLowerCase())
    );
    setFilteredNationality(filteredList);
  }, [nationalitySearch, nationality]);


  // Check username availability when the username changes
  useEffect(() => {
    const checkUsernameAvailability = async () => {
      try {
        const response = await axios.get(`https://api-staging.ramufinance.com/api/v1/check-username-availabilty?username=${userName}`);
        console.log('API Response:', response.data);
    
        // Assuming the API response contains a field like `status` indicating the availability
        setUserNameAvailable(response.data.status);
      } catch (error) {
        console.error('Error checking username availability:', error.message);
      }
    };
  
    if (userName) {
      checkUsernameAvailability();
    } else {
      // Reset the availability state when the username is empty
      setUserNameAvailable(null);
    }
  }, [userName]);


  useEffect(() => {
    // Fetch the list of nationalities
    const fetchNationality = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v2/all');
        const sortedNationality = response.data.sort((a, b) => a.name.localeCompare(b.name));
        setNationality(sortedNationality);
      } catch (error) {
        console.error('Error fetching nationality:', error.message);
      }
    };

    fetchNationality();
  }, []);

  const toggleNationalityModal = () => {
    setNationalityModalVisible(!isNationalityModalVisible);
  };

  const handleNationalitySelect = (nationality) => {
    setSelectedNationality(nationality);
    toggleNationalityModal();
  };

  // const handleSignup = () => {
  //   navigation.navigate('OtpVerification');
  // };

  const handleSignup = async () => {
    if (!userName || !firstName || !lastName || !phoneNumber || !email || !password || !confirmPassword || !termsAccepted || !address || !selectedNationality || !gender) {
      alert('Please fill in all required fields including the Terms and Privacy checkbox');
      return;
    }
  
    try {
      const signupData = {
        user_name: userName,
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
        email,
        password,
        password_confirmation: confirmPassword,
        address,
        nationality: selectedNationality,
        gender,
      };
  
      // Make the API call using Axios
      const apiUrl = 'https://api-staging.ramufinance.com/api/v1/sign-up';
      const response = await axios.post(apiUrl, signupData);
  
      console.log('Signup response:', response.data);
      await AsyncStorage.setItem('userToken', response.data.data.token);
      await AsyncStorage.setItem('userName', response.data.data.user_name);
      await AsyncStorage.setItem('firstName', response.data.data.first_name);
      showAlert('Registration Successful', 'Kindly verify your email address');
      navigation.navigate('OtpVerification');
    } catch (error) {
      // Handle errors more specifically
      if (error.response) {
        // Handle different HTTP status codes
        if (error.response.status === 400) {
          // Bad Request - User input might be invalid
          alert('Invalid input. Please check your data and try again.');
        } else if (error.response.status === 401) {
          // Unauthorized - User authentication failed
          alert('Authentication failed. Please check your credentials and try again.');
        } else {
          // Other server response errors
          alert('Error response from server. Please try again later.');
        }
  
        console.error('Error response from server:', error.response.data);
        console.error('Status code:', error.response.status);
        console.error('Headers:', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received from server:', error.request);
        alert('No response received from the server. Please try again later.');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error setting up the request:', error.message);
        alert('Error setting up the request. Please check your network connection and try again.');
      } 
    } finally {
      setLoading(false);
    }
  };
  
  const showAlert = (title, message) => {
    Alert.alert(
      title,
      message,
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
      { cancelable: false }
    );
  };
  
  const handleLogin = () => {
    console.log('Log in link pressed');
    navigation.navigate('Login');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleTermsAccepted = () => {
    setTermsAccepted(!termsAccepted);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Sign up</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Username *</Text>
        <TextInput
          placeholder="Enter your username"
          style={styles.input}
          value={userName}
          onChangeText={setUserName}
          required
        />
        {userNameAvailable !== null && (
          <Text style={{ color: userNameAvailable ? 'green' : 'red' }}>
            {userNameAvailable ? 'Username available' : 'Username not available'}
          </Text>
        )}
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>First Name *</Text>
        <TextInput
          placeholder="Enter your first name"
          style={styles.input}
          value={firstName}
          onChangeText={setFirstName}
          required
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Last Name *</Text>
        <TextInput
          placeholder="Enter your last name"
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
          required
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email *</Text>
        <TextInput
          placeholder="Enter your email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          required
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Phone Number *</Text>
        <TextInput
          placeholder="Enter your phone number"
          style={styles.input}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          required
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Gender *</Text>
        <TouchableOpacity style={styles.input2} onPress={openGenderModal}>
          <Text style={styles.inputText}>{gender || 'Select your gender'}</Text>
        </TouchableOpacity>
      </View>

      {/* Gender Selection Modal */}
      <Modal isVisible={isGenderModalVisible}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={closeGenderModal}>
            <Ionicons name="close" size={24} color="#51CC62" />
          </TouchableOpacity>
          <View>
            <Text style={styles.modalTitle}>Select Gender</Text>
            <TouchableOpacity onPress={() => handleGenderSelect('Male')}>
              <Text style={styles.modalOption}>Male</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleGenderSelect('Female')}>
              <Text style={styles.modalOption}>Female</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Address *</Text>
        <TextInput
          placeholder="Enter your address"
          style={styles.input}
          value={address}
          onChangeText={setAddress}
          required
        />
      </View>

      <View style={styles.inputContainer1}>
        <Text style={styles.label1}>Nationality *</Text>
        <TouchableOpacity style={styles.input2} onPress={toggleNationalityModal}>
          <Text style={styles.inputText}>{selectedNationality || 'Select your nationality'}</Text>
        </TouchableOpacity>
      </View>

      {/* Nationality Modal */}
      <Modal isVisible={isNationalityModalVisible}>
        <View style={styles.modalContainer}>
          {/* Close button */}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => {
              toggleNationalityModal();
              setNationalitySearch('');
            }}
          >
            <Ionicons name="close" size={24} color="#51CC62" />
          </TouchableOpacity>

          {/* Search Input */}
          <View style={styles.searchContainer}>
            {/* <Ionicons name="search" size={20} color="#51CC62" /> */}
            <TextInput
              placeholder="Search Nationality"
              style={styles.input}
              value={nationalitySearch}
              onChangeText={setNationalitySearch}
            />
          </View>

          {/* Nationality List */}
          <ScrollView style={styles.nationalityListContainer}>
            {filteredNationality.map((nationalityItem) => (
              <TouchableOpacity
                key={nationalityItem.alpha2Code}
                style={styles.nationalityItem}
                onPress={() => handleNationalitySelect(nationalityItem.name)}
              >
                <Text style={styles.nationalityItemText}>{nationalityItem.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Modal>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password *</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Enter your password"
            secureTextEntry={!showPassword}
            style={styles.input1}
            value={password}
            onChangeText={setPassword}
            required
          />
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconButton}>
            <Ionicons name={showPassword ? 'eye' : 'eye-off'} size={24} color="#51CC62" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Confirm Password *</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Confirm your password"
            secureTextEntry={!showPassword}
            style={styles.input1}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            required
          />
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconButton}>
            <Ionicons name={showPassword ? 'eye' : 'eye-off'} size={24} color="#51CC62" />
          </TouchableOpacity>
        </View>
      </View>
        <Text style={styles.passwordRequirements}>
          At least 8 characters with uppercase letters, numbers, and special characters
        </Text>
      <View style={styles.checkboxContainer}>
        <TouchableOpacity style={styles.checkbox} onPress={toggleTermsAccepted}>
          {termsAccepted ? (
            <Ionicons name="checkbox-outline" size={24} color="#51CC62" />
          ) : (
            <Ionicons name="square-outline" size={24} color="green" />
          )}
          <Text style={styles.checkboxLabel}>I accept the Terms of Use and Privacy Policy *</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogin}>
        <Text style={styles.loginLink}>Already have an account? Log in</Text>
      </TouchableOpacity>

      <Modal isVisible={loading}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#51CC62" />
          <Text style={styles.loadingText}>Signing up...</Text>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  loadingContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#51CC62',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#51CC62',
    textAlign: 'center',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#51CC62',
    borderRadius: 10,
    paddingHorizontal: 10,
    elevation: 2, // Add elevation for Android shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },

  inputContainer: {
    marginBottom: 10,
  },
  label: {
    marginBottom: 5,
    color: '#51CC62',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#51CC62',
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  input1: {
    height: 50,
    borderWidth: 0,
    borderColor: '#51CC62',
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#51CC62',
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 50,
  },

  label1: {
    marginBottom: 5,
    color: '#51CC62',
    fontSize: 16, 
  },
  
  input2: {
    height: 50,
    borderWidth: 1,
    borderColor: '#51CC62',
    paddingHorizontal: 10,
    borderRadius: 10,
    justifyContent: 'center', 
  },

  selectInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#51CC62',
    paddingHorizontal: 10,
    borderRadius: 10,
    justifyContent: 'center',
  },
  selectInputText: {
    color: '#555',
  },
  nationalityItem: {
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    justifyContent: 'center',
    paddingLeft: 10,
  },
  nationalityItemText: {
    color: '#333',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  closeButton: {
    marginTop: 20,
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  iconButton: {
    padding: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 20,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxLabel: {
    marginLeft: 8,
    color: '#51CC62',
  },
  button: {
    backgroundColor: '#51CC62',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
    height: 52,
    elevation: 2, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  buttonText: {
    fontSize: 22,
    fontWeight: 'normal',
    color: 'white',
    textAlign: 'center',
  },
  loginLink: {
    fontSize: 16,
    color: '#51CC62',
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#51CC62',
  },
  modalOption: {
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    justifyContent: 'center',
    paddingLeft: 10,
    marginTop: 10
  },
  modalOptionText: {
    color: '#333',
    fontSize: 16,
  },
});

export default SignupComponent;
