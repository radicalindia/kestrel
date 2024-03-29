import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/Ionicons'; // Import Ionicons from react-native-vector-icons

const Header = ({ backgroundColor, onBackPress, title,textColor }) => {
  return (
    <View style={[styles.header, { backgroundColor }]}>
      <TouchableOpacity onPress={onBackPress}>
        <Icon name="arrow-back" size={responsiveWidth(5.5)} color={textColor?textColor:"#37474fff"} />
      </TouchableOpacity>
      <Text style={textColor?[styles.headerText,{color:textColor}]:styles.headerText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingHorizontal: 10,
    height: responsiveHeight(6),
    backgroundColor: '#ffffffff',
    
    
  },
  headerText: {
    fontSize: responsiveFontSize(2.5),
    marginLeft: 10,
    color:"#37474fff",
    fontWeight: '700',
    // fontFamily:"Poppins-SemiBold"
  },
});

export default Header;
