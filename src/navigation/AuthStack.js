import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OtpScreens from '../screens/OtpScreens';

import NumberInput from '../screens/NumberInput';
import DetailScreen from '../screens/DetailScreen';

const Stack = createNativeStackNavigator();
const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={NumberInput} />
      <Stack.Screen name="OtpScreens" component={OtpScreens} />

      <Stack.Screen name="DetailScreen" component={DetailScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
