import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import Card from '../components/Card';
import { Avatar } from 'react-native-paper';
import GymLogo from '../../assets/image/logo.png';

import { traineeRequestsList } from '../api/traineeRequestsList';
import { useSelector } from "react-redux";
import { getFormattedToken } from '../common/formattedToken';

const { width, height } = Dimensions.get('window');

const DiteReqListScreen = props => {
    const [reqData, setReqData] = useState(
        {
            userName: "Sajid Ahmed",
            isApproved: false,
            reqDate: "02-02-2021"
        },
    )

    const formattedToken = useSelector(state => getFormattedToken(state.trainerLoginReducer.token));

    useEffect(() => {
        traineeRequestsList.traineeDietReqList(formattedToken)
            .then(res => {
                console.log(res.data)
                setReqData(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    const RenderTraineeList = ({ item }) => {
        console.log("from inside loop", item)
        return (
            <TouchableOpacity
                onPress={() => props.navigation.navigate('Request Details', { data: item })}
            >

                <Card style={styles.card}>
                    <View style={{ flexDirection: 'row' }}>
                        <Avatar.Image size={50} source={GymLogo} />
                        <View style={{ marginLeft: 10 }}>
                            <Text>Trainee Name:{`${item.trainee.firstname} ${item.trainee.lastname}`}</Text>
                            <Text>Approve Status: {item.approval === 0 ? "No" : "Yes"} </Text>
                        </View>
                    </View>
                    {/* <Button title=" Details" onPress={() => props.navigation.navigate('Request Details', { data: reqData })} /> */}
                </Card>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.screen}>
            {reqData.length !== 0 ? <FlatList
                style={{ marginVertical: 10 }}
                data={reqData}
                keyExtractor={item => item._id}
                renderItem={({ item }) => (<RenderTraineeList item={item} />)}
            /> : <Text style={{ fontWeight: 'bold', fontSize: 24 }}> No Diet Request!</Text>}

        </View>
    )
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    card: {
        width: width - 20,
        height: height / 6,
        alignItems: 'center',
        justifyContent: 'space-around',
        marginVertical: 5
    }
})

export default DiteReqListScreen;