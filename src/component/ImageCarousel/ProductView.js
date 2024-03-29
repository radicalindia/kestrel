import React, {useState, useCallback} from 'react';
import {
  View,
  
} from 'react-native';


import { ImageSlider } from "react-native-image-slider-banner";

const ProductView = ({images}) => {
 

  return (
  

  <View>

<ImageSlider 
data={images} 
   
    // onItemChanged={(item) => console.log("item", item)}
    closeIconColor="#ffffff"
    // indicatorContainerStyle={mt}
/>

  </View>
  );
};



export default ProductView;
