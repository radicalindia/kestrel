import React from 'react';
import { StyleSheet, View, Text, Image, FlatList, Touchable, TouchableOpacity } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const CotegoryCard = ({navigation,data}) => {
  // const data = [
  //   { id: 1, name: 'Item 1 hoop', image: '' },
  //   { id: 2, name: 'Item balood', image: 'https://via.placeholder.com/150' },
  //   { id: 3, name: 'Item dood', image: 'https://via.placeholder.com/150' },
  //   { id: 4, name: 'Item namak ', image: 'https://via.placeholder.com/150' },
  //   { id: 14, name: 'Item 1 hoop', image: 'https://via.placeholder.com/150' },
  //   { id: 432, name: 'Item balood', image: 'https://via.placeholder.com/150' },
  //   { id: 4343, name: 'Item dood', image: 'https://via.placeholder.com/150' },
  //   { id: 444, name: 'Item namak ', image: 'https://via.placeholder.com/150' },
  //   { id: 140, name: 'Item 1 hoop', image: 'https://via.placeholder.com/150' },
  //   { id: 4329, name: 'Item balood', image: 'https://via.placeholder.com/150' },
  //   { id: 43439, name: 'Item dood', image: 'https://via.placeholder.com/150' },
  //   { id: 4448, name: 'Item namak ', image: 'https://via.placeholder.com/150' },
  // ];

  const renderItem = ({ item }) => {
    const numberOfLines = item.categoryName.split('\n').length;
    const cardStyles = numberOfLines > 1 ? [styles.card, styles.multilineCard] : styles.card;
    return (
      <TouchableOpacity onPress={()=>navigation.navigate('Section', {
        id: item.categoryId,name:item.categoryName
      })} style={cardStyles}>
        <Image source={{uri:item.icon}} style={styles.foodImage} />
        <Text style={styles.foodName} numberOfLines={2}>{item.categoryName}</Text>
      </TouchableOpacity>
    );
  };
  // navigation.navigate("Section")
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.categoryId}
        numColumns={2}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: responsiveHeight(3), paddingHorizontal: 12,marginTop:responsiveHeight(2) }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    flex: 1,
    backgroundColor:"#f7f9fcff",
    borderTopEndRadius:25,
    borderTopLeftRadius:25,
  },
  card: {
    width: '46%',
    borderRadius:10,
    
    paddingVertical: responsiveHeight(2),
    marginVertical: responsiveHeight(0.7),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#ffffffff",
    marginLeft: responsiveWidth(2),
    marginRight: responsiveWidth(2),
  },
  multilineCard: {
    paddingHorizontal: 12,
  },
  foodImage: {
    width: responsiveWidth(20),
    height: responsiveHeight(12),
    resizeMode: 'contain',
  },
  foodName: {
  
    fontSize: responsiveFontSize(1.5),
    color: '#3c3b47ff',
    textAlign: 'center',
    marginTop: responsiveHeight(1),
    paddingHorizontal:10,
    fontWeight: '500',
    fontFamily:"Poppins-Regular"
  },
});


export default CotegoryCard;
