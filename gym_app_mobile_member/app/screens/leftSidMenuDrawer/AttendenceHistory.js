import React from 'react'
import { View, Text, StyleSheet } from 'react-native';

const AttendenceHistory = props => {
    return (
        <View style={styles.screen}>
            <Text>
                Attendence History
        </Text>
        </View>
    )
};


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default AttendenceHistory;
