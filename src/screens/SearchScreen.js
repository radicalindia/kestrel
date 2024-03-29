import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import ProductListComponent from '../component/card/ProductListComponent';
import SearchComponent from '../component/searchComponent/SearchComponent';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';
import {BASE_URL} from '../../config';
import axios from 'axios';
import SearchInput from '../component/input/SearchInput';
const SearchScreen = () => {
  // console.log("isData for search",data)
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const [data, setSearchData] = useState([]);
  const [search, setSearch] = useState('');
  useEffect(() => {
    if (search !== '') {
      const url = `${BASE_URL}method=search&search=${search}
        `;

      axios
        .get(url)
        .then(response => {
          console.log('Get successful:', response.data.response);
          // setData(response.data);
          setSearchData(response.data.response);
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
  }, [search]);

  return (
    <View style={styles.container}>
      <View style={{marginTop: responsiveHeight(1), flex: 1}}>
        <View
          style={{
            marginTop: responsiveHeight(0.9),

            paddingHorizontal: 17,
          }}>
          <SearchInput
            placeholder="Search Anything"
            placeholderTextColor="#8e8e93"
            iconColor="#37474fff"
            onChangeText={e => setSearch(e)}
            value={search}
            onIconClick={() => ''}
            bgColor="#F0F1F2"
            onFocus={() => console.log('focused')}
            editable={true}
          />
        </View>

        {search == '' ? (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontSize: responsiveFontSize(2)}}>search....</Text>
          </View>
        ) : data == null ? (
          <Text
            style={{
              alignSelf: 'center',
              justifyContent: 'center',
              marginTop: 10,
              fontSize: responsiveFontSize(2),
            }}>
            Item not available
          </Text>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1, paddingHorizontal: 12}}>
            {data?.map(item => (
              <SearchComponent
                key={item.productId}
                onPress={() =>
                  navigation.navigate('ProductDetail', {id: item.productId})
                }
                data={item}
              />
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
