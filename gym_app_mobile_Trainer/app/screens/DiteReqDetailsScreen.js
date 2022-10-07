import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Dimensions } from 'react-native';
import DocPicker from '../components/DocPicker'
import Card from '../components/Card';
import { SimpleLineIcons, FontAwesome5, Entypo } from '@expo/vector-icons';
import Colors from '../constants/Colors'
import DateTimePicker from '@react-native-community/datetimepicker';


import { getFormattedToken } from '../common/formattedToken';
import { trainerUploadFileApi } from '../api/traineerUploadFileApi';
import { trainerProfileApi } from '../api/trainerProfileApi';
import { useDispatch, useSelector } from "react-redux";


const { width, height } = Dimensions.get('window');

const DiteReqDetailsScreen = props => {
    // Will be directed to this screen from ExerciseReqListScreen;
    // Dynamic data for diffrent ids.

    // let userData = props.route.params.data; // this line is commented after adding toptab
    //console.log("from details diet", userData)

    let userData = props.traineeDietData;

    const formattedToken = useSelector(state => getFormattedToken(state.trainerLoginReducer.token));


    const uploadDietFile = (data, token) => {

        trainerUploadFileApi.trainerDietUploadFile(data, token)
            .then(res => console.log("from dite post", res.data))
            .catch(err => console.log("from dite post err", err))
    };

    const [getTraineeProfile, setGetTraineeProfile] = useState('');
    useEffect(() => {
        trainerProfileApi.traineeGetProfile({ traineeId: userData.trainee._id }, formattedToken).then(res => {
            console.log('success', res.data)
            setGetTraineeProfile(res.data)
        }).catch(err => {
            console.log('err', err.response.data)
        })

    }, [])
    //cons

    const _getFormatedDate = (date) => {
        let curDate = new Date(date)
        let day = curDate.getDate()
        let month = curDate.getMonth() + 1
        let year = curDate.getFullYear()
        let new_value = day + "/" + month + "/" + year;
        return new_value
    }
    // for start Date
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);



    const getFormatedDate = (curDate) => {
        let day = curDate.getDate()
        let month = curDate.getMonth() + 1
        let year = curDate.getFullYear()
        let new_value = day + "/" + month + "/" + year;
        return new_value
    }
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate)
        getFormatedDate(currentDate)
        console.log("date", date, currentDate, getFormatedDate(currentDate))

    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    // Logic for Selection of end date 
    //for end Date
    const [endDate, setEndDate] = useState(new Date());
    const [modeEnd, setModeEnd] = useState('date');
    const [showEndDate, setShowEndDate] = useState(false);

    const onChangeEnd = (event, selectedDate) => {
        const currentDate = selectedDate || endDate;
        setShowEndDate(Platform.OS === 'ios');
        setEndDate(currentDate)
        getFormatedDate(currentDate)
        console.log("end date", endDate, getFormatedDate(currentDate))
    };

    const showModeEnd = (currentMode) => {
        setShowEndDate(true);
        setModeEnd(currentMode);
    };

    const showEndDatepicker = () => {
        showModeEnd('date');
    };



    return (
        <View style={styles.screen}>
            <View style={{ padding: 10 }}>
                <Text style={{
                    textAlign: 'center',
                    padding: 10,
                    fontSize: 24,
                    fontWeight: 'bold'
                }}>
                    Request Details
                </Text>
                {/* view start for each single row  */}
                <View style={{
                    flexDirection: 'row',
                    height: 40,
                    width: '80%',
                }}>
                    <View style={{
                        flex: 1,
                        borderColor: 'gray',
                        borderWidth: 1,
                        height: "100%",
                        width: "50%",
                        alignItems: 'center',
                        justifyContent: 'center'

                    }}>
                        <Text>Name </Text>
                    </View>
                    <View
                        style={{
                            flex: 1,
                            borderColor: 'gray',
                            borderWidth: 1,
                            height: "100%",
                            width: "50%",
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Text>{userData.trainee.firstname}</Text>
                    </View>

                </View>
                {/* view Ends */}
                {/* view start for each single row  */}
                <View style={{
                    flexDirection: 'row',
                    height: 40,
                    width: '80%',
                }}>
                    <View style={{
                        flex: 1,
                        borderColor: 'gray',
                        borderWidth: 1,
                        height: "100%",
                        width: "50%",
                        alignItems: 'center',
                        justifyContent: 'center'

                    }}>
                        <Text>Age </Text>
                    </View>
                    <View
                        style={{
                            flex: 1,
                            borderColor: 'gray',
                            borderWidth: 1,
                            height: "100%",
                            width: "50%",
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Text>{getTraineeProfile.age} years</Text>
                    </View>

                </View>

                {/* view Ends */}
                <View style={{
                    flexDirection: 'row',
                    height: 40,
                    width: '80%',
                }}>
                    <View style={{
                        flex: 1,
                        borderColor: 'gray',
                        borderWidth: 1,
                        height: "100%",
                        width: "50%",
                        alignItems: 'center',
                        justifyContent: 'center'

                    }}>
                        <Text>Weight </Text>
                    </View>
                    <View
                        style={{
                            flex: 1,
                            borderColor: 'gray',
                            borderWidth: 1,
                            height: "100%",
                            width: "50%",
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Text>{getTraineeProfile.weight} kg</Text>
                    </View>

                </View>
                <View style={{
                    flexDirection: 'row',
                    height: 40,
                    width: '80%',
                }}>
                    <View style={{
                        flex: 1,
                        borderColor: 'gray',
                        borderWidth: 1,
                        height: "100%",
                        width: "50%",
                        alignItems: 'center',
                        justifyContent: 'center'

                    }}>
                        <Text>Height </Text>
                    </View>
                    <View
                        style={{
                            flex: 1,
                            borderColor: 'gray',
                            borderWidth: 1,
                            height: "100%",
                            width: "50%",
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Text>{getTraineeProfile.height} cm</Text>
                    </View>

                </View>
                <View style={{
                    flexDirection: 'row',
                    height: 40,
                    width: '80%',
                }}>
                    <View style={{
                        flex: 1,
                        borderColor: 'gray',
                        borderWidth: 1,
                        height: "100%",
                        width: "50%",
                        alignItems: 'center',
                        justifyContent: 'center'

                    }}>
                        <Text>BMI </Text>
                    </View>
                    <View
                        style={{
                            flex: 1,
                            borderColor: 'gray',
                            borderWidth: 1,
                            height: "100%",
                            width: "50%",
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Text>{getTraineeProfile.bmi ? getTraineeProfile.bmi.toFixed(4) : 0.00}</Text>
                    </View>

                </View>
                {/* view start for each single row  */}
                <View style={styles.detailsview}>
                    <View style={{
                        flex: 1,
                        borderColor: 'gray',
                        borderWidth: 1,
                        height: "100%",
                        width: "50%",
                        alignItems: 'center',
                        justifyContent: 'center'

                    }}>
                        <Text>Requested date </Text>
                    </View>
                    <View
                        style={{
                            flex: 1,
                            borderColor: 'gray',
                            borderWidth: 1,
                            height: "100%",
                            width: "50%",
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Text>{_getFormatedDate(userData.appliedDate)}</Text>
                    </View>
                </View>
                <View style={styles.detailsview}>
                    <View style={{
                        flex: 1,
                        borderColor: 'gray',
                        borderWidth: 1,
                        height: "100%",
                        width: "50%",
                        alignItems: 'center',
                        justifyContent: 'center'

                    }}>
                        <Text>Issue </Text>
                    </View>
                    <View
                        style={{
                            flex: 1,
                            borderColor: 'gray',
                            borderWidth: 1,
                            height: "100%",
                            width: "50%",
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Text>{userData.issue}</Text>
                    </View>
                </View>
                {/* view Ends */}
            </View>
            {/* { userData.isApproved ? null : <Button title="assign" onPress={() => { props.navigation.navigate("Assign Diet") }} />} */}
            {userData.approval === 0 ?
                <View style={{
                    alignItems: 'center'
                }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: "100%",
                        height: 40
                    }}>
                        <View style={{
                            alignSelf: 'center',
                            justifyContent: 'center',
                            width: '40%'
                        }}>
                            <Text>
                                Select Start Date :
                            </Text>
                        </View>
                        <View
                            style={{
                                width: '30%',

                            }}
                        >
                            <Text>{getFormatedDate(date)}</Text>
                        </View>
                        <TouchableOpacity
                            style={{
                                padding: 10,
                                alignItems: 'center',
                                width: "20%"
                            }}
                            onPress={() => { showDatepicker() }}
                        >
                            <Entypo name="calendar" size={24} color={Colors.primary} />
                        </TouchableOpacity>

                    </View>

                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: "100%",
                            height: 40
                        }}
                    >
                        <View style={{
                            alignSelf: 'center',
                            justifyContent: 'center',
                            width: '40%'
                        }}
                        >
                            <Text>
                                Select End Date:
                            </Text>
                        </View>
                        <View style={{
                            width: '30%',

                        }} >
                            <Text>{getFormatedDate(endDate)}</Text>
                        </View>
                        <TouchableOpacity
                            style={{
                                padding: 10,
                                alignItems: 'center',
                                width: "20%"
                            }}
                            onPress={() => { showEndDatepicker() }}
                        >
                            <Entypo name="calendar" size={24} color={Colors.primary} />
                        </TouchableOpacity>
                    </View>



                    <View style={{
                        padding: 5,
                        width: "100%",
                        alignItems: 'center'
                    }}>
                        <TouchableOpacity
                            style={styles.touchableview}
                            onPress={() => props.navigation.navigate('Assign Diet',
                                { data: userData, flag: 1, fromDate: date.toDateString(), toDate: endDate.toDateString() }
                            )}
                        >
                            <Card style={styles.cardview}>
                                <SimpleLineIcons name="note" size={24} color="black" />
                                <Text>Assign diets          </Text>
                            </Card>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.touchableview}
                            onPress={() => props.navigation.navigate('Assign Diet',
                                { data: userData, flag: 2, fromDate: date.toDateString(), toDate: endDate.toDateString() }
                            )}
                        >
                            <Card style={styles.cardview}>
                                <FontAwesome5 name="upload" size={24} color="black" />
                                <Text>Upload a document </Text>
                            </Card>
                        </TouchableOpacity>
                    </View>
                </View> : <View></View>}
            {
                show ? <DateTimePicker
                    value={date}
                    mode={mode}
                    display='spinner'
                    onChange={onChange}

                /> : <></>
            }
            {
                showEndDate ? <DateTimePicker
                    value={endDate}
                    mode={modeEnd}
                    display='spinner'
                    onChange={onChangeEnd}

                /> : <></>
            }
        </View>
    )
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: width,
        height: height
    },
    cardview: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        justifyContent: 'space-between',

    },
    touchableview: {
        width: "60%",
        height: 40,
        marginVertical: 5,
    },
    detailsview: {
        flexDirection: 'row',
        height: 40,
        width: '80%',
    }
})

export default DiteReqDetailsScreen;