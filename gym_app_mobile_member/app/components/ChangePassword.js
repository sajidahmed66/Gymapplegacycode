import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Modal, Button, Dimensions, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import { Entypo } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { color } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const ChangePassword = props => {

    const closeModal = () => {
        props.setModalVisible(false)
    }

    const errorMessage = () => {
        if (props.errorMessage !== undefined) {
            return (
                <View>
                    <Text style={styles.errorText}>{props.errorMessage}</Text>
                </View>
            )
        } else {
            return (
                <View></View>
            )
        }
    }

    const validationErrorMessage = () => {
        if (props.errorMessage !== undefined) {
            return (
                <View>
                    <Text style={styles.errorText}>{props.errorMessage}</Text>
                </View>
            )
        } else {
            return (
                <View></View>
            )
        }
    }

    return (
        <Modal
            transparent={true}
            animationType='fade'
            visible={props.modalVisible}
        >
            <Formik
                initialValues={{
                    oldPassword: '',
                    newPassword: '',
                    confirmPassword: '',
                }}
                onSubmit={(values) => {
                  
                        console.log('values ', values);
                        props.setModalVisible(false)
                        props.changePassword(values)
                    
                }}
            >
                {props => {
                    return (
                        <View style={styles.modalView}>
                            <View style={styles.componentView}>
                                <Text style={styles.headerText}>Change Password </Text>
                                <Text>{errorMessage()} </Text>
                                <View style={{ flexDirection: 'row', width: '100%', height: 50, alignItems: 'center', justifyContent: 'space-around' }} >
                                    <View style={{ width: "40%" }}>
                                        <Text>Old Password</Text>
                                    </View>
                                    <View style={{ width: "60%" }}>
                                        <TextInput
                                            style={styles.emailInputField}
                                            placeholder="Enter Your Old Password"
                                            onChangeText={props.handleChange('oldPassword')}
                                            onBlur={props.handleBlur('oldPassword')}
                                            value={props.values.oldPassword}
                                        />
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', width: '100%', height: 50, alignItems: 'center', justifyContent: 'space-around' }} >
                                    <View style={{ width: "40%" }}>
                                        <Text>New Password</Text>
                                    </View>
                                    <View style={{ width: "60%" }}>
                                        <TextInput
                                            style={styles.emailInputField}
                                            placeholder="Enter Your New Password"
                                            onChangeText={props.handleChange('newPassword')}
                                            onBlur={props.handleBlur('newPassword')}
                                            value={props.values.newPassword}
                                        />
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', width: '100%', height: 50, alignItems: 'center', justifyContent: 'space-around' }} >
                                    <View style={{ width: "40%" }}>
                                        <Text>Confirm Password</Text>
                                    </View>
                                    <View style={{ width: "60%" }}>
                                        <TextInput
                                            style={styles.emailInputField}
                                            placeholder="Confirm Your Password"
                                            onChangeText={props.handleChange('confirmPassword')}
                                            onBlur={props.handleBlur('confirmPassword')}
                                            value={props.values.confirmPassword}
                                        />
                                    </View>
                                </View>

                                {/* <Text>  {date.toString()}</Text> */}
                                <View style={{
                                    width: width - 30,
                                    height: 60,
                                    paddingTop: 15,
                                    alignContent: 'flex-start',
                                    justifyContent: 'center',
                                    flexDirection: 'row'
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
                                            backgroundColor: Colors.complemantary,
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
                                                Cancel
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
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
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    componentView: {
        padding: 20,
        width: width,
        height: height / 2,
        backgroundColor: "white",
        alignItems: 'center'
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
        color: 'red',
        fontSize: 12,
        paddingTop: 5,
    }
});

export default ChangePassword;