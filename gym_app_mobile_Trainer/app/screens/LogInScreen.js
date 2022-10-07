import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    StyleSheet,
    Keyboard,
    TouchableWithoutFeedback,
    ActivityIndicator
} from 'react-native';
import GymLogo from '../../assets/image/logo.png';
import { connect } from 'react-redux';
import { tryLogIn } from '../redux/trainerLogIn/trainerLogInActionCreator';

const mapStateToProps = state => {
    return {
        isLoggedIn: state.trainerLoginReducer.isLoggedIn,
        error: state.trainerLoginReducer.error,
        isLoggingIn: state.trainerLoginReducer.isLoggingIn,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        tryLogIn: data => dispatch(tryLogIn(data))
    }
}

const LogIn = props => {
    const [authSate, setAuthState] = useState({
        isAuth: false,
        inputs: {
            phone: "",
            password: "",
        }
    });

    const updateInputs = (value, name) => {
        setAuthState({
            ...authSate,
            inputs: {
                ...authSate.inputs,
                [name]: value
            }
        })
    };

    const error = () => {
        if (props.error) {
            return (
                <View>
                    <Text style={styles.errorText}>
                        {props.error}
                    </Text>
                </View>
            )
        } else {
            return (
                <View>
                    <Text style={styles.text}>

                    </Text>
                </View>
            )
        }
    }

    //authentication 
    const handleAuth = () => {
        console.log('auth', authSate.inputs)
        const phone = authSate.inputs.phone;
        const password = authSate.inputs.password;
        if (phone !== "" && password !== "") {
            if (phone.length < 11) {
                alert("Phone number must be at least 11 number")
            } else if (password.length < 6) {
                alert('password must be at least 6 characters long')
            } else {
                props.tryLogIn(authSate.inputs)
            }
        } else {
            alert("Input all Fields")
        }
    };

    useEffect(() => {
        if (props.isLoggedIn) {
            props.changeAuth(props.isLoggedIn)
        } else {
            props.changeAuth(props.isLoggedIn)
        }
    }, [props.isLoggedIn])

    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
            <View style={styles.screen}>
                <View style={styles.imageconatiner}>
                    <Image style={styles.image} source={GymLogo} />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.text}>Trainer Log In</Text>
                    <Text style={styles.text}>{error()}</Text>
                    <TextInput
                        style={styles.inputView}
                        placeholder={"Enter User Phone Number"}
                        value={authSate.inputs.phone}
                        onChangeText={value => updateInputs(value, "phone")}
                        keyboardType="numeric"
                        maxLength={11}
                    />
                    <TextInput
                        style={styles.inputView}
                        placeholder={"Enter User Password "}
                        secureTextEntry={true}
                        value={authSate.inputs.password}
                        onChangeText={value => updateInputs(value, "password")}
                    />
                    <ActivityIndicator animating={props.isLoggingIn} size="large" color="#00ff00" />
                    <TouchableOpacity onPress={() => { handleAuth() }}>
                        <View style={styles.logInBtnContainer} >
                            <Text style={styles.logInBtn}>Log In</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
};

const styles = StyleSheet.create({
    screen: {
        backgroundColor: 'black',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',

    },
    text: {
        color: 'white',
        fontSize: 26,

    },
    errorText: {
        color: 'red',
        fontSize: 16,

    },
    imageconatiner: {
        height: 250,
        width: 250,
        marginTop: 10
    },
    image: {
        height: "100%",
        width: "100%"
    },
    inputContainer: {
        width: 300,
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputView: {
        borderColor: "black",
        backgroundColor: "white",
        color: "black",
        borderWidth: 1,
        width: "85%",
        padding: 10,
        marginVertical: 5,
    },
    logInBtnContainer: {
        width: 150,
        backgroundColor: "red",
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 40,
        borderRadius: 20
    },
    logInBtn: {
        color: 'black',
        padding: 8,
        fontSize: 20,
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);