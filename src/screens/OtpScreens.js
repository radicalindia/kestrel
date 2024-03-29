import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Keyboard,
  Dimensions,
  Alert,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import IconButton from '../component/Button/IconButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import OtpInputView from '../component/input/OtpInputView';
import {useRoute} from '@react-navigation/native';
import {BASE_URL} from '../../config';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuth} from '../context/AuthContext';
const OtpScreens = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [otp, setOtp] = useState('');
  const {handleOtp} = useAuth();
  const route = useRoute();

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

  const handleOtpFilled = otp => {
    console.log(`OTP is ${otp}`);
    setOtp(otp);
    // setBtnStatus(!(otp.length < 6));
    Keyboard.dismiss();
  };
  const isButtonDisabled = otp.length !== 4;

  const {inputValue} = route.params;

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
        <Text style={styles.subHeading}>We have sent SMS to:</Text>
        <Text style={styles.numberHeading}>01XXXXXXXXXX</Text>
        <View style={{paddingBottom: responsiveHeight(10)}}>
          <TouchableOpacity
            style={{marginTop: responsiveHeight(3)}}
            onPress={() => console.log('OTP Input pressed')}>
            <OtpInputView handleOtpFilled={handleOtpFilled} />
          </TouchableOpacity>

          <View style={styles.row}>
            <TouchableOpacity>
              <Text style={styles.resend}>Resend OTP</Text>
            </TouchableOpacity>
            <Text style={styles.change}>Change Phone Number</Text>
          </View>
        </View>
        {!isKeyboardOpen && (
          <View style={styles.buttonContainer}>
            <IconButton
              text="next"
              backgroundColor="#c43c02ff"
              // onPress={() => navigation.navigate('DetailScreen')}
              onPress={() => handleOtp(inputValue, otp)}
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

export default OtpScreens;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingBottom: 50,
    backgroundColor: '#FEFEFE',
  },
  img: {
    width: '100%',
    height: responsiveHeight(40),
    alignSelf: 'center',
  },
  heading: {
    fontSize: responsiveFontSize(2),
    color: '#37474F',
    fontWeight: '600',
    marginTop: responsiveHeight(2),
    fontFamily: 'Poppins-Meduim',
  },
  subHeading: {
    fontSize: responsiveFontSize(1.5),
    color: '#6f7a80ff',
    marginTop: responsiveHeight(2),
    fontFamily: 'Poppins-Regular',
  },
  numberHeading: {
    fontSize: responsiveFontSize(2),
    fontFamily: 'Poppins-Bold',
    color: '#37474fff',
    fontWeight: '600',
    marginTop: responsiveHeight(0.5),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: responsiveHeight(4),
  },
  resend: {
    fontSize: responsiveFontSize(1.6),
    color: '#f59958ff',
    fontWeight: '400',
    fontFamily: 'Poppins-Regular',
  },
  change: {
    fontSize: responsiveFontSize(1.6),
    color: '#6f7a80ff',
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
    width: Dimensions.get('window').width - 24,
  },
});
