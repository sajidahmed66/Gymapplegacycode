import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import {
    Avatar,
    Title,
    Caption,
    Drawer,
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import { Ionicons, Octicons, MaterialIcons } from '@expo/vector-icons';

import { getProfile } from '../redux/traineeProfile/traineeProfileActionCreator'
import { useDispatch, useSelector } from "react-redux";

import { getFormattedToken } from '../common/formetedToken';
import { tryLogOut } from '../redux/userLogIn/loginActionCreator';
import commonApi from '../api/commonApi';
const DrawerContent = props => {
    // const [profileData, setProfileData] = useState(null);

    const formattedToken = useSelector(state => getFormattedToken(state.loginReducer.token));
    const profileGet = useSelector(state => state.traineeProfileReducer.profileGet);
    const profileData = useSelector(state => state.traineeProfileReducer.profileData);
    // console.log("fromDrawer", profileGet, profileData)
    // console.log(formattedToken)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProfile(formattedToken))
    }, [])

    const logoutHandler = () => {
        console.log('logout')
        dispatch(tryLogOut())
    }

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        {!profileGet ? <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            {/* source default pic is gum logo but will change with profile pic */}
                            <Avatar.Image size={70} source={require('../../assets/image/logo.png')} />
                            <View style={{ marginLeft: 15 }}>
                                <Title style={styles.title}>Member Name</Title>
                                <Caption style={styles.caption} >@newMember</Caption>
                            </View>
                        </View> :
                            <View style={{ flexDirection: 'row', marginTop: 15 }}>
                                {/* source default pic is gum logo but will change with profile pic */}
                                <Avatar.Image size={70} source={{ uri: commonApi.api + profileData.image }} />
                                <View style={{ marginLeft: 15 }}>
                                    <Title style={styles.title}>{`${profileData.user.firstname}  ${profileData.user.lastname}`}</Title>
                                    {/* <Caption style={styles.caption} >@newMember</Caption> */}
                                </View>
                            </View>
                        }
                    </View>
                    <Drawer.Section>
                        <DrawerItem
                            icon={({ color, size }) =>
                                <Ionicons name="home-outline" size={size} color={color} />}
                            label='Home'
                            onPress={() => { props.navigation.navigate('Home') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) =>
                                <Ionicons name="person-circle-outline" size={size} color={color} />}
                            label='Profile'
                            onPress={() => { props.navigation.navigate('ProfileScreen') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => <Ionicons name="trophy-outline" size={size} color={color} />}
                            label="WorkOut History"
                            onPress={() => { props.navigation.navigate('Workout History') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) =>
                                <MaterialIcons name="rate-review" size={size} color={color} />}
                            label="Review Us"
                            onPress={() => { props.navigation.navigate('Review Us') }}
                        />
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection} >
                <DrawerItem
                    icon={({ color, size }) => (
                        <Octicons
                            name="sign-out"
                            size={size}
                            color={color}
                        />
                    )}
                    label='Sign-Out'
                    onPress={() => { logoutHandler() }}
                />
            </Drawer.Section>
        </View>
    )
};

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        padding: 20
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold'
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
})

export default DrawerContent;