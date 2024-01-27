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

const EditProfile = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  const handleChooseImage = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'image/*',
        copyToCacheDirectory: false,
      });

      if (result.type === 'success') {
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
  
      const data = new FormData();
      data.append('first_name', firstName);
      data.append('last_name', lastName);
      data.append('phone_number', phoneNumber);
      data.append('gender', gender);
      data.append('address', address);
  
      if (profileImage) {
        data.append('profile_image', {
          name: 'profile_image.jpg',
          type: 'image/jpeg',
          uri: profileImage.uri,
        });
      }
  
      const response = await axios.put(apiUrl, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userToken}`,
        },
      });
  
      console.log('API Response:', response.data);
  
      if (response.data && response.data.status) {
        const updatedProfileData = response.data.data;
  
        setFirstName(updatedProfileData.first_name);
        setLastName(updatedProfileData.last_name);
        setPhoneNumber(updatedProfileData.phone_number);
        setGender(updatedProfileData.gender);
        setAddress(updatedProfileData.address);
  
        if (updatedProfileData.profile_image) {
          setProfileImage({ uri: updatedProfileData.profile_image });
        }
  
        Alert.alert('Success', 'Profile edited successfully!');
        navigation.navigate('Personal');
      } else {
        console.error('API Error:', response.data);
  
        if (response.status === 422) {
          const validationErrors = response.data.errors;
          console.log('Validation Errors:', validationErrors);
  
          let errorMessage = 'An error occurred while editing the profile. Please try again.';
  
          if (validationErrors) {
            for (const field in validationErrors) {
              if (validationErrors.hasOwnProperty(field)) {
                errorMessage += `\n${field}: ${validationErrors[field].join(', ')}`;
              }
            }
          }
  
          Alert.alert('Validation Error', errorMessage);
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
      console.error('Full Error Object:', error);
  
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
