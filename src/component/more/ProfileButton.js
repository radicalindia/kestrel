import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ProfileButton = ({name,number}) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        
        {/* <Image
          source={require("../../../assets/img/placeholder.png")}
          style={styles.image}
        /> */}
         <FontAwesome size={responsiveWidth(8)} name="user-circle-o" color="black" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.nameText}>{name}</Text>
        <Text style={styles.numberText}>{number}</Text>
      </View>
    </View>
  );
};

export default ProfileButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal:12
  },
  imageContainer: {
    borderRadius: 50,
    overflow: 'hidden',
  },
  image: {
    width: responsiveWidth(10),
    height: responsiveWidth(10),
    resizeMode:"cover"
  },
  textContainer: {
    flex: 1,
    marginLeft: 9,
  },
  nameText: {
    fontSize: responsiveFontSize(1.8),
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    color: '#3F3F3F',
  },
  numberText: {
    fontSize: responsiveFontSize(1.5),
    fontFamily: 'Poppins-Regular',
    fontWeight: '500',
    color: '#555555',
  },
});
