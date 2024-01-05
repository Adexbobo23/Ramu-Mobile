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
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [base64Image, setBase64Image] = useState(null);

  useEffect(() => {
    if (profileImage) {
      convertImageToBase64(profileImage.uri);
    }
  }, [profileImage]);

  const convertImageToBase64 = async (contentUri) => {
    try {
      const fileUri = contentUri.replace('file://', '');
      const base64 = await FileSystem.readAsStringAsync(fileUri, {
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
        convertImageToBase64(result.uri);
        setProfileImage(result);
      } else if (result.type === 'cancel') {
        console.log('User cancelled document picker');
        // Optionally, you can provide feedback to the user that they canceled the operation.
        // For example, you can show a message or not clear the existing image.
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
  
      const data = {
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
        gender: gender,
        address: address,
        profile_image: base64Image, 
      };
  
      const response = await axios.put(apiUrl, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
      });
  
      console.log('API Response:', response.data);
  
      if (response.data && response.data.status) {
        // Assuming the response.data.data contains the updated profile data
        const updatedProfileData = response.data.data;
  
        // Update local state or context with the new data
        setFirstName(updatedProfileData.first_name);
        setLastName(updatedProfileData.last_name);
        setPhoneNumber(updatedProfileData.phone_number);
        setGender(updatedProfileData.gender);
        setAddress(updatedProfileData.address);
        // ...
  
        Alert.alert('Success', 'Profile edited successfully!');
        navigation.navigate('Personal');
      } else {
        console.error('API Error:', response.data);
  
        if (response.status === 422) {
          const validationErrors = response.data.errors;
          console.log('Validation Errors:', validationErrors);
          Alert.alert(
            'Validation Error',
            'An error occurred while editing the profile. Please try again.'
          );
          console.log('Validation Response:', response);
        } else {
          Alert.alert(
            'Error',
            'An error occurred while editing the profile. Please try again.'
          );
        }
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert(
        'Error',
        'An unexpected error occurred. Please try again later.'
      );
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default EditProfile;
