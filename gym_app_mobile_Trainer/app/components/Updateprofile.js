import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Modal, Button, Dimensions, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import { Entypo } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Colors from '../constants/Colors';
import * as yup from 'yup';

const { width, height } = Dimensions.get('window');

const UpdateProfile = props => {
    console.log("from Update profile", props)
    const [date, setDate] = useState(new Date(props.profileData.dateOfBirth));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const closeModal = () => {
        props.setModalVisible(false)
    }

    const ProfileSchema = yup.object({
        email: yup.string().email('imvalid Email').required('Email Required'),
        address: yup.string().required(),
        dateOfBirth: yup.date().required('Required'),
        gender: yup.string().required('Required'),
        nid: yup.string().required().min(10)
    })

    return (
        <Modal
            visible={props.modalVisible}
        >
            <Formik
                initialValues={{
                    email: props.profileData.email,
                    address: props.profileData.address,
                    dateOfBirth: '',
                    gender: props.profileData.gender,
                    nid: `${props.profileData.nid}`,
                }}
                onSubmit={(values) => {
                    console.log(values);
                    props.setModalVisible(false)
                    props.updateProfile(values)
                }
                }
                validationSchema={ProfileSchema}

            >
                {props => {
                    const [dateField, setdatefield] = useState('');

                    const getFormatedDate = (curDate) => {
                        let day = curDate.getDate()
                        let month = curDate.getMonth() + 1
                        let year = curDate.getFullYear()
                        let new_value = day + "/" + month + "/" + year;
                        setdatefield(new_value);
                    };

                    const onChange = (event, selectedDate) => {
                        const currentDate = selectedDate || date;
                        setShow(Platform.OS === 'ios');
                        setDate(currentDate)
                        getFormatedDate(currentDate)
                        props.setFieldValue('dateOfBirth', currentDate)
                    };

                    const showMode = (currentMode) => {
                        setShow(true);
                        setMode(currentMode);
                    };

                    const showDatepicker = () => {
                        showMode('date');
                    };

                    return (
                        <View style={styles.modalView}>
                            <Text style={styles.headerText}>Update Profile </Text>
                            <View style={{ flexDirection: 'row', width: '100%', height: 50, alignItems: 'center', justifyContent: 'space-around' }} >
                                <View style={{ width: "20%" }}
                                ><Text>Email</Text></View>
                                <View style={{ width: "80%" }}>
                                    <TextInput
                                        multiline
                                        style={styles.emailInputField}
                                        placeholder="Enter Email"
                                        onChangeText={props.handleChange('email')}
                                        onBlur={props.handleBlur('email')}
                                        value={props.values.email}
                                    />
                                </View>
                            </View>
                            <Text style={styles.errorText} >{props.touched.email && props.errors.email}</Text>
                            <View
                                style={{ flexDirection: 'row', width: '100%', height: 50, alignItems: 'center', justifyContent: 'space-around' }}>
                                <View style={{ width: "20%" }} >
                                    <Text>Address</Text>
                                </View>
                                <View style={{ width: "80%" }} >
                                    <TextInput
                                        style={styles.emailInputField}
                                        placeholder="Enter Address"
                                        onChangeText={props.handleChange('address')}
                                        onBlur={props.handleBlur('address')}
                                        value={props.values.address}
                                    />
                                </View>
                            </View>
                            <Text style={styles.errorText} >{props.touched.address && props.errors.address}</Text>
                            <View style={{ flexDirection: 'row', width: '100%', height: 50, alignItems: 'center', justifyContent: 'space-around' }}>
                                <View style={{ width: "20%" }} >
                                    <Text>BirthDate</Text>
                                </View>
                                <View style={{ width: "60%" }} >
                                    {/* Implement datePicker here! */}
                                    <Text
                                        style={styles.datePickContainer}
                                    >
                                        {props.values.dateOfBirth === '' ? `choose a date` : dateField}
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    style={{
                                        width: "20%",
                                        padding: 10,
                                        alignItems: 'center'
                                    }}
                                    onPress={() => { showDatepicker() }}
                                >
                                    <Entypo name="calendar" size={24} color={Colors.primary} />
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.errorText} >{props.touched.dateOfBirth && props.errors.dateOfBirth}</Text>
                            <View style={{ flexDirection: 'row', width: '100%', height: 50, alignItems: 'center', justifyContent: 'space-around' }}>
                                <View style={{ width: "20%" }} >
                                    <Text>Gender</Text>
                                </View>
                                <View style={{ width: "80%" }} >
                                    <DropDownPicker
                                        items={[
                                            { label: 'Male', value: 'Male' },
                                            { label: 'Female', value: 'Female' }
                                        ]}
                                        defaultValue={props.values.gender}
                                        containerStyle={{ height: '100%' }}
                                        itemStyle={{ justifyContent: 'flex-start' }}
                                        dropDownStyle={{ backgroundColor: '#fafafa' }}

                                        onChangeItem={item => {
                                            console.log(item.value)
                                            props.setFieldValue('gender', item.value)
                                        }}
                                    />
                                </View>
                            </View>
                            <Text style={styles.errorText} >{props.touched.gender && props.errors.gender}</Text>

                            <View
                                style={{ flexDirection: 'row', width: '100%', height: 50, alignItems: 'center', justifyContent: 'space-around', }}>
                                <View style={{ width: "20%" }} >
                                    <Text>NID</Text>
                                </View>
                                <View style={{ width: "80%" }} >
                                    <TextInput
                                        style={styles.emailInputField}
                                        placeholder="Enter Your NID"
                                        onChangeText={props.handleChange('nid')}
                                        onBlur={props.handleBlur('nid')}
                                        value={props.values.nid}
                                        keyboardType="numeric"
                                    />
                                </View>
                            </View>
                            <Text style={styles.errorText} >{props.touched.nid && props.errors.nid}</Text>

                            {
                                show ? <DateTimePicker
                                    value={date}
                                    mode={mode}
                                    display='spinner'
                                    onChange={onChange}

                                /> : <></>
                            }
                            {/* <Text>  {date.toString()}</Text> */}
                            <View style={{
                                width: width - 30,
                                height: 60,
                                padding: 10,
                                alignContent: 'flex-start',
                                justifyContent: 'center',
                                flexDirection: 'row',
                                marginTop: 50
                            }}>
                                <TouchableOpacity
                                    style={{
                                        width: "40%",
                                        height: 40,
                                        backgroundColor: Colors.primary,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: 20,
                                        marginHorizontal: 5,
                                    }}
                                    onPress={() => {
                                        props.handleSubmit()
                                    }}
                                >
                                    <View >
                                        <Text style={{
                                            color: 'white'
                                        }}>
                                            Update
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{
                                        //flex: 1 
                                        marginHorizontal: 5,
                                        width: "40%",
                                        height: 40,
                                        backgroundColor: Colors.complementary,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: 20,
                                    }}
                                    onPress={closeModal}
                                >
                                    <View>
                                        <Text style={{
                                            color: 'white'
                                        }}>
                                            Cancle
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                }}
            </Formik>

        </Modal>
    )
}

const styles = StyleSheet.create({
    modalView: {
        padding: 20,
        height: height - 100,
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        padding: 20,
        alignSelf: 'center'
    },
    emailInputField: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: '#fff',
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
        borderWidth: 1,
        borderColor: '#dfdfdf',
        alignItems: 'center'
    },
    datePickContainer: {
        paddingHorizontal: 10,
        paddingVertical: 8,
        backgroundColor: '#fff',
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
        borderWidth: 1,
        borderColor: '#dfdfdf',
        alignItems: 'center',
    },
    errorText: {
        color: 'crimson',
        fontWeight: 'bold',
        // marginBottom: 5,
        // marginTop: 3,
        textAlign: 'center',
        fontSize: 12
    }
});

export default UpdateProfile;