import React, { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet, Button, Dimensions, TouchableOpacity, ImageBackground } from 'react-native';
import { Avatar, Caption, TouchableRipple } from 'react-native-paper';
import Colors from '../../constants/Colors';
import GymLogo from '../../../assets/image/logo.png'
import Logo from '../../components/Logo';
import Card from '../../components/Card';

import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import UpdateProfile from '../../components/Updateprofile';
import { getFormattedToken } from '../../common/formattedToken';
import { getProfile, updateProfile } from '../../redux/trainerProfile/trainerProfileActionCreator'
import { useDispatch, useSelector } from "react-redux";

//imports for Updatring ProfileImage
import * as ImagePicker from 'expo-image-picker';
import commonApi from "../../api/commonApi";
import TrainerProfileSettingsScreen from './TrainerProfileSettingScreen/TrainerProfileSettingScreen';
import emptyProfile from '../../../assets/image/emptyProfile.png'

// pass trainee profile pic as image source.
// component detailing will be done after api intrgation.
// the mockup that was shown need some navigational tuning to complete. 

const { width, height } = Dimensions.get('window');

const TrainerProfile = props => {
    const formattedToken = useSelector(state => getFormattedToken(state.trainerLoginReducer.token));
    const profileGet = useSelector(state => state.trainerProfileReducer.profileGet);
    const profileData = useSelector(state => state.trainerProfileReducer.profileData);
    // const [modalVisible, setModalVisible] = useState(false)
    const dispatch = useDispatch();

    // const profileUpdated = useSelector(
    //     (state) => state.trainerProfileReducer.profileUpdateCount
    // )


    useEffect(() => {
        dispatch(getProfile(formattedToken));
    }, []);

    // const handleUpdateProfile = (imageUri) => {
    //     let new_data = { ...imageUri }
    //     dispatch(updateProfile(new_data, formattedToken))
    // }

    // const pickImage = async () => {
    //     let result_addImage = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //         allowsEditing: true,
    //         aspect: [4, 3],
    //     })
    //     if (!result_addImage.cancelled) {
    //         await updateProfileImage(result_addImage.uri)
    //     }
    // }


    // const updateProfileImage = (imageUri) => {
    //     let uriParts = imageUri.split('.');
    //     let fileType = uriParts[uriParts.length - 1];
    //     let formData = new FormData();

    //     formData.append('image',
    //         {
    //             uri: imageUri,
    //             name: `image.${fileType}`,
    //             type: `image/${fileType}`
    //         }
    //     );
    //     formData.append('address', profileData.address);
    //     formData.append('dateOfBirth', profileData.dateOfBirth);
    //     formData.append('email', profileData.email);
    //     formData.append('gender', profileData.gender);
    //     formData.append('nid', profileData.nid);
    //     dispatch(updateProfile(formData, formattedToken));

    // }



    console.log("from profileScrn", height * .2)
    return (
        <>
            {profileGet ?
                <View style={styles.screen}>

                    {/* contaims Image */}
                    <View style={styles.topContainer}>
                        <View style={styles.imageContainer} >
                            <ImageBackground
                                source={{ uri: commonApi.api + profileData.image }}
                                style={{ width: '100%', height: '100%' }}
                            />
                            <View style={{ position: 'absolute', height: 50, backgroundColor: Colors.screen, width: '70%', alignItems: 'center', justifyContent: 'center', borderRadius: 25, opacity: .8 }}>
                                <Text style={{ color: 'white', fontSize: 30, }} adjustsFontSizeToFit={true} >{`${profileData.user.firstname}  ${profileData.user.lastname}`}</Text>
                            </View>
                        </View>
                    </View>

                    {/* profile details */}

                    <View style={styles.profileDetails}>
                        <Card style={styles.cardView}>
                            <View style={styles.detailsContainer}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'center', height: 50 }}>
                                    <View style={{ width: '20%', height: 50, alignItems: 'center', justifyContent: 'center', }} >
                                        <Text style={{ fontSize: 20 }} adjustsFontSizeToFit={true} >Email:</Text>
                                    </View>
                                    <View style={{ width: '80%', height: 50, alignItems: 'center', justifyContent: 'center', paddingLeft: 5 }} >
                                        <Text style={styles.detailsText} adjustsFontSizeToFit={true} >{` ${profileData.email}`}</Text>
                                    </View>
                                </View>

                                <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'center', height: 50 }}>
                                    <View style={{ width: '20%', height: 50, alignItems: 'center', justifyContent: 'center', }} >
                                        <Text style={{ fontSize: 20 }} adjustsFontSizeToFit={true} >NID:</Text>
                                    </View>
                                    <View style={{ width: '80%', height: 50, alignItems: 'center', justifyContent: 'center', paddingLeft: 5 }} >
                                        <Text style={styles.detailsText} adjustsFontSizeToFit={true} >{` ${profileData.nid !== null ? profileData.nid : ''}`}</Text>
                                    </View>
                                </View>

                                <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'center', height: 50 }}>
                                    <View style={{ width: '20%', height: 50, alignItems: 'center', justifyContent: 'center', }} >
                                        <Text style={{ fontSize: 20 }} adjustsFontSizeToFit={true} >DOB:</Text>
                                    </View>
                                    <View style={{ width: '80%', height: 50, alignItems: 'center', justifyContent: 'center', paddingLeft: 5, }} >
                                        <Text style={styles.detailsText} adjustsFontSizeToFit={true} >{`${profileData.dateOfBirth.slice(0, 10)}`}</Text>
                                    </View>
                                </View>

                                <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'center', height: 80 }}>
                                    <View style={{ width: '20%', height: 80, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', }} >
                                        <Text style={{ fontSize: 20 }} adjustsFontSizeToFit={true} >Adress:</Text>
                                    </View>
                                    <View style={{ width: '80%', height: 80, alignItems: 'center', justifyContent: 'center', paddingLeft: 5 }} >
                                        <Text style={styles.detailsText} adjustsFontSizeToFit={true} >{`${profileData.address}`}</Text>
                                    </View>
                                </View>
                            </View>
                        </Card>
                    </View>
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
                : <View style={{ ...styles.screen, justifyContent: 'center', }}>
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

                </View>}
        </>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        flexDirection: "column",
        alignSelf: 'center',
        alignItems: "center",
        // padding: 10,
        width: width,
        height: height * .8,
        // backgroundColor: Colors.screen
    },
    topContainer: {
        width: '100%',
        height: "40%",
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
        width: '95%',
        height: "45%"
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
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    detailsText: {
        fontSize: 20,
        marginVertical: 5
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
    },
    emptyScreenSettingsView: {
    }
});

const TrainerProfileStack = createStackNavigator();

const TrainerProfileStackScreen = props => {
    return (
        <TrainerProfileStack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: Colors.primary,
                height: 65
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
        }}
        >
            <TrainerProfileStack.Screen
                name="Profile"
                component={TrainerProfile}
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
            <TrainerProfileStack.Screen
                name="Settings"
                component={TrainerProfileSettingsScreen}
            />
        </TrainerProfileStack.Navigator>
    )
}


export default TrainerProfileStackScreen;