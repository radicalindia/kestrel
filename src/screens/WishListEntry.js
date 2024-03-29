import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../component/Header';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import WishListInput from '../component/input/WishListInput';
import IconButton from '../component/Button/IconButton';
const WishListEntry = ({navigation}) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [brand, setBrand] = useState('');
  const [show, setShow] = useState(true);

  return (
    <View style={styles.container}>
      <Header
        backgroundColor="#ffffff"
        onBackPress={() => console.log('back')}
        title="Add To Wishlist"
        textColor="black"
      />
      <ScrollView
        contentContainerStyle={{flexGrow:1,paddingBottom:100}}
        showsVerticalScrollIndicator={false}>
        <View style={{marginTop: responsiveHeight(10)}}>
          <WishListInput
            placeholder="Product Name"
            onChangeText={e => setName(e)}
            value={name}
            keyboardType="default"
            icon={
              <Ionicons
                name="basket-outline"
                size={responsiveWidth(5)}
                color="black"
              />
            }
          />
        </View>
        <View style={{marginTop: responsiveHeight(3)}}>
          <WishListInput
            placeholder="Amount"
            onChangeText={e => setAmount(e)}
            value={amount}
            keyboardType="default"
            icon={
              <Ionicons
                name="code-working-outline"
                size={responsiveFontSize(3)}
                color="black"
              />
            }
          />
        </View>
        <View style={{marginTop: responsiveHeight(3)}}>
          <WishListInput
            placeholder="Brand (Optional)"
            onChangeText={e => setBrand(e)}
            value={brand}
            keyboardType="default"
            icon={
              <MaterialCommunityIcons
                name="label-outline"
                size={responsiveFontSize(3)}
                color="black"
              />
            }
          />
        </View>



{
show&&

<View style={styles.imgPreviewContainer}>
<Image
style={styles.previewImg}

source={require("../../assets/img/dano.png")}
/>
 <TouchableOpacity style={styles.closeIcon} onPress={() => setShow(false)}>
        <Ionicons name="close-circle" size={24} color="#ff8c8aff" />
      </TouchableOpacity>
</View>
}



        <View style={styles.cameraContainer}>
          <TouchableOpacity onPress={() => ''}>
            <Image
              source={require('../../assets/icon/addCamera.png')}
              style={styles.img}
            />
          </TouchableOpacity>
          <Text style={styles.imgText}>Upload Images here</Text>
        </View>


        <View
          style={{
            marginTop:30
          }}>
          <IconButton
            text="Save to Wishlist"
            backgroundColor="#c43c02ff"
            onPress={() => navigation.navigate("Wishlist")}

            icon={
              <MaterialCommunityIcons
                name="content-save-outline"
                size={responsiveFontSize(2.3)}
                color="#e1e8faff"
              />
            }
          />
        </View>
      </ScrollView>


      
    </View>
  );
};

export default WishListEntry;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 12,
    backgroundColor: '#ffffff',
  },
  cameraContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#a5acb0ff',
    borderStyle: 'dashed',
    height: responsiveWidth(50),
    marginTop: responsiveHeight(3),
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#f0f1f2ff',
  },
  img: {
    width: responsiveWidth(14),
    height: responsiveWidth(14),
  },
  imgText: {
    fontSize: responsiveFontSize(1.6),
    marginTop: responsiveHeight(1),
    color: '#aeb5b8ff',
  },
  imgPreviewContainer:{
    width:"100%",
    backgroundColor:"#ffffff",
    alignItems:"center",
    justifyContent:"center",
    padding:6,
    borderWidth:0.3,
    marginTop:responsiveHeight(3),
    borderColor:"grey",
  },
  previewImg:{
    // width: "100%",
    // height: responsiveWidth(40),
    resizeMode:"contain"

  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});
