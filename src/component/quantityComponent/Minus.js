import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { responsiveWidth } from 'react-native-responsive-dimensions';

const Minus = ({onPress}) => {
  return (
    <TouchableOpacity
    style={{
      backgroundColor: '#ffffff',

      alignItems: 'center',

      justifyContent: 'center',
    }}
    onPress={onPress}>
    <AntDesign
      name="Minus"
      size={responsiveWidth(5)}
      color="#e87982ff"
    />
  </TouchableOpacity>
  )
}

export default Minus

const styles = StyleSheet.create({})