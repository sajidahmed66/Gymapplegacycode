import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import DiteScreen from '../screens/DiteScreen';
import WorkOutScreen from '../screens/WorkOutScreen';
import LogIn from '../screens/LoginScreen';
import PaymentHistory from '../screens/leftSidMenuDrawer/PaymentHistory';
import PaymentsHistoryDetailsScreen from '../screens/PaymentsHistoryDetailsScreen';
import AttendenceHistory from '../screens/leftSidMenuDrawer/AttendenceHistory';
import Logo from '../components/Logo'

const Stack = createStackNavigator();

const HomeStack = props => {
    // console.log("HomeStack", props)
    //#F55C19 orange

    return (
        <Stack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: "#630093",
                height: 60,
                elevation: 0,
                shadowOpacity: 0
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',


        }} >
            {/* <Stack.Screen
                name='logIn'
                component={LogIn}
                options={{
                    headerShown: false
                }}
            /> */}
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    headerLeft: () => <Logo
                        style={{ height: 60, width: 60 }}
                        openDrawer={() => props.navigation.openDrawer()}
                    />,
                    headerLeftContainerStyle: {
                        padding: 10,
                        alignContent: 'center',
                        justifyContent: 'center'
                    }
                }}
            />
            <Stack.Screen
                name="WorkOutScreen"
                component={WorkOutScreen}
                options={{
                    headerLeftContainerStyle: {
                        padding: 10,

                    }
                }}
            />
            <Stack.Screen
                name="DiteScreen"
                component={DiteScreen}
                options={{
                    headerLeftContainerStyle: {
                        padding: 10
                    }
                }} />
            <Stack.Screen
                name="PaymentScreen"
                component={PaymentHistory}
                options={{
                    headerLeftContainerStyle: {
                        padding: 10
                    },
                    title: 'Payment Statements'
                }}
            />
            <Stack.Screen
                name="PaymentDetails"
                component={PaymentsHistoryDetailsScreen}
                options={{
                    headerLeftContainerStyle: {
                        padding: 10
                    },
                    title: 'Payment Details'
                }}
            />
            <Stack.Screen
                name="AttendenceScreen"
                component={AttendenceHistory}
                options={{
                    headerLeftContainerStyle: {
                        padding: 10
                    },
                    title: 'WorkOut Days'
                }}
            />
        </Stack.Navigator>
    )
};

export default HomeStack;