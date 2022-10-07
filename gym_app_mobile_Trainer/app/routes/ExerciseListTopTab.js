import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import DetailsScreen from '../screens/DetailsScreen';
import TraineeLastExerciseHistory from '../screens/ExerciseStrackHistory&Album/TraineeLastExerciseHistory';
import TraineeAlbumForExercise from '../screens/ExerciseStrackHistory&Album/TraineeAlbumForExercise';

const ExerciseTab = createMaterialTopTabNavigator()

const ExerciseListTopTab = props => {
    const traineeExerciseData = props.route.params.data;
    //console.log('from exercise top tab', traineeExerciseData)

    return (
        <ExerciseTab.Navigator>
            <ExerciseTab.Screen name="Details Screen">
                {props => <DetailsScreen {...props} traineeExerciseData={traineeExerciseData} />}
            </ExerciseTab.Screen>
            <ExerciseTab.Screen name="Last Exercise History" >
                {props => <TraineeLastExerciseHistory {...props} traineeExerciseData={traineeExerciseData} />}
            </ExerciseTab.Screen>
            <ExerciseTab.Screen name="Trainee Album(Exer)" >
                {props => <TraineeAlbumForExercise {...props} traineeExerciseData={traineeExerciseData} />}
            </ExerciseTab.Screen>
        </ExerciseTab.Navigator>
    )
}

export default ExerciseListTopTab;