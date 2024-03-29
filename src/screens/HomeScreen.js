import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {BASE_URL} from '../../config';
import axios from 'axios';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SearchInput from '../component/input/SearchInput';
import Banner from '../component/ImageCarousel/Banner';
import SectionComponent from '../component/section/SectionComponent';
import TopPicks, {ImgNameCard} from '../component/card/ImgNameCard';
import SearchScreen from './SearchScreen';

const HomeScreen = ({navigation}) => {
  // const [search, setSearch] = useState('');
  const [data, setData] = useState({});
  // const [isOpen, setIsOpen] = useState(false);
  // const [searchData,setSearchData]= useState([])
  const [loading, setLoading] = useState(false);
 


// useEffect(()=>{
// if(search!==""){
//   const url = `${BASE_URL}method=search&search=${search}
//   `;
 
//   axios
//     .get(url)
//     .then(response => {
//       console.log('Get successful:', response.data.response);
//       // setData(response.data);
//       setSearchData(response.data.response)
    
//     })
//     .catch(error => {
//       console.error('Get failed:', error);
     
//     });
// }
// },[search])











  const handleGet = () => {
    const url = `${BASE_URL}method=dashboard
    `;
   
    axios
      .get(url)
      .then(response => {
        // console.log('Get successful:', response.data);
        setData(response.data);
       
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
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{backgroundColor: 'red', paddingBottom: responsiveHeight(2)}}>
        <View style={styles.notificationContainer}>
          <Text style={styles.notificationName}>Kestrel</Text>
          <View style={styles.iconNotificationContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Notifications')}
              style={{marginRight: 10}}>
              <FontAwesome
                size={responsiveWidth(5)}
                name="bell"
                color="#ffffff"
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.imageContainer}>
              <FontAwesome
                size={responsiveWidth(6)}
                name="user-circle-o"
                color="#ffffff"
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity onPress={()=>navigation.navigate("SearchScreen")}
        activeOpacity={0.9}
          style={{
            marginTop: responsiveHeight(0.9),

            paddingHorizontal: 17,
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
      </View>

    
    

  
    
   
     
     
     <View
        style={{
          flex: 1,
          backgroundColor: '#f7f9fcff',
          borderTopEndRadius: 12,
          borderTopLeftRadius: 12,
        }}>
        <View style={{marginTop: 20}}>
          {data.slider ? (
            <Banner data={data.slider} />
          ) : (
            <ActivityIndicator
              style={styles.activityIndicator}
              size="large"
              color="red"
            />
          )}
        </View>

        <ScrollView contentContainerStyle={{paddingHorizontal: 17}}>
          {/* {data.category?<TopPicks  data={data.category} navigation={navigation} />:<ActivityIndicator style={styles.activityIndicator} size="large" color="red" />} */}
          <View style={styles.topPicksContainer}>
            <Text style={styles.header}>Popular Category</Text>

            {data.category ? (
              <View style={styles.ProductContainer}>
                {data.category.map(item => (
                  <ImgNameCard
                    key={item.categoryId}
                    onPress={() =>
                      navigation.navigate('Section', {
                        id: item.categoryId,name:item.categoryName
                      })
                    }
                    item={item}
                  />
                ))}
              </View>
            ) : (
              <ActivityIndicator
                style={styles.activityIndicator}
                size="large"
                color="red"
              />
            )}
          </View>

          {data.product ? (
            <SectionComponent data={data.product} navigation={navigation} />
          ) : (
            <ActivityIndicator
              style={styles.activityIndicator}
              size="large"
              color="red"
            />
          )}
        </ScrollView>
      </View>
     

    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#f2f4f7f2',
    backgroundColor: 'red',
  },
  notificationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: responsiveHeight(1),
    paddingHorizontal: 17,
  },
  notificationName: {
    fontSize: responsiveFontSize(2.8),

    color: '#ffffff',
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
  },

  imageContainer: {
    borderRadius: 50,
    overflow: 'hidden',
  },
  image: {
    width: responsiveWidth(10),
    height: responsiveWidth(10),
    resizeMode: 'cover',
  },
  iconNotificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ProductContainer: {
    overflow: 'hidden',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  topPicksContainer: {
    flex: 1,
    backgroundColor: '#f7f9fcff',
    paddingTop: responsiveHeight(0.5),
  },
  header: {
    fontSize: responsiveFontSize(2.1),
    fontFamily: 'Poppins-ExtraBold',
    marginTop: responsiveHeight(2),
    marginBottom: responsiveHeight(1),
    color: 'black',
  },
});
