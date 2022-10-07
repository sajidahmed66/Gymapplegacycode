import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import Card from '../components/Card';
import { Avatar } from 'react-native-paper';
import GymLogo from '../../assets/image/logo.png';
import { AntDesign } from '@expo/vector-icons';
// import action and token
import { getFormattedToken } from '../common/formattedToken'
import { getTraineeExerciseReqList } from '../redux/trainerAssingExercises/trainerAssignExerciseActionCreator';
import { traineeRequestsList } from '../api/traineeRequestsList';
// redux hooks 
import { useDispatch, useSelector } from "react-redux";


const { width, height } = Dimensions.get('window');

const ExerciseReqListScreen = props => {

    const [reqData, setReqData] = useState(
        {
            userName: "Sajid Ahmed",
            isApproved: false,
            reqDate: "02-02-2021"
        },
    )

    const dispatch = useDispatch();
    const formattedToken = useSelector(state => getFormattedToken(state.trainerLoginReducer.token));

    useEffect(() => {
        traineeRequestsList.traineeExerciseReqList(formattedToken)
            .then(res => {
                setReqData(res.data)
            })
    }, []);

    const RenderTraineeList = ({ item }) => {
        console.log(item)
        return (
            <Card style={styles.card}>
                <TouchableOpacity
                    onPress={() => props.navigation.navigate('Details', { data: item })}
                >
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>
                        <View >
                            <Text>Trainee Name: {`${item.trainee.firstname} ${item.trainee.lastname}`}</Text>
                            <Text>Approve Status: {item.approval === 0 ? "No" : "Yes"}</Text>
                        </View>

                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text>Tap to see details </Text>
                        < AntDesign name="arrowright" size={24} color="black" />
                    </View>
                </TouchableOpacity>
            </Card>
        )
    }

    return (
        <View style={styles.screen}>
            <View style={{
                width: "100%",
                height: "80%",
                alignItems: 'center'
            }}>
                {reqData.length !== 0 ?
                    <FlatList
                        style={{ marginVertical: 5, flex: 1 }}
                        data={reqData}
                        keyExtractor={item => item._id}
                        renderItem={({ item }) => <RenderTraineeList item={item} />}
                    /> : <Text style={{ fontWeight: 'bold', fontSize: 24 }}> No Exercise Request!</Text>}
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 25,
        width: width,
        height: height,
    },
    card: {
        width: width - 20,
        height: height / 10,
        // alignItems: 'center',
        marginVertical: 5,
        justifyContent: 'space-around'
    }
})

export default ExerciseReqListScreen;