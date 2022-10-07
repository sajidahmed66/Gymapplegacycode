import {
    TRAINER_GET_PROFILE_NULL,
    TRAINER_GET_PROFILE_REQUEST,
    TRAINER_GET_PROFILE_SUCCESS,
    TRAINER_GET_PROFILE_FAILURE,
    TRAINER_UPDATE_PROFILE_REQUEST,
    TRAINER_UPDATE_PROFILE_SUCCESS,
    TRAINER_UPDATE_PROFILE_FAILURE,
} from "./trainerProfileTypes";

import { trainerProfileApi } from "../../Api/trainerProfileApi";

export const trainerGetProfileRequest = () => {
    return {
        type: TRAINER_GET_PROFILE_REQUEST,
    };
};

export const trainerGetProfileSuccess = (profileData) => {
    return {
        type: TRAINER_GET_PROFILE_SUCCESS,
        payload: { profileData },
    };
};

export const trainerGetProfileFailure = (error) => {
    return {
        type: TRAINER_GET_PROFILE_FAILURE,
        payload: { error },
    };
};

export const trainerGetProfileNull = () => {
    return {
        type: TRAINER_GET_PROFILE_NULL,
    };
};

export const trainerUpdateProfileRequest = () => {
    return {
        type: TRAINER_UPDATE_PROFILE_REQUEST,
    };
};

export const trainerUpdateProfileSuccess = (updatedData) => {
    return {
        type: TRAINER_UPDATE_PROFILE_SUCCESS,
        payload: { updatedData },
    };
};

export const trainerUpdateProfileFailure = (error) => {
    return {
        type: TRAINER_UPDATE_PROFILE_FAILURE,
        payload: { error },
    };
};

export const trainerGetProfile = (token) => {
    return function(dispatch) {
        //can return a pure or impure function, no restrictions and it receieves dispatch as an argument
        dispatch(trainerGetProfileRequest()); //dispatching an action creator function
        trainerProfileApi
            .trainerGetProfile(token)
            .then((response) => {
                const profileData = response.data;
                dispatch(trainerGetProfileSuccess(profileData)); //dispatching an action creator function
            })
            .catch((error) => {
                dispatch(trainerGetProfileFailure(error.message)); //dispatching an action creator function
            });
    };
};

export const trainerUpdateProfile = (updatedData, token) => {
    return function(dispatch) {
        dispatch(trainerUpdateProfileRequest());
        trainerProfileApi
            .trainerUpdateProfile(updatedData, token)
            .then((response) => {
                dispatch(trainerUpdateProfileSuccess(response.data));
            })
            .catch((error) => {
                dispatch(trainerUpdateProfileFailure(error.message));
            });
    };
};