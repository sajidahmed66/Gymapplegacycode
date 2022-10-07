import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { getFormattedToken } from '../../common/formattedToken';
import { useDispatch, useSelector } from "react-redux";
import { trainerPaymentsApi } from '../../api/trainerPaymentsApi'
import Card from '../../components/Card';
import Colors from '../../constants/Colors';
import { AntDesign } from '@expo/vector-icons';




const { width, height } = Dimensions.get('window')

const PaymentHistory = props => {
    const [paymentList, setPaymentList] = useState([])
    const formattedToken = useSelector(state => getFormattedToken(state.trainerLoginReducer.token));

    const getPayments = () => {
        trainerPaymentsApi.trainerGetPaymentList(formattedToken)
            .then(res => {
                setPaymentList(res.data)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getPayments()
    }, [])

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
                        <Text style={styles.headerTitle} >{`date: ${getFormattedDate(item.date)}`}</Text>
                        <Text>{`Amount: ${item.amount}`}</Text>
                    </View>
                    <View style={styles.arrowView}>
                        <Text>Tap to see details </Text>
                        <AntDesign name="arrowright" size={24} color="black" />
                    </View>
                </Card>
            </TouchableOpacity>
        )
    }


    return (
        <View style={styles.screen}>
            {paymentList.length !== 0
                ?
                <FlatList
                    contentContainerStyle={styles.flatlistContainer}
                    data={paymentList}
                    keyExtractor={item => item._id}
                    renderItem={({ item }) => <RenderList item={item} />}
                />
                :
                <Text style={{ fontWeight: 'bold', fontSize: 24 }}> No Payment History!</Text>
            }

        </View>
    )
};



const styles = StyleSheet.create({
    screen: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',

    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    cardView: {
        height: height / 8,
        width: width - 100,
        marginVertical: 5,
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingLeft: 20,
        padding: 5,
    },
    arrowView: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: '25%',
        justifyContent: 'space-between'
    },
    flatlistContainer: {
        marginVertical: 5,
        padding: 5,
        flex: 1,
        width: width - 50,
        alignItems: 'center'
    },
});

export default PaymentHistory;
