import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Alert, ScrollView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PersonalProfile = () => {
  const [userData, setUserData] = useState({
    profileImage: null,
    fullName: '',
    userId: '',
    firstName: '',
    lastName: '',
    username: '',
    emailAddress: '',
    phoneNumber: '',
    address: '',
    nationality: '',
    isEmailVerified: false,
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const user_id = await AsyncStorage.getItem('userId');
        const userToken = await AsyncStorage.getItem('userToken');

        if (!user_id || !userToken) {
          console.error('User ID or token not found in AsyncStorage');
          return;
        }

        const apiUrl = `https://api-staging.ramufinance.com/api/v1/get-profile/${user_id}`;
        const response = await axios.get(apiUrl, {
          headers: {
            'Authorization': `Bearer ${userToken}`,
          },
        });

        console.log('API Response:', response.data);

        // Destructure the response data
        const {
          profile_image,
          first_name,
          last_name,
          id,
          user_name,
          email,
          phone_number,
          address,
          nationality,
          is_email_verified,
        } = response.data.data;

        setUserData({
          profileImage: profile_image,
          fullName: `${first_name} ${last_name}`,
          userId: id,
          firstName: first_name,
          lastName: last_name,
          username: user_name,
          emailAddress: email,
          phoneNumber: phone_number,
          address: address,
          nationality: nationality,
          isEmailVerified: is_email_verified,
        });
      } catch (error) {
        console.error('Error fetching user profile:', error);

        // Print the response status and data if available
        if (error.response) {
          console.log('Error Response Data:', error.response.data);
          console.log('Error Response Status:', error.response.status);
        }

        Alert.alert(
          'Error',
          'An error occurred while fetching the user profile. Please try again.'
        );
      }
    };

    fetchUserProfile();
  }, []);

  // Logging the state to check if it's getting updated
  console.log('User Data State:', userData);

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Profile</Text>

        {/* Profile Image */}
        {userData.profileImage && (
          <Image source={{ uri: userData.profileImage }} style={styles.profileImage} />
        )}

        {/* Full Name */}
        <Text style={styles.fullName}>{userData.fullName}</Text>

        {/* User ID */}
        <Text style={styles.user}>USER ID</Text>
        <Text style={styles.userId}>{userData.userId}</Text>

        {/* Labels and Information */}
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Text style={styles.label}>First Name</Text>
            <Text style={styles.infoText}>{userData.firstName}</Text>
            <View style={styles.underline} />
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.label}>Last Name</Text>
            <Text style={styles.infoText}>{userData.lastName}</Text>
            <View style={styles.underline} />
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.label}>Username</Text>
            <Text style={styles.infoText}>{userData.username}</Text>
            <View style={styles.underline} />
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.label}>Email Address</Text>
            <Text style={styles.infoText}>{userData.emailAddress}</Text>
            <View style={styles.underline} />
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.label}>Phone Number</Text>
            <Text style={styles.infoText}>{userData.phoneNumber}</Text>
            <View style={styles.underline} />
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.label}>Address</Text>
            <Text style={styles.infoText}>{userData.address}</Text>
            <View style={styles.underline} />
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.label}>Nationality</Text>
            <Text style={styles.infoText}>{userData.nationality}</Text>
            <View style={styles.underline} />
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.label}>Email Verified</Text>
            <Text style={styles.infoText}>{userData.isEmailVerified ? 'Yes' : 'No'}</Text>
            <View style={styles.underline} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 70,
    color: '#51CC62',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginVertical: 10,
  },
  fullName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  userId: {
    fontSize: 16,
    color: '#888',
    marginBottom: 20,
  },
  user: {
    fontSize: 16,
    color: '#000',
    marginTop: 20,
    fontWeight: 'bold',
  },
  infoContainer: {
    width: '100%',
  },
  infoItem: {
    flexDirection: 'column',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color : '#51CC62'
  },
  underline: {
    borderBottomWidth: 1,
    borderBottomColor: '#51CC62',
    marginBottom: 5,
  },
  infoText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default PersonalProfile;
