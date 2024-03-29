import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NotificationComponent from '../component/notifications/NotificationComponent'
import Header from '../component/Header'

const Notifications = () => {
  return (
    <View style={styles.container}>
     <View style={{paddingHorizontal: 12}}>
        <Header
          backgroundColor="#ffffffff"
          onBackPress={() => console.log('back')}
          title="Notifications"
        />
      </View>

<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingHorizontal:12,marginTop:10}}>

      <NotificationComponent unread={true}  type="delivering"/>
      <NotificationComponent unread={false}  type="delivering"/>
      <NotificationComponent unread={false}  type="orderConfirm"/>
      <NotificationComponent unread={false}  type="delivering"/>
      <NotificationComponent unread={false}  type="delivered"/>
      <NotificationComponent unread={false}  type="delivering"/>
      <NotificationComponent unread={false}  type="orderConfirm"/>
      <NotificationComponent unread={false}  type="delivering"/>
      <NotificationComponent unread={false}  type="delivered"/>
      <NotificationComponent unread={false}  type="delivering"/>
      <NotificationComponent unread={false}  type="orderConfirm"/>
      <NotificationComponent unread={false}  type="delivering"/>
      <NotificationComponent unread={false}  type="delivered"/>


</ScrollView>
    </View>
  )
}

export default Notifications

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#ffffffff"
    }
})