import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';

const TextInputView = ({ placeholder, value, onChangeText, icon, keyboardType }) => {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.icon}>{icon}</View>
      <TextInput
        style={styles.input}
        keyboardType={keyboardType}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
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
    paddingVertical: 2, // Added vertical padding for better alignment
  },
  input: {
    flex: 1,
    paddingVertical: responsiveHeight(1.2),
    fontSize: responsiveFontSize(1.8),
    fontWeight: '400',
    fontFamily: 'Poppins-Regular',
  },
  icon: {
    marginRight: 10, // Adjust as needed
  },
});

export default TextInputView;
