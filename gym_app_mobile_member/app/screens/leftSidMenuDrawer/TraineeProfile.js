import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Button, Dimensions, TouchableOpacity, ImageBackground } from "react-native";
import { Caption, TouchableRipple } from 'react-native-paper';
import Logo from "../../components/Logo";
import Colors from '../../constants/Colors';
import Card from '../../components/Card';


import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from '@expo/vector-icons';
import UpdateProfile from "../../components/UpdateProfile";
import { getFormattedToken } from "../../common/formetedToken";
import {
  getProfile,
  updateProfile,
} from "../../redux/traineeProfile/traineeProfileActionCreator";
import { useDispatch, useSelector } from "react-redux";

import TraineeProfileSettingsScreen from "./TraineeProfileSettingsScreen/TraineeProfileSettingsScreen";
import emptyProfile from '../../../assets/image/emptyProfile.png'

//imports for Updating ProfileImage
import * as ImagePicker from 'expo-image-picker';
import commonApi from "../../api/commonApi";
// pass trainee profile pic as image source.
// component detailing will be done after api intrgation.
// the mockup that was shown need some navigational tuning to complete.

const { width, height } = Dimensions.get('window')

const TraineeProfile = (props) => {

  const dispatch = useDispatch();

  // const [imageUri, setImageUri] = useState('');
  const formattedToken = useSelector((state) =>
    getFormattedToken(state.loginReducer.token)
  );

  // i get either true/false value
  const profileGet = useSelector(
    (state) => state.traineeProfileReducer.profileGet
  );
  // i get total response.
  const profileData = useSelector(
    (state) => state.traineeProfileReducer.profileData
  );

  // const profileUpdated = useSelector(
  //   (state) => state.traineeProfileReducer.profileUpdateCount
  // )


  useEffect(() => {
    dispatch(getProfile(formattedToken));
  }, []);

  return (
    <>
      {profileGet ? (
        <View style={styles.screen}>

          {/* contains Image */}
          <View style={styles.topContainer}>

            <View style={styles.imageContainer}>
              <ImageBackground
                source={{ uri: commonApi.api + profileData.image }}
                style={{ width: '100%', height: '100%' }}
              />
              <View style={{ position: 'absolute', height: 50, backgroundColor: Colors.screen, width: '70%', alignItems: 'center', justifyContent: 'center', borderRadius: 25, opacity: .8 }}>
                <Text style={{ color: 'white', fontSize: 30, }} adjustsFontSizeToFit={true} >{`${profileData.user.firstname}  ${profileData.user.lastname}`}</Text>
              </View>

            </View>
          </View>
          {/* Profile details  */}

          <View style={styles.profileDetails}>

            {/* <View style={styles.nameContainer}>
              <Card style={styles.nameContainerCard}>
                <Text
                  style={styles.text}
                >{`${profileData.user.firstname}  ${profileData.user.lastname}`}</Text>
                <Caption style={styles.caption} >@trainee</Caption>
              </Card>
            </View> */}

            <Card style={styles.cardView}>
              <View style={styles.detailsContainer}>
                <Text
                  style={styles.detailsText}
                >{`Email: ${profileData.email}`}</Text>
                <Text
                  style={styles.detailsText}
                >{`Adreess: ${profileData.address}`}</Text>
                <Text
                  style={styles.detailsText}
                >{`DOB:  ${profileData.dateOfBirth.slice(0, 10)}`}</Text>
                <Text style={styles.detailsText}>
                  {`Age: ${profileData.age}`}{" "}
                </Text>
                <Text style={styles.detailsText}>
                  {`Weight: ${profileData.weight}`}{" "}
                </Text>
                <Text
                  style={styles.detailsText}
                >{`Height: ${profileData.height} `}</Text>
                <Text style={styles.detailsText}>
                  {`BMI: ${profileData.bmi.toFixed(2)}`}{" "}
                </Text>
              </View>
            </Card>
          </View>

          {/* end profile details */}

          {/* bottom Settings View */}

          <Card style={{ padding: 5, ...styles.bottomView }}>
            <TouchableRipple
              style={styles.bottomCardView}
              onPress={() => props.navigation.navigate('Settings', { data: profileData })}
              rippleColor="rgba(0, 0, 0, .32)"
            >
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  height: "100%",
                  padding: 10,
                }}
              >
                {/* <Button
                color={Colors.primary}
                title="Update Profile"
                // 
                onPress={() => {  }}
                /> */}
                <View style={{ width: "30%", height: "100%", alignItems: 'center', justifyContent: 'center' }}>
                  <Ionicons name="ios-settings-outline" size={30} color={Colors.primary} />
                </View>
                <View style={{ width: "70%", height: "100%", alignItems: 'flex-start', justifyContent: 'center' }}>
                  <Text style={{ color: Colors.primary, fontSize: 18 }} >Go To Settings Menu</Text>
                </View>
              </View>
            </TouchableRipple>
          </Card>

        </View>
      ) : (
        <View style={{ ...styles.screen, justifyContent: 'center', }}>
          <ImageBackground
            style={{
              width: '100%', height: '100%', alignItems: 'center',
              justifyContent: 'flex-end'
            }}
            source={emptyProfile}
          >

            <View styles={styles.emptyScreenSettingsView}>
              <Card style={{ padding: 5, ...styles.bottomView, width: width - 50, height: 50, marginBottom: 50 }}>
                <TouchableRipple
                  style={styles.bottomCardView}
                  onPress={() => props.navigation.navigate('Settings', { data: profileData })}
                  rippleColor="rgba(0, 0, 0, .32)"
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      height: "100%",
                      padding: 10,
                    }}
                  >
                    <View style={{ width: "30%", height: "100%", alignItems: 'center', justifyContent: 'center' }}>
                      <Ionicons name="ios-settings-outline" size={30} color={Colors.primary} />
                    </View>
                    <View style={{ width: "70%", height: "100%", alignItems: 'flex-start', justifyContent: 'center' }}>
                      <Text style={{ color: Colors.primary, fontSize: 18 }} >Go To Settings Menu</Text>
                    </View>
                  </View>
                </TouchableRipple>
              </Card>
            </View>
          </ImageBackground>

        </View>
      )}
    </>
  );
};

// connect(mapStateToProps,mapDispatchToProps)(TraineeProfile);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: "column",
    alignSelf: 'center',
    alignItems: "center",
    // padding: 10,
    width: width,
    height: height,
    // backgroundColor: Colors.screen
  },
  topContainer: {
    width: '100%',
    height: "35%",
    alignItems: "center",
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  imageContainer: {
    height: "100%",
    width: "100%",
    marginVertical: 10,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
    borderColor: 'black',
    borderWidth: 1

  },

  image: {
    height: "100%",
    width: "100%",
    alignContent: 'center',
    justifyContent: 'center',

  },
  profileDetails: {
    width: '80%',
    height: "50%"
  },
  nameContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    // padding: 5,
    width: '100%'
  },
  nameContainerCard: {
    padding: 5,
    width: '100%',
    alignItems: 'center',
    opacity: .9
  },
  caption: {
    fontSize: 16,
    lineHeight: 14,
    paddingTop: 3
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  cardView: {
    padding: 0,
    marginTop: 5
  },
  detailsContainer: {
    padding: 15,
    flexDirection: "column",
    alignItems: "flex-start",

  },
  detailsText: {
    fontSize: 20,
    marginVertical: 5,
  },
  addImageIcon: {
    // position: "absolute",
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    height: 50,
    width: 50,
    // bottom: 0,
    // right: 0,
    borderRadius: 50
  },
  bottomView: {
    width: "80%",
    height: '9%',
    borderColor: 'black',
    borderWidth: 1
  },
  bottomCardView: {
    width: "100%",
    height: "100%",
  }
});

const TraineeProfileStack = createStackNavigator();

const TraineeProfileStackScreen = (props) => {
  return (
    <TraineeProfileStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.primary,
          height: 65,
        },
        headerTintColor: "#fff",
        headerTitleAlign: "center",
      }}
    >
      <TraineeProfileStack.Screen
        name="Profile"
        component={TraineeProfile}
        options={{
          headerLeft: () => (
            <Logo
              style={{ height: 60, width: 60 }}
              openDrawer={() => props.navigation.openDrawer()}
            />
          ),
          headerLeftContainerStyle: {
            padding: 10,
          },
        }}
      />
      <TraineeProfileStack.Screen
        name="Settings"
        component={TraineeProfileSettingsScreen}
      />
    </TraineeProfileStack.Navigator>
  );
};

export default TraineeProfileStackScreen;