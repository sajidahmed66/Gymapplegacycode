import React from 'react'
import { StyleSheet, Text, View, LogBox, FlatList, Dimensions, TouchableOpacity } from 'react-native'
import Card from '../../components/Card'
import Colors from '../../constants/Colors';


const { width, height } = Dimensions.get('window')

LogBox.ignoreLogs(["Accessing the 'state' property of the 'route' object is not supported."]);

const TraineeLastDietHistory = (props) => {

    const RenderDietList = ({ item }) => {
        // console.log("from loop", item)
        return (


            <Card style={{ width: width - 10, marginVertical: 5 }} >
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: '100%' }}>
                    <View style={{ width: '35%', marginVertical: 5, padding: 2 }}>
                        <Text style={{ paddingLeft: 5, paddingRight: 5 }}>{item.diet_id.name}</Text>
                    </View>
                    <View style={{ width: '20%', marginVertical: 5, padding: 2 }}>
                        <Text style={{ color: 'black' }} >{`${item.diet_id.quantity}  ${item.diet_id.unit} `}</Text>
                    </View>
                    <View style={{ width: '42%', marginVertical: 5, padding: 2 }}>
                        <Text style={{ color: 'black' }} >{`Total Calorie: ${item.totalCalorie} `}</Text>
                    </View>
                </View>
            </Card>

        )
    }



    return (
        <View style={styles.screen} >
            <View style={{ height: 80, width: '100%', ...styles.center, padding: 5 }}>
                <Text>some text</Text>
                {props.traineeDietData.file ?
                    <TouchableOpacity
                        onPress={console.log("pressed")}
                        style={{ width: '50%', height: 45, ...styles.center, backgroundColor: Colors.primary, borderRadius: 25 }}
                    >
                        <View >
                            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }} >See File</Text>
                        </View>
                    </TouchableOpacity>
                    : <View><Text>No files were added</Text></View>}
            </View>
            {props.traineeDietData.diet ?
                <View  >
                    <FlatList
                        data={props.traineeDietData.diet}
                        contentContainerStyle={{ padding: 5 }}
                        renderItem={({ item }) => <RenderDietList item={item} />}
                        keyExtractor={item => item._id}
                    />
                </View> : <View><Text>nothing to show</Text></View>}
        </View>
    )
}

export default TraineeLastDietHistory

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
