import axios from "axios";

import commonApi from "./commonApi";
import { apiList } from "./apiList";

export const registrationApi = {
    traineeRegistration(userInfo, token) {
        return axios.post(
            commonApi.api + apiList.S_ADMIN_TRAINEE_REGISTRATION,
            userInfo,
            token
        );
    },

    trainerRegistration(userInfo) {
        return axios.post(
            commonApi.api + apiList.S_ADMIN_TRAINER_REGISTRATION,
            userInfo
        );
    },

    adminRegistration(userInfo) {
        return axios.post(
            commonApi.api + apiList.S_ADMIN_ADMIN_REGISTRATION,
            userInfo
        );
    },
};