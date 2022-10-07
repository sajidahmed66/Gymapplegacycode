import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

const PaymentsHistoyDetailsScreen = props => {
    let userData = props.route.params.data
    console.log(userData)

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
                <Text style={styles.headerText}>
                    Review Of Month
                </Text>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        width: width,
        height: height,
        alignItems: 'center',
        padding: 10, borderColor: 'black',
        borderWidth: 1
    },
    headerView: {
        width: width - 20,
        height: height / 12,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#009389',
        marginTop: 10
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white'
    },
})

export default PaymentsHistoyDetailsScreen;