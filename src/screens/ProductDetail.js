import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Header from '../component/Header';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import ExpandableListItem from '../component/ExpandableListItem/ExpandableListItem';
import WishListComponent from '../component/wishList/WishListComponent';
import {ProductImagesData} from '../data/Data';
import ProductView from '../component/ImageCarousel/ProductView';
import IconButton from '../component/Button/IconButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {BASE_URL} from '../../config';
import axios from 'axios';
import {useAuth} from '../context/AuthContext';

const ProductDetail = ({navigation, route}) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  // console.log("productView test",data)
  const [itemStatus, setItemStatus] = useState("");
  const {userId} = useAuth();

  // console.log("itemStatus",itemStatus)
  // console.log('My data', data);
  const {id, name} = route.params;

  const showToast = () => {
    ToastAndroid.show(
      'Item added to cart!',
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
    );
  };
  // const showToast=()=> {
  //   ToastAndroid.BOTTOM
  //   }

  const handleSubmit = async () => {
    // console.log('my number id jjjj ', id);

    setLoading(true);
    if (id) {
      await axios
        .get(`${BASE_URL}method=productDetail&productId=${id}`)
        .then(response => {
          setData(response.data.response);
          console.log("response.data.response",response.data.response.status);
          setItemStatus(response.data.response.status)
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

  const addToBag = async () => {
    setLoading(true);
    if (userId && id) {
      await axios
        .get(
          `${BASE_URL}method=addtocart&userId=${userId}&productId=${id}&qty=1&price=${data?.offer_price}`,
        )
        .then(response => {
          console.log('addToBag', response.data.response);
          console.log('addToBag', response.data.response.status);
          // Alert.alert('Item added in your bag');
          setItemStatus(response.data.response.status)
          showToast();

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

  if (data.message == 'Something Went Wrong' || data == null) {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <Text style={{color: 'grey'}}>Items not available</Text>
      </View>
    );
  }
  if (!data.photo) {
    return (
      <ActivityIndicator
        style={styles.activityIndicator}
        size="large"
        color="red"
      />
    );
  }

  return (
    <View style={{flex: 1}}>
      <View style={{paddingHorizontal: 12}}>
        <Header
          backgroundColor="#f5f5f2ff"
          onBackPress={() => navigation.goBack()}
          title={name}
        />
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={{marginVertical: responsiveHeight(2)}}>
          <ProductView images={data.photo} />
        </View>
        {/* <View style={{flexDirection: 'row'}}> */}
        {/* <View
            style={{
              borderWidth: 1,
              width: responsiveWidth(15),
              height: responsiveWidth(15),
              alignItems: 'center',
              justifyContent: 'center',
              borderColor: '#c43c02ff',
              padding: 30,
              marginVertical: responsiveHeight(2),
              marginHorizontal: responsiveWidth(1),
            }}>
            <Image
              // source={require('../../assets/img/dano.png')}
              source={{uri: data?.photo1}}
              style={{width: responsiveWidth(15), height: responsiveWidth(15)}}
            />
          </View> */}
        {/* <View
            style={{
              borderWidth: 1,
              width: responsiveWidth(15),
              height: responsiveWidth(15),
              alignItems: 'center',
              justifyContent: 'center',
              borderColor: '#c43c02ff',
              padding: 30,
              marginVertical: responsiveHeight(2),
              marginHorizontal: responsiveWidth(1),
            }}>
            <Image
              // source={require('../../assets/img/dano.png')}
              source={{uri: data?.photo2}}
              style={{width: responsiveWidth(15), height: responsiveWidth(15)}}
            />
          </View> */}
        {/* </View> */}

        <Text style={styles.name}>{data?.productName}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>₹{data?.offer_price}</Text>
          {/* <Text style={styles.kg}>1KG</Text> */}
        </View>
        <Text
          style={[
            styles.price,
            {
              textDecorationLine: 'line-through',
              color: 'grey',
              fontSize: responsiveFontSize(1.5),
            },
          ]}>
          M.R.P. ₹{data?.mrp}
        </Text>

        <View style={{marginTop: responsiveHeight(1)}}>
          <ExpandableListItem
            
            description={data?.description}
          />
        </View>
        {/* <View style={{marginTop: responsiveHeight(1)}}>
          <ExpandableListItem
            title="Cleaning & Industry"
            description={data?.description}
          />
        </View> */}

        <Text style={styles.extraName}>You can also check this items</Text>

        <View style={{marginTop: responsiveHeight(4)}}>
          <WishListComponent />
         
        </View>
      </ScrollView>
      <View style={styles.iconButtonContainer}>
        <IconButton
          // text="Add to Bag"
          text={itemStatus==1?"Add to Bag":"Go to Cart"}
          backgroundColor="#c43c02ff"
          onPress={() => addToBag()}
          icon={
            <Image
              source={require('../../assets/icon/bag.png')}
              style={{width: responsiveWidth(5), height: responsiveWidth(5)}}
            />
          }
        />
      </View>
    </View>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 12,
    backgroundColor: '#f5f5f2ff',
    paddingBottom: responsiveHeight(8),
  },
  name: {
    fontSize: responsiveFontSize(1.8),

    color: '#000000ff',
    fontWeight: '600',
    fontFamily: 'Poppins-Medium',
    marginTop: 20,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: responsiveHeight(1),
  },
  price: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: '700',
    color: '#c43c02ff',

    fontFamily: 'Poppins-Bold',
  },
  kg: {
    fontSize: responsiveFontSize(2.5),
    // fontWeight: '500',
    color: '#3d3d3dff',
    fontWeight: '700',
    fontFamily: 'Poppins-Bold',
  },
  extraName: {
    fontSize: responsiveFontSize(1.7),

    color: '#3d3d3dff',
    marginTop: responsiveHeight(3),
    fontWeight: '500',
    fontFamily: 'Poppins-Medium',
  },
  iconButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    paddingHorizontal: 12,
  },
});
