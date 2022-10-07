import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, Dimensions, } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Logo from '../../components/Logo';
import Colors from '../../constants/Colors';
import Card from '../../components/Card';
import AddExercise from '../../components/AddExercise';
import { getFormattedToken } from '../../common/formattedToken';
import { useDispatch, useSelector } from "react-redux";
import { trainerExerciseList } from '../../api/trainerExerciseList';

const { width, height } = Dimensions.get('window')

const ExerciseScreen = props => {


    const formattedToken = useSelector(state => getFormattedToken(state.trainerLoginReducer.token));

    const [exerciseModalVisible, setExerciseModalVisible] = useState(false)
    const [fullExerciseList, setFullExerciseList] = useState([])
    const [refresh, setRefresh] = useState([])

    useEffect(() => {
        setTimeout(()=>{
            trainerExerciseList.getFullExerciseList(formattedToken).then(res => {
                console.log(res.data)
                setFullExerciseList(res.data)
            }).catch(err => {
                console.log(err.response.data)
            })
        },0)
    }, [])

    const handleExercise = (exerciseData) => {
        trainerExerciseList.addExercise(exerciseData, formattedToken).then(res => {
            console.log(res.data)
            setFullExerciseList(res.data);
        }).catch(err => {
            console.log(err.response.data)
        })
    }

    const RenderExerciseList = ({ item, index }) => {
        return (
            // <TouchableOpacity
            //     onPress={() => { setExerciseModalVisible() }}
            // >
                <Card style={{ width: width - 10, marginVertical: 5 }} >
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                        <Text style={{ paddingLeft: 5, paddingRight: 5 }}>{item.name}</Text>
                        <View style={{ width: '70%', marginVertical: 5 }}>
                            <Text >{item.description}</Text>
                        </View>
                    </View>
                </Card>
            // </TouchableOpacity>
        )
    }

    return (
        <View style={styles.screen}>
            <Text style={styles.headerText} >
                Exercise List.
            </Text>
            <View style={styles.flatListView}>
                <FlatList
                    data={fullExerciseList}
                    // extraData={refresh}
                    renderItem={({ item, index }) => <RenderExerciseList item={item} index={index} />}
                    keyExtractor={item => item._id}
                />
            </View>
            <View style={styles.addExerciseView}>
                <Card>

                    <TouchableOpacity
                        onPress={() => { setExerciseModalVisible(true) }}
                    >
                        <Text>Add Exercises</Text>
                    </TouchableOpacity>
                </Card>
            </View>
            <AddExercise
                modalVisible={exerciseModalVisible}
                setModalVisible={setExerciseModalVisible}
                updateExercise={handleExercise}
                exerciseData={fullExerciseList}
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
    addExerciseView: {
        width: '100%',
        height: "20%",
        alignItems: 'center',
        justifyContent: 'center'
    }
})

const ExerciseStack = createStackNavigator();

const ExerciseStackScreen = props => {
    return (
        <ExerciseStack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: Colors.primary,
                    height: 65
                },
                headerTintColor: '#fff',
                headerTitleAlign: 'center',
            }}
        >
            <ExerciseStack.Screen
                name='Exercise List'
                component={ExerciseScreen}
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
        </ExerciseStack.Navigator >
    )
}

export default ExerciseStackScreen;