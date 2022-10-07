import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Modal, Button, Dimensions, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import Colors from '../constants/Colors';
import * as yup from 'yup';

const { width, height } = Dimensions.get('window');

const AddDiets = props => {

    console.log('profile data props',props)
    const closeModal = () => {
        console.log('asd')
        props.setModalVisible(false)
    }

    const ProfileSchema = yup.object({
        name: yup.string().required(),
        quantity: yup.string().required(),
        unit: yup.string().required(),
        calorie: yup.string().required(),
    })

    return (
        <Modal
            transparent={true}
            animationType='fade'
            visible={props.modalVisible}
        >
            <Formik
                initialValues={{
                    name: props.dietsData.name!==undefined ? props.dietsData.name : '',
                    quantity: props.dietsData.quantity!==undefined ? props.dietsData.quantity : '',
                    unit: props.dietsData.unit!==undefined ? props.dietsData.unit : '',
                    calorie: props.dietsData.calorie!==undefined ? props.dietsData.calorie : '',
                }}
                onSubmit={(values) => {
                    console.log(values);
                    props.setModalVisible(false)
                    props.updateDiets(values)
                }
                }
                validationSchema={ProfileSchema}
            >
                {props => {
                    return (

                        <View style={styles.modalView}>
                            <View style={styles.componentView}>
                                <Text style={styles.headerText}>Update Diets </Text>
                                <View style={{ flexDirection: 'row', width: '100%', height: 50, alignItems: 'center', justifyContent: 'space-around' }} >
                                    <View style={{ width: "30%" }}>
                                        <Text>Diet Name</Text>
                                    </View>
                                    <View style={{ width: "70%" }}>
                                        <TextInput
                                            style={styles.emailInputField}
                                            placeholder="Enter Exercise Name"
                                            onChangeText={props.handleChange('name')}
                                            onBlur={props.handleBlur('name')}
                                            value={props.values.name}
                                        />
                                    </View>
                                </View>
                                <Text style={styles.errorText} >{props.touched.name && props.errors.name}</Text>
                                <View
                                    style={{ flexDirection: 'row', width: '100%', height: 50, alignItems: 'center', justifyContent: 'space-around' }}>
                                    <View style={{ width: "30%" }} >
                                        <Text>Diet Quantity</Text>
                                    </View>
                                    <View style={{ width: "70%" }} >
                                        <TextInput
                                            style={styles.emailInputField}
                                            placeholder="Enter Diet Quantity"
                                            onChangeText={props.handleChange('quantity')}
                                            onBlur={props.handleBlur('quantity')}
                                            value={props.values.quantity}
                                        />
                                    </View>
                                </View>
                                <Text style={styles.errorText} >{props.touched.quantity && props.errors.quantity}</Text>
                                <View
                                    style={{ flexDirection: 'row', width: '100%', height: 50, alignItems: 'center', justifyContent: 'space-around' }}>
                                    <View style={{ width: "30%" }} >
                                        <Text>Diet Unit</Text>
                                    </View>
                                    <View style={{ width: "70%" }} >
                                        <TextInput
                                            style={styles.emailInputField}
                                            placeholder="Enter unit"
                                            onChangeText={props.handleChange('unit')}
                                            onBlur={props.handleBlur('unit')}
                                            value={props.values.unit}
                                        />
                                    </View>
                                </View>
                                <Text style={styles.errorText} >{props.touched.unit && props.errors.unit}</Text>
                                <View
                                    style={{ flexDirection: 'row', width: '100%', height: 50, alignItems: 'center', justifyContent: 'space-around' }}>
                                    <View style={{ width: "30%" }} >
                                        <Text>Calories per unit</Text>
                                    </View>
                                    <View style={{ width: "70%" }} >
                                        <TextInput
                                            style={styles.emailInputField}
                                            placeholder="Enter Address"
                                            onChangeText={props.handleChange('calorie')}
                                            onBlur={props.handleBlur('calorie')}
                                            value={props.values.calorie}
                                        />
                                    </View>
                                </View>
                                <Text style={styles.errorText} >{props.touched.calorie && props.errors.calorie}</Text>
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
        padding: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    componentView: {
        padding: 40,
        width: width,
        height: height ,
        backgroundColor: "#ccc",
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
        color: 'crimson',
        fontWeight: 'bold',
        // marginBottom: 5,
        // marginTop: 3,
        textAlign: 'center',
        fontSize: 12
    }
});

export default AddDiets;