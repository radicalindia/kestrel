import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import HomeStack from './HomeStack';
import AuthStack from './AuthStack';

const MainStack = () => {
    const{userId, userToken,}=useAuth()
  return <NavigationContainer>

{
userId&&userToken?<HomeStack/>:<AuthStack/>

}

  </NavigationContainer>;
};

export default MainStack;
