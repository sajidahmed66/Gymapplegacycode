import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, Dimensions, } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Logo from '../../components/Logo';
import Colors from '../../constants/Colors';
import Card from '../../components/Card';
import AddDiets from '../../components/AddDiets';
import { getFormattedToken } from '../../common/formattedToken';
import {  useSelector } from "react-redux";
import { trainerDietList } from '../../api/trainerDietList';

const { width, height } = Dimensions.get('window')

const DietScreen = props => {


    const formattedToken = useSelector(state => getFormattedToken(state.trainerLoginReducer.token));

    const [dietModalVisible, setDietModalVisible] = useState(false)
    const [fullDietList, setFullDietList] = useState([])
    const [refresh, setRefresh] = useState([])
console.log(dietModalVisible)
    useEffect(() => {
        setTimeout(()=>{
            trainerDietList.getFullDietList(formattedToken).then(res => {
                console.log(res.data)
                setFullDietList(res.data)
            }).catch(err => {
                console.log(err.response.data)
            })
        },0)
    }, [])

    const handleDiet = (dietData) => {
        trainerDietList.addDiet(dietData, formattedToken).then(res => {
            console.log(res.data)
            setFullDietList(res.data);
        }).catch(err => {
            console.log(err.response.data)
        })
    }

    const RenderDietList = ({ item, index }) => {
        return (
            // <TouchableOpacity
            //     onPress={() => { setExerciseModalVisible() }}
            // >
                <Card style={{ width: width - 10, marginVertical: 5 }} >
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                        <Text style={{ paddingLeft: 5, paddingRight: 5 }}>{item.name}</Text>
                            <Text >{item.quantity} {item.unit}</Text>
                            <Text >{item.calorie} cal</Text>
                    </View>
                </Card>
            // </TouchableOpacity>
        )
    }

    return (
        <View style={styles.screen}>
            <Text style={styles.headerText} >
                Diet List.
            </Text>
            <View style={styles.flatListView}>
                <FlatList
                    data={fullDietList}
                    // extraData={refresh}
                    renderItem={({ item, index }) => <RenderDietList item={item} index={index} />}
                    keyExtractor={item => item._id}
                />
            </View>
            <View style={styles.addDietView}>
                <Card>
                    <TouchableOpacity
                        onPress={() => { setDietModalVisible(true) }}
                    >
                        <Text>Add Diet</Text>
                    </TouchableOpacity>
                </Card>
            </View>
            <AddDiets
                modalVisible={dietModalVisible}
                setModalVisible={setDietModalVisible}
                updateDiets={handleDiet}
                dietsData={fullDietList}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    screen: {
        alignItems: "center",
        width: width,
        height: height,
        justifyContent: 'flex-start'
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 5,
    },
    flatListView: {
        width: '100%',
        height: "60%",
        alignItems: 'center',

    },
    addDietView: {
        width: '100%',
        height: "20%",
        alignItems: 'center',
        justifyContent: 'center'
    }
})

const DiteStack = createStackNavigator();

const DiteScreenStrack = props => {
    return (
        <DiteStack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: Colors.primary,
                    height: 65
                },
                headerTintColor: '#fff',
                headerTitleAlign: 'center',
            }}
        >
            <DiteStack.Screen
                name="Dite List"
                component={DietScreen}
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
        </DiteStack.Navigator>
    )
}


export default DiteScreenStrack;