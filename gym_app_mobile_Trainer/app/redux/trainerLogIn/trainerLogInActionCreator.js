import * as actionTypes from './trainerLogInActionTypes';
import trainerAuthApi from '../../api/trainerAuthApi';
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
    return {
        type: actionTypes.LOGOUT
    }
}
export const loggingIn = () => {
    return {
        type: actionTypes.TRY_LOGIN
    }
}

export const tryLogIn = data => dispatch => {
    dispatch(loggingIn())
    trainerAuthApi.trainerLogin(data)
        .then(res => {
            console.log(res.data)
            const token = JSON.stringify(res.data.token);
            SecureStore.setItemAsync('secure_token', token);
            SecureStore.getItemAsync('secure_token')
                .then(token => {
                    dispatch(logInSuccess(JSON.parse(token)));
                });
        })
        .catch(err => {
            dispatch(logInFailure(err))
        });
};

export const tryLogOut = () => dispatch => {
    SecureStore.deleteItemAsync('secure_token')
    dispatch(logOut())
}