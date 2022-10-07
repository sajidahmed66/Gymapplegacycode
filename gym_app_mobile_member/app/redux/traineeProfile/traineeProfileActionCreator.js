import * as actionTypes from "./traineeProfileActionTypes";
import traineeAuthApi from "../../api/traineeAuthApi";
import traineeProfileApi from "../../api/traineeProfileApi";

const getProfileFailed = () => {
    return {
        type: actionTypes.TRAINEE_PROFILE_FAILED,
    };
};

const getProfileSuccess = (profileData) => {
    return {
        type: actionTypes.TRAINEE_PROFILE_SUCCESS,
        payload: profileData,
    };
};

export const getProfile = (token) => (dispatch) => {
    //console.log("action" + token);

    traineeProfileApi
        .getTraineeProfile(token)
        .then((res) => {
            dispatch(getProfileSuccess(res.data));
        })
        .catch((err) => {
            dispatch(getProfileFailed());
        });
};

export const updateProfile = (updatedData, token) => (dispatch) => {
    traineeProfileApi
        .traineeUpdateProfile(updatedData, token)
        .then((res) => {
            console.log("trainee 2" + res.data)
            dispatch(getProfile(token))
        })
        .catch((err) => console.log("trainee err2" + err.response.data));
};

export const updateProfileSuccess = () => {
    return {
        type: actionTypes.TRAINEE_PROFILE_UPDATE_SUCCESS
    }
}