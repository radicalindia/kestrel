import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Alert } from 'react-native';
import { BASE_URL } from '../../config';


export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const [userToken, setUserToken] = useState("");

  const handleOtp = (inputValue, otp) => {
    const otpUrl = `${BASE_URL}method=otp&mobile=${inputValue}&otp=${otp}`;
    setLoading(true);
    axios
      .get(otpUrl)
      .then(async (response) => {
        console.log('Otp successful:', response.data.response);
        setLoading(false);
        if (response.data.response.message === "OTP Verify") {
          await AsyncStorage.setItem('userToken', "kjkdkfdmjd"); 
          await AsyncStorage.setItem('userId', response.data.response.userId);
          setUserId(response.data.response.userId);
          setUserToken("kjkdkfdmjd"); 
        } else {
          Alert.alert("Invalid", "Please Check Your otp");
        }
      })
      .catch(error => {
        if (error.isAxiosError && !error.response) {
          Alert.alert('Network Error', 'Please check your internet connection.');
        } else {
          console.error('Error adding item to cart:', error);
          Alert.alert('Error', 'Something went wrong. Please try again later.');
        }
        setLoading(false);
      });
  };

  const logOut = async () => {
    try {
      // Show confirmation alert
      Alert.alert(
        'Confirmation',
        'Are you sure you want to log out?',
        [
          {
            text: 'No',
            style: 'cancel', // The "No" button will cancel the action
          },
          {
            text: 'Yes',
            onPress: async () => {
              // Perform logout actions
              await AsyncStorage.removeItem("userToken");
              await AsyncStorage.removeItem("userId");
              setUserId(""); 
              setUserToken(""); 
            },
          },
        ],
        { cancelable: false } // Prevent dismissing the alert by tapping outside of it
      );
    } catch (error) {
      console.error('Error during logout:', error);
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    }
  };
  

  const isLoggedIn = async () => {
    try {
      const userToken = await AsyncStorage.getItem("userToken");
      setUserToken(userToken || "");

      const userId = await AsyncStorage.getItem("userId");
      setUserId(userId || "");
    } catch (error) {
      console.error('Error checking login status:', error);
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    }
  };

  useEffect(() => {
    isLoggedIn(); 
  }, []);

  return (
    <AuthContext.Provider value={{ userId, handleOtp, userToken, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);
