import axios from "axios";

import { apiList } from "./apiList";
import commonApi from "./commonApi";

export const sAdminSettingsApi = {
    sAdminGetDietRequestTimeLimit(token) {
        return axios.get(
            commonApi.api + apiList.S_ADMIN_GET_DIET_REQUEST_TIME_LIMIT,
            token
        );
    },

    sAdminUpdateDietRequestTimeLimit(id, noOfDays, token) {
        return axios.put(
            commonApi.api + apiList.S_ADMIN_UPDATE_DIET_REQUEST_TIME_LIMIT + id, { noOfDays },
            token
        );
    },

    sAdminGetExerciseRequestTimeLimit(token) {
        return axios.get(
            commonApi.api + apiList.S_ADMIN_GET_EXERCISE_REQUEST_TIME_LIMIT,
            token
        );
    },

    sAdminUpdateExerciseRequestTimeLimit(id, noOfDays, token) {
        return axios.put(
            commonApi.api + apiList.S_ADMIN_UPDATE_EXERCISE_REQUEST_TIME_LIMIT + id, { noOfDays },
            token
        );
    },
};