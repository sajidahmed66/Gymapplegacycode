import React from 'react'
import { StyleSheet, Text, View, Button, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Logo from '../../components/Logo'
import { Formik } from 'formik';
import * as yup from 'yup';
import Colors from '../../constants/Colors';

const ReviewSchema = yup.object({
    title: yup.string()
        .required()
        .min(4),
    body: yup.string()
        .required()
        .min(6),
    rating: yup.string()
        .required()
        .test('is-num-1-5', 'Rating Must Be a Number 1 to 5', (val) => {
            return parseInt(val) < 6 && parseInt(val) > 0;
        })
})

const ReviewUs = () => {
    return (
        <View style={styles.screen}>
            <Formik
                validationSchema={ReviewSchema}
                initialValues={{ title: '', body: '', rating: '' }}
                onSubmit={(values, action) => {
                    action.resetForm()
                    console.log(values);
                }}
            >
                {(props) => (
                    <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}  >
                        <View >
                            <TextInput
                                style={styles.input}
                                placeholder="Review Title"
                                onChangeText={props.handleChange('title')}
                                value={props.values.title}
                                onBlur={props.handleBlur('title')}
                            />
                            <Text style={styles.errorText} >{props.touched.title && props.errors.title}</Text>
                            <TextInput
                                multiline
                                style={styles.input}
                                placeholder="Review Body"
                                onChangeText={props.handleChange('body')}
                                value={props.values.body}
                                onBlur={props.handleBlur('body')}
                            />
                            <Text style={styles.errorText} >{props.touched.body && props.errors.body}</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Review Rateing(1-5)"
                                onChangeText={props.handleChange('rating')}
                                value={props.values.rating}
                                onBlur={props.handleBlur('rating')}
                                keyboardType='numeric'
                            />
                            <Text style={styles.errorText} >{props.touched.rating && props.errors.rating}</Text>
                            <Button title='submit' color='maroon' onPress={props.handleSubmit} />
                        </View>
                    </TouchableWithoutFeedback>
                )}
            </Formik>
        </View>
    )
};


const ReviewUsStack = createStackNavigator();

const ReviewUsStackScreen = props => {
    return (
        <ReviewUsStack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: Colors.primary,
                height: 65
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
        }}
        >
            <ReviewUsStack.Screen
                name="Give Us Your Review"
                component={ReviewUs}
                options={{
                    headerLeft: () => <Logo
                        style={{ height: 60, width: 60 }}
                        openDrawer={() => props.navigation.openDrawer()}
                    />,
                    headerLeftContainerStyle: {
                        padding: 10
                    }
                }}
            />
        </ReviewUsStack.Navigator>
    )
}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        fontSize: 18,
        borderRadius: 6
    },
    errorText: {
        color: 'crimson',
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 6,
        textAlign: 'center'
    }
});

export default ReviewUsStackScreen;
