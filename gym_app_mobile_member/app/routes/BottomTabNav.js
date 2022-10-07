import React from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

//Imports for bottom tab navigator
import HomeStack from './HomeStack';
import AlbumStackScreen from '../screens/AlbumScreen/AlbumScreen';
import ChatScreenStack from '../screens/ChatScreen';

//Icons For Botton tab Navigator
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../constants/Colors';


const Tab = createMaterialBottomTabNavigator();

const BottomTabNav = (props) => {
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
                name="Chat"
                component={ChatScreenStack}
                options={{
                    tabBarLabel: 'Notification',
                    tabBarIcon: ({ color }) => <Ionicons name="chatbox-ellipses" size={24} color={color} />,
                }}
            />
            <Tab.Screen
                name="Home"
                component={HomeStack}
                options={{
                    tabBarLabel: "Home",
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
    );
};

export default BottomTabNav;