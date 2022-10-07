import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Modal, TextInput, Dimensions, ImageBackground, TouchableOpacity } from 'react-native';

import Card from '../components/Card';
import { getFormattedToken } from '../common/formetedToken'
import { traineeSendRequest } from '../api/traineeSendRequestApi'
import { connect } from 'react-redux'


import { traineeExerciseApi } from '../api/traineeExerciseApi';
import { traineeDietApi } from '../api/traineeDietApi'

import ImageBackGround1 from '../../assets/image/ImageHome1.jpg'
import ImageBackGround2 from '../../assets/image/ImageHome2.jpg'
import ImageBackGround3 from '../../assets/image/ImageHome3.jpg'
import ImageBackGround4 from '../../assets/image/ImageHome4.jpg'

import { AntDesign, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';

import Colors from '../constants/Colors';

const mapStateToProps = state => {
    return {
        token: getFormattedToken(state.loginReducer.token)
    }
}

const { width, height } = Dimensions.get('window')

const HomeScreen = props => {
    const [getDietData, setGetDietdata] = useState(null);
    const [getExerciseData, setGetExerciseData] = useState();
    const [getTraineeExerciseData, setTraineeGetExerciseData] = useState([]);
    const [getTaineeDietData, setTraineeDietData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [exerciseModalVisible, setExerciseModalVisiable] = useState(false);
    const [userNoteDiet, setUserNoteDiet] = useState("");
    const [userNoteExercise, setUserNoteExercise] = useState("");

    // time limit states
    const [nextExerciseReqDay, setNextExerciseReqDay] = useState(0);
    const [nextDietReqDay, setNextDiteReqDay] = useState(0)

    let dataDiet = { issue: userNoteDiet }
    let dataExercise = { issue: userNoteExercise }

    useEffect(() => {
        //this api to check last req details , if no req is made then it returns empty value

        traineeExerciseApi.traineeGetLastExerciseDetails(props.token).then(res => {
            //console.log("request 13", res.data)
            setTraineeGetExerciseData(res.data)
        }).catch(err => console.log(err.response.data))

        traineeExerciseApi.traineeGetExerciseRequestTimeLimit(props.token).then(res => {
            //console.log('exercise time limit', res.data)
            // setNextExerciseReqDay(res.data.noOfDays);
        })

        traineeDietApi.traineeGetDietRequestTimeLimit(props.token)
            .then(res => console.log("diet time limit", res.data))
            .catch(err => console.log(err))

        traineeDietApi.traineeGetLastDietDetails(props.token)
            .then(res => {
                // console.log("traineeDiteData", res.data)
                setTraineeDietData(res.data)
            }).catch(err => (console.log(err.response.data)))
    }, [getExerciseData, getDietData])


    const makeExerciseReq = (dataExercise, token) => {
        traineeSendRequest.traineeSendExerciseRequest(dataExercise, token)
            .then(res => {
                setGetExerciseData(res.data);
                alert('Your Request has been placed');
            })
        // .catch(err => console.log("1st error" + err.response.data))

    }

    const makeDietReq = (dataDiet, token) => {
        traineeSendRequest.traineeSendDietRequest(dataDiet, token)
            .then(res => {
                setGetDietdata(res.data)
                alert('Your Request has been placed')
            })
            .catch(err => console.log("1st error" + err.response.data))
    }

    // flag vaiable to disable/enable "see your diet chart button".
    let buttonFlag = true;
    if (getDietData) {
        if (getDietData.approval === 1) {
            buttonFlag = false
        }
    }
    //button flag for workout button.
    let exerciseButtonFlag = true;
    if (getExerciseData) {
        if (getExerciseData.approval === 1) {
            exerciseButtonFlag = false;
        }
    };



    const RenderExerciseOption = ({ getTraineeExerciseData, navigation, setExerciseModalVisiable, }) => {
        // forceRemount();

        if (getTraineeExerciseData) {
            if (getTraineeExerciseData.approval === 0) {
                return (
                    <View
                        style={{
                            height: '30%',
                            width: '100%',
                            flexDirection: 'row-reverse',
                            paddingLeft: 5,
                            alignItems: 'center'
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                flexDirection: 'row',
                                padding: 5,
                                alignItems: 'center',
                                backgroundColor: 'red'
                            }}
                            onPress={
                                () => alert("Your Request is Still Pending")
                            }
                        >
                            <Text style={{ color: 'white', fontSize: 15 }} >Pending</Text>
                            <MaterialIcons name="pending-actions" size={30} color="white" />
                        </TouchableOpacity>
                    </View>
                )

            } else {
                return (
                    <View
                        style={{
                            height: '30%',
                            width: '100%',
                            flexDirection: 'row-reverse',
                            paddingLeft: 5,
                            alignItems: 'center'
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                flexDirection: 'row',
                                padding: 5,
                                alignItems: 'center'
                            }}
                            onPress={
                                () => navigation.navigate('WorkOutScreen',
                                    { data: getTraineeExerciseData }
                                )
                            }
                        >
                            <Text style={{ color: 'white' }} >View Details</Text>
                            <AntDesign name="arrowright" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                )
            }
        } else {
            return (
                <View
                    style={{
                        height: '30%',
                        width: '100%',
                        flexDirection: 'row-reverse',
                        paddingLeft: 5,
                        alignItems: 'center'
                    }}
                >
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            padding: 5,
                            alignItems: 'center',
                            justifyContent: 'space-around',
                            backgroundColor: 'black',
                            borderRadius: 20,
                            width: '40%'
                        }}
                        onPress={() => setExerciseModalVisiable(true)}
                    >
                        <Text style={{ color: 'white' }} >Make Request</Text>
                        <SimpleLineIcons name="note" size={24} color="#e0cf00" />
                    </TouchableOpacity>
                </View>
            )
        }
    };

    const RenderDietOptions = ({ getTaineeDietData, navigation, setModalVisible }) => {
        // forceRemount
        if (getTaineeDietData) {

            if (getTaineeDietData.approval === 0) {
                return (
                    // <Button
                    //     title="See Daily DiteChart"
                    //     disabled={buttonFlag}
                    //     onPress={() => navigation.navigate('DiteScreen')} />
                    <View
                        style={{
                            height: '30%',
                            width: '100%',
                            flexDirection: 'row-reverse',
                            paddingLeft: 5,
                            alignItems: 'center'
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                flexDirection: 'row',
                                padding: 5,
                                alignItems: 'center',
                                backgroundColor: 'red'
                            }}
                            onPress={
                                () => alert("Your Request is Still Pending")
                            }
                        >
                            <Text style={{ color: 'white', fontSize: 15 }} >Pending</Text>
                            <MaterialIcons name="pending-actions" size={30} color="white" />
                        </TouchableOpacity>
                    </View>
                )
            } else {
                return (
                    // <Button
                    //     title="See Daily DiteChart"
                    //     color='orange'
                    //     onPress={() => navigation.navigate('DiteScreen', { name: "My Diets", data: getTaineeDietData })} />
                    <View
                        style={{
                            height: '30%',
                            width: '100%',
                            flexDirection: 'row-reverse',
                            paddingLeft: 5,
                            alignItems: 'center'
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                flexDirection: 'row',
                                padding: 5,
                                alignItems: 'center'
                            }}
                            onPress={() => navigation.navigate('DiteScreen', { data: getTaineeDietData })}
                        >
                            <Text style={{ color: 'white' }} >View Details</Text>
                            <AntDesign name="arrowright" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                )
            }
        } else {
            return (
                <View
                    style={{
                        height: '30%',
                        width: '100%',
                        flexDirection: 'row-reverse',
                        paddingLeft: 5,
                        alignItems: 'center'
                    }}
                >
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            padding: 5,
                            alignItems: 'center',
                            justifyContent: 'space-around',
                            backgroundColor: 'black',
                            borderRadius: 20,
                            width: '40%'
                        }}
                        onPress={() => setModalVisible(true)}
                    >
                        <Text style={{ color: 'white' }} >Make Request</Text>
                        <SimpleLineIcons name="note" size={24} color="#e0cf00" />
                    </TouchableOpacity>
                </View>
            )
        }

    }



    //console.log(userNote)
    return (
        <View style={styles.screen} >
            <View style={styles.mainContainer}>
                {/* <Text style={styles.title}>WELCOME</Text> */}

                {/*View that displays card components  */}

                <View styles={styles.cardContainer}>
                    <Card style={styles.card}>
                        <ImageBackground
                            source={ImageBackGround1}
                            style={{
                                flex: 1,
                                width: '100%',
                                height: '100%',
                                overflow: 'hidden',
                                borderRadius: 10
                            }}
                        >
                            <View
                                style={{
                                    marginTop: 10,
                                    width: '100%',
                                    height: '60%',
                                    paddingLeft: 5
                                }}
                            >
                                <Text
                                    style={{
                                        color: 'white',
                                        fontWeight: 'bold',
                                        fontSize: 25,
                                        textShadowColor: 'black',
                                        textShadowRadius: 8,
                                    }}
                                >
                                    See Your Workouts
                                </Text>

                            </View>

                            <View style={styles.btnContainer}>
                                <RenderExerciseOption
                                    getTraineeExerciseData={getTraineeExerciseData}
                                    navigation={props.navigation}
                                    setExerciseModalVisiable={setExerciseModalVisiable}
                                />
                            </View>
                        </ImageBackground>
                    </Card>

                    <Card style={styles.card}>
                        <ImageBackground
                            source={ImageBackGround2}
                            style={{
                                flex: 1,
                                width: '100%',
                                height: '100%',
                                overflow: 'hidden',
                                borderRadius: 10
                            }}

                        >

                            <View
                                style={{
                                    marginTop: 10,
                                    width: '100%',
                                    height: '60%',
                                    paddingLeft: 5
                                }}
                            >

                                <Text
                                    style={{
                                        fontSize: 25,
                                        fontWeight: 'bold',
                                        color: '#e0cf00',


                                    }}
                                >
                                    See Your Diets
                                </Text>
                            </View>

                            <RenderDietOptions
                                getTaineeDietData={getTaineeDietData}
                                buttonFlag={buttonFlag}
                                navigation={props.navigation}
                                setModalVisible={setModalVisible}
                            />
                        </ImageBackground>
                    </Card>

                    <Card style={styles.card}>
                        <ImageBackground
                            source={ImageBackGround3}
                            style={{
                                flex: 1,
                                width: '100%',
                                height: '100%',
                                overflow: 'hidden',
                                borderRadius: 10
                            }}
                        >
                            <View
                                style={{
                                    marginTop: 10,
                                    width: '100%',
                                    height: '60%',
                                    paddingLeft: 5
                                }}
                            >

                                <Text
                                    style={{
                                        fontSize: 25,
                                        fontWeight: 'bold',
                                        color: '#602900',
                                        textShadowColor: 'white',
                                        textShadowRadius: 5
                                    }}
                                >
                                    Payment Statements
                                </Text>
                            </View>
                            <View
                                style={{
                                    height: '30%',
                                    width: '100%',
                                    flexDirection: 'row-reverse',
                                    paddingLeft: 5,
                                    alignItems: 'center'
                                }}
                            >
                                <TouchableOpacity
                                    style={{
                                        flexDirection: 'row',
                                        padding: 5,
                                        alignItems: 'center'
                                    }}
                                    onPress={() => { props.navigation.navigate('PaymentScreen') }}
                                >
                                    <Text>View Details</Text>
                                    <AntDesign name="arrowright" size={24} color="black" />
                                </TouchableOpacity>
                            </View>
                        </ImageBackground>
                    </Card>

                    <Card style={styles.card}>
                        <ImageBackground
                            source={ImageBackGround4}
                            style={{
                                flex: 1,
                                width: '100%',
                                height: '100%',
                                overflow: 'hidden',
                                borderRadius: 10
                            }}
                        >
                            <View
                                style={{
                                    marginTop: 10,
                                    width: '100%',
                                    height: '60%',
                                    paddingLeft: 10,
                                }}
                            >

                                <Text
                                    style={{
                                        fontSize: 25,
                                        fontWeight: 'bold',
                                        color: '#f8afff',
                                        textShadowColor: 'black',
                                        textShadowRadius: 8
                                    }}
                                >
                                    WorkOut Days
                                </Text>
                            </View>
                            <View
                                style={{
                                    height: '30%',
                                    width: '100%',
                                    flexDirection: 'row-reverse',
                                    paddingLeft: 5,
                                    alignItems: 'center'
                                }}
                            >
                                <TouchableOpacity
                                    style={{
                                        flexDirection: 'row',
                                        padding: 5,
                                        alignItems: 'center'
                                    }}
                                    onPress={() => { props.navigation.navigate('AttendenceScreen') }}
                                >
                                    <Text style={{ color: 'white' }} >View Details</Text>
                                    <AntDesign name="arrowright" size={24} color="white" />
                                </TouchableOpacity>
                            </View>


                        </ImageBackground>
                    </Card>
                </View>

                {/* modal for diet req */}
                <Modal
                    transparent={true}
                    animationType='fade'
                    visible={modalVisible} >
                    <View style={styles.modalView}  >
                        <View
                            style={{
                                width: width - 20,
                                height: height / 2,
                                // borderColor: "black",
                                // borderWidth: 1,
                                backgroundColor: "white",
                                alignItems: 'center'
                            }}
                        >
                            <View style={{
                                height: '30%',
                                width: '90%',
                                padding: 10,
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    fontSize: 24,
                                    fontWeight: 'bold'
                                }}> Make A Request for Diet</Text>
                                <Text>Do you Want to add something</Text>
                            </View>
                            <View
                                style={{

                                    height: '35%',
                                    width: '90%'
                                }}
                            >

                                <TextInput
                                    style={styles.note}
                                    multiline
                                    placeholder="add your note"
                                    value={userNoteDiet}
                                    onChangeText={setUserNoteDiet}
                                />
                            </View>
                            <View
                                style={{
                                    height: '30%',
                                    width: '100%',
                                    flexDirection: 'row',
                                    justifyContent: 'space-around',
                                    alignItems: 'center'
                                }}
                            >
                                {userNoteDiet !== '' ? <TouchableOpacity
                                    style={{
                                        backgroundColor: Colors.accept,
                                        height: "35%",
                                        width: '30%',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: 20
                                    }}
                                    onPress={() => {
                                        makeDietReq(dataDiet, props.token)
                                        setModalVisible(false)
                                    }}
                                >
                                    <Text style={{
                                        color: 'white'
                                    }}>Submit</Text>
                                </TouchableOpacity> :
                                    <TouchableOpacity
                                        style={{
                                            backgroundColor: Colors.accept,
                                            height: "35%",
                                            width: '30%',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderRadius: 20
                                        }}
                                        onPress={() => {
                                            alert("Please add a Note, If you do not want to add a issue, write NO ISSUE")
                                        }}
                                    >
                                        <Text style={{
                                            color: 'white'
                                        }}>Submit</Text>
                                    </TouchableOpacity>
                                }
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: Colors.cancle,
                                        height: "35%",
                                        width: '30%',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: 20,
                                    }}
                                    onPress={() => {
                                        setModalVisible(false)
                                    }}
                                >
                                    <Text style={{
                                        color: 'white'
                                    }}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                </Modal>
                {/* Modal for excercise req */}
                <Modal
                    transparent={true}
                    visible={exerciseModalVisible}
                    animationType='fade'
                >
                    <View style={styles.modalView}  >
                        <View
                            style={{
                                width: width - 20,
                                height: height / 2,
                                // borderColor: "black",
                                // borderWidth: 1,
                                backgroundColor: "white",
                                alignItems: 'center'
                            }}
                        >
                            <View style={{
                                height: '30%',
                                width: '90%',
                                padding: 10,
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    fontSize: 22,
                                    fontWeight: 'bold'
                                }}> Make A Request for Exercise</Text>
                                <Text>Do you Want to add something</Text>
                            </View>
                            <View
                                style={{

                                    height: '35%',
                                    width: '90%'
                                }}
                            >

                                <TextInput
                                    style={styles.note}
                                    multiline
                                    placeholder="add your note"
                                    value={userNoteExercise}
                                    onChangeText={setUserNoteExercise}
                                />
                            </View>
                            <View
                                style={{
                                    height: '30%',
                                    width: '100%',
                                    flexDirection: 'row',
                                    justifyContent: 'space-around',
                                    alignItems: 'center'
                                }}
                            >
                                {userNoteExercise !== '' ? <TouchableOpacity
                                    style={{
                                        backgroundColor: Colors.accept,
                                        height: "35%",
                                        width: '30%',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: 20
                                    }}
                                    onPress={() => {
                                        makeExerciseReq(dataExercise, props.token)
                                        setExerciseModalVisiable(false)
                                    }}
                                >
                                    <Text style={{
                                        color: 'white'
                                    }}>Submit</Text>
                                </TouchableOpacity> :
                                    <TouchableOpacity
                                        style={{
                                            backgroundColor: Colors.accept,
                                            height: "35%",
                                            width: '30%',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderRadius: 20
                                        }}
                                        onPress={() => {
                                            alert("Please add a Note, If you do not want to add a issue, write NO ISSUE")
                                        }}
                                    >
                                        <Text style={{
                                            color: 'white'
                                        }}>Submit</Text>
                                    </TouchableOpacity>
                                }
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: Colors.cancle,
                                        height: "35%",
                                        width: '30%',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: 20,
                                    }}
                                    onPress={() => {
                                        setExerciseModalVisiable(false)
                                    }}
                                >
                                    <Text style={{
                                        color: 'white'
                                    }}>Cancle</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </View >
    )
};



const styles = StyleSheet.create({
    screen: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: Colors.screen
    },
    mainContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: 'center'
    },
    title: {
        padding: 15,
        fontSize: 22,
        fontWeight: "bold"
    },
    cardContainer: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
    },
    card: {
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 0,
        marginVertical: 10,
        width: width - 30,
        height: height / 6
    },
    btnContainer: {

    },
    btn_style: {
        alignItems: 'center',
    },
    note: {
        borderWidth: 3,
        borderColor: 'gray',
        height: "100%",
        marginVertical: 10,
        padding: 10

    },
    modalView: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        padding: 10,

    }
});

export default connect(mapStateToProps)(HomeScreen);