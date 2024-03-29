import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import axios from 'axios';
import * as DocumentPicker from 'expo-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditProfile = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState({
    id: '',
    user_name: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    email: '',
    gender: '',
    address: '',
    profile_image: null,
  });

  const [profileImage, setProfileImage] = useState(userInfo.profile_image);

  const fetchUserInfo = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const userId = await AsyncStorage.getItem('userId');
  
      if (!userToken || !userId) {
        console.error('User Token or User ID not found in AsyncStorage');
        return;
      }
  
      const apiUrl = `https://api-staging.ramufinance.com/api/v1/admin/user/${userId}`;
  
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
  
      console.log('API Response:', response.data); // Log the response data
  
      if (response.data && response.data.status) {
        setUserInfo(response.data.data[0]);
        // Initialize profile image state with user profile image
        setProfileImage(response.data.data[0].profile_image);
      } else {
        console.error('Failed to fetch user info - Response:', response.data);
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };
  

  useEffect(() => {
    // Fetch user info on component mount
    fetchUserInfo();
  }, []);

  const handleChooseImage = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'image/*',
        copyToCacheDirectory: false,
      });
  
      console.log('Document picker result:', result);
  
      if (result.assets && result.assets.length > 0) {
        const selectedImage = result.assets[0];
        console.log('Selected image URI:', selectedImage.uri);
        setProfileImage(selectedImage.uri); 
      } else if (result.type === 'cancel') {
        console.log('User cancelled document picker');
      } else {
        console.log('No image selected or invalid result:', result);
      }
    } catch (error) {
      console.error('Error picking document:', error);
    }
  };
  
  

  const handleSaveChanges = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const userId = await AsyncStorage.getItem('userId');
      console.log('User ID:', userId);
  
      if (!userToken || !userId) {
        console.error('User Token or User ID not found in AsyncStorage');
        return;
      }
  
      const apiUrl = `https://api-staging.ramufinance.com/api/v1/edit-profile/${userId}`;
  
      const data = new FormData();
      data.append('first_name', userInfo.first_name);
      data.append('last_name', userInfo.last_name);
      data.append('phone_number', userInfo.phone_number);
      data.append('gender', userInfo.gender);
      data.append('address', userInfo.address);
  
      console.log('Profile image URI:', profileImage); // Log profileImage URI
  
      if (profileImage) {
        console.log('Profile image URI:', profileImage);
        data.append('profile_image', {
          name: 'profile_image.jpg',
          type: 'image/jpeg',
          uri: profileImage,
        });
      } else {
        console.warn('No profile image selected.');
      }
  
      console.log('Data being sent to backend:', data);
  
      const response = await axios.post(apiUrl, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userToken}`,
        },
      });
  
      console.log('API Response:', response.data);
  
      if (response.data && response.data.status) {
        const updatedProfileData = response.data.data;
  
        setUserInfo(updatedProfileData);
  
        if (updatedProfileData.profile_image) {
          setProfileImage(updatedProfileData.profile_image);
        }
  
        Alert.alert('Success', 'Profile edited successfully!');
        navigation.navigate('Personal');
      } else {
        console.error('API Error:', response.data);
        Alert.alert('Error', 'An error occurred while editing the profile. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again later.');
    }
  };
  
  
  
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Edit Profile</Text>

        <TouchableOpacity onPress={handleChooseImage}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <View style={styles.profileImagePlaceholder}>
              <Text>{profileImage === null ? 'Choose Picture' : 'Picture Selected'}</Text>
            </View>
          )}
        </TouchableOpacity>

        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={styles.input}
          value={userInfo.first_name}
          onChangeText={(text) => setUserInfo({ ...userInfo, first_name: text })}
        />

        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={styles.input}
          value={userInfo.last_name}
          onChangeText={(text) => setUserInfo({ ...userInfo, last_name: text })}
        />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          value={userInfo.phone_number}
          onChangeText={(text) => setUserInfo({ ...userInfo, phone_number: text })}
        />

        <Text style={styles.label}>Gender</Text>
        <TextInput
          style={styles.input}
          value={userInfo.gender}
          onChangeText={(text) => setUserInfo({ ...userInfo, gender: text })}
        />

        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          value={userInfo.address}
          onChangeText={(text) => setUserInfo({ ...userInfo, address: text })}
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
