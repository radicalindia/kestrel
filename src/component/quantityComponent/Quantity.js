// import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// import React from 'react'
// import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions'
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// const Quantity = ({quantity, setQuantity,}) => {
//     const decrement = () => {
//         if (quantity > 0) {
//           setQuantity(quantity - 1);
    
//         }
//       };
    
//       const increment = () => {
//         setQuantity(quantity + 1);
//       };


//     // const decrement = () => {
//     //     if (quantity > 1) {
//     //       setQuantity(quantity - 1);
//     //       updateQuantity(quantity - 1); 
//     //     }
//     //   };
    
//     //   const increment = () => {
//     //     setQuantity(quantity + 1);
//     //     updateQuantity(quantity + 1); 
//     //   };
//   return (
//     <View style={styles.quantityContainer}>
//     <TouchableOpacity style={quantity==1?[styles.button,{backgroundColor:"white"}]:styles.button} onPress={decrement}>
//      {quantity==1? <MaterialCommunityIcons
//       name="delete"
//       size={responsiveWidth(5.5)}
//       color="red"
//     />: 
    
//     <Text style={styles.buttonText}>-</Text>}
//     </TouchableOpacity>
//     <Text style={styles.incrementView}>{quantity}</Text>
//     <TouchableOpacity style={[styles.button, { backgroundColor: "#c43c02ff" }]} onPress={increment}>
//       <Text style={styles.buttonText}>+</Text>
//     </TouchableOpacity>
//   </View>
//   )
// }

// export default Quantity

// const styles = StyleSheet.create({
//     quantityContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//       },
//       button: {
//         backgroundColor: '#ff5452ff',
//         borderRadius: 5,
       
//         alignItems: "center",
//         width:responsiveWidth(7),
//         height:responsiveWidth(7),
//         justifyContent:"center"
    
//       },
//       buttonText: {
//         fontSize: responsiveFontSize(2),
//         // fontWeight: 'bold',
//         color: '#fff',
//         padding: 2,
//         fontWeight: '400',
//         fontFamily:"Poppins-Medium"
//       },
//       incrementView: {
//         fontSize: responsiveFontSize(2),
//         // fontWeight: 'bold',
//         marginHorizontal: 10,
//         fontWeight: '400',
//         fontFamily:"Poppins-Medium"
//       },
// })




import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Quantity = ({quantity, onDecrease, onIncrease}) => {
    const decrement = () => {
        if (quantity > 0) {
            onDecrease(); // Call the onDecrease handler
        }
    };
    
    const increment = () => {
        onIncrease(); // Call the onIncrease handler
    };

    return (
        <View style={styles.quantityContainer}>
            <TouchableOpacity style={quantity === 1 ? styles.deleteButton : styles.button} onPress={decrement}>
                {quantity === 1 ? (
                    <MaterialCommunityIcons
                        name="delete"
                        size={responsiveWidth(5.5)}
                        color="red"
                    />
                ) : (
                    <Text style={styles.buttonText}>-</Text>
                )}
            </TouchableOpacity>
            <Text style={styles.incrementView}>{quantity}</Text>
            <TouchableOpacity style={styles.button} onPress={increment}>
                <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Quantity

const styles = StyleSheet.create({
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#ff5452ff',
        borderRadius: 5,
        alignItems: "center",
        width: responsiveWidth(7),
        height: responsiveWidth(7),
        justifyContent: "center"
    },
    deleteButton: {
        backgroundColor: 'transparent', // Transparent background for delete button
        width: responsiveWidth(7),
        height: responsiveWidth(7),
        justifyContent: "center"
    },
    buttonText: {
        fontSize: responsiveFontSize(2),
        color: '#fff',
        fontWeight: '400',
        fontFamily: "Poppins-Medium"
    },
    incrementView: {
        fontSize: responsiveFontSize(2),
        marginHorizontal: 10,
        fontWeight: '400',
        fontFamily: "Poppins-Medium"
    },
})
