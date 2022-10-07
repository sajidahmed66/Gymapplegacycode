import axios from "axios";

import commonApi from "./commonApi";
import { apiList } from "./apiList";

export const sAdminTraineeExerciseRequestApi = {
    sAdminGetTraineeExerciseRequestList(token) {
        return axios.get(
            commonApi.api + apiList.S_ADMIN_GET_TRAINEE_EXERCISE_REQUEST_LIST,
            token
        );
    },

    sAdminGetTraineeExerciseRequestDetails(requestId, token) {
        return axios.get(
            commonApi.api +
            apiList.S_ADMIN_GET_TRAINEE_EXERCISE_REQUEST_DETAILS +
            requestId,
            token
        );
    },

    sAdminAssignTraineeExerciseRequest(data, token) {
        return axios.post(
            commonApi.api + apiList.S_ADMIN_ASSIGN_TRAINEE_EXERCISE_REQUEST,
            data,
            token
        );
    },
};