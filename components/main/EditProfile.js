import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import * as DocumentPicker from 'expo-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';

const EditProfile = ({ navigation }) => {
  const [firstName, setFirstName] = useState('Feat');
  const [lastName, setLastName] = useState('Side');
  const [phoneNumber, setPhoneNumber] = useState('0810000000');
  const [gender, setGender] = useState('male');
  const [address, setAddress] = useState('address');
  const [profileImage, setProfileImage] = useState(null);
  const [base64Image, setBase64Image] = useState(null);

  useEffect(() => {
    if (profileImage) {
      convertImageToBase64(profileImage.uri);
    }
  }, [profileImage]);

  const convertImageToBase64 = async (uri) => {
    try {
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      setBase64Image(base64);
    } catch (error) {
      console.error('Error converting image to base64:', error);
    }
  };

  const handleChooseImage = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'image/*',
        copyToCacheDirectory: false,
      });

      if (result.type === 'success') {
        setProfileImage(result);
      } else {
        console.log('User cancelled document picker');
      }
    } catch (error) {
      console.error('Error picking document:', error);
    }
  };

  const handleSaveChanges = async () => {
    try {
      const user_id = await AsyncStorage.getItem('userId');
      const userToken = await AsyncStorage.getItem('userToken');
  
      if (!user_id || !userToken) {
        console.error('User ID or token not found in AsyncStorage');
        return;
      }
  
      const apiUrl = `https://api-staging.ramufinance.com/api/v1/edit-profile/${user_id}`;
  
      const formData = new FormData();
      formData.append('first_name', firstName);
      formData.append('last_name', lastName);
      formData.append('phone_number', phoneNumber);
      formData.append('gender', gender);
      formData.append('address', address);
  
      if (base64Image) {
        formData.append('profile_image', base64Image);
      }
  
      const response = await axios.put(apiUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${userToken}`,
        },
      });
  
      console.log('API Response:', response.data);
  
      // Check for a successful response
      if (response.data && response.data.success) {
        // Clear form fields and show success alert
        setFirstName('');
        setLastName('');
        setPhoneNumber('');
        setGender('');
        setAddress('');
        setProfileImage(null);
        setBase64Image(null);
  
        Alert.alert('Success', 'Profile edited successfully!');
        navigation.navigate('Personal');
      } else {
        // Handle API error response
        console.error('API Error:', response.data);
  
        // Check for validation errors
        if (response.status === 422) {
          const validationErrors = response.data.errors;
          console.log('Validation Errors:', validationErrors);
  
          // Display error messages to the user
          Alert.alert('Validation Error', validationErrors[0].message);
        } else {
          // Show a generic error message
          Alert.alert('Error', 'An error occurred while editing the profile. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error:', error);
  
      // Show a generic error message for unexpected errors
      Alert.alert('Error', 'An unexpected error occurred. Please try again later.');
    }
  };
  

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Edit Profile</Text>

        <TouchableOpacity onPress={handleChooseImage}>
          {profileImage ? (
            <Image source={{ uri: profileImage.uri }} style={styles.profileImage} />
          ) : (
            <View style={styles.profileImagePlaceholder}>
              <Text>Choose Picture</Text>
            </View>
          )}
        </TouchableOpacity>

        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
        />

        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={(text) => setLastName(text)}
        />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
        />

        <Text style={styles.label}>Gender</Text>
        <TextInput
          style={styles.input}
          value={gender}
          onChangeText={(text) => setGender(text)}
        />

        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={(text) => setAddress(text)}
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 40,
    color: '#51CC62',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginVertical: 10,
    alignSelf: 'center',
  },
  profileImagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#EEE',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    alignSelf: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#51CC62',
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
  },
  saveButton: {
    backgroundColor: '#51CC62',
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    height: 52,
  },
  saveButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'normal',
    fontSize: 22,
  },
});

export default EditProfile;
