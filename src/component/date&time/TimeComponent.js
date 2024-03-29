import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const timeData = [
  '8 Am - 11 AM',
  '11 AM - 12 AM',
  '12 PM - 2 PM',
  '2 PM - 4 PM',
  '4 PM - 6 PM',
  '6 PM - 8 PM',
];

const TimeComponent = () => {
  return (
    <View style={styles.container}>
      {timeData.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => console.log('time selection', item)}
          style={styles.timeSlot}>
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
  },
  timeSlot: {
    alignItems: 'center',
    justifyContent: 'center',
    width: responsiveWidth(30) - 2 * responsiveWidth(1), // Adjusted width with margin subtracted
    height: responsiveWidth(9),
    backgroundColor: '#f0f1f2ff',
    borderRadius: responsiveWidth(1),
    marginBottom: responsiveWidth(2),
  },
  text: {
    fontSize: responsiveFontSize(1.6),
    fontWeight: '400',
    fontFamily: 'Poppins-Regular',
  },
});

export default TimeComponent;
