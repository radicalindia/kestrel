import React, { useState } from 'react';
import { StyleSheet, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../component/Header';
import WishListInput from '../component/input/WishListInput';
import SecureInput from '../component/input/SecureInput';
import IconButton from '../component/Button/IconButton';

const EditProfile = () => {
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  return (
    <View style={styles.container}>
      <Header
        backgroundColor="#ffffff"
        onBackPress={() => console.log('back')}
        title="Edit Profile"
        textColor="black"
      />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/img/placeholder.png')}
            style={styles.image}
          />
          <TouchableOpacity style={styles.cameraContainer}>
            <Feather
              name="camera"
              size={responsiveFontSize(1.9)}
              color="#ffffff"
            />
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: responsiveHeight(3) }}>
          <WishListInput
            placeholder="Full Name"
            onChangeText={(text) => setFullName(text)}
            value={fullName}
            keyboardType="default"
            icon={
              <Ionicons
              name="people-circle-outline"
              size={responsiveFontSize(3)}
              color="black"
              
            />
            }
          />
        </View>

        <View style={{ marginTop: responsiveHeight(3) }}>
          <SecureInput
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            value={password}
            keyboardType="default"
            icon={
              <MaterialCommunityIcons
                name="lock-outline"
                size={responsiveFontSize(3)}
                color="black"
              />
            }
          />
        </View>

        <View style={{ marginTop: responsiveHeight(3) }}>
          <WishListInput
            placeholder="Phone Number"
            onChangeText={(text) => setPhoneNumber(text)}
            value={phoneNumber}
            keyboardType="default"
            icon={
              <MaterialCommunityIcons
                name="phone-outline"
                size={responsiveFontSize(3)}
                color="black"
              />
            }
          />
        </View>

        <View style={{ position:"absolute",bottom:10,left:0,right:0 }}>
          <IconButton
            text="Save to Wishlist"
            backgroundColor="#c43c02ff"
            onPress={() => ''}
            icon={
              <MaterialCommunityIcons
                name="content-save-outline"
                size={responsiveFontSize(2.3)}
                color="#e1e8faff"
              />
            }
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 12,
    backgroundColor: '#ffffff',
  },
  imageContainer: {
    position: 'relative',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    borderRadius: 100,
    width: responsiveWidth(40),
    height: responsiveWidth(40),
    resizeMode: 'cover',
  },
  cameraContainer: {
    position: 'absolute',
    bottom: 16,
    backgroundColor: 'orange',
    borderRadius: 50,
    padding: responsiveWidth(3),
    zIndex: 1,
    right:110
  },
});
