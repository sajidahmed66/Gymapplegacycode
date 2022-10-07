import commonApi from "./commonApi";
import axios from "axios";
import apiList from "./apiList";

export const trainerProfileApi = {
    trainerGetProfile(token) {
        return axios.get(commonApi.api + apiList.TRAINER_GET_PROFILE, token);
    },
    trainerUpdateProfile(updatedData, token) {
        return axios.post(
            commonApi.api + apiList.TRAINER_UPDATE_PROFILE,
            updatedData,
            token
        );
    },

    trainerChangePassword(updatedData, token) {
        return axios.post(
            commonApi.api + apiList.TRAINER_UPDATE_PASSWORD,
            updatedData,
            token
        );
    },
    traineeGetProfile(data, token) {
        return axios.post(commonApi.api + apiList.TRAINEE_GET_PROFILE, data, token);
    },
    traineeGetImages(data, token) {
        return axios.post(commonApi.api + apiList.TRAINEE_GET_IMAGES, data, token);
    },
};