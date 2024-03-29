import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const NotificationComponent = ({unread, type}) => {
  const [state, setState] = useState({});

  useEffect(() => {
    switch (type) {
      case 'delivering':
        setState({
          img: require('../../../assets/icon/communication.png'),
          bgColor: '#36b37eff',
          text: 'Your Order is Delivering to your home',
        });
        break;
      case 'orderConfirm':
        setState({
          img: require('../../../assets/icon/notification.png'),
          bgColor: '#ff5452ff',
          text: 'Your Order is Confirmed. Please check everything is okay',
        });
        break;
      case 'delivered':
        setState({
          img: require('../../../assets/icon/star.png'),
          bgColor: '#c43c02ff',
          text: 'Your Order is Completed. Please  rate the experince',
        });
        break;
      default:
        break;
    }
  }, [type]);

  return (
    <View>
      <View
        style={
          unread
            ? [
                styles.container,
                {backgroundColor: '#dff2d0ff', borderBottomWidth: 0},
              ]
            : styles.container
        }>
        {state.img && state.bgColor && (
          <>
            <View style={{flex: 1, marginLeft: 10}}>
              <Text style={styles.orderText}>Order #345</Text>
              <Text style={styles.descriptionText}>{state.text}</Text>
            </View>
            <View style={styles.timeContainer}>
              <Text style={styles.TimeText}>3:57 pm</Text>

              <View
                style={[styles.paymentIcon, {backgroundColor: state.bgColor}]}>
                <Image
                  source={state?.img}
                  style={{
                    width: responsiveWidth(4),
                    height: responsiveWidth(4),
                    resizeMode: 'contain',
                  }}
                />
              </View>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

export default NotificationComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffffff',
    paddingVertical: responsiveHeight(1.5),
    borderBottomWidth: 0.2,
    borderRadius: 12,
    borderColor: 'grey',
  },
  paymentIcon: {
    borderRadius: 50,
    width: responsiveWidth(10),
    height: responsiveWidth(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderText: {
    fontSize: responsiveFontSize(1.7),
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    color: '#37474F',
  },
  descriptionText: {
    fontSize: responsiveFontSize(1.5),
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    color: '#37474F',
    marginRight: 2,
  },
  TimeText: {
    fontSize: responsiveFontSize(1.3),
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    color: '#37474F',
  },
  timeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'baseline',
    marginRight: 20,
  },
});
