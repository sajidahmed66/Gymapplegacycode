import jwtDecoder from "jwt-decode";

import {
    TRAINEE_API_LOAD_INITIALIZE,
    TRAINEE_INITIAL_API_LOAD_SUCCESS,
    TRAINEE_LOGIN_FAILURE,
    TRAINEE_LOGIN_REQUEST,
    TRAINEE_LOGIN_SUCCESS,
    TRAINEE_LOGOUT,
} from "./traineeLoginTypes";

let token = JSON.parse(localStorage.getItem("traineeToken"));
let validToken = false;

if (token) {
    let decodedToken = jwtDecoder(token);

    if (decodedToken.exp < Date.now() / 1000) {
        localStorage.removeItem("traineeToken");
    } else {
        validToken = true;
    }
}

const initialState = validToken ?
    {
        loggedIn: true,
        loggingIn: false,
        error: "",
        token: JSON.parse(localStorage.getItem("traineeToken")),
        apiLoaded: true,
    } :
    {};

const traineeLoginReducer = (state = initialState, action) => {
    switch (action.type) {
        case TRAINEE_LOGIN_REQUEST:
            return {
                ...state,
                loggingIn: true,
                loggedIn: false,
                phone: action.phone,
                token: JSON.parse(localStorage.getItem("traineeToken")),
            };

        case TRAINEE_LOGIN_SUCCESS:
            return {
                ...state,
                loggingIn: false,
                loggedIn: true,
                phone: action.phone,
                token: JSON.parse(localStorage.getItem("traineeToken")),
            };

        case TRAINEE_API_LOAD_INITIALIZE:
            return {
                ...state,
                apiLoaded: false,
            };

        case TRAINEE_INITIAL_API_LOAD_SUCCESS:
            return {
                ...state,
                apiLoaded: true,
            };

        case TRAINEE_LOGIN_FAILURE:
            return {
                ...state,
                loggingIn: false,
                loggedIn: false,
                phone: "",
                error: action.error.response.status,
                token: JSON.parse(localStorage.getItem("traineeToken")),
            };

        case TRAINEE_LOGOUT:
            return {};

        default:
            return state;
    }
};

export default traineeLoginReducer;