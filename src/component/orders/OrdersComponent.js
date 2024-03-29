import {Image, StyleSheet, Text, Touchable, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {responsiveFontSize, responsiveHeight, responsiveWidth} from 'react-native-responsive-dimensions';

const OrdersComponent = ({navigation,data}) => {
  return (
    <View>
      
      <TouchableOpacity onPress={()=>navigation.navigate("OrderDetail",{id:data.orderId})} style={styles.container}>
        <View style={styles.paymentIcon}>
          <Image
            source={require('../../../assets/icon/history.png')}
            style={{
              width: responsiveWidth(4),
              height: responsiveWidth(4),
              resizeMode: 'contain',
            }}
          />
        </View>
        
        <View style={{flex:1,marginLeft:15}}>
          <Text style={styles.orderText}>Order #{data.orderId}</Text>
          <Text style={styles.deliveryText}>{data.orderStatus}</Text>
          {/* <Text style={styles.dateText}>October 14, 2016</Text> */}
          <Text style={styles.dateText}>{data.order_date}</Text>
        </View>
        {/* <Text style={styles.priceQuantity}>2</Text> */}
        <Text style={styles.priceText}>₹{data.amount}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OrdersComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor:"#ffffffff",
    // paddingHorizontal:4,
    paddingVertical:responsiveHeight(1.5),
    borderBottomWidth:0.2,
   
    borderColor:"grey",
    marginBottom:2,
  },
  paymentIcon: {
    backgroundColor: '#F37A20',
    borderRadius: 50,
    width: responsiveWidth(10),
    height: responsiveWidth(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderText:{
    fontSize:responsiveFontSize(1.7),
    fontFamily:"Poppins-Medium",
    fontWeight:"500",
    color:"#37474F"
  },
  deliveryText:{
    fontSize:responsiveFontSize(1.3),
    fontFamily:"Poppins-Regular",
    fontWeight:"400",
    color:"#FF5552"
  },
  dateText:{
    fontSize:responsiveFontSize(1.3),
    fontFamily:"Poppins-Regular",
    fontWeight:"400",
    color:"#37474FB8"
},
priceText:{
    fontSize:responsiveFontSize(2),
    fontFamily:"Poppins-SemiBold",
    fontWeight:"600",
    color:"#F37A20"

  },
priceQuantity:{
    fontSize:responsiveFontSize(2),
    fontFamily:"Poppins-SemiBold",
    fontWeight:"600",
    color:"#F37A20",
    // flex:1,
    marginRight:70

  },
});
