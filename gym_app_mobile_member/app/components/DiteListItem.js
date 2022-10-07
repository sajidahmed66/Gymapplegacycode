import React from 'react';
import { View, Text, StyleSheet, } from 'react-native';
import Card from './Card';

const DitelistItem = props => {

    return (
        <Card style={styles.card}>
            <Text >Item Name: {props.data.diet_id.name}</Text>
            <Text >Total Quantity : {props.data.quantity + " " + props.data.diet_id.unit}</Text>
            <Text >Total Calorie {props.data.totalCalorie}</Text>
        </Card>
    )
};

const styles = StyleSheet.create({
    card: {
        height: 150,
        width: 300,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginVertical: 5
    },

})

export default DitelistItem;