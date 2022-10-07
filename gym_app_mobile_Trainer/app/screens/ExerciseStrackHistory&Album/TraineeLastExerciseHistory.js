import React from 'react'
import { StyleSheet, Text, View, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import Card from '../../components/Card'
import Colors from '../../constants/Colors';

const { width, height } = Dimensions.get('window')


const TraineeLastExerciseHistory = (props) => {

    // console.log("from Last Exercise History", props.traineeExerciseData)

    const RenderExerciseList = ({ item }) => {
        // console.log("from loop", item)
        return (
            <Card style={{ width: width - 10, marginVertical: 5 }} >
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: '100%' }}>
                    <View style={{ width: '20%', marginVertical: 5, padding: 2 }}>
                        <Text style={{ paddingLeft: 5, paddingRight: 5 }}>{item.exercise_id.name}</Text>
                    </View>
                    <View style={{ width: '50%', marginVertical: 5, padding: 2 }}>
                        <Text style={{ color: 'black' }} >{item.exercise_id.description}</Text>
                    </View>
                    <View style={{ width: '15%', marginVertical: 5, padding: 2 }}>
                        <Text style={{ color: 'black' }} >{item.reps} reps </Text>
                    </View>
                    <View style={{ width: '15%', marginVertical: 5, padding: 2 }}>
                        <Text style={{ color: 'black' }} >{item.sets} sets</Text>
                    </View>
                </View>
            </Card>
        )
    }




    return (
        <View style={styles.screen} >
            <View style={{ height: 80, width: '100%', ...styles.center, padding: 5 }}>

                {props.traineeExerciseData.file ?
                    <TouchableOpacity
                        onPress={console.log("pressed")}
                        style={{ width: '50%', height: 45, ...styles.center, backgroundColor: Colors.primary, borderRadius: 25 }}
                    >
                        <View >
                            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }} >See File</Text>
                        </View>
                    </TouchableOpacity>
                    : <View></View>}
            </View>
            {props.traineeExerciseData.exercise ?
                <View  >
                    <FlatList
                        data={props.traineeExerciseData.exercise}
                        contentContainerStyle={{ padding: 5 }}
                        renderItem={({ item }) => <RenderExerciseList item={item} />}
                        keyExtractor={item => item._id}
                    />
                </View> : <View><Text>nothing to show</Text></View>}
        </View>
    )
}

export default TraineeLastExerciseHistory

const styles = StyleSheet.create({
    screen: {
        width: width,
        height: height * 0.80,
        alignItems: 'center',
        paddingTop: 10
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center'
    }

})
