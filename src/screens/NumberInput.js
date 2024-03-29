import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Dimensions,
  Keyboard,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import IconButton from '../component/Button/IconButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import NumberInputView from '../component/input/NumberInputView';
import {BASE_URL} from '../../config';
import axios from 'axios';
const NumberInput = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

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

  const isButtonDisabled = inputValue.length !== 10;

  const handleLogin = () => {
    const loginUrl = `${BASE_URL}method=login&mobile=${inputValue},
    `;
    setLoading(true);
    axios
      .get(loginUrl)
      .then(response => {
        // console.log('Login successful:', response.data.response);
        setLoading(false);
        response.data.response.message == 'Not Register'
          ? navigation.navigate('DetailScreen', {inputValue})
          : Alert.alert(
              'OTP',
              `Your OTP is: ${response.data.response.otp}`,
              [
                {
                  text: 'OK',
                  onPress: () =>
                    navigation.navigate('OtpScreens', {inputValue}),
                },
              ],
              {cancelable: false},
            );
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
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : null}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={require('../../assets/img/otp_logo.png')}
          style={styles.img}
          resizeMode="contain"
        />
        <Text style={styles.heading}>Enter Verification Code</Text>
        <Text style={styles.subHeading}>
          We need to verify you. We will send you a one time verification code.
        </Text>

        <TouchableOpacity
          style={{
            marginTop: responsiveHeight(3),
            marginBottom: responsiveHeight(6),
          }}
          onPress={() => console.log('OTP Input pressed')}>
          <NumberInputView
            onChangeText={text => setInputValue(text)}
            value={inputValue}
            onPress={() => console.log('Button pressed')}
          />
        </TouchableOpacity>

        {!isKeyboardOpen && (
          <View style={styles.buttonContainer}>
            <IconButton
              text="next"
              backgroundColor="#c43c02ff"
              onPress={() => handleLogin()}
              icon={
                <AntDesign
                  name="arrowright"
                  size={responsiveFontSize(2.3)}
                  color="#e1e8faff"
                />
              }
              style={styles.button}
              disabled={isButtonDisabled}
            />
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default NumberInput;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingBottom: 10,
    backgroundColor: '#FEFEFE',
  },
  img: {
    width: '100%',
    height: responsiveHeight(40),
    alignSelf: 'center',
  },
  heading: {
    fontSize: responsiveFontSize(2),
    color: '#37474fff',
    marginTop: responsiveHeight(2),
    fontWeight: '500',
    fontFamily: 'Poppins-Medium',
  },
  subHeading: {
    fontSize: responsiveFontSize(1.6),
    color: '#6f7a80ff',
    marginTop: responsiveHeight(1),
    fontWeight: '400',
    fontFamily: 'Poppins-Regular',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    paddingHorizontal: 12,
  },
  button: {
    width: Dimensions.get('window').width - 24, // Subtract padding
  },
});
