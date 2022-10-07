import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions, Button, ImageBackground } from 'react-native';
import SettingsScreen1 from '../../../../assets/image/SettingsScreen1.jpg'
import Colors from '../../../constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';

import UpdateProfile from '../../../components/Updateprofile';
import { getFormattedToken } from "../../../common/formattedToken";
import {
    getProfile,
    updateProfile,
} from '../../../redux/trainerProfile/trainerProfileActionCreator';

import { useDispatch, useSelector } from "react-redux";
import * as ImagePicker from 'expo-image-picker';
import ChangePassword from '../../../components/ChangePassword';
import { trainerProfileApi } from '../../../api/trainerProfileApi';


const { width, height } = Dimensions.get('window');


const TrainerProfileSettingsScreen = (props) => {

    const profileData = props.route.params.data ? props.route.params.data : {
        email: '',
        address: '',
        dateOfBirth: new Date(),
        gender: '',
        nid: ''
    }
    // console.log('from settings screen', profileData)

    const [profileModalVisible, setProfileModalVisible] = useState(false);
    const [changePasswordModalVisible, setChangePasswordModalVisible] = useState(false);
    const [errorChangePassword, setErrorChangePassword] = useState('');
    const dispatch = useDispatch();
    const formattedToken = useSelector((state) =>
        getFormattedToken(state.trainerLoginReducer.token)
    );

    // profile update 
    const handleUpdateProfile = (imageUri) => {
        let new_data = { ...imageUri }
        dispatch(updateProfile(new_data, formattedToken));
    };

    // Change password 
    const handleChangePassword = (changePasswordData) => {
        trainerProfileApi.trainerChangePassword(changePasswordData, formattedToken).then(res => {
            setChangePasswordModalVisible(false)
            setErrorChangePassword('')
        }).catch(err => {
            console.log(err.response.data)
            setErrorChangePassword(err.response.data)
        })
    };

    const pickImage = async () => {
        let result_addImage = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
        })
        if (!result_addImage.cancelled) {
            await updateProfileImage(result_addImage.uri)
        }
    };

    const updateProfileImage = (imageUri) => {
        let uriParts = imageUri.split('.');
        let fileType = uriParts[uriParts.length - 1];
        let formData = new FormData();

        formData.append('image',
            {
                uri: imageUri,
                name: `image.${fileType}`,
                type: `image/${fileType}`
            }
        );
        formData.append('address', profileData.address);
        formData.append('dateOfBirth', profileData.dateOfBirth);
        formData.append('email', profileData.email);
        formData.append('gender', profileData.gender);
        formData.append('nid', profileData.nid);
        dispatch(updateProfile(formData, formattedToken));

    };

    return (
        <View>
            <ImageBackground
                source={SettingsScreen1}
                style={styles.imagebackgroundview}
            >
                <View
                    style={styles.headerview}
                >
                    <Text
                        style={styles.headertextview}
                    >
                        Coustomized Your Profile
                    </Text>
                    <Text
                        style={styles.headersubtitle}
                    >Change Password, Update Display Image, And Personal Info

                    </Text>
                </View>
                <View
                    style={{
                        height: '40%',
                        width: width - 20,
                        alignItems: 'center',
                        justifyContent: 'space-around'
                    }}
                >
                    <TouchableOpacity
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        onPress={pickImage}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-around',
                                padding: 10,
                                backgroundColor: Colors.screen,
                                opacity: .8,
                                height: 50,
                                width: '65%',
                                borderRadius: 25
                            }}
                        >
                            <MaterialCommunityIcons
                                name="camera-plus-outline"
                                size={30}
                                color="white"
                            />
                            <Text
                                style={{ color: 'white' }}
                            >Change Display Picture</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        onPress={() => setProfileModalVisible(true)}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-around',
                                padding: 10,
                                backgroundColor: Colors.screen,
                                opacity: .8,
                                height: 50,
                                width: '65%',
                                borderRadius: 25
                            }}
                        >
                            <SimpleLineIcons name="note" size={30} color="white" />
                            <Text
                                style={{ color: 'white' }}
                            >Update Profile  </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        onPress={() => setChangePasswordModalVisible(true)}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-around',
                                padding: 10,
                                backgroundColor: Colors.screen,
                                opacity: .8,
                                height: 50,
                                width: '65%',
                                borderRadius: 25
                            }}
                        >
                            <MaterialCommunityIcons name="onepassword" size={30} color="white" />
                            <Text
                                style={{ color: 'white' }}
                            >Change Password</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                {/* <Button
                    title='go back'
                    onPress={() => props.navigation.navigate('Profile')}
                /> */}
                <UpdateProfile
                    modalVisible={profileModalVisible}
                    setModalVisible={setProfileModalVisible}
                    updateProfile={handleUpdateProfile}
                    profileData={profileData}
                />
                {errorChangePassword !== '' ?
                    <ChangePassword
                        modalVisible={!changePasswordModalVisible}
                        setModalVisible={setChangePasswordModalVisible}
                        changePassword={handleChangePassword}
                        errorMessage={errorChangePassword}
                    /> : <ChangePassword
                        modalVisible={changePasswordModalVisible}
                        setModalVisible={setChangePasswordModalVisible}
                        changePassword={handleChangePassword}
                    />
                }
            </ImageBackground>

        </View>
    )
}

const styles = StyleSheet.create({
    imagebackgroundview: {
        width: width,
        height: height,
    },
    headerview: {
        width: width - 20,
        height: '25%',
        marginTop: 35,
        padding: 10,
    },
    headertextview: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        paddingVertical: 5
    },
    headersubtitle: {
        color: 'white',
        fontSize: 18,
        paddingVertical: 5
    }
})

export default TrainerProfileSettingsScreen;