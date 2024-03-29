import { View } from 'react-native'
import React from 'react'
import { ImageSlider } from "react-native-image-slider-banner";
import { responsiveHeight } from 'react-native-responsive-dimensions';

const Banner = ({ data }) => {
  
  // const images = data.slider.map(item => ({ img: item }));
  // console.log("Generated image URLs:", images);
// console.log("sliderhhh",data)
  return (
    <View style={{ paddingHorizontal: 17,}}  >
      <ImageSlider 
        data={data}
        // data={[{"img": 'https://sellpe.in/kestrel/images/123.webp'},]}
        autoPlay={true}
        // onItemChanged={(item) => console.log("item", item)}
        closeIconColor="#fff"
        preview={false}
        caroselImageStyle={{ resizeMode: "cover", height: responsiveHeight(19), }}
        showIndicator={false}
      />
    </View>
  )
}

export default Banner
// [{img: 'https://sellpe.in/kestrel/images/123.webp'},]