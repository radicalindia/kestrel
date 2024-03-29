import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import OrdersComponent from '../component/orders/OrdersComponent';
import Header from '../component/Header';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { BASE_URL } from '../../config';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';

const Orders = ({navigation}) => {
  const isFocused=useIsFocused()
  const [data, setData] = useState([]);
  // console.log("data of orderScreen",data)
  const{userId}=useAuth()

  const [loading, setLoading] = useState(false);
  const handleGet = () => {
    if(userId){
      const url = `${BASE_URL}method=myOrder&userId=${userId}
      `;
     
      axios
        .get(url)
        .then(response => {
          // console.log('orderScreen:', response.data.addressBook);
          setData(response.data.addressBook);
         
        })
        .catch(error => {
          if (error.isAxiosError && !error.response) {
            // Network error
            Alert.alert('Network Error', 'Please check your internet connection.');
          } else {
            // Other errors
            console.error('Error adding item to cart:', error);
            Alert.alert('Error', 'Something went wrong. Please try again later.');
          }
          setLoading(false);
         
        });
    }
    
  };
  useEffect(() => {
    handleGet();
  }, [isFocused]);
  return (
    <View style={styles.container}>
      <View style={{paddingHorizontal: 12}}>
        <Header
          backgroundColor="#ffffffff"
          onBackPress={() =>navigation.goBack()}
          title="Orders"
        />
      </View>

      <View style={styles.headerContainer}>
        <Text style={[styles.heading]}>Product Detail</Text>
        <Text style={styles.heading}>Price</Text>
      </View>
      <ScrollView


        style={{paddingHorizontal: 12,flex:1}}
        showsVerticalScrollIndicator={false}>

          {
          data==null?<Text style={{fontSize:responsiveFontSize(1.9),alignSelf:"center"}}>Please buy something</Text>
          
          :data.map((item)=>(
            
            <OrdersComponent key={item.orderId} data={item} navigation={navigation} />
          ))
          
          
          }
        
      </ScrollView>
    </View>
  );
};

export default Orders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffffff',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    alignItems: 'center', // Align items vertically centered
  },
  heading:{
    fontSize:responsiveFontSize(1.7),
    fontFamily:"Poppins-SemiBold",
    color:"black"
  },
 
});
