import axios from "axios";

import commonApi from "./commonApi";
import { apiList } from "./apiList";

export const sAdminTraineeDietRequestApi = {
    sAdminGetTraineeDietRequestList(token) {
        return axios.get(
            commonApi.api + apiList.S_ADMIN_GET_TRAINEE_DIET_REQUEST_LIST,
            token
        );
    },

    sAdminGetTraineeDietRequestDetails(requestId, token) {
        return axios.get(
            commonApi.api +
            apiList.S_ADMIN_GET_TRAINEE_DIET_REQUEST_DETAILS +
            requestId,
            token
        );
    },

    sAdminAssignTraineeDietRequest(data, token) {
        return axios.post(
            commonApi.api + apiList.S_ADMIN_ASSIGN_TRAINEE_DIET_REQUEST,
            data,
            token
        );
    },
};