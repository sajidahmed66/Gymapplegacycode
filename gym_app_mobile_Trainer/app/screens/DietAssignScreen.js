import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Button, TouchableOpacity, FlatList, TextInput, Dimensions, CheckBox } from 'react-native';
import Card from '../components/Card';
import DocPicker from '../components/DocPicker';
import { getFormattedToken } from '../common/formattedToken';
import { useSelector } from 'react-redux';
import { trainerDietList } from '../api/trainerDietList';
import { trainerUploadFileApi } from '../api/traineerUploadFileApi';

const { width, height } = Dimensions.get('window');



const DietAssignScreen = props => {
    //navigation props handled here 
    let userData = props.route.params.data
    let flag = props.route.params.flag
    const fromDate = props.route.params.fromDate;
    const toDate = props.route.params.toDate;


    const [dietFullList, setdietFullList] = useState();
    const [refresh, setRefresh] = useState(false)

    const formattedToken = useSelector(state => getFormattedToken(state.trainerLoginReducer.token));

    useEffect(() => {
        trainerDietList.getFullDietList(formattedToken)
            .then(res => {
                let list = res.data
                const modifiedList = list.map(item => {
                    let new_item = { ...item, isChecked: false, measurment: null }
                    return new_item;
                })
                setdietFullList(modifiedList)
            })
            .catch(err => console.log(err))
    }, []);

    //handeler for state management from flatlist
    const handledietList = (diet) => {
        console.log(diet)
        setdietFullList(diet)
    };

    const handleChange = (item, index) => {

        if (!item.isChecked) {
            const _index = dietFullList.indexOf(item)
            const _newItem = { ...item, isChecked: true }
            let list = dietFullList;
            list[_index] = _newItem
            handledietList(list)
            setRefresh(!refresh);
        } else {

            const _index = dietFullList.indexOf(item)
            const _newItem = { ...item, isChecked: false }
            let list = dietFullList;
            list[_index] = _newItem
            handledietList(list)
            setRefresh(!refresh);

        }
    };

    const handleMeasurmentChange = (item, measurment) => {
        const _index = dietFullList.indexOf(item)
        const _newItem = { ...item, measurment: measurment }
        let list = dietFullList;
        list[_index] = _newItem
        handledietList(list)
    }


    const RenderDietAssignList = ({ item, index }) => {
        const [measurment, setMeasurment] = useState(item.measurment)
        return (
            <Card style={{ width: width - 50, height: 70, marginVertical: 5 }}  >
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }} >
                    <CheckBox
                        value={item.isChecked}
                        onValueChange={() => handleChange(item, index)}
                        style={{ alignSelf: "center", }}

                    />
                    <Text>{item.name}</Text>
                    <Text>{`${item.quantity} ${item.unit}`}</Text>
                    <TextInput
                        style={{ borderColor: 'gray', borderWidth: 1, borderRadius: 5, alignContent: 'center', padding: 3 }}
                        value={measurment}
                        placeholder='Quantity'
                        keyboardType='numeric'
                        onChangeText={(measurment) => { setMeasurment(measurment); handleMeasurmentChange(item, measurment) }}
                    />
                    <Text>{`${measurment * item.calorie} `}</Text>
                </View>
            </Card>
        )
    }

    const handleDietAssign = () => {
        let assignedDiet = dietFullList.filter(i => i.isChecked === true)

        const diet_id = []
        const quantity = []
        const totalCalorie = []
        console.log(assignedDiet);
        assignedDiet.forEach(item => {
            diet_id.push(item._id)
            if (item.measurment !== "") {
                quantity.push(parseInt(item.measurment))
                totalCalorie.push(parseInt(item.measurment) * item.calorie)
            } else {
                alert("Input Cannot be Empty")
            }
        })
        if (diet_id.length === quantity.length) {

            const data = {
                fromDate: fromDate,
                toDate: toDate,
                traineeDietId: userData._id,
                diet_id: diet_id,
                quantity: quantity,
                totalCalorie: totalCalorie,
                flag: 1,
            }
            console.log(data)
            trainerUploadFileApi.trainerDietUploadFile(data, formattedToken) //Question Why add message here?
                .then(res => {
                    console.log("from response", res.data)
                    props.navigation.navigate('Home', { message: "Your diet assign is successfully updated" })
                })
                .catch(err => console.log("from error", err))
        } else {
            alert("something went wrong Try again")
        }
    }

    const uploadDietFile = (data, token) => {
        trainerUploadFileApi.trainerDietUploadFile(data, token).then(res => { console.log('trainee upload file', res.data), props.navigation.navigate('Home', { message: "Your diet assign is successfully updated" }) })
            .catch(err => console.log(err.response.data))
    };

    return (
        <>{flag === 1 ?
            <View style={styles.screen} >
                <View style={styles.flatlistView}>
                    <FlatList
                        data={dietFullList}
                        renderItem={({ item, index }) => <RenderDietAssignList item={item} index={index} />}
                        keyExtractor={item => item._id}
                        extraData={refresh}
                    />
                </View>
                <View style={styles.assignview}>
                    <Card>
                        <TouchableOpacity
                            onPress={handleDietAssign}
                        >
                            <Text>Assign</Text>

                        </TouchableOpacity>
                    </Card>
                </View>
            </View>
            :
            <DocPicker name="traineeDietId" dietId={userData._id} uploadFileHandle={(data, token) => uploadDietFile(data, token)} />
        }
        </>
    )
}
const styles = StyleSheet.create({
    screen: {
        width: width,
        height: height,
        alignItems: 'center',
        justifyContent: 'flex-start'
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
})


export default DietAssignScreen