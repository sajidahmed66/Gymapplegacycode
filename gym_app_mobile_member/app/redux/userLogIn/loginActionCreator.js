import * as actionTypes from './loginActionTypes';
import traineeAuthApi from '../../api/traineeAuthApi';
import * as SecureStore from 'expo-secure-store';

export const logInSuccess = (token) => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        payload: token
    }
}
export const logInFailure = (error) => {
    return {
        type: actionTypes.LOGIN_FAILURE,
        error
    }
}
export const logOut = () => {
    //console.log("logout function")
    return {
        type: actionTypes.LOG_OUT
    }
}

export const loggingIn = () => {
    return {
        type: actionTypes.TRY_LOGIN
    }
}

export const tryLogIn = (data) => dispatch => {
    dispatch(loggingIn())
    traineeAuthApi.traineeLogIN(data)
        .then(res => {
            const token = JSON.stringify(res.data.token);
            SecureStore.setItemAsync('secure_token', token);
            SecureStore.getItemAsync('secure_token')

                .then(token => {
                    // console.log(JSON.parse(token))
                    dispatch(logInSuccess(JSON.parse(token)))
                    // RootNavigation.navigate("home")
                });
        })
        .catch(err => dispatch(logInFailure(err)))
};

export const tryLogOut = () => dispatch => {
    SecureStore.deleteItemAsync('secure_token')
    // console.log("try_logout func")
    dispatch(logOut())
}

