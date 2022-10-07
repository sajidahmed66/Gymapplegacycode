import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Button, TouchableOpacity, FlatList, TextInput, Dimensions, CheckBox } from 'react-native';
import Card from '../components/Card';
import DocPicker from '../components/DocPicker';
import { getFormattedToken } from '../common/formattedToken';
import { useDispatch, useSelector } from "react-redux";
import { trainerExerciseList } from '../api/trainerExerciseList';
import { trainerUploadFileApi } from '../api/traineerUploadFileApi';


const { width, height } = Dimensions.get('window')

const AssignScreen = props => {
    let userData = props.route.params.data
    let flag = props.route.params.flag
    const fromDate = props.route.params.fromDate;
    const toDate = props.route.params.toDate;

    const formattedToken = useSelector(state => getFormattedToken(state.trainerLoginReducer.token));

    const uploadExceciseFile = (data, token) => {
        trainerUploadFileApi.trainerExerciseUploadFile(data, token).then(res => console.log(res.data))
            .catch(err => console.log(err))
    };

    const [assignedExreqList, setAssignedExreqList] = useState([]); // assigned list data
    const [fullExerciseList, setFullExerciseList] = useState([])
    const [refresh, setRefresh] = useState(false);

    // console.log('outside', fullExerciseList);

    const handleExreqList = (exercise_id) => {
        //console.log("working", exercise_id)
        setFullExerciseList(exercise_id)
        //console.log('inside', fullExerciseList);
    };

    useEffect(() => {
        trainerExerciseList.getFullExerciseList(formattedToken)
            .then(res => {
                let list = res.data
                const modifiedList = list.map(item => {
                    let new_item = { ...item, isChecked: false, sets: '', reps: '' }
                    return new_item
                })
                setFullExerciseList(modifiedList)
            })
            .catch(err => console.log(err.response.data))
    }, [])

    const handleChange = (item, index) => {

        if (!item.isChecked) {
            // console.log('from set true item', item)
            // console.log('from set true index', index)
            // const curItem = fullExerciseList.find(i => i._id === item._id)
            // const new_curItem = { ...curItem, isChecked: !curItem.isChecked }
            // let list = fullExerciseList
            // list[index] = new_curItem
            // console.log("from set true", list)
            // handleExreqList(list)
            const _index = fullExerciseList.indexOf(item)
            const _newItem = { ...item, isChecked: true }
            let list = fullExerciseList;
            list[_index] = _newItem
            handleExreqList(list)
            setRefresh(!refresh);
        } else {
            // console.log('from set false item', item)
            // console.log('from set false index', index)
            // const curItem = fullExerciseList.find(i => i.id === item.id);
            // const new_curItem = { ...curItem, isChecked: !curItem.isChecked }
            // console.log('from set false item', new_curItem)
            // console.log('from set false index', index)
            // let list = fullExerciseList
            // list[index] = new_curItem
            // handleExreqList(list)
            const _index = fullExerciseList.indexOf(item)
            const _newItem = { ...item, isChecked: false }
            let list = fullExerciseList;
            list[_index] = _newItem
            handleExreqList(list)
            setRefresh(!refresh);

        }
    };

    const handleSetsChange = (item, index, numOfSets) => {
        // console.log('item', item)
        // console.log('index', index)
        const curItem = fullExerciseList.find(i => i._id === item._id);
        const new_curItem = { ...curItem, sets: numOfSets }
        let list = fullExerciseList
        list[index] = new_curItem
        handleExreqList(list)
    };


    const handleRepsChange = (item, index, numOfReps) => {
        //console.log('item', item)
        //console.log('index', index)
        const curItem = fullExerciseList.find(i => i._id === item._id)
        const new_curItem = { ...curItem, reps: numOfReps }
        let list = fullExerciseList
        list[index] = new_curItem
        handleExreqList(list)
    }

    const handleExerciseAssign = () => {
        let assignedExercises = fullExerciseList.filter(i => i.isChecked === true)
        const workout_Id = []
        const _set = []
        const _rep = []
        assignedExercises.forEach(item => {
            workout_Id.push(item._id)
            if (item.sets !== '' && item.reps !== '') {
                _set.push(parseInt(item.sets))
                _rep.push(parseInt(item.reps))
            } else {
                alert("Input all field")
            }
        })

        if (workout_Id.length === _set.length && _set.length === _rep.length) {

            const data = {
                fromDate: fromDate,
                toDate: toDate,
                traineeExerciseId: userData._id,
                workout_id: workout_Id,
                sets: _set,
                reps: _rep,
                flag: 1,
            }
            console.log(data)
            trainerUploadFileApi.trainerExerciseUploadFile(data, formattedToken)
                .then(res => {
                    console.log("from response", res.data)
                    props.navigation.navigate('Exercise Requests')

                })
                .catch(err => console.log("from error", err))
        } else {
            alert("Some Thing Went Wrong")
        }
    }


    const RenderExerciseAssignList = ({ item, index }) => {
        const [numOfSets, setNumOfSets] = useState(item.sets)
        const [numOfReps, setNumOfReps] = useState(item.reps)
        return (
            <Card style={{ width: width - 50, height: 70, marginVertical: 5 }} >

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>

                    <CheckBox
                        value={item.isChecked}
                        onValueChange={() => handleChange(item, index)}
                        style={{ alignSelf: "center", }}
                    />
                    <Text>{item.name}</Text>
                    <TextInput
                        placeholder='sets'
                        value={numOfSets}
                        onChangeText={(numOfSets) => { setNumOfSets(numOfSets); handleSetsChange(item, index, numOfSets); }}

                    />
                    <TextInput
                        placeholder="reps"
                        value={numOfReps}
                        onChangeText={(numOfReps) => { setNumOfReps(numOfReps); handleRepsChange(item, index, numOfReps); }}
                    />
                </View>
            </Card>
        )
    }

    return (
        <>
            {flag === 1 ?
                <View style={styles.screen}>
                    <Text style={styles.headerText} >
                        Assign Exercises for trainee.
                    </Text>
                    <View style={styles.flatlistView}>
                        <FlatList
                            data={fullExerciseList}
                            extraData={refresh}
                            renderItem={({ item, index }) => <RenderExerciseAssignList item={item} index={index} />}
                            keyExtractor={item => item._id}
                        />
                    </View>

                    <View style={styles.assignview}>
                        <Card>
                            <TouchableOpacity
                                onPress={() => { handleExerciseAssign() }}
                            >
                                <Text>Assign Exercises</Text>

                            </TouchableOpacity>
                        </Card>
                    </View>
                </View> :
                <View style={styles.screen}>
                    <DocPicker name="traineeExerciseId" dietId={userData._id} uploadFileHandle={(data, token) => uploadExceciseFile(data, token)} />
                </View>
            }
        </>
    )
}

const styles = StyleSheet.create({
    screen: {
        //  flex: 1,
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
    flatlistView: {
        width: '100%',
        height: "60%",
        alignItems: 'center',

    },
    assignview: {
        width: '100%',
        height: "20%",
        alignItems: 'center',

        justifyContent: 'center'
    }
});

export default AssignScreen;