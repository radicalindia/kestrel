import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, KeyboardAvoidingView } from 'react-native';
import MapComponent from '../component/map/MapComponent';
import SearchInput from '../component/input/SearchInput';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import OptionSelection from '../component/map/OptionSelection';
import IconButton from '../component/Button/IconButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const LocationSelection = () => {
  const [search, setSearch] = useState('');

  return (
    <KeyboardAvoidingView style={{ flex: 1,paddingBottom:10 }} behavior={Platform.OS === "ios" ? "padding" : null}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <MapComponent onBackPress={() => console.log("back")} />
        <View style={styles.searchContainer}>
          <SearchInput
            placeholder="Search for location"
            placeholderTextColor="#8e8e93"
            iconColor="#37474fff"
            onChangeText={setSearch}
            value={search}
            onIconClick={() => setSearch('')}
            bgColor="#F0F1F2"
          />
        </View>

        <OptionSelection />

        <View style={styles.saveButtonContainer}>
          <IconButton
            text="Save This Location"
            backgroundColor="#c43c02ff"
            onPress={() => ''}
            icon={
              <MaterialCommunityIcons
                name="content-save-outline"
                size={responsiveFontSize(2.3)}
                color="#e1e8faff"
              />
            }
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,

  },
  searchContainer: {
    marginTop: responsiveHeight(3),
    paddingHorizontal: 12,
  },
  saveButtonContainer: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    paddingHorizontal: 12,
  },
});

export default LocationSelection;
