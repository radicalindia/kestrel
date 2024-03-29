import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity } from 'react-native';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/Ionicons';

const SecureInput = ({
  placeholder,
  value,
  onChangeText,
  icon,
  keyboardType,
}) => {
  const [secureEntry, setSecureEntry] = useState(true);

  return (
    <View style={styles.inputContainer}>
      <View style={styles.inputWrapper}>
        <View style={styles.icon}>{icon}</View>
        <View>
          {value && (
            <Text
              style={{
                fontSize: responsiveFontSize(1.8),
                fontWeight: '400',
                fontFamily: 'Poppins-Regular',
              }}>
              {placeholder}
            </Text>
          )}
          <TextInput
            style={value ? styles.input2 : styles.input1}
            keyboardType={keyboardType}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureEntry}
          />
        </View>
      </View>
      <TouchableOpacity
        style={styles.eyeIcon}
        onPress={() => {
          setSecureEntry(!secureEntry);
        }}>
        <Icon
          name={secureEntry ? 'eye-off-outline' : 'eye-outline'}
          size={responsiveFontSize(3)}
          color="black"
        />
      </TouchableOpacity>
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
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  input1: {
    paddingVertical: responsiveHeight(1.2),
    fontSize: responsiveFontSize(1.8),
    fontWeight: '400',
    fontFamily: 'Poppins-Regular',
  },
  input2: {
    paddingVertical: responsiveHeight(0.1),
    fontSize: responsiveFontSize(1.8),
    fontWeight: '400',
    fontFamily: 'Poppins-Regular',
  },
  icon: {
    marginRight: 10,
  },
  eyeIcon: {
    marginLeft: 10, 
  },
});

export default SecureInput;
