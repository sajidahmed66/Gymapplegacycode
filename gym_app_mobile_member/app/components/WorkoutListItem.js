import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Card from '../components/Card';



const WorkOutListItem = ({ item }) => {

    return (
        <View style={styles.listItem}>
            <Card style={{ height: 100, width: 300 }}>
                <Text>
                    {item.exercise_id.name}
                </Text>
                <Text>
                    {item.exercise_id.description}
                </Text>
                <Text>
                    Sets: {item.sets} Reps: {item.reps}
                </Text>
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    listItem: {
        marginVertical: 5,
        alignItems: 'center',
    }
})

export default WorkOutListItem;