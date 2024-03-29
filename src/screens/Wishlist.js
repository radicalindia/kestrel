import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../component/Header'
import { responsiveHeight } from 'react-native-responsive-dimensions'
import WishListComponent from '../component/wishList/WishListComponent'

const Wishlist = ({navigation}) => {
  return (
    <View style={{flex:1}}>

        <View style={{paddingHorizontal:12}}>

        <Header
            backgroundColor="#f5f5f2ff"
            onBackPress={() => console.log('back')}
            title="WishList"
          />
        </View>
      <ScrollView contentContainerStyle={styles.container}>
         
        <View style={{marginTop: responsiveHeight(4)}}>
            <WishListComponent onPress={()=>navigation.navigate("WishListEdit")} />
            <WishListComponent onPress={()=>navigation.navigate("WishListEdit")} />
            
           
          </View>
      </ScrollView>
    </View>
  )
}

export default Wishlist

const styles = StyleSheet.create({
  container:{
      flexGrow: 1,
      paddingHorizontal: 12,
      backgroundColor: '#f5f5f2ff',
      paddingBottom:responsiveHeight(8),
      
  }
});