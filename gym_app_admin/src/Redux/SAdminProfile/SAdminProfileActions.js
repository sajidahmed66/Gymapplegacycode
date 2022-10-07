import {
    S_ADMIN_GET_PROFILE_NULL,
    S_ADMIN_GET_PROFILE_REQUEST,
    S_ADMIN_GET_PROFILE_SUCCESS,
    S_ADMIN_GET_PROFILE_FAILURE,
    S_ADMIN_UPDATE_PROFILE_REQUEST,
    S_ADMIN_UPDATE_PROFILE_SUCCESS,
    S_ADMIN_UPDATE_PROFILE_FAILURE,
} from "./sAdminProfileTypes.js";

import { sAdminProfileApi } from "../../Api/sAdminProfileApi";

export const sAdminGetProfileRequest = () => {
    return {
        type: S_ADMIN_GET_PROFILE_REQUEST,
    };
};

export const sAdminGetProfileSuccess = (profileData) => {
    return {
        type: S_ADMIN_GET_PROFILE_SUCCESS,
        payload: { profileData },
    };
};

export const sAdminGetProfileFailure = (error) => {
    return {
        type: S_ADMIN_GET_PROFILE_FAILURE,
        payload: { error },
    };
};

export const sAdminGetProfileNull = () => {
    return {
        type: S_ADMIN_GET_PROFILE_NULL,
    };
};

export const sAdminUpdateProfileRequest = () => {
    return {
        type: S_ADMIN_UPDATE_PROFILE_REQUEST,
    };
};

export const sAdminUpdateProfileSuccess = (updatedData) => {
    return {
        type: S_ADMIN_UPDATE_PROFILE_SUCCESS,
        payload: { updatedData },
    };
};

export const sAdminUpdateProfileFailure = (error) => {
    return {
        type: S_ADMIN_UPDATE_PROFILE_FAILURE,
        payload: { error },
    };
};

export const sAdminGetProfile = (token) => {
    //can return a pure or impure function, no restrictions and it receieves dispatch as an argument
    return function(dispatch) {
        dispatch(sAdminGetProfileRequest());
        sAdminProfileApi
            .sAdminGetProfile(token)
            .then((response) => {
                const profileData = response.data;
                dispatch(sAdminGetProfileSuccess(profileData));
            })
            .catch((error) => {
                dispatch(sAdminGetProfileFailure(error.message));
            });
    };
};

export const sAdminUpdateProfile = (updatedData, token) => {
    // console.log(updatedData);
    return function(dispatch) {
        dispatch(sAdminUpdateProfileRequest());
        sAdminProfileApi
            .sAdminUpdateProfile(updatedData, token)
            .then((response) => {
                dispatch(sAdminUpdateProfileSuccess(response.data));
            })
            .catch((error) => {
                dispatch(sAdminUpdateProfileFailure(error.message));
            });
    };
};