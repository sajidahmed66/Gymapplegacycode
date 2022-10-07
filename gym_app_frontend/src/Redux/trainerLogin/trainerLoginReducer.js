import jwtDecoder from "jwt-decode";

import {
    TRAINER_API_LOAD_INITIALIZE,
    TRAINER_INITIAL_API_LOAD_SUCCESS,
    TRAINER_LOGIN_FAILURE,
    TRAINER_LOGIN_REQUEST,
    TRAINER_LOGIN_SUCCESS,
    TRAINER_LOGOUT,
} from "./trainerLoginTypes";

let token = JSON.parse(localStorage.getItem("trainerToken"));
let validToken = false;

if (token) {
    let decodedToken = jwtDecoder(token);

    if (decodedToken.exp < Date.now() / 1000) {
        localStorage.removeItem("trainerToken");
    } else {
        validToken = true;
    }
}

const initialState = validToken ?
    {
        loggedIn: true,
        loggingIn: false,
        error: "",
        token: JSON.parse(localStorage.getItem("trainerToken")),
        apiLoaded: true,
    } :
    {};

const trainerLoginReducer = (state = initialState, action) => {
    switch (action.type) {
        case TRAINER_LOGIN_REQUEST:
            return {
                ...state,
                loggingIn: true,
                loggedIn: false,
                phone: action.phone,
                token: JSON.parse(localStorage.getItem("trainerToken")),
            };

        case TRAINER_LOGIN_SUCCESS:
            return {
                ...state,
                loggingIn: false,
                loggedIn: true,
                phone: action.phone,
                token: JSON.parse(localStorage.getItem("trainerToken")),
            };

        case TRAINER_API_LOAD_INITIALIZE:
            return {
                ...state,
                apiLoaded: false,
            };

        case TRAINER_INITIAL_API_LOAD_SUCCESS:
            return {
                ...state,
                apiLoaded: true,
            };

        case TRAINER_LOGIN_FAILURE:
            return {
                ...state,
                loggingIn: false,
                loggedIn: false,
                phone: "",
                error: action.error.response.status,
                token: JSON.parse(localStorage.getItem("trainerToken")),
            };

        case TRAINER_LOGOUT:
            return {};

        default:
            return state;
    }
};

export default trainerLoginReducer;