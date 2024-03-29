import { StyleSheet, Text, View, Keyboard } from 'react-native'
import React from 'react'
import { OtpInput } from 'react-native-otp-entry';
import { responsiveWidth } from 'react-native-responsive-dimensions';

const OtpInputView = ({handleOtpFilled}) => {
 

  return (
    <OtpInput
      numberOfDigits={4}
      focusColor="grey"
      focusStickBlinkingDuration={500}
      onTextChange={(text) => console.log(text)}
      onFilled={handleOtpFilled} // Call handleOtpFilled when OTP is filled
      theme={{
        containerStyle: styles.container,
        inputsContainerStyle: styles.inputsContainer,
        pinCodeContainerStyle: styles.pinCodeContainer,
        pinCodeTextStyle: styles.pinCodeText,
        focusStickStyle: styles.focusStick,
        focusedPinCodeContainerStyle: styles.activePinCodeContainer
      }}
    />
  )
}

export default OtpInputView

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  inputsContainer: {

  },
  pinCodeContainer: {
    width: responsiveWidth(13),
    height:responsiveWidth(13),
    backgroundColor: "#F0F1F2",
    borderColor: '#f0f1f2ff',
  },
  activePinCodeContainer: {}
})
