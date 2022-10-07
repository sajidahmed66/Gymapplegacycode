import {
    TRAINEE_GET_PROFILE_NULL,
    TRAINEE_GET_PROFILE_REQUEST,
    TRAINEE_GET_PROFILE_SUCCESS,
    TRAINEE_GET_PROFILE_FAILURE,
    TRAINEE_UPDATE_PROFILE_REQUEST,
    TRAINEE_UPDATE_PROFILE_SUCCESS,
    TRAINEE_UPDATE_PROFILE_FAILURE,
} from "./traineeProfileTypes";

import { traineeProfileApi } from "../../Api/traineeProfileApi";

export const traineeGetProfileRequest = () => {
    return {
        type: TRAINEE_GET_PROFILE_REQUEST,
    };
};

export const traineeGetProfileSuccess = (profileData) => {
    return {
        type: TRAINEE_GET_PROFILE_SUCCESS,
        payload: { profileData },
    };
};

export const traineeGetProfileFailure = (error) => {
    return {
        type: TRAINEE_GET_PROFILE_FAILURE,
        payload: { error },
    };
};

export const traineeGetProfileNull = () => {
    return {
        type: TRAINEE_GET_PROFILE_NULL,
    };
};

export const traineeUpdateProfileRequest = () => {
    return {
        type: TRAINEE_UPDATE_PROFILE_REQUEST,
    };
};

export const traineeUpdateProfileSuccess = (updatedData) => {
    return {
        type: TRAINEE_UPDATE_PROFILE_SUCCESS,
        payload: { updatedData },
    };
};

export const traineeUpdateProfileFailure = (error) => {
    return {
        type: TRAINEE_UPDATE_PROFILE_FAILURE,
        payload: { error },
    };
};

export const traineeGetProfile = (token) => {
    return function(dispatch) {
        //can return a pure or impure function, no restrictions and it receieves dispatch as an argument
        dispatch(traineeGetProfileRequest());
        traineeProfileApi
            .traineeGetProfile(token)
            .then((response) => {
                const profileData = response.data;
                dispatch(traineeGetProfileSuccess(profileData));
            })
            .catch((error) => {
                dispatch(traineeGetProfileFailure(error.message));
            });
    };
};

export const traineeUpdateProfile = (updatedData, token) => {
    // console.log(token)
    return function(dispatch) {
        dispatch(traineeUpdateProfileRequest());
        traineeProfileApi
            .traineeUpdateProfile(updatedData, token)
            .then((response) => {
                dispatch(traineeUpdateProfileSuccess(response.data));
            })
            .catch((error) => {
                dispatch(traineeUpdateProfileFailure(error.message));
            });
    };
};