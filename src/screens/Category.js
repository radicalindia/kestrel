import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import CategoryCard from '../component/card/CategoryCard';
import SearchInput from '../component/input/SearchInput';
import { BASE_URL } from '../../config';
import axios from 'axios';
import SearchScreen from './SearchScreen';

const Cotegory = ({navigation}) => {
  const [search, setSearch] = useState('');

  const [searchData,setSearchData]= useState([])

  const [data, setData] = useState({});
 
  const [loading, setLoading] = useState(false);


  useEffect(()=>{
    if(search!==""){
      const url = `${BASE_URL}method=search&search=${search}
      `;
     
      axios
        .get(url)
        .then(response => {
          console.log('Get successful:', response.data.response);
          // setData(response.data);
          setSearchData(response.data.response)
        
        })
        .catch(error => {
          if (error.isAxiosError && !error.response) {
            // Network error
            Alert.alert('Network Error', 'Please check your internet connection.');
          } else {
            // Other errors
            console.error('Error adding item to cart:', error);
            Alert.alert('Error', 'Something went wrong. Please try again later.');
          }
          setLoading(false);
         
        });
    }
    },[search])




    const handleGet = () => {
      const url = `${BASE_URL}method=allCategory
      `;
     
      axios
        .get(url)
        .then(response => {
          console.log('Get successful:', response.data.category);
          setData(response.data.category);
         
        })
        .catch(error => {
          if (error.isAxiosError && !error.response) {
            // Network error
            Alert.alert('Network Error', 'Please check your internet connection.');
          } else {
            // Other errors
            console.error('Error adding item to cart:', error);
            Alert.alert('Error', 'Something went wrong. Please try again later.');
          }
          setLoading(false);
         
        });
    };
    useEffect(() => {
      handleGet();
    }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Category</Text>

      <TouchableOpacity  onPress={()=>navigation.navigate("SearchScreen")}
        activeOpacity={0.9}
        style={{
          marginTop: responsiveHeight(1),

          paddingHorizontal: 16,
        }}>
        <SearchInput
           placeholder="Search Anything"
           placeholderTextColor="#8e8e93"
           iconColor="#37474fff"
           // onChangeText={e => setSearch(e)}
           // value={search}
           // onIconClick={() => ''}
           bgColor="#F0F1F2"
           onFocus={() => console.log("focused")}
           editable={false}
        />
      </TouchableOpacity>
      <View style={{marginTop: responsiveHeight(2), flex: 1}}>

     { search==""?
     
        <CategoryCard data={data} navigation={navigation} />
      :<SearchScreen data={searchData}/>
      }
      </View>
    </View>
  );
};

export default Cotegory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
  text: {
    fontSize: responsiveFontSize(2.4),
    paddingHorizontal: 16,
    fontWeight: '500',
    marginTop: responsiveHeight(3),
    color: '#ffffff',

    fontFamily: 'Poppins-SemiBold',
  },
  cardContainer: {
    marginTop: responsiveHeight(4),
    flex: 1,
  },
});
