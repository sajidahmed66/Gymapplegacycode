import React from 'react';

//MetarialBottomTab
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
//Imports for bottom tab naviagtor
import HomeStackScreen from './HomeStackScreen';
import AlbumStackScreen from '../screens/bottomTabMenuScreens/AlbumScreens';
import NotificationScreenStack from '../screens/bottomTabMenuScreens/NotificationScreen';

//Icons for Bottom Tab Navigatior.
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../constants/Colors'
const Tab = createMaterialBottomTabNavigator();

const BottomTabNav = () => {

    return (
        <Tab.Navigator
            initialRouteName="Home"
            backBehavior='initialRoute'
            activeColor="#fff"
            inactiveColor='gray'
            barStyle={{
                backgroundColor: Colors.primary
            }}
        >
            <Tab.Screen
                name="notice"
                component={NotificationScreenStack}
                options={{
                    tabBarLabel: 'Notifications',
                    tabBarIcon: ({ color }) => <Ionicons name="chatbox-ellipses" size={24} color={color} />,
                }}
            />
            <Tab.Screen
                name="Home"
                component={HomeStackScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />
                }}
            />
            <Tab.Screen
                name="Album"
                component={AlbumStackScreen}
                options={{
                    tabBarLabel: "Album",
                    tabBarIcon: ({ color }) => <MaterialIcons name="photo-album" size={24} color={color} />
                }}
            />
        </Tab.Navigator>
    )
};

export default BottomTabNav
