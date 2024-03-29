import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {StyleSheet, View} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import Cotegory from '../screens/Category';
import OtpScreens from '../screens/OtpScreens';
import MyBag from '../screens/MyBag';
import Wishlist from '../screens/Wishlist';
import Orders from '../screens/Orders';
import More from '../screens/More';

const Tab = createBottomTabNavigator();
function MyTabs() {
  return (
    // <NavigationContainer>
    
   

      <Tab.Navigator
        screenOptions={({route}) => ({
            headerShown:false,
          tabBarLabel: '',
          inactiveTintColor: 'gray',
          tabBarActiveTintColor: 'white',
         tabBarHideOnKeyboard:true,
        
          tabBarStyle: {
            backgroundColor: 'white',
            height: 80,
            borderTopEndRadius: 25,
            borderTopLeftRadius: 25,
            
            
          },

          tabBarIcon: ({focused, color, size}) => {
            let IconComponent;
            let iconName;

            if (route.name === 'Home') {
              IconComponent = SimpleLineIcons;
              iconName = 'home';
            } else if (route.name === 'More') {
              IconComponent = MaterialCommunityIcons;
              iconName = 'reorder-horizontal';
            } else if (route.name === 'Cart') {
              IconComponent = SimpleLineIcons;
              iconName = 'bag';
            } else if (route.name === 'Cotegory') {
              IconComponent = SimpleLineIcons;
              iconName = 'grid';
            }

            return (
              <View
                style={
                  focused
                    ? {
                        backgroundColor: 'red',
                        width: 45,
                        height: 45,
                        borderRadius: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }
                    : {}
                }>
                <IconComponent name={iconName} size={size - 4} color={color} />
              </View>
            );
          },
        })}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Cotegory" component={Cotegory} />
        <Tab.Screen  options={{
            tabBarStyle: { display: 'none' } 
          }} name="Cart" component={MyBag} />
        <Tab.Screen name="More" component={More} />
      </Tab.Navigator>

   
    // </NavigationContainer>
  );
}

 
export default MyTabs;
