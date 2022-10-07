import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useSelector } from "react-redux";

import BottomTabNav from './BottomTabNav';
import DrawerContent from './DrawerContent';

import TraineeProfileStackScreen from '../screens/leftSidMenuDrawer/TraineeProfile';
import WorkoutHistoryStack from '../screens/leftSidMenuDrawer/WorkoutHistory';
import ReviewUsStackScreen from '../screens/leftSidMenuDrawer/ReviewUsScreen';

const DrawerStack = createDrawerNavigator();

const LeftSideMenu = () => {
    return (
        <DrawerStack.Navigator
            drawerContent={props => <DrawerContent {...props} />}
        >
            <DrawerStack.Screen name="HomeDrawer" component={BottomTabNav} />
            <DrawerStack.Screen name="ProfileScreen" component={TraineeProfileStackScreen} />
            <DrawerStack.Screen name="Workout History" component={WorkoutHistoryStack} />
            <DrawerStack.Screen name="Review Us" component={ReviewUsStackScreen} />
        </DrawerStack.Navigator>
    )
};


const AppNavigation = props => {
    const checkLogedIn = useSelector((state) => state.loginReducer.isLoggedIn)
    if (!checkLogedIn) {
        props.changeAuth(checkLogedIn)
    }
    return (
        <LeftSideMenu />
    )
};



export default AppNavigation;