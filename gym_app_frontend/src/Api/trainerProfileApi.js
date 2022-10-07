import commonApi from "./commonApi";
import axios from "axios";
import { apiList } from "./index";

export const trainerProfileApi = {
    trainerGetProfile(token) {
        // console.log("check token", token);
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
};