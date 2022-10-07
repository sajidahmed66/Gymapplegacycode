import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TraineeAlbumForDiet from '../screens/DietStackHIstory&Album/TraineeAlbumForDiet';
import TraineeLastDietHistory from '../screens/DietStackHIstory&Album/TraineeLastDietHistory';
import DietReqDetailsScreen from '../screens/DiteReqDetailsScreen'
const Tab = createMaterialTopTabNavigator();

const DietdetailsTopTab = (props) => {
    const traineeDietData = props.route.params.data
    return (
        <Tab.Navigator

        >
            <Tab.Screen name="Diet Details">
                {props => <DietReqDetailsScreen {...props} traineeDietData={traineeDietData} />}
            </Tab.Screen>
            <Tab.Screen name="Last Diet History">
                {props => <TraineeLastDietHistory {...props} traineeDietData={traineeDietData} />}
            </Tab.Screen><Tab.Screen name="Trainee album">
                {props => <TraineeAlbumForDiet {...props} traineeDietData={traineeDietData} />}
            </Tab.Screen>
        </Tab.Navigator>
    );
}
export default DietdetailsTopTab;