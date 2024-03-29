import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import Cotegory from '../screens/Category';
import MyTabs from './MyTabs';
import ProductDetail from '../screens/ProductDetail';
import Notifications from '../screens/Notifications';
import Orders from '../screens/Orders';
import Section from '../screens/Section';
import Wishlist from '../screens/Wishlist';
import More from '../screens/More';
import WishListEntry from '../screens/WishListEntry';
import EditProfile from '../screens/EditProfile';
import WishListEdit from '../screens/WishListEdit';
import MyAddresses from '../screens/MyAddresses';
import LocationSelection from '../screens/LocationSelection';
import SearchScreen from '../screens/SearchScreen';
import MyBag from '../screens/MyBag';
import AddAddressForm from '../screens/AddAddressForm';
import OrderDetail from '../screens/OrderDetail';
import ProfileScreen from '../screens/ProfileScreen';
import PaymentSuccess from '../screens/PaymentSuccess';

const Stack = createNativeStackNavigator();
const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="MainHome" component={MyTabs} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="Cotegory" component={Cotegory} />

      <Stack.Screen name="ProductDetail" component={ProductDetail} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="Orders" component={Orders} />
      <Stack.Screen name="Section" component={Section} />
      <Stack.Screen name="Wishlist" component={Wishlist} />
      <Stack.Screen name="More" component={More} />
      <Stack.Screen name="WishListEntry" component={WishListEntry} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="WishListEdit" component={WishListEdit} />
      <Stack.Screen name="MyAddresses" component={MyAddresses} />
      <Stack.Screen name="LocationSelection" component={LocationSelection} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="MyBag" component={MyBag} />
      <Stack.Screen name="AddAddressForm" component={AddAddressForm} />
      <Stack.Screen name="OrderDetail" component={OrderDetail} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="PaymentSuccess" component={PaymentSuccess} />
    </Stack.Navigator>
  );
};

export default HomeStack;
