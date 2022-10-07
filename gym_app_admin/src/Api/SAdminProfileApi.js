import axios from "axios";

import { apiList } from "./apiList";
import commonApi from "./commonApi";

export const sAdminProfileApi = {
    sAdminGetProfile(token) {
        return axios.get(commonApi.api + apiList.S_ADMIN_GET_PROFILE, token);
    },

    sAdminUpdateProfile(updatedData, token) {
        return axios.post(
            commonApi.api + apiList.S_ADMIN_UPDATE_PROFILE,
            updatedData,
            token
        );
    },

    sAdminChangePassword(updatedData, token) {
        return axios.post(
            commonApi.api + apiList.S_ADMIN_UPDATE_PASSWORD,
            updatedData,
            token
        );
    },
};