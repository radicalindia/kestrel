import {SafeAreaView} from 'react-native';
import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import OtpScreens from './src/screens/OtpScreens';
import NumberInput from './src/screens/NumberInput';
import DetailScreen from './src/screens/DetailScreen';
import HomeScreen from './src/screens/HomeScreen';
import Cotegory from './src/screens/Category';
import HomeStack from './src/navigation/HomeStack';
import MyTabs from './src/navigation/MyTabs';
import Section from './src/screens/Section';
import ProductDetail from './src/screens/ProductDetail';
import Wishlist from './src/screens/Wishlist';
import MyBag from './src/screens/MyBag';
import Orders from './src/screens/Orders';
import NotificationComponent from './src/component/notifications/NotificationComponent';
import Notifications from './src/screens/Notifications';
import More from './src/screens/More';
import WishListEntry from './src/screens/WishListEntry';
import EditProfile from './src/screens/EditProfile';
import WishListEdit from './src/screens/WishListEdit';
import MyAddresses from './src/screens/MyAddresses';
import LocationSelection from './src/screens/LocationSelection';
import {AuthProvider} from './src/context/AuthContext';
import SearchInput from './src/component/input/SearchInput';
import SearchScreen from './src/screens/SearchScreen';
import MainStack from './src/navigation/MainStack';
import AddAddressForm from './src/screens/AddAddressForm';
import PaymentSuccess from './src/screens/PaymentSuccess';
import ProfileScreen from './src/screens/ProfileScreen';
const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <AuthProvider>
      <SafeAreaView style={{flex: 1}}>
        {/* <OtpScreens/> */}
        {/* <SearchScreen/> */}
        {/* <NumberInput/> */}
        {/* <DetailScreen/> */}
        {/* <HomeScreen/> */}

        {/* <MyBag/> */}
        {/* <Cotegory/> */}
<MainStack/>
{/* <PaymentSuccess/> */}
{/* <ProfileScreen/> */}
{/* <AddAddressForm/> */}
        {/* <HomeStack /> */}
        {/* <MyTabs/> */}

        {/* <ProductDetail/> */}
        {/* <Wishlist/> */}

        {/* <Notifications/> */}
        {/* <Section/> */}
        {/* <Orders/> */}

        {/* <More/> */}
        {/* <WishListEntry/> */}

        {/* <MyAddresses/> */}
        {/* <EditProfile/> */}
        {/* <WishListEdit/> */}

        {/* <LocationSelection/> */}
      </SafeAreaView>
    </AuthProvider>
  );
};

export default App;
