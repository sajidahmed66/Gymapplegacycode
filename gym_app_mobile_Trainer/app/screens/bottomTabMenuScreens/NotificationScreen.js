import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Logo from '../../components/Logo';
import Colors from '../../constants/Colors';


const NotificationScreen = props => {
    return (
        <View style={styles.screen}>
            <Text style={{fontWeight:'bold',fontSize:24}}> No Notification!</Text>
        </View>
    )
}

const NotificationStack = createStackNavigator();

const NotificationScreenStack = props => {
    return (
        <NotificationStack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: Colors.primary,
                    height: 65
                },
                headerTintColor: '#fff',
                headerTitleAlign: 'center',
            }}
        >
            <NotificationStack.Screen
                name='Notification'
                component={NotificationScreen}
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
        </NotificationStack.Navigator>
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

export default NotificationScreenStack;