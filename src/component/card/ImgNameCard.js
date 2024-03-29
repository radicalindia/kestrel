import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

export const ImgNameCard = ({ onPress, item ,}) => {
  return (
    <TouchableOpacity
    onPress={onPress}
      style={styles.card}>
      <Image
        source={{ uri: item?.icon }}
        // source={require("../../../assets/img/snacks.png")}
        style={styles.foodImage}
      />
      <Text style={styles.foodName} numberOfLines={2}>
        {item.categoryName}
      </Text>
    </TouchableOpacity>
  );
};



const styles = StyleSheet.create({
  
  
 
  card: {
    width: '48%',
    borderRadius: 10,
    paddingVertical: responsiveHeight(2),
    marginVertical: responsiveHeight(0.5),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  foodImage: {
    width: responsiveWidth(25),
    height: responsiveHeight(12),
    resizeMode: 'contain',
  },
  foodName: {
    fontSize: responsiveFontSize(1.5),
    color: '#3c3b47ff',
    marginTop: responsiveHeight(1),
    paddingHorizontal: 10,
    fontWeight: '500',
    fontFamily: 'Poppins-Regular',
    textAlign: 'justify',
    fontFamily: "Poppins-SemiBold"
  },
});


