import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../component/Header';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {BASE_URL} from '../../config';
import axios from 'axios';
import DetailOrder from '../component/orderDetail/DetailOrder';
import {TabRouter, useRoute} from '@react-navigation/native';

const OrderDetail = ({navigation}) => {
  const [data, setData] = useState([]);
  //   console.log("data of detail",data)
  const route = useRoute();
  const {id} = route.params;

  const [loading, setLoading] = useState(false);
  const handleGet = () => {
    if (id) {
        console.log("id of orderDetail",id)
      const url = `${BASE_URL}method=orderDetail&orderId=${id}
    `;

      axios
        .get(url)
        .then(response => {
          console.log('OrderDetailcreen:', response.data.detail);
          setData(response.data.detail);
        })
        .catch(error => {
          if (error.isAxiosError && !error.response) {
            // Network error
            Alert.alert(
              'Network Error',
              'Please check your internet connection.',
            );
          } else {
            // Other errors
            console.error('Error adding item to cart:', error);
            Alert.alert(
              'Error',
              'Something went wrong. Please try again later.',
            );
          }
          setLoading(false);
        });
    }
  };
  useEffect(() => {
    handleGet();
  }, []);

  return (
    <View style={styles.container}>
      <View style={{paddingHorizontal: 12}}>
        <Header
          backgroundColor="#ffffffff"
          onBackPress={() => console.log('back')}
          title={`Order #${id}`}
        />
      </View>

      <View style={styles.headerContainer}>
        <Text style={[styles.heading,{flex:1}]}>Product Name</Text>
        <View style={{flexDirection: 'row',justifyContent:"space-between",flex:1}}>
          <Text style={[styles.heading,{marginLeft:25} ]}>Qty</Text>
          <Text style={styles.heading}>Price</Text>
        </View>
      </View>
      <ScrollView
        style={{paddingHorizontal: 12}}
        showsVerticalScrollIndicator={false}>
        {data.map(item => (
          <DetailOrder
            data={item}
            key={item.productId}
            navigation={navigation}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default OrderDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffffff',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  heading: {
    fontSize: responsiveFontSize(1.7),
    fontFamily: 'Poppins-SemiBold',
    color: 'black',
  },
});
