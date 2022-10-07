import React, { useState } from 'react';
import { Button, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { trainerUploadFileApi } from '../api/traineerUploadFileApi';
import { useSelector } from 'react-redux';
import { getFormattedToken } from '../common/formattedToken';
import Colors from '../constants/Colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Entypo, AntDesign, FontAwesome } from '@expo/vector-icons';
import Card from '../components/Card';

// do a check in upload doc to throw err if no doc is selected.

const DocPicker = (props) => {
    const [doc, setDoc] = useState(null);

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


    const formattedToken = useSelector(state => getFormattedToken(state.trainerLoginReducer.token));

    const pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({ type: "*/*", copyToCacheDirectory: true })
            .then(response => {
                if (response.type == 'success') {
                    let { name, size, uri } = response;
                    let nameParts = name.split('.');
                    let fileType = nameParts[nameParts.length - 1];
                    var fileToUpload = {
                        name: name,
                        size: size,
                        uri: uri,
                        type: "application/" + fileType
                    };
                    console.log(fileToUpload, '...............file')
                    setDoc(fileToUpload);
                }
            });
        //console.log(result);
        // console.log("Doc: " + doc.uri);
    }

    const postDocument = () => {
        // const url = "http://192.168.10.107:8000/upload";// route
        const fileUri = doc.uri;
        const formData = new FormData();
        formData.append('file', doc);
        formData.append('fromDate', date.toDateString());
        formData.append('toDate', endDate.toDateString());
        formData.append('flag', 2);
        formData.append(props.name, props.dietId);


        console.log(formData)

        props.uploadFileHandle(formData, formattedToken)
    }

    return (
        <View style={styles.view}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                width: "100%",
                height: 50
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
                    height: 50
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

            <View
                style={{
                    padding: 10,

                }}
            >
                {/* <Button title="Select Document" onPress={pickDocument} style={{ borderRadius: 3 }} /> */}
                <TouchableOpacity
                    onPress={pickDocument}
                >
                    <Card style={styles.cardview} >
                        <AntDesign name="select1" size={24} color="black" />
                        <Text>Select Document to Upload</Text>
                    </Card>
                </TouchableOpacity>
            </View>
            <View
                style={{
                    padding: 10
                }}
            >
                {/* <Button title="Upload" onPress={postDocument} /> */}
                <TouchableOpacity
                    onPress={postDocument}
                >
                    <Card style={styles.cardview} >
                        <FontAwesome name="upload" size={24} color="black" />
                        <Text> Upload Document</Text>
                    </Card>
                </TouchableOpacity>

            </View>

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
};

const styles = StyleSheet.create({
    view: {
        marginVertical: 10,
        flexDirection: 'column',
        alignSelf: 'center',
        alignContent: 'center',
        justifyContent: 'space-around',
        marginHorizontal: 10,
        margin: 5,
        padding: 10,
        width: '90%'
    },
    cardview: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-around',
        padding: 15
    }
})



export default DocPicker;