import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/Ionicons';

const ExpandableListItem = ({  description }) => {
 

  return (
    <TouchableOpacity >
     
       
          <Text style={styles.descriptionText}>{description}</Text>
        
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
 descriptionText: {
  
    fontSize: responsiveFontSize(1.3),
   
    letterSpacing: 0.2,
    textAlign: 'left',
 
    color:"#3d3d3dff",
    // fontWeight: '500',
    fontFamily:"Poppins-Medium"
  },
  
});

export default ExpandableListItem;
