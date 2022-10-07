import React, { useState } from 'react'
import { View, Text, FlatList, Button, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors'
import PdfDownloadTest from '../components/PdfDownloadTest';
import * as FileSystem from 'expo-file-system';
import * as IntentLauncher from 'expo-intent-launcher';
import WorkOutListItem from '../components/WorkoutListItem';
import commonApi from '../api/commonApi'
import Card from '../components/Card';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');
const WorkOutScreen = props => {

    const [userNote, setUserNote] = useState("");
    let data = { issue: userNote }
    let fileUri = null;

    const userData = props.route.params.data;
    console.log("fromWorkOut screen", userData)
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


    //console.log(height / 4)
    return (
        <View style={styles.viewContainer}>

            <View >
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
            <View>
                {userData.flag === 1 ? <FlatList
                    data={userData.exercise}
                    renderItem={({ item }) => {
                        return (
                            <WorkOutListItem
                                item={item}
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
    viewContainer: {
        alignItems: 'center',
        padding: 10,
        backgroundColor: Colors.screen,
        width: width,
        height: height * .9
    },
    cardView: {
        width: width - 30,
        height: height / 4,
        justifyContent: 'space-around',

    },
    textStyle: {
        fontSize: 15,
        fontWeight: 'bold'
    }
});

export default WorkOutScreen;
