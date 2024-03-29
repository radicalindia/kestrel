import { StyleSheet, Text, View,Image, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'

const IconTextButton = ({icon,text,onPress,}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
        <View style={{paddingLeft:12}}>

        {icon}
        </View>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  )
}

export default IconTextButton

const styles = StyleSheet.create({

    container:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        backgroundColor:"#ffffff",
        borderColor:"grey",
        borderBottomWidth:0.2,
        paddingVertical:responsiveHeight(2.1),
        marginVertical:2
    },
    text:{
        flex:1,
        fontSize:responsiveFontSize(2),
        fontFamily:"Poppins-Medium",
        fontWeight:"400",
        marginLeft:20,
        color:"#37474F"
    },
    
})