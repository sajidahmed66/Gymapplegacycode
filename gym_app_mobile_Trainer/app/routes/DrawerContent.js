import React from 'react'
import { View, StyleSheet } from 'react-native';
import {
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import { Ionicons, Octicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import { useDispatch, useSelector } from "react-redux";
import { getFormattedToken } from '../common/formattedToken';
import { tryLogOut } from '../redux/trainerLogIn/trainerLogInActionCreator'


const DrawerContent = props => {

    const formattedToken = useSelector(
        state => getFormattedToken(state.trainerLoginReducer.token)
    );

    const dispatch = useDispatch();

    const logoutHandler = () => {
        console.log('logout')
        dispatch(tryLogOut())
    }


    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContainer}>
                    <View style={styles.userInfoSection}>
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            {/* source default pic is gum logo but will change with profile pic */}
                            <Avatar.Image size={70} source={require('../../assets/image/logo.png')} />
                            <View style={{ marginLeft: 15 }}>
                                <Title style={styles.title}>Member Name</Title>
                                <Caption style={styles.caption} >@newMember</Caption>
                            </View>
                        </View>
                    </View>
                    <Drawer.Section>
                        <DrawerItem
                            icon={({ color, size }) =>
                                <Ionicons name="home-outline" size={size} color={color} />}
                            label='Home'
                            onPress={() => { props.navigation.navigate('HomeStack') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) =>
                                <Ionicons name="person-circle-outline" size={size} color={color} />}
                            label='Profile'
                            onPress={() => { props.navigation.navigate('Profile') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => <Ionicons name="trophy-outline" size={size} color={color} />}
                            label="Exercises"
                            onPress={() => { props.navigation.navigate("Exercise") }}
                        />
                        <DrawerItem
                            icon={({ size, color }) => <MaterialCommunityIcons name="food-variant" size={size} color={color} />}
                            label="Diet"
                            onPress={() => { props.navigation.navigate('Dite') }}
                        />
                        {/* <DrawerItem
                            icon={({ color, size }) => <MaterialIcons name="payment" size={size} color={color} />}
                            label="Payments"
                            onPress={() => { props.navigation.navigate('Payments') }}
                        /> */}
                        <DrawerItem
                            icon={({ color, size }) =>
                                <MaterialIcons name="rate-review" size={size} color={color} />}
                            label="Review Us"
                            onPress={() => { props.navigation.navigate('Reviews') }}
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
                    onPress={logoutHandler}
                />
            </Drawer.Section>
        </View>
    )
}

const styles = StyleSheet.create({
    drawerContainer: {
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