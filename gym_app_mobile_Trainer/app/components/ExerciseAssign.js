import React, { useState } from 'react';
import { View, Text, Modal, Pressable, StyleSheet, TextInput, Button } from 'react-native';
import { Formik } from 'formik';

const ExerciseAssign = props => {
    return (
        <View style={styles.screen}>
            <Modal
                animationType="slide"
                // transparent={true}
                visible={props.modalVisible}
                onRequestClose={() => {
                }}
            >
                <View style={styles.modalView}>
                    <View>
                        <Text>Assign Exercise Here</Text>
                    </View>
                    <Formik
                        initialValues={{ name: "", description: "", sets: "", reps: "" }}
                        onSubmit={(values, action) => {
                            console.log(values);
                            props.setModalVisible(!props.modalVisible)
                            props.addReqToList(values)
                        }}
                    >
                        {(props) => (
                            <View>
                                <TextInput
                                    placeholder="name"
                                    style={styles.inputNameView}
                                    onChangeText={props.handleChange('name')}
                                    values={props.values.name}
                                />
                                <TextInput
                                    multiline
                                    placeholder="description"
                                    style={styles.inputNameView}
                                    onChangeText={props.handleChange('description')}
                                    values={props.values.description}
                                />
                                <View style={{ flexDirection: 'row' }}>
                                    <TextInput
                                        placeholder="sets"
                                        style={styles.inputNameView}
                                        onChangeText={props.handleChange('sets')}
                                        values={props.values.sets}
                                    />
                                    <TextInput
                                        placeholder="reps"
                                        style={styles.inputNameView}
                                        onChangeText={props.handleChange('reps')}
                                        values={props.values.reps}
                                    />
                                </View>
                                <Button
                                    title="Submit"
                                    onPress={props.handleSubmit}
                                />
                            </View>
                        )}
                    </Formik>
                    <View >
                        <Pressable
                            onPress={() => props.setModalVisible(!props.modalVisible)}
                            style={styles.closebtn}
                        >
                            <Text>Hide Modal</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    )
};
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    },
    modalView: {
        flex: 1,
        alignItems: 'center',

    },
    closebtn: {
        alignItems: 'center',
        backgroundColor: 'red',
        height: 30,
        width: '80%',
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    inputNameView: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        fontSize: 18,
        borderRadius: 6
    }
});

export default ExerciseAssign;

