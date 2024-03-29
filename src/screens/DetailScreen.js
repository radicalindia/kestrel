import React, {useState, useEffect} from 'react';
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../component/Header';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {launchImageLibrary} from 'react-native-image-picker'; 
import IconButton from '../component/Button/IconButton';
import TextInputView from '../component/input/TextInputView';
import { BASE_URL } from '../../config';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';

const DetailScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const route =useRoute()
  useEffect(() => {
    setIsButtonDisabled(!name || !email);
  }, [name, email]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setIsKeyboardOpen(true),
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setIsKeyboardOpen(false),
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const selectImage = () => {
    const options = {
      maxWidth: 2000,
      maxHeight: 2000,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, response => {
      console.log('Response = ', response.assets[0].uri);
      setSelectedImage(response.assets[0].uri);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {
          uri: response.uri,
        };
      }
    });
  };
 
 


  const handleSubmit = () => {
    const { inputValue } = route.params;
  
    console.log("my number ", inputValue);
  
    const registerUrl = `${BASE_URL}method=register&name=${name}&mobile=${inputValue}&email=${email}`;
    setLoading(true);
    axios
      .get(registerUrl)
      .then(response => {
        console.log('Registration successful:', response.data.response);
        // Assuming the registration process returns success
        // Now, proceed to get OTP
        handleLogin(inputValue); // Call handleLogin to get OTP
      })
      .catch(error => {
        console.error('Registration failed:', error);
        setLoading(false);
      });
  };
  
  const handleLogin = (inputValue) => {
    const loginUrl = `${BASE_URL}method=login&mobile=${inputValue}`;
    setLoading(true);
    axios
      .get(loginUrl)
      .then(response => {
        // console.log('Login successful:', response.data.response);
        setLoading(false);
        response.data.response.message === 'Not Register'
          ? navigation.navigate('DetailScreen', { inputValue })
          : Alert.alert(
              'OTP',
              `Your OTP is: ${response.data.response.otp}`,
              [
                {
                  text: 'OK',
                  onPress: () =>
                    navigation.navigate('OtpScreens', {
                      inputValue,
                      otp: response.data.response.otp // Pass OTP to OTP screen
                    }),
                },
              ],
              { cancelable: false },
            );
      })
      .catch(error => {
        console.error('Login failed:', error);
        setLoading(false);
      });
  };
  
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : null}>
      <ScrollView contentContainerStyle={styles.container}>
        <Header
          backgroundColor="#ffffffff"
          onBackPress={() => console.log('back')}
          title="Your Information"
        />
        <Text style={styles.text}>
          It looks like you don't have an account with this number. Please let
          us know some information for a secure service.
        </Text>
        <View>
          {selectedImage ? (
            <View style={styles.realmageContainer}>

            <TouchableOpacity onPress={selectImage}>
              <Image source={{uri: selectedImage}} style={styles.realimage} />
            </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.imageContainer}>
              <TouchableOpacity onPress={selectImage}>
                {/* <Image
                source={require('../../assets/icon/addCamera.png')}
                style={styles.image}
              /> */}

                <MaterialCommunityIcons
                  name="camera-plus-outline"
                  size={responsiveFontSize(5)}
                  color="black"
                />
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={{marginTop: responsiveHeight(10),marginBottom:responsiveHeight(3)}}>
          <TextInputView
            placeholder="Full Name"
            onChangeText={text => setName(text)}
            value={name}
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
        <View style={{marginBottom:responsiveHeight(6)}}>
          <TextInputView
            placeholder="Email Address"
            onChangeText={text => setEmail(text)}
            keyboardType="email-address"
            value={email}
            icon={
              <Ionicons
                name="people-circle-outline"
                size={responsiveFontSize(3)}
                color="black"
              />
            }
          />
        </View>

        {!isKeyboardOpen && (
          <View
            style={{
              position: 'absolute',
              bottom: 10,
              left: 0,
              right: 0,
              paddingHorizontal: 12,
            }}>
            <IconButton
              text="next"
              backgroundColor="#c43c02ff"
              // onPress={() => navigation.navigate('MyTabs')}
              onPress={handleSubmit}
              icon={
                <AntDesign
                  name="arrowright"
                  size={responsiveFontSize(2.3)}
                  color="#e1e8faff"
                />
              }
              disabled={isButtonDisabled}
            />
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 12,
    paddingBottom: 100,
    backgroundColor: '#ffffffff',
    paddingHorizontal: 12,
  },
  text: {
    fontSize: responsiveFontSize(1.5),
    textAlign: 'justify',
    marginTop: responsiveHeight(6),
    color: '#778287ff',
    fontWeight: '400',
    fontFamily: 'Poppins-Regular',
  },
  imageContainer: {
    alignSelf: 'center',
    marginTop: responsiveHeight(4),
    backgroundColor: '#e3e5e6ff',
    borderRadius: 100,
    padding: responsiveWidth(8),
  },
  image: {
    width: responsiveWidth(13),
    height: responsiveWidth(13),
  },
  realmageContainer: {
    alignSelf: 'center',
    marginTop: responsiveHeight(4),
    // backgroundColor: '#e3e5e6ff',
    borderRadius: 100,
    // padding: responsiveWidth(2),
  },
  realimage: {
    width: responsiveWidth(30),
    height: responsiveWidth(30),
    borderRadius: 100,
    overflow: "hidden",
}
});
