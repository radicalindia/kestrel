import {BackHandler, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, { useEffect } from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const PaymentSuccess = ({navigation}) => {
    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
          'hardwareBackPress',
          handleBackPress
        );
    
        return () => backHandler.remove();
      }, []);
    
      const handleBackPress = () => {
        navigation.navigate('Home'); // Assuming 'Home' is the initial screen in 'MyTabs'
        return true;
    };
  return (
    <View style={styles.container}>
      <View style={styles.logBg}>
       {/* <Image
       source={require("../../assets/icon/bag.png")}
       style={styles.logo}
       /> */}

       <MaterialIcons
       color="#ffffff"
       size={responsiveWidth(15)}
       name="done"
       
       />
      </View>

      <Text style={styles.thankText}>Thank You!</Text>
      <Text style={styles.heading}>Payment done SuccessFully</Text>
      <Text style={styles.description}>
        You will be redirected to the home page shortly or click here to return
        to home page
      </Text>
      <TouchableOpacity onPress={()=>navigation.navigate("Orders")} style={styles.buttonBg}>
        <Text style={styles.buttonText}>My Order</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PaymentSuccess;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
  },
  logBg: {
    width: responsiveWidth(35),
    height: responsiveWidth(35),
    alignSelf: 'center',
    marginTop: 150,
    backgroundColor:"#43d19dff",
    justifyContent:"center",
    alignItems:"center",
    borderRadius:100

  },
//   logo: {
//     width:responsiveWidth(15),
//     height:responsiveWidth(15)
//   },
  thankText: {
    alignSelf: 'center',
    fontSize: responsiveFontSize(3),
    fontFamily: 'Poppins-ExtraBold',
    color:"#43d19dff",
    marginTop: 50,


  },
  heading: {
    alignSelf: 'center',
    fontFamily: 'Poppins-SemiBold',
    fontSize: responsiveFontSize(2),
    color:"#525252ff"
  },
  description: {
    alignSelf: 'center',
    width: '70%',
    textAlign: 'justify',
    fontSize: responsiveFontSize(1.7),
    marginTop:20

  },
  buttonBg: {
    width:responsiveWidth(40) ,
    height: responsiveWidth(10),
    backgroundColor:"#43d19dff",
    alignItems:"center",
    justifyContent:"center",
    borderRadius:20,
    alignSelf:"center",
    marginTop:30

  },
  buttonText: {
    color:"#ffffff"
  },
});
