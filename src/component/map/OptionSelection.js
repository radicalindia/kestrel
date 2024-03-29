import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const data = ["Home", "Office", "Other"];

const OptionSelection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handlePress = (index) => {
    setActiveIndex(index);
    // console.log('time selection', data[index]);
  };

  return (
    <View style={styles.container}>
      {data.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handlePress(index)}
          style={[
            styles.timeSlot,
            activeIndex === index && styles.activeTimeSlot,
          ]}
        >
          <Text style={styles.text}>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: responsiveWidth(1),
    paddingHorizontal: 12,
    marginTop: responsiveHeight(2)
  },
  timeSlot: {
    alignItems: 'center',
    justifyContent: 'center',
    width: responsiveWidth(30) - 2 * responsiveWidth(1),
    height: responsiveWidth(10),
    backgroundColor: '#f0f1f2ff',
    marginBottom: responsiveWidth(2),
    borderRadius: 8,
  },
  activeTimeSlot: {
    borderColor: '#c43c02ff', 
    borderWidth: 2, 
  },
  text: {
    fontSize: responsiveFontSize(1.6),
    fontWeight: '400',
    fontFamily: 'Poppins-Regular',
  },
});

export default OptionSelection;
