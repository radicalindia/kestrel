import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import LeftIconButton from '../Button/LeftIconButton';
import AntDesign from 'react-native-vector-icons/AntDesign';

const SearchComponent = ({onPress,data}) => {
 
    


  return (
    <TouchableOpacity onPress={onPress}    style={styles.container}>
      <Image
        // source={require('../../../assets/img/namkeen.png')}
        source={{uri:data.photo1}}
        style={styles.image}
      />
      {/* {labelText && <View style={styles.badgeContainer}>
        <Text style={styles.badgeText}>{labelText}%</Text>
        <Text style={styles.badgeText}>OFF</Text>
      </View>} */}
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>
   {data?.productName}
        </Text>
        <Text style={styles.description}>
      {data?.description}
        </Text>

        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
          {/* <View style={styles.priceContainer}> */}
            <Text style={styles.price}>₹{data?.offerPrice}</Text>
            <Text style={styles.underLinePrice}>₹{data?.mrp}</Text>
          {/* </View> */}
          {/* <TouchableOpacity style={styles.addButton} onPress={addCart}>
            <Text style={styles.buttonText}>Add</Text>
            <AntDesign name="plus" size={responsiveWidth(4)} color="green" style={styles.plusIcon} />
          </TouchableOpacity> */}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SearchComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    position: 'relative',
  },
  image: {
    height: responsiveWidth(20),
    width: responsiveWidth(20),
    resizeMode: 'cover',
    borderRadius: 10,
  },
  badgeContainer: {
    position: 'absolute',
    top: '50%',
    left: 0,
    backgroundColor: '#f27b1fff',
    transform: [{ translateY: -40 }],
    zIndex: 1,
    width: responsiveWidth(10),
    height: responsiveWidth(10),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50
  },
  badgeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: responsiveFontSize(1.5),
    fontFamily: "Poppins-Regular"
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  title: {
    fontSize: responsiveFontSize(1.5),
    // fontWeight: '400',
    fontFamily: "Poppins-ExtraBold"
  },
  priceContainer: {
    marginTop: 5,
    // flexDirection:"row",
    // justifyContent:"space-between",
    // alignItems:"center"
  },
  underLinePrice: {
    fontSize: responsiveFontSize(1.4),
    textDecorationLine: 'line-through',
    color: '#aeb4b8ff',
    marginTop: 1,
    fontWeight: '600',
    fontFamily: "Poppins",
    marginLeft:2,
    marginBottom:3
  },
  price: {
    fontSize: responsiveFontSize(2),
    color: '#f58b3bff',
    marginTop: 1,
    fontWeight: '600',
    fontFamily: "Poppins-SemiBold"
  },
  addButton: {
    backgroundColor: '#ffffff',
    padding: 5,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius:25,
    borderWidth:0.5,
    borderColor:"grey"
  },
  buttonText: {
    color: 'black',
    fontSize: responsiveFontSize(1.5),
    fontWeight: '600',
    fontFamily: "Poppins-Bold",
  },
  plusIcon: {
    marginLeft: 5,
  },
  description:{
    fontSize: responsiveFontSize(1.2),
    // fontWeight: '400',
    fontFamily: "Poppins-Medium"
  }
});
