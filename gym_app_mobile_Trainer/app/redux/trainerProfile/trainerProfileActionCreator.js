import * as actionTypes from './trainerProfileActionTypes';
import { trainerProfileApi } from '../../api/trainerProfileApi';


const getProfileFailed = () => {
    return {
        type: actionTypes.TRAINER_PROFILE_FAILED,
    }
}

const getProfileSuccess = (profileData) => {
    return {
        type: actionTypes.TRAINER_PROFILE_SUCCESS,
        payload: profileData
    }
}

export const getProfile = (token) => dispatch => {
    trainerProfileApi.trainerGetProfile(token)
        .then(res => {
            console.log(res.data)
            dispatch(getProfileSuccess(res.data))
        })
        .catch(err => {
            console.log(err);
            dispatch(getProfileFailed());
        })
}

export const updateProfile = (updatedData, token) => dispatch => {
    trainerProfileApi.trainerUpdateProfile(updatedData, token)
        .then(res => {
            console.log(res.data)
            dispatch(getProfile(token))
        })
        .catch(err => console.log(err.response.data))
};

