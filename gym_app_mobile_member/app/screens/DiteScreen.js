import React, { useState } from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import DitelistItem from '../components/DiteListItem';
import Colors from '../constants/Colors'
import PdfDownloadTest from '../components/PdfDownloadTest';
import * as FileSystem from 'expo-file-system';
import * as IntentLauncher from 'expo-intent-launcher';
import WorkOutListItem from '../components/WorkoutListItem';
import commonApi from '../api/commonApi'
import Card from '../components/Card';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

const DiteScreen = props => {
    const userData = props.route.params.data;
    // scrollView will be added later. after Complete idea of api is given. 
    // warning will show To  assign unique key to each item , that will be the default id value.
    console.log('from diet Screen', userData)


    // port it to a diffrent component. 
    const makeDownload = () => {
        let downloadUri = userData.file;
        console.log(downloadUri)
        FileSystem.downloadAsync(
            commonApi.api + downloadUri,
            FileSystem.documentDirectory + 'new.pdf')
            .then(({ uri }) => {
                console.log("Finish downloading to ", uri);
                fileUri = uri
                FileSystem.getContentUriAsync(uri).then(cUri => {
                    // not possiable  for ios.
                    IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
                        data: cUri,
                        flags: 1,
                    });
                });
            })
            .catch(error => {
                console.log("2nd err" + error);
            })
    }

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



    return (
        <View style={styles.screen}>
            <Text style={styles.headerText}>
                Your Dite Chart
            </Text>

            <View style={{ height: '35%', width: '90%' }} >
                <Card
                    style={styles.cardView}
                >
                    <View style={{
                        padding: 5
                    }}>
                        <Text style={styles.textStyle}>
                            Name: {userData.trainee.firstname}
                        </Text>
                        <Text style={styles.textStyle}>
                            Assigned By: {userData.trainer.firstname} {userData.trainer.lastname}
                        </Text >
                        <Text style={styles.textStyle}>
                            Start Date: {getFormattedDate(userData.fromDate)}
                        </Text>
                        <Text style={styles.textStyle}>
                            End Date: {getFormattedDate(userData.toDate)}
                        </Text>
                    </View>
                    {/* <Button
                        title="View Exercise"
                        
                    /> */}
                    {userData.flag === 2 ? <TouchableOpacity
                        style={{
                            backgroundColor: Colors.accent,
                            width: "50%",
                            height: '20%',

                            alignSelf: 'center',
                            justifyContent: 'center',
                            borderRadius: 20
                        }}
                        onPress={() => makeDownload()}
                    >
                        <View
                            style={{
                                alignSelf: 'center'
                            }}
                        >
                            <Text style={{ color: 'white' }}>
                                View Exercise
                            </Text>
                        </View>
                    </TouchableOpacity> : <View></View>}
                </Card>
            </View>

            <View style={styles.listView}>
                {userData.flag === 1 ? <FlatList
                    data={userData.diet}
                    renderItem={({ item }) => {
                        return (
                            <DitelistItem
                                data={item}
                            />
                        )
                    }}
                    keyExtractor={item => item._id}
                /> : <View></View>}
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flexDirection: 'column',
        alignItems: 'center',
        width: width,
        height: height * .80,
    },
    headerText: {
        fontSize: 24,
        flexDirection: 'column',
        alignItems: 'center',
        paddingVertical: 5
    },
    dateText: {
        marginVertical: 5
    },
    flatlist: {

    },
    listView: {
        height: '55%',
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    cardView: {
        width: width - 30,
        height: height / 4,
        justifyContent: 'space-around',

    },
});

export default DiteScreen;
