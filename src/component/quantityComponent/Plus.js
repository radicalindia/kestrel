import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { responsiveWidth } from 'react-native-responsive-dimensions';

const Plus = ({onPress}) => {
  return (
    <TouchableOpacity
    style={{
      backgroundColor: '#ffffff',

      alignItems: 'center',

      justifyContent: 'center',
    }}
    onPress={onPress}>
    <AntDesign
      name="plus"
      size={responsiveWidth(5)}
      color="#e87982ff"
    />
  </TouchableOpacity>
  )
}

export default Plus

const styles = StyleSheet.create({})