import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import { getFormattedToken } from '../../common/formetedToken';
import { useDispatch, useSelector } from "react-redux";
import Card from '../../components/Card';
import traineePaymentApi from '../../api/traineePaymentApi'
import Colors from '../../constants/Colors';
import { AntDesign } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window')

const PaymentHistory = props => {

    const [paymentList, setPaymentList] = useState([])

    const formattedToken = useSelector((state) =>
        getFormattedToken(state.loginReducer.token)
    );

    const getFormattedDate = (curDate) => {
        let date = new Date(curDate)
        let day = date.getDate();
        let month = date.getMonth();
        let year = date.getFullYear();
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        let new_value = day + "-" + monthNames[month] + "-" + year;
        return new_value
    }

    const RenderList = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => { props.navigation.navigate('PaymentDetails', { data: item }) }}
            >
                <Card style={styles.cardView} >
                    <View style={{
                        width: '100%',
                        height: '70%'
                    }} >
                        <Text style={styles.headerTitle} >{`date: ${getFormattedDate(item.paymentDate)}`}</Text>
                        <Text>{`Amount: ${item.paidAmount}`}</Text>
                    </View>
                    <View style={styles.arrowView}>
                        <Text>Tap to see details </Text>
                        <AntDesign name="arrowright" size={24} color="black" />
                    </View>
                </Card>
            </TouchableOpacity>
        )
    }
    const getPaymentList = () => {
        traineePaymentApi.traineeGetPaymentList(
            formattedToken
        ).then(res => {
            console.log(res.data)
            setPaymentList(res.data)
        })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getPaymentList()
    }, [])

    return (
        <View style={styles.screen}>
            {paymentList.length!==0?<FlatList
                style={styles.flatlistContainer}
                data={paymentList}
                keyExtractor={item => item._id}
                renderItem={({ item }) => <RenderList item={item} />}
            />:<Text style={{ fontWeight: 'bold', fontSize: 24 }}> No Payment History!</Text>}
            
        </View>
    )
};



const styles = StyleSheet.create({
    screen: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.screen
    },
    cardView: {
        height: height / 8,
        width: width - 100,
        marginVertical: 5,
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingLeft: 20,
        padding: 5,
        borderColor: 'black',
        borderWidth: 1
    },
    flatlistContainer: {
        marginVertical: 5,
        padding: 5,
        flex: 1
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    arrowView: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: '25%',
        justifyContent: 'space-between'
    }
});

export default PaymentHistory;
