import axios from "axios";

import commonApi from "./commonApi";
import { apiList } from "./index";

export const traineeExerciseApi = {
    traineeGetExerciseList(token) {
        return axios.get(commonApi.api + apiList.TRAINEE_GET_EXERCISE_LIST, token);
    },

    traineeGetExerciseDetails(exerciseId, token) {
        return axios.get(
            commonApi.api + apiList.TRAINEE_GET_EXERCISE_DETAILS + exerciseId,
            token
        );
    },

    traineeGetLastExerciseDetails(token) {
        return axios.get(
            commonApi.api + apiList.TRAINEE_GET_LAST_EXERCISE_DETAILS,
            token
        );
    },

    traineeSendExerciseReport(data, token) {
        return axios.post(
            commonApi.api + apiList.TRAINEE_SEND_EXERCISE_REPORT,
            data,
            token
        );
    },
};