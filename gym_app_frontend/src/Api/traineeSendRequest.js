import commonApi from "./commonApi";
import axios from "axios";
import { apiList } from "./index";

export const traineeSendRequest = {
    traineeGetDietRequestTimeLimit(token) {
        return axios.get(
            commonApi.api + apiList.TRAINEE_GET_DIET_REQUEST_TIME_LIMIT,
            token
        );
    },

    traineeGetExerciseRequestTimeLimit(token) {
        return axios.get(
            commonApi.api + apiList.TRAINEE_GET_EXERCISE_REQUEST_TIME_LIMIT,
            token
        );
    },

    traineeSendDietRequest(data, token) {
        return axios.post(
            commonApi.api + apiList.TRAINEE_SEND_DIET_REQUEST,
            data,
            token
        );
    },

    traineeSendExerciseRequest(data, token) {
        return axios.post(
            commonApi.api + apiList.TRAINEE_SEND_EXERCISE_REQUEST,
            data,
            token
        );
    },
};