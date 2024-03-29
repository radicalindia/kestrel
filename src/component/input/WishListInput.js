import React from 'react';
import {StyleSheet, View, TextInput, Text} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';

const WishListInput = ({
  placeholder,
  value,
  onChangeText,
  icon,
  keyboardType,
  
}) => {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.icon}>{icon}</View>
      {/* {value ?  */}
        <View style={{width: '100%'}}>
         {value&&
         
         <Text
            style={{
              fontSize: responsiveFontSize(1.8),
              fontWeight: '400',
              fontFamily: 'Poppins-Regular',
            }}>
           {placeholder}
          </Text>}
          <TextInput
            style={value?styles.input2:styles.input1}
            keyboardType={keyboardType}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
          />
        </View>
    {/* //   ) : (
    //     <TextInput
    //       style={styles.input1}
    //       keyboardType={keyboardType}
    //       placeholder={placeholder}
    //       value={value}
    //       onChangeText={onChangeText}
    //     />
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f1f2ff',
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  input1: {
    flex: 1,
    paddingVertical: responsiveHeight(1.2),
    fontSize: responsiveFontSize(1.8),
    fontWeight: '400',
    fontFamily: 'Poppins-Regular',
  },
  input2: {
    flex: 1,
    paddingVertical: responsiveHeight(0.1),
    fontSize: responsiveFontSize(1.8),
    fontWeight: '400',
    fontFamily: 'Poppins-Regular',
  },
  icon: {
    marginRight: 10,
  },
});

export default WishListInput;
