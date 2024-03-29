import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import MyProductCard from '../component/my bag/MyProductCard';
import Button from '../component/Button/Button';
import DateComponent from '../component/date&time/DateComponent';
import TimeComponent from '../component/date&time/TimeComponent';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import IconButton from '../component/Button/IconButton';
import {useAuth} from '../context/AuthContext';
import {BASE_URL} from '../../config';
import axios from 'axios';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Header from '../component/Header';
import AddressSelection from '../component/myAddresses/AddressSelection';

const MyBag = () => {
  const isFocused = useIsFocused();
  // const [selectedAddressId, setSelectedAddressId] = useState(null);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [priceCounter, setPriceCounter] = useState();
  const [data, setData] = useState([]);
  const [subTotal, setSubTotal] = useState();
  const [deliveryPrice, setDeliveryPrice] = useState(50);
  const [addressId, setAddressId] = useState();
  console.log('dataValue', data);
  // console.log('here is my data response', data);
  const {userId} = useAuth();
  const handleDelete = productId => {
    const updatedData = data.filter(item => item.productId !== productId);
    setData(updatedData);
  };

  const updateItemQuantities = (productId, quantity) => {
    setItemQuantities(prevState => ({
      ...prevState,
      [productId]: quantity,
    }));
  };
  const handleGet = () => {
    if (userId) {
      setLoading(true);
      axios
        .get(`${BASE_URL}method=myCart&userId=${userId}`)
        .then(response => {
          setData(response.data.response);
          setLoading(false);
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
  }, [navigation, userId, priceCounter, isFocused]);
  useEffect(() => {
    if (data.message !== 'data not available') {
      const st = data.reduce((acc, item) => acc + item.unitPrice * item.qty, 0);
      console.log('check', st);
      setSubTotal(st);
    }else{
      setSubTotal(0);
      setDeliveryPrice(0)

    }
  }, [data, priceCounter, isFocused]);

 

  const showToast = () => {
    ToastAndroid.show('Order placed!', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
  };

  const placeOrder = () => {
    // if(data.message=="data not available"){
    //   return Alert.alert('Please add some item');
    // }
    if (addressId) {
      const prices = data.map(product => product.unitPrice*product.qty).join(',');
    const productIds = data.map(product => product.productId).join(',');
    const quantities = data.map(product => product.qty).join(',');
     
      axios
        .post(`${BASE_URL}method=placeOrder&userId=${userId}&addressId=${addressId}&amount=${subTotal + deliveryPrice}&productId=${productIds}&price=${prices}&qty=${quantities}`)
        .then(response => {
          console.log('Order placed successfully:', response.data);
          handleGet();
          showToast();
          navigation.navigate("PaymentSuccess")
        })
        .catch(error => {
          console.error('Error placing order:', error);
          Alert.alert(
            'Error',
            'Failed to place the order. Please try again later.',
          );
        });
    } else {
      Alert.alert('Please select address');
    }
  };

  return (
    <View
      style={{flex: 1, paddingHorizontal: 12, backgroundColor: '#ffffffff'}}>
        <Header
          backgroundColor="#ffffffff"
          onBackPress={() => navigation.goBack()}
          title="My Bag"
        />
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
        {data.message=="data not available"?<Text style={{fontSize:responsiveFontSize(1.8),alignSelf:"center"}}>YOUR CART IS EMPTY SHOP NOW</Text>:(<>
        <Text style={styles.product}>Products</Text>
        <View style={{marginTop: responsiveHeight(2)}}>
          {data.message == 'data not available'? (
            <Text style={{alignSelf: 'center'}}>no item</Text>
          ) : (
            data?.map(item => {
              return (
                <MyProductCard
                  key={item.productId}
                  data={item}
                  onDelete={handleDelete}
                  userId={userId}
                  setItemQuantities={updateItemQuantities}
                  priceCounter={priceCounter}
                  setPriceCounter={setPriceCounter}
                />
              );
            })
          )}
        </View>
        <Button
          textColor="#cf8059ff"
          bgColor="#e4f5eeff"
          text="Add More Product"
          onPress={() => navigation.navigate('HomeScreen')}
        />

        <AddressSelection navigation={navigation} setAddressId={setAddressId} />

        <View style={{marginTop: responsiveHeight(2)}}>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Subtotal</Text>
            <Text style={styles.rowValue}>₹{subTotal}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Delivery Charge</Text>
            <Text style={styles.rowValue}>₹{deliveryPrice}</Text>
          </View>
          <View style={styles.row}>
            <Text
              style={[styles.rowLabel, {fontWeight: '600', color: '#37474F'}]}>
              Total
            </Text>
            <Text
              style={[styles.rowValue, {fontWeight: '600', color: '#37474F'}]}>
              ₹{subTotal + deliveryPrice}
            </Text>
          </View>
        </View>
        </>)

          }
      </ScrollView>
     { data.message!=="data not available"&&<View
        style={{
          position: 'absolute',
          bottom: 2,
          left: 0,
          right: 0,
          paddingHorizontal: 12,
        }}>
        <IconButton
          text="Place Order"
          backgroundColor="#c43c02ff"
          onPress={() => placeOrder()}
          icon={
            <AntDesign
              name="arrowright"
              size={responsiveFontSize(2.3)}
              color="#e1e8faff"
            />
          }
        />
      </View>}
    </View>
  );
};

export default MyBag;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,

    paddingBottom: responsiveHeight(8),
  },
  heading: {
    fontSize: responsiveFontSize(2.3),
    marginTop: responsiveHeight(1),
    fontWeight: '600',

    fontFamily: 'Poppins-SemiBold',
    color: '#37474F',
  },
  product: {
    fontSize: responsiveFontSize(1.8),
    marginTop: responsiveHeight(2),
    fontWeight: '500',
    fontFamily: 'Poppins-Medium',
    color: '#37474F',
  },
  deliveryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: responsiveHeight(2),
  },

  changeText: {
    fontSize: responsiveFontSize(1.8),
    marginTop: responsiveHeight(2),
    fontWeight: '500',
    fontFamily: 'Poppins-Medium',
    color: '#C43B01',
  },
  markerContainer: {
    backgroundColor: '#236CD91F',
    borderRadius: 50,
    width: responsiveWidth(9),
    height: responsiveWidth(9),
    alignItems: 'center',
    justifyContent: 'center',
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: responsiveHeight(1),
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: responsiveHeight(1),
  },
  rowLabel: {
    fontSize: responsiveFontSize(1.6),
    fontWeight: '400',

    color: '#37474F',
  },
  rowValue: {
    fontSize: responsiveFontSize(1.6),
    fontWeight: '400',

    color: '#37474F',
  },

  iconButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    paddingHorizontal: 12,
  },
  paymentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#e1f2ebff',
    padding: 12,
    borderRadius: 12,
    marginTop: responsiveHeight(2),
  },
  paymentText: {
    flex: 1,
    fontSize: responsiveFontSize(1.5),
    fontWeight: '500',
    fontFamily: 'Poppins-Regular',
    color: '#37474F',
    marginLeft: 10,
    marginRight: 40,
  },
  paymentIcon: {
    backgroundColor: '#C43B01',
    borderRadius: 50,
    width: responsiveWidth(9),
    height: responsiveWidth(9),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
