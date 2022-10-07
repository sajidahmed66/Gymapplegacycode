import commonApi from "./commonApi";
import axios from "axios";
import { apiList } from "./index";

export const traineeProfileApi = {
    traineeGetProfile(token) {
        return axios.get(commonApi.api + apiList.TRAINEE_GET_PROFILE, token);
    },

    traineeUpdateProfile(updatedData, token) {
        return axios.post(
            commonApi.api + apiList.TRAINEE_UPDATE_PROFILE,
            updatedData,
            token
        );
    },

    traineeChangePassword(updatedData, token) {
        return axios.post(
            commonApi.api + apiList.TRAINEE_UPDATE_PASSWORD,
            updatedData,
            token
        );
    },
};