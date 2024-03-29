import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Entypo from 'react-native-vector-icons/Entypo';

const DateComponent = ({
  placeholder = 'Search',

  onIconClick,
  bgColor,
  rightPress,
}) => {
  return (
    <View style={[styles.searchContainer, {backgroundColor: bgColor}]}>
      <View  style={styles.iconContainer}>
        <Image
          style={styles.searchIcon}
          source={require('../../../assets/icon/calendar.png')}
        />
      </View>

      <Text style={styles.searchInput}>{placeholder}</Text>

      <TouchableOpacity onPress={rightPress} style={styles.iconContainer}>
        <TouchableOpacity onPress={onIconClick} style={styles.iconContainer}>
         <Entypo
         
         
         name="chevron-thin-down"
         size={responsiveWidth(3.3)}
         color="#37474fff"
         />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'grey',
    borderRadius: 10,
    paddingHorizontal: 10,
    height: responsiveHeight(5.1),
  },
  searchInput: {
    flex: 1,
    marginLeft: responsiveWidth(2),
  
    color: '#6b777dff',
    fontSize: responsiveFontSize(1.5),
    fontWeight: '400',
    fontFamily:"Poppins-Regular"
  },
  searchIcon: {
   width:responsiveWidth(4),
   height:responsiveWidth(4),
   resizeMode:"contain"
  },
  iconContainer: {
    padding: responsiveWidth(2),
  },
});

export default DateComponent;
