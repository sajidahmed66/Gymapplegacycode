import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';

// imports for drawer content.
import HomeStackScreen from './HomeStackScreen';
import TrainerProfileStackScreen from '../screens/leftSideMenu/TrainerProfile';
import ExerciseStackScreen from '../screens/leftSideMenu/ExerciseScreen';
import DiteScreenStrack from '../screens/leftSideMenu/DiteScreen';
import DrawerContent from './DrawerContent';
import ReviewUsStackScreen from '../screens/leftSideMenu/ReviewUsScreen';
import BottomTabNav from './BottomTabNav'

const Drawer = createDrawerNavigator();

const LeftSideMenu = () => {
    return (
        <Drawer.Navigator
            drawerContent={props => <DrawerContent {...props} />}
        >
            <Drawer.Screen name="HomeStack" component={BottomTabNav} />
            <Drawer.Screen name="Profile" component={TrainerProfileStackScreen} />
            <Drawer.Screen name="Exercise" component={ExerciseStackScreen} />
            <Drawer.Screen name="Dite" component={DiteScreenStrack} />
            <Drawer.Screen name="Reviews" component={ReviewUsStackScreen} />
        </Drawer.Navigator>
    )
}
export default LeftSideMenu;