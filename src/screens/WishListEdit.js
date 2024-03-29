import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../component/Header';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import ExpandableListItem from '../component/ExpandableListItem/ExpandableListItem';
import {ProductImagesData} from '../data/Data';
import ProductView from '../component/ImageCarousel/ProductView';
import IconButton from '../component/Button/IconButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const WishListEdit = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <View style={{paddingHorizontal: 12}}>
        <Header
          backgroundColor="#f5f5f2ff"
          onBackPress={() => console.log('back')}
          title=""
        />
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={{marginVertical: responsiveHeight(2)}}>
          <ProductView images={ProductImagesData} />
        </View>
        

        <Text style={styles.name}>Lorem ipsum dolor sit amet consectetur.</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.kg}>1KG</Text>
        </View>

        <View style={{marginTop: responsiveHeight(1)}}>
          <ExpandableListItem
            title="Dano"
            description="Et quidem faciunt, ut summum bonum sit extremum et rationibus conquisitis de voluptate. Sed ut summum bonum sit id,"
          />
        </View>
        


        
      </ScrollView>
      <View style={styles.iconButtonContainer}>
       <View style={{marginBottom:10}}>
       <IconButton
          text="Edit info"
          backgroundColor="#c43c02ff"
          onPress={() => ""}
          icon={
            <MaterialCommunityIcons
            size={responsiveWidth(5)}
            name="pencil-outline"
            color="#ffffff"
          />
          }
        />
       </View>
       <View style={{marginBottom:10}}>
       <IconButton
          text="Delete this"
          backgroundColor="#ff5452ff"
          onPress={() => ""}
          icon={
            <MaterialCommunityIcons
            size={responsiveWidth(5)}
            name="delete-outline"
            color="#ffffff"
          />
          }
        />
       </View>
      </View>
    </View>
  );
};

export default WishListEdit;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 12,
    backgroundColor: '#f5f5f2ff',
    paddingBottom: responsiveHeight(8),
  },
  name: {
    fontSize: responsiveFontSize(1.8),

    color: '#000000ff',
    fontWeight: '600',
    fontFamily: 'Poppins-Medium',
  },
 

kg: {
    fontSize: responsiveFontSize(2.5),
    // fontWeight: '500',
    color: '#3d3d3dff',
    marginTop: responsiveHeight(1),
    fontWeight: '700',
    fontFamily:"Poppins-Bold"
  },

  iconButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    paddingHorizontal: 12,
  },
});
