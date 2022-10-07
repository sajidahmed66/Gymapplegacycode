import React from 'react';
import { View, Text, StyleSheet, Button, ImageBackground, TouchableOpacity, Dimensions } from 'react-native';
import Card from '../components/Card'
import Colors from '../constants/Colors'
import DocPicker from '../components/DocPicker';
import { AntDesign } from '@expo/vector-icons';


import ImageBackGround1 from '../../assets/image/ImageHome1.jpg'
import ImageBackGround2 from '../../assets/image/ImageHome2.jpg'
import ImageBackGround3 from '../../assets/image/ImageHome3.jpg'
import ImageBackGround4 from '../../assets/image/ImageHome4.jpg'


const { width, height } = Dimensions.get('window')

const HomeScreen = props => {
    return (
        <View style={styles.screen}>
            <View style={styles.mainContainer}>

                <View style={styles.cardContainer}>

                    {/* See Excerxise Request card*/}

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
                                    Exercises Requests
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
                                    onPress={() => props.navigation.navigate("Exercise Requests")}
                                >
                                    <Text style={{ color: 'white' }}>View Details</Text>
                                    <AntDesign name="arrowright" size={24} color="white" />
                                </TouchableOpacity>
                            </View>
                        </ImageBackground>
                    </Card>

                    {/* See Diet Request card*/}

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
                                    Diets Requests
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
                                    onPress={() => props.navigation.navigate('Diet Requests')}
                                >
                                    <Text style={{ color: 'white' }}>View Details</Text>
                                    <AntDesign name="arrowright" size={24} color="#e0cf00" />
                                </TouchableOpacity>
                            </View>
                        </ImageBackground>
                    </Card>

                    {/* Add Excerxise card*/}

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
                                    onPress={() => { props.navigation.navigate('Payments') }}
                                >
                                    <Text>View Details</Text>
                                    <AntDesign name="arrowright" size={24} color="black" />
                                </TouchableOpacity>
                            </View>
                        </ImageBackground>
                    </Card>

                    {/* Add Diet  card*/}

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
                                    paddingLeft: 5
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
                                    Attending Statement
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
                                // onPress={() => { props.navigation.navigate('PaymentScreen') }}
                                >
                                    <Text style={{ color: 'white' }} >View Details</Text>
                                    <AntDesign name="arrowright" size={24} color="white" />
                                </TouchableOpacity>
                            </View>
                        </ImageBackground>
                    </Card>
                    {/* <Card style={styles.card}>
                    <Button
                        title="See Exerxise Requests"
                        color={Colors.primary}
                        style={styles.btn_style}
                        onPress={() => props.navigation.navigate("Exercise Requests")}
                    />
                </Card> */}
                    {/* <Card style={styles.card}>
                    <Button
                        color={Colors.primary}
                        title="See Diet Requests"
                        style={styles.btn_style}
                        onPress={() => props.navigation.navigate('Diet Requests')}
                    />
                </Card> */}

                    {/* <DocPicker /> */}

                </View>
            </View>

        </View>
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
        // backgroundColor: "#009387"
    },
    // btn_style: {

    //     alignItems: 'center',
    // }
})

export default HomeScreen;