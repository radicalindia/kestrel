import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const QuantityButton = ({ onPress, quantity, decrease = false }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          backgroundColor: decrease ? '#ff5452ff' : '#c43c02ff',
          borderRadius: 5,
          alignItems: 'center',
          width: responsiveWidth(7),
          height: responsiveWidth(7),
          justifyContent: 'center',
        }}>
        {decrease ? (
          quantity > 1 ? (
            <AntDesign
              name="minus"
              size={responsiveWidth(6)}
              color="black"
            />
          ) : (
            <View
              style={{
                backgroundColor: 'white',
                borderRadius: 5,
                alignItems: 'center',
                width: responsiveWidth(7),
                height: responsiveWidth(7),
              }}>
              <MaterialCommunityIcons
                name="delete"
                size={responsiveWidth(6)}
                color="red"
              />
            </View>
          )
        ) : (
          <AntDesign
            name="plus"
            size={responsiveWidth(5)}
            color="black"
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default QuantityButton;
