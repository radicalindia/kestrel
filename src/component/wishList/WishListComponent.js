import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';

const WishListComponent = ({onPress}) => {
  return (
    <TouchableOpacity  onPress={onPress} style={styles.container}>
      <Image
        source={require('../../../assets/img/snacks.png')}
        style={styles.image}
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>
          Nestle Nido Full Cream Milk Powder Instant
        </Text>
        <View style={styles.priceContainer}>
          <Text style={styles.underLinePrice}>₹342</Text>
          <Text style={styles.price}>₹270</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default WishListComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  image: {
    height: responsiveWidth(20),
    width: responsiveWidth(20),
    resizeMode: 'cover',
    borderRadius: 10,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: responsiveFontSize(1.5),
    fontWeight: '400',
    fontFamily:"Poppins-Medium"
  },
  priceContainer: {
   
    marginTop: 5,
  },
  underLinePrice: {
    fontSize: responsiveFontSize(1.7),
    textDecorationLine: 'line-through',
    marginRight: 10,
    color: '#aeb4b8ff',
    marginTop: 5,
    fontWeight: '600',
    fontFamily:"Poppins-Medium"
  },
  price: {
    fontSize: responsiveFontSize(2),
   
    color: '#f58b3bff',
    marginTop: 5,
    fontWeight: '400',
    fontFamily:"Poppins-SemiBold"

  },
});
