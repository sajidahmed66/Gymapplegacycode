import * as actionTypes from './loginActionTypes';

const initState = {
    isLoggedIn: false,
    isLoggingIn: false,
    token: null,
    error: '',
}

const loginReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                isLoggingIn: false,
                isLoggedIn: true,
                error: '',
                token: action.payload
            }
        case actionTypes.LOGIN_FAILURE:
            return {
                ...state,
                isLoggingIn: false,
                isLoggedIn: false,
                error: action.error.response.data,
                token: action.payload
            }
        case actionTypes.LOG_OUT:
            //console.log("fromreducer", state.isLoggedIn)
            return {
                ...state,
                isLoggedIn: false,
                token: null,
                error: ''
            }
        case actionTypes.TRY_LOGIN:
            return {
                ...state,
                isLoggingIn: true,
                error: ''
            }
        default:
            return state
    }
};


export default loginReducer;