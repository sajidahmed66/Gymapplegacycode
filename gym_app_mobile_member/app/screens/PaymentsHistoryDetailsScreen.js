import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Card from '../components/Card'

const { width, height } = Dimensions.get('window');

const PaymentsHistoryDetailsScreen = (props) => {

    const paymentData = props.route.params.data;
    console.log("from Payment Data", paymentData)

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

    const getMonthFromDate = (curDate) => {
        const date = new Date(curDate)
        let month = date.getMonth();
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        let new_month = monthNames[month]
        return new_month
    }

    return (
        <View style={styles.screen}>
            <View style={styles.headerView}>
                <Text style={styles.headerText}>Payment Details of Month {getMonthFromDate(paymentData.paymentDate)} </Text>
            </View>

            {/* name */}

            <Card style={styles.cardView}>
                <View style={styles.detailsView}>
                    <View style={styles.subtitleView}>
                        <Text>Trainee Name</Text>
                    </View>
                    <View style={styles.subdetailsView}>
                        <Text>{paymentData.trainee.firstname + paymentData.trainee.lastname}</Text>
                    </View>
                </View>
            </Card>


            {/* Payment Date */}
            <Card style={styles.cardView}>
                <View style={styles.detailsView}>
                    <View style={styles.subtitleView}>
                        <Text>Payment Date</Text>
                    </View>
                    <View style={styles.subdetailsView}>
                        <Text>{getFormattedDate(paymentData.paymentDate)}</Text>
                    </View>
                </View>
            </Card>
            {/* paid amount */}
            <Card style={styles.cardView}>
                <View style={styles.detailsView}>
                    <View style={styles.subtitleView}>
                        <Text>Amount Paid</Text>
                    </View>
                    <View style={styles.subdetailsView}>
                        <Text>{paymentData.paidAmount}</Text>
                    </View>
                </View>
            </Card>
            {/* due amount */}
            <Card style={styles.cardView}>
                <View style={styles.detailsView}>
                    <View style={styles.subtitleView}>
                        <Text>Amount Due</Text>
                    </View>
                    <View style={styles.subdetailsView}>
                        <Text>{paymentData.dueAmount}</Text>
                    </View>
                </View>
            </Card>
            {/* siubscription type*/}
            <Card style={styles.cardView}>
                <View style={styles.detailsView}>
                    <View style={styles.subtitleView}>
                        <Text>Subscription </Text>
                    </View>
                    <View style={styles.subdetailsView}>
                        <Text>{paymentData.subscription.type === 1 ? "Monthly" : "Coustome Package"}</Text>
                    </View>
                </View>
            </Card>
        </View>
    )
}

export default PaymentsHistoryDetailsScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        width: width,
        height: height,
        alignItems: 'center',
        paddingTop: 10
    },
    headerView: {
        width: width - 20,
        height: height / 12,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#009389'
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white'
    },
    cardView: {
        marginVertical: 5,
        width: width - 20,
        height: height / 12,
        alignItems: 'center',
        justifyContent: 'center'
    },
    detailsView: {
        flexDirection: 'row',
        width: "100%",
        height: height / 12,
        alignItems: 'center',
        justifyContent: 'center'
    },
    subtitleView: {
        width: "30%",
        height: "100%",
        alignItems: 'center',
        justifyContent: 'center',
        // borderColor: 'black',
        // borderWidth: 1
    },
    subdetailsView: {
        width: "70%",
        height: "100%",
        alignItems: 'center',
        justifyContent: 'center',
        // borderColor: 'black',
        // borderWidth: 1,
        // borderLeftWidth: 0
    }
})
