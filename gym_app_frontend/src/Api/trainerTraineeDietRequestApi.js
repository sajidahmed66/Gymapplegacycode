import axios from "axios";

import commonApi from "./commonApi";
import { apiList } from "./index";

export const trainerTraineeDietRequestApi = {
    trainerGetTraineeDietRequestList(token) {
        return axios.get(
            commonApi.api + apiList.TRAINER_GET_TRAINEE_DIET_REQUEST_LIST,
            token
        );
    },

    trainerGetTraineeDietRequestDetails(requestId, token) {
        return axios.get(
            commonApi.api +
            apiList.TRAINER_GET_TRAINEE_DIET_REQUEST_DETAILS +
            requestId,
            token
        );
    },

    trainerAssignTraineeDietRequest(data, token) {
        return axios.post(
            commonApi.api + apiList.TRAINER_ASSIGN_TRAINEE_DIET_REQUEST,
            data,
            token
        );
    },
};