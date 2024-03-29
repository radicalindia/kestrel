import React, {useState} from 'react';
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
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import {BASE_URL} from '../../../config';
import {useAuth} from '../../context/AuthContext';

const ProductListComponent = ({labelText, data, onPress,setCartItemCount}) => {
  const {userId} = useAuth();
  const [itemQuantities, setItemQuantities] = useState({}); // State to store quantities for each item
  const [loading, setLoading] = useState(false);

  const addToBag = async (productId, offerPrice, quantity) => {
    if (userId && productId && offerPrice && quantity > 0) {
      try {
      setCartItemCount(prevCount => prevCount + 1);
          
        setLoading(true);    
        const response = await axios.get(
          `${BASE_URL}method=addtocart&userId=${userId}&productId=${productId}&qty=${quantity}&price=${offerPrice}`,
        );
        updateQuantity(productId, quantity);
        setLoading(false);
        console.log('Item added to cart:', response.data.response);
      } catch (error) {
        if (error.isAxiosError && !error.response) {
          // Network error
          Alert.alert(
            'Network Error',
            'Please check your internet connection.',
          );
        } else {
          // Other errors
          console.error('Error adding item to cart:', error);
          Alert.alert('Error', 'Something went wrong. Please try again later.');
        }
        setLoading(false);
      }
    }
  };

  const deleteFromCart = async productId => {
    if (userId) {
      try {
        // removeFromBag()
      setCartItemCount(prevCount => prevCount - 1);

        setLoading(true);
        const response = await axios.get(
          `${BASE_URL}method=deleteCart&userId=${userId}&productId=${productId}`,
        );
        setLoading(false);
        console.log('Item deleted from cart:', response.data.response);
        // After deletion, remove the item from itemQuantities
        setItemQuantities(prevState => {
          const newState = {...prevState};
          delete newState[productId];
          return newState;
        });
      } catch (error) {
        if (error.isAxiosError && !error.response) {
          // Network error
          Alert.alert(
            'Network Error',
            'Please check your internet connection.',
          );
        } else {
          // Other errors
          console.error('Error adding item to cart:', error);
          Alert.alert('Error', 'Something went wrong. Please try again later.');
        }
        setLoading(false);
      }
    }
  };

  const updateQuantity = (productId, newQuantity) => {
    setItemQuantities(prevState => ({
      ...prevState,
      [productId]: newQuantity,
    }));
  };

  // const increaseQuantity = (productId) => {
  //   const newQuantity = (itemQuantities[productId] || 0) + 1;
  //   addToBag(
  //     productId,
  //     data.find((item) => item.productId === productId).offerPrice,
  //     newQuantity
  //   );
  // };

  // const decreaseQuantity = (productId) => {
  //   if (itemQuantities[productId] > 1) {
  //     const newQuantity = itemQuantities[productId] - 1;
  //     addToBag(
  //       productId,
  //       data.find((item) => item.productId === productId).offerPrice,
  //       newQuantity
  //     );
  //   } else {
  //     // If the quantity is 1, delete the item from the cart
  //     deleteFromCart(productId);
  //   }
  // };
  const increaseQuantity = productId => {
    const item = data;
    if (!item) {
      console.error('Product data is not available');
      return;
    }

    const offerPrice = item.offerPrice;
    const newQuantity = (itemQuantities[productId] || 0) + 1;
    addToBag(productId, offerPrice, newQuantity);
  };

  const decreaseQuantity = productId => {
    const item = data;
    if (!item) {
      console.error('Product data is not available');
      return;
    }

    const offerPrice = item.offerPrice;
    if (itemQuantities[productId] > 1) {
      const newQuantity = itemQuantities[productId] - 1;
      addToBag(productId, offerPrice, newQuantity);
    } else {
      // If the quantity is 1, delete the item from the cart
      deleteFromCart(productId);
    }
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image source={{uri: data.photo1}} style={styles.image} />
      {labelText && (
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>{labelText}%</Text>
          <Text style={styles.badgeText}>OFF</Text>
        </View>
      )}
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{data?.productName}</Text>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={styles.priceContainer}>
            <Text style={styles.underLinePrice}>₹{data?.mrp}</Text>
            <Text style={styles.price}>₹{data?.offerPrice}</Text>
          </View>
          <View style={styles.quantityContainer}>
            {itemQuantities[data.productId] ? (
              <View style={styles.quantityContainer}>
                <View
                  style={{
                    flexDirection: 'row',
                    // alignItems: 'center',
                    borderWidth: 1,
                    borderRadius: 5,

                    borderColor: '#e87982ff',
                    justifyContent: 'space-around',
                    height: responsiveHeight(4),
                  }}>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => decreaseQuantity(data.productId)}>
                    {itemQuantities[data.productId] > 1 ? (
                      <AntDesign
                        name="minus"
                        size={responsiveWidth(4)}
                        color="#e85f61ff"
                      />
                    ) : (
                      <MaterialCommunityIcons
                        name="delete"
                        size={responsiveWidth(4)}
                        color="#e85f61ff"
                      />
                    )}
                  </TouchableOpacity>
                  <View
                    style={{
                      backgroundColor: '#e85f61ff',

                      alignItems: 'center',

                      justifyContent: 'center',
                      width: responsiveWidth(8),
                    }}>
                    <Text style={styles.quantity}>
                      {itemQuantities[data.productId]}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => increaseQuantity(data.productId)}>
                    <AntDesign
                      name="plus"
                      size={responsiveWidth(4)}
                      color="#e85f61ff"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => addToBag(data.productId, data.offerPrice, 1)}>
                <Text style={styles.buttonText}>Add</Text>
                <AntDesign
                  name="plus"
                  size={responsiveWidth(4)}
                  color="green"
                  style={styles.plusIcon}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductListComponent;

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
    textDecorationLine: 'line-through',
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
  addButton: {
    backgroundColor: '#ffffff',
    padding: 5,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
    borderWidth: 0.5,
    borderColor: 'grey',
  },
  buttonText: {
    color: 'black',
    fontSize: responsiveFontSize(1.5),
    fontWeight: '600',
    fontFamily: 'Poppins-Bold',
  },
  plusIcon: {
    marginLeft: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: 'white',
    borderRadius: 5,

    alignItems: 'center',
    width: responsiveWidth(7),
    // height: responsiveWidth(7),
    alignSelf: 'center',
  },
  quantity: {
    marginHorizontal: 5,
    fontSize: responsiveFontSize(1.7),
    fontFamily: 'Poppins-Bold',
    color: 'white',
  },
});
