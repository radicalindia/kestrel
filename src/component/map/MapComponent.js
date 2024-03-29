import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/Ionicons'; // Import Ionicons from react-native-vector-icons

const MapComponent = ({onBackPress}) => {
  return (
    <View style={styles.container}>
    <MapView
      provider={PROVIDER_GOOGLE} 
      style={styles.map}
      region={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      }}
    >
    </MapView>
    <TouchableOpacity style={styles.iconContainer} onPress={onBackPress}>
        <Icon name="arrow-back" size={responsiveWidth(5.5)} color="#37474fff" />
      </TouchableOpacity>
  </View>
  )
}

export default MapComponent

const styles = StyleSheet.create({
    container: {
      // ...StyleSheet.absoluteFillObject,
      height: responsiveHeight(70),
      width:"100%",
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
    iconContainer:{
padding:10,
backgroundColor:"#ffffff",
borderRadius:100,
justifyContent:"center",
alignItems:"center",
position:"absolute",
top:22,
left:22,
    }
   });