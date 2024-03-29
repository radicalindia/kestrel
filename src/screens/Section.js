import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import SectionComponent from '../component/section/SectionComponent';
import Header from '../component/Header';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import ProductListComponent from '../component/card/ProductListComponent';
import MyProductCard from '../component/my bag/MyProductCard';
import AntDesign from 'react-native-vector-icons/AntDesign';

import axios from 'axios';
import {BASE_URL} from '../../config';
import {useAuth} from '../context/AuthContext';
const Section = ({route, navigation}) => {
  const [cartItemCount, setCartItemCount] = useState(0);
  const {userId} = useAuth();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  // console.log('My data', data);
  const {id, name} = route.params;

  const handleSubmit = async () => {
    // console.log('my number id jjjj ', id);

    setLoading(true);
    if (id) {
      await axios
        .get(`${BASE_URL}method=categoryProduct&categoryId=${id}`)
        .then(response => {
          // console.log("mommmmmmm",response.data.product)
          setData(response.data.product);
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
    handleSubmit();
  }, [id]);

  const addToBag = async (productId, offerPrice) => {
    setLoading(true);

    if (userId && productId && offerPrice) {
      await axios
        .get(
          `${BASE_URL}method=addtocart&userId=${userId}&productId=${productId}&qty=1&price=${offerPrice}`,
        )
        .then(response => {
          console.log('addToBag', response.data.response);
          Alert.alert('Item added in your bag');
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

  return (
    <View style={styles.container}>
      <View style={{paddingHorizontal: 12}}>
        <Header
          backgroundColor="white"
          onBackPress={() => navigation.goBack()}
          title={name}
          textColor="black"
        />
      </View>
      <View style={{marginTop: responsiveHeight(1), flex: 1}}>
        {/* <SectionComponent/> */}
        {/* <MyProductCard /> */}
        {data == null ? (
          <View
            style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
            <Text style={{color: 'grey'}}>Items not available</Text>
          </View>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1, paddingHorizontal: 12}}>
            {data ? (
              data.map(item => (
                <ProductListComponent
                  key={item.productId}
                  data={item}
                  addCart={() => addToBag(item.productId, item.offerPrice)}
                  onPress={() =>
                    navigation.navigate('ProductDetail', {
                      id: item.productId,
                      name: item?.productName,
                    })
                  }
                  setCartItemCount={setCartItemCount}
                />
              ))
            ) : (
              <ActivityIndicator
                style={styles.activityIndicator}
                size="large"
                color="red"
              />
            )}
          </ScrollView>
        )}
        <View style={{position: 'absolute', bottom: 2, left: 10, right: 10}}>
          <View  style={styles.btnContainer}>
            <Text style={styles.btnText}>{cartItemCount} Item added</Text>
            <TouchableOpacity onPress={()=>navigation.navigate("MyBag")} style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.btnText}>View Cart</Text>
              <View style={{marginLeft: 5}}>
                <AntDesign
                  size={responsiveWidth(3.5)}
                  color="#ffffff"
                  name="right"
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Section;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: responsiveHeight(7),
    // width:"100%",
    backgroundColor: '#1ca671ff',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderRadius: 18,
  },
  btnText: {
    fontSize: responsiveFontSize(2),
    // fontFamily:"Poppins-Regular",
    color: 'white',
  },
});
