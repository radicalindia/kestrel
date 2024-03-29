import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import ProfileButton from '../component/more/ProfileButton';
import IconTextButton from '../component/more/IconTextButton';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthContext, useAuth } from '../context/AuthContext';
import axios from 'axios';
import { BASE_URL } from '../../config';
const More = ({navigation}) => {
  // const { userProfileData } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

const{logOut,userId}=useAuth()
const [data, setData] = useState([]);
console.log("userProfile",data)
const getUserDetail = async () => {
  

  setLoading(true);
  if (userId) {
    await axios
      .get(`${BASE_URL}method=myprofile&userId=${userId}`)
      .then(response => {
        setData(response.data.response);
        setLoading(false);
      })
      .catch(error => {
        if (error.isAxiosError && !error.response) {
          // Network error
          Alert.alert('Network Error', 'Please check your internet connection.');
        } else {
          // Other errors
          console.error('Error adding item to cart:', error);
          Alert.alert('Error', 'Something went wrong. Please try again later.');
        }
        setLoading(false);
       
      });
  }
};
useEffect(()=>{
getUserDetail()
},[userId,navigation])
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>More</Text>
      <TouchableOpacity onPress={()=>navigation.navigate("ProfileScreen",{name:data.name,email:data.email,mobile:data.mobile})} style={{marginVertical: responsiveHeight(3)}}>
        <ProfileButton 
        name={data.name}
        number={data.mobile}
        
        />
      </TouchableOpacity>
      <ScrollView
        contentContainerStyle={{
          marginTop: responsiveHeight(1),
          paddingBottom: 12,
        }}
        showsVerticalScrollIndicator={false}>
        <IconTextButton
          onPress={() => navigation.navigate("EditProfile")}
          text="Edit Profile"
          icon={
            <MaterialCommunityIcons
              size={responsiveWidth(5)}
              name="pencil-outline"
              color="#236CD9"
            />
          }
        />
        <IconTextButton
          onPress={() =>navigation.navigate("MyAddresses")}
          text="My Address"
          icon={
            <MaterialCommunityIcons
              name="map-marker-outline"
              size={responsiveWidth(5)}
              color="#37474F"
            />
          }
        />
        <IconTextButton
          onPress={() => navigation.navigate("Orders")}
          text="My Orders"
          icon={
            <Ionicons
              name="basket-outline"
              size={responsiveWidth(5)}
              color="#37474F"
            />
          }
        />
        {/* <IconTextButton
          onPress={() => navigation.navigate("WishListEntry")}
          text="My Wishlist"
          icon={
            <MaterialCommunityIcons
              name="lightning-bolt-outline"
              size={responsiveWidth(5)}
              color="#37474F"
            />
          }
        /> */}
        {/* <IconTextButton
          onPress={() => ''}
          text="Chat with us "
          icon={
            <MaterialIcons
              name="chat-bubble-outline"
              size={responsiveWidth(5)}
              color="#C43B01"
            />
          }
        /> */}

        <IconTextButton
          onPress={() => ''}
          text="Talk to our Support"
          icon={
            <MaterialCommunityIcons
              name="phone-outline"
              size={responsiveWidth(5)}
              color="#C43B01"
            />
          }
        />
        {/* <IconTextButton
          onPress={() => ''}
          text="Mail to us"
          icon={
            <MaterialCommunityIcons
              name="email-outline"
              size={responsiveWidth(5)}
              color="#37474F"
            />
          }
        /> */}
        {/* <IconTextButton
          onPress={() => ''}
          text="Message to facebook page"
          icon={
            <FontAwesome
              name="facebook-f"
              size={responsiveWidth(5)}
              color="#236CD9"
            />
          }
        /> */}

        <IconTextButton
          onPress={() => logOut()}
          text="Log out"
          icon={
            <MaterialCommunityIcons
              name="power-standby"
              size={responsiveWidth(5)}
              color="#C43B01"
            />
          }
        />
      </ScrollView>
    </View>
  );
};

export default More;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  heading: {
    fontSize: responsiveFontSize(2.3),
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    color: '#37474F',
    marginTop: responsiveHeight(1),
    paddingHorizontal: 12,
  },
});
