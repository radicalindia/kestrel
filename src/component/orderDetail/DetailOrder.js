import {
  Image,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const DetailOrder = ({navigation, data}) => {
  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate("ProductDetail",{id:data.productId})}
        style={styles.container}>
        <View style={styles.paymentIcon}>
          <Image
            source={{uri:data.img}}
            style={{
              width: responsiveWidth(12),
              height: responsiveWidth(12),
              resizeMode: 'cover',
            }}
          />
        </View>

        <View style={{flex: 1, marginLeft: 15}}>
          <Text style={styles.orderText}>{data.product}</Text>
        </View>
        <View style={{flexDirection:"row",flex:1,justifyContent:"space-between"}}>

        <Text style={[styles.priceText]}>{data.qty}</Text>
        <Text style={styles.priceText}>₹{data.price}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default DetailOrder;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffffff',
    // paddingHorizontal:4,
    paddingVertical: responsiveHeight(1.5),
    borderBottomWidth: 0.2,

    borderColor: 'grey',
    marginBottom: 2,
  },
  paymentIcon: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderText: {
    fontSize: responsiveFontSize(1.7),
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    color: '#37474F',
  },
  deliveryText: {
    fontSize: responsiveFontSize(1.3),
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    color: '#FF5552',
  },
  dateText: {
    fontSize: responsiveFontSize(1.3),
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    color: '#37474FB8',
  },
  priceText: {
    fontSize: responsiveFontSize(2),
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    color: '#F37A20',
  },
  priceQuantity: {
    fontSize: responsiveFontSize(2),
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    color: '#F37A20',
    // flex:1,
    marginRight: 70,
  },
});
