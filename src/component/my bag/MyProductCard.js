import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import {BASE_URL} from '../../../config';
import {useAuth} from '../../context/AuthContext';
import AntDesign from 'react-native-vector-icons/AntDesign';

const MyProductCard = ({labelText, data, onDelete,priceCounter, setPriceCounter,}) => {
  const [quantity, setQuantity] = useState(data.qty);
  const [loading, setLoading] = useState(false);
  const {userId} = useAuth();

  const updateQuantity = async (productId, newQuantity) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${BASE_URL}method=addtocart&userId=${userId}&productId=${productId}&qty=${newQuantity}&price=${data.offerPrice}`,
      );
      setQuantity(newQuantity);
      setLoading(false);
      console.log('Quantity updated:', response.data.response);
    } catch (error) {
      if (error.isAxiosError && !error.response) {
        // Network error
        Alert.alert('Network Error', 'Please check your internet connection.');
      } else {
        // Other errors
        console.error('Error adding item to cart:', error);
        Alert.alert('Error', 'Something went wrong. Please try again later.');
      }
      setLoading(false);
    }
  };

  const decrement = () => {
    if (quantity > 1) {
      updateQuantity(data.productId, quantity - 1);
    } else {
      handleDelete();
    }
  };

  const increment = () => {
    updateQuantity(data.productId, quantity + 1);
  };

  const handleDelete = () => {
    if (userId) {
      setLoading(true);
      axios
        .get(
          `${BASE_URL}method=deleteCart&userId=${userId}&productId=${data.productId}`,
        )
        .then(response => {
          onDelete(data.productId);
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
useEffect(()=>{
  setPriceCounter(data?.unitPrice * quantity)
  console.log("data?.unitPrice * quantity",data?.unitPrice * quantity)
},[quantity])


// useEffect(() => {
//   const st = completeData.reduce((acc, item) => acc + item.unitPrice * item.qty, 0);
//     console.log("check",st)
//   // setSubTotal(st);
// }, [quantity]);

  return (
    <View style={styles.container}>
      <Image source={{uri: data?.photo1}} style={styles.image} />
      {labelText && (
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>{labelText}%</Text>
          <Text style={styles.badgeText}>OFF</Text>
        </View>
      )}
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{data.productName}</Text>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={styles.priceContainer}>
            <Text style={styles.underLinePrice}>₹{data?.unitPrice}</Text>
            <Text style={styles.price}>₹{data?.unitPrice * quantity}</Text>
          </View>
          <View style={styles.quantityContainer}>
            <TouchableOpacity style={styles.button} onPress={decrement}>
              {quantity === 1 ? (







                <View
                  style={{
                    backgroundColor: 'white',
                    borderRadius: 5,

                    alignItems: 'center',
                    width: responsiveWidth(7),
                    height: responsiveWidth(7),
                  }}>
                  <MaterialCommunityIcons
                    name="delete"
                    size={responsiveWidth(6)}
                    color="#e87982ff"
                  />
                </View>
              ) : (
                <AntDesign
                  name="minus"
                  size={responsiveWidth(6)}
                  color="#e87982ff"
                />
              )
              
              
              
              
              
              }
            </TouchableOpacity>



            <View
              style={{
                backgroundColor: '#e85f61ff',

                alignItems: 'center',

                justifyContent: 'center',
                width: responsiveWidth(8),
               
              }}>
              <Text style={styles.incrementView}>{quantity}</Text>
            </View>



            <TouchableOpacity style={styles.button} onPress={increment}>
              <AntDesign
                name="plus"
                size={responsiveWidth(5)}
                color="#e87982ff"
              />
            </TouchableOpacity>

            
          </View>
        </View>
      </View>
    </View>
  );
};

export default MyProductCard;

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
    transform: [{translateY: -40}],
    zIndex: 1,
    width: responsiveWidth(10),
    height: responsiveWidth(10),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  badgeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: responsiveFontSize(1.5),
    fontFamily: 'Poppins-Regular',
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  title: {
    fontSize: responsiveFontSize(1.5),
    fontWeight: '400',
    fontFamily: 'Poppins-Medium',
  },
  priceContainer: {
    marginTop: 5,
  },
  underLinePrice: {
    fontSize: responsiveFontSize(1.7),
    color: '#aeb4b8ff',
    marginTop: 5,
    fontWeight: '600',
    fontFamily: 'Poppins',
  },
  price: {
    fontSize: responsiveFontSize(2),
    color: '#f58b3bff',
    marginTop: 5,
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
  },
  quantityContainer: {
    flexDirection: 'row',
    // alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,

    borderColor: '#e87982ff',
    justifyContent: 'space-around',
    height: responsiveHeight(4),
   
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 5,

    alignItems: 'center',
    width: responsiveWidth(7),
    // height: responsiveWidth(7),
    alignSelf:"center",
    // width:responsiveWidth(8)
  },

  incrementView: {
    fontSize: responsiveFontSize(2),
    // marginHorizontal: 10,
    fontWeight: '400',
    fontFamily: 'Poppins-Medium',
    color:"white"
  },
});
