import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Logo from '../components/Logo';
// Problem Statement:
// the Purpose of this component is to show messages that is recived from Admin Panel
//this massage is shown globally. not a single user specific.
//this is only one way message, no interaction from user(Both Trainee & Trainer ).

// To-Dos:
//
//For now use this Screen for testing.


const ChatScreen = props => {
    return (
        <View style={styles.screen}>
            <Text style={{ fontWeight: 'bold', fontSize: 24 }}> No Exercise Request!</Text>
        </View>
    )
}

const ChatStack = createStackNavigator();

const ChatScreenStack = props => {
    return (
        <ChatStack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#630093",
                    height: 65
                },
                headerTintColor: '#fff',
                headerTitleAlign: 'center',
            }}
        >
            <ChatStack.Screen
                name='Notification'
                component={ChatScreen}
                options={{
                    headerLeft: () => <Logo
                        style={{ height: 60, width: 60 }}
                        openDrawer={() => props.navigation.openDrawer()}
                    />,
                    headerLeftContainerStyle: {
                        padding: 10
                    }
                }}
            />
        </ChatStack.Navigator>
    )
}


styles = StyleSheet.create({
    screen: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.screen
    },
});

export default ChatScreenStack;