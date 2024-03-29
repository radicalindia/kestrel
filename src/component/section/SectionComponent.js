import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAuth} from '../../context/AuthContext';
import axios from 'axios';
import {BASE_URL} from '../../../config';

const SectionComponent = ({navigation, data}) => {
  const {userId} = useAuth();
  const [itemQuantities, setItemQuantities] = useState({}); // State to store quantities for each item
  const [loading, setLoading] = useState(false);

  const addToBag = async (productId, offerPrice, quantity) => {
    if (userId && productId && offerPrice && quantity > 0) {
      try {
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

  const increaseQuantity = productId => {
    const newQuantity = (itemQuantities[productId] || 0) + 1;
    addToBag(
      productId,
      data.find(item => item.productId === productId).offerPrice,
      newQuantity,
    );
  };

  const decreaseQuantity = productId => {
    if (itemQuantities[productId] > 1) {
      const newQuantity = itemQuantities[productId] - 1;
      addToBag(
        productId,
        data.find(item => item.productId === productId).offerPrice,
        newQuantity,
      );
    } else {
      // If the quantity is 1, delete the item from the cart
      deleteFromCart(productId);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Top Picks</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContainer}>
        {data.map(item => (
          <TouchableOpacity
            key={item.productId}
            onPress={() =>
              navigation.navigate('ProductDetail', {
                id: item.productId,
                name: item.productName,
              })
            }
            style={styles.card}>
            <View style={styles.foodImageContainer}>
              <Image style={styles.foodImage} source={{uri: item.photo1}} />
            </View>
            <View style={styles.foodNameContainer}>
              <Text style={styles.foodName} numberOfLines={2}>
                {item.productName}
              </Text>
            </View>
            <Text style={styles.price}>₹{item.mrp}</Text>

            <View style={{paddingHorizontal:12}}>
              {itemQuantities[item.productId] ? (
                <View style={{paddingHorizontal:5}}>
                  <View style={styles.quantityContainer}>


                  <TouchableOpacity
                    style={{
                      backgroundColor: '#ffffff',

                      alignItems: 'center',

                      justifyContent: 'center',
                     
                    }}
                    onPress={() => decreaseQuantity(item.productId)}>
                    {itemQuantities[item.productId] > 1 ? (
                      <AntDesign
                        name="minus"
                        size={responsiveWidth(6)}
                        color="#e87982ff"
                      />
                    ) : (
                      <View
                        style={{
                          backgroundColor: 'white',
                          borderRadius: 5,

                          alignItems: 'center',
                         
                        }}>
                        <MaterialCommunityIcons
                          name="delete"
                          size={responsiveWidth(6)}
                          color="#e87982ff"
                        />
                      </View>
                    )}
                  </TouchableOpacity>
                  <View
                    style={{
                      backgroundColor: '#e85f61ff',

                      alignItems: 'center',

                      justifyContent: 'center',
                      width: responsiveWidth(7),
                      height: responsiveHeight(3.5),
                    }}>
                    <Text style={styles.quantity}>
                      {itemQuantities[item.productId]}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#ffffff',

                      alignItems: 'center',

                      justifyContent: 'center',
                    }}
                    onPress={() => increaseQuantity(item.productId)}>
                    <AntDesign
                      name="plus"
                      size={responsiveWidth(5)}
                      color="#e87982ff"
                    />
                  </TouchableOpacity>
                </View>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => addToBag(item.productId, item.offerPrice, 1)}>
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
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    flex: 1,
    width: '100%',
  },
  header: {
    fontSize: responsiveFontSize(2.1),
    marginTop: responsiveHeight(2),
    marginBottom: responsiveHeight(1),
    color: 'black',
    fontFamily: 'Poppins-ExtraBold',
  },
  scrollViewContainer: {
    marginTop: responsiveHeight(2),
    paddingBottom: 20,
  },
  card: {
    justifyContent: 'center',
    marginRight: responsiveWidth(2),
    width: responsiveWidth(40),
    backgroundColor: '#ffffff',
    padding: 8,
    borderRadius: 12,
  },
  foodImageContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  foodImage: {
    height: responsiveWidth(30),
    resizeMode: 'contain',
    width: responsiveWidth(30),
  },
  foodNameContainer: {
    marginTop: responsiveHeight(1),
  },
  foodName: {
    fontSize: responsiveFontSize(1.3),
    color: '#3c3b47ff',
    textAlign: 'justify',
    fontFamily: 'Poppins-SemiBold',
  },
  price: {
    marginTop: responsiveHeight(0.5),
    fontSize: responsiveFontSize(1.7),
    marginBottom: responsiveHeight(1),
    fontWeight: '500',
    color: '#F37A20',
  },
  addButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 3,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
    borderWidth: 0.5,
    borderColor: 'grey',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  buttonText: {
    color: 'black',
    fontSize: responsiveFontSize(1.9),
    fontFamily: 'Poppins-Bold',
  },
  plusIcon: {
    marginLeft: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'space-around',
    borderColor:"#e87982ff",
    // width:40,
    // paddingHorizontal:3
  },
  quantity: {
    fontSize: responsiveFontSize(2),

    // marginHorizontal: 10,
    fontWeight: '400',
    fontFamily: 'Poppins-Medium',
    color:"white"
  },
});

export default SectionComponent;
