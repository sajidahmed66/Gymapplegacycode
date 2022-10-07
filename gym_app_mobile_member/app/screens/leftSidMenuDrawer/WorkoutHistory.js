import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Logo from '../../components/Logo';
import Colors from '../../constants/Colors'

// just add the api for this screen and console.log it.
const WorkoutHistory = props => {

    return (
        <View style={styles.screen}>
            <Text>
                Workout History
            </Text>
        </View>
    )
};
const WorkoutStack = createStackNavigator();

const WorkoutHistoryStack = props => {
    return (
        <WorkoutStack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: Colors.primary,
                height: 65
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
        }}
        >
            <WorkoutStack.Screen
                name="WorkOut History"
                component={WorkoutHistory}
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
        </WorkoutStack.Navigator>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default WorkoutHistoryStack;
