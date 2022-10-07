import * as actionTypes from './trainerLogInActionTypes';


const initState = {
    isLoggedIn: false,
    isLoggingIn: false,
    token: null,
    error: ''
}

const trainerLoginReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                isLoggingIn: false,
                isLoggedIn: true,
                token: action.payload,
                error: ''
            }
        case actionTypes.LOGIN_FAILURE:
            return {
                ...state,
                isLoggingIn: false,
                isLoggedIn: false,
                error: action.error.response.data,
                token: action.payload
            }
        case actionTypes.LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                isLoggingIn: false,
                error: ''
            }
        case actionTypes.TRY_LOGIN:
            return {
                ...state,
                isLoggingIn: true
            }
        default:
            return state
    }
};


export default trainerLoginReducer;