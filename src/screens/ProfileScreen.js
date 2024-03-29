import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../component/Header';

const ProfileScreen = ({ route, navigation }) => {
  const { name, mobile, email } = route.params;
  const [updatedName, setUpdatedName] = useState(name);
  const [updatedMobile, setUpdatedMobile] = useState(mobile);
  const [updatedEmail, setUpdatedEmail] = useState(email);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditProfile = () => {
    setIsEditing(!isEditing);
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        backgroundColor="#ffffff"
        onBackPress={() => navigation.goBack()}
        title="Profile"
      />

      <ScrollView contentContainerStyle={styles.container}>
        <View style={{ flex: 1, paddingHorizontal: 12 }}>
          <View style={{ alignSelf: "center" }}>
            <View style={styles.imageContainer}>
              <TouchableOpacity>
                <MaterialCommunityIcons
                  name="camera-plus-outline"
                  size={responsiveFontSize(3)}
                  color="black"
                />
              </TouchableOpacity>
            </View>
            <Text style={{ color: "#96667cff", fontSize: responsiveFontSize(2) }}>Select Image</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Full Name</Text>
            {isEditing ? (
              <TextInput
                style={styles.value}
                value={updatedName}
                onChangeText={text => setUpdatedName(text)}
              />
            ) : (
              <Text style={styles.value}>{updatedName}</Text>
            )}
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Phone Number</Text>
            {isEditing ? (
              <TextInput
                style={styles.value}
                value={updatedMobile}
                onChangeText={text => setUpdatedMobile(text)}
              />
            ) : (
              <Text style={styles.value}>{updatedMobile}</Text>
            )}
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Email</Text>
            {isEditing ? (
              <TextInput
                style={styles.value}
                value={updatedEmail}
                onChangeText={text => setUpdatedEmail(text)}
              />
            ) : (
              <Text style={styles.value}>{updatedEmail}</Text>
            )}
          </View>
          <TouchableOpacity style={styles.buttonBg} onPress={handleEditProfile}>
            <Text style={styles.buttonText}>{isEditing ? "Save Profile" : "Update Profile"}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    backgroundColor: '#e3e5e6ff',
    borderRadius: 100,
    width: responsiveWidth(24),
    height: responsiveWidth(24),
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContainer: {
    marginTop: 15
  },
  label: {
    fontSize: responsiveFontSize(2.1),
    fontWeight: 'bold',
    color: '#333',
    width: responsiveWidth(20),
    width: '100%',
  },
  value: {
    borderBottomColor: '#96667cff',
    borderBottomWidth: 1,
    paddingBottom: 10,
    fontSize: responsiveFontSize(1.7),
    marginTop: 5,
  },
  buttonBg: {
    width: "100%",
    height: responsiveWidth(12),
    backgroundColor: "#96667cff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    alignSelf: "center",
    marginTop: 30

  },
  buttonText: {
    color: "#ffffff",
    fontFamily: "Poppins-SemiBold"
  },
});

export default ProfileScreen;
