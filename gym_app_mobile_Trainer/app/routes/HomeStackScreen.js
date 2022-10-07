import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ExerciseReqListScreen from '../screens/ExerciseReqListScreen'
import DiteReqListScreen from '../screens/DiteReqListScreen'
import DetailsScreen from '../screens/DetailsScreen';
import AssignScreen from '../screens/AssignScrreen';
import PaymentHistory from '../screens/leftSideMenu/PaymentsScreen'
import PaymentsHistoyDetailsScreen from '../screens/PaymentsHistoryDetailsScreen/PaymentsHistoryDetailsScreen';
import DietdetailsTopTab from './DietListTopTab';
import ExerciseListTopTab from './ExerciseListTopTab';

import DietReqDetailsScreen from '../screens/DiteReqDetailsScreen';
import DietAssignScreen from '../screens/DietAssignScreen'
import Colors from '../constants/Colors'
import Logo from '../components/Logo'

const HomeStack = createStackNavigator();

const HomeStackScreen = props => {
    return (
        <HomeStack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: Colors.primary,
                height: 65
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
        }
        }>
            <HomeStack.Screen name="Home"
                component={HomeScreen}
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
            {/* navigates to Exercise Req list Screen */}
            <HomeStack.Screen
                name="Exercise Requests"
                component={ExerciseReqListScreen}
            />

            {/* Diet Stack */}
            {/* navigated to Detais screen from Exercise Req list Screen */}
            <HomeStack.Screen
                name="Details"
                component={ExerciseListTopTab}
            />
            {/* navigated to Assign Screnn from Details Screen */}
            <HomeStack.Screen
                name="Assign"
                component={AssignScreen}
            />

            {/* Diet stack */}
            {/* navigates to Diet req List Screen */}
            <HomeStack.Screen
                name="Diet Requests"
                component={DiteReqListScreen}
            />
            {/* navigated to DietReq details Screen from Diet req List Screen */}
            <HomeStack.Screen
                name="Request Details"
                component={DietdetailsTopTab}
            />
            {/* navigated to dietassign screen from diet req details screen */}
            <HomeStack.Screen
                name="Assign Diet"
                component={DietAssignScreen}
            />

            {/* HomeScreenPaymentStack */}
            <HomeStack.Screen
                name='Payments'
                component={PaymentHistory}
                options={{
                    title: 'Payment Statements'
                }}
            />
            <HomeStack.Screen
                name='PaymentDetails'
                component={PaymentsHistoyDetailsScreen}
                options={{
                    title: 'Payments Deatils'
                }}
            />
        </HomeStack.Navigator>
    )
};
export default HomeStackScreen;
