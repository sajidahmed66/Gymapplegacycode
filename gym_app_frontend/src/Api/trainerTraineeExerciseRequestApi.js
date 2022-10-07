import axios from "axios";

import commonApi from "./commonApi";
import { apiList } from "./index";

export const trainerTraineeExerciseRequestApi = {
    trainerGetTraineeExerciseRequestList(token) {
        return axios.get(
            commonApi.api + apiList.TRAINER_GET_TRAINEE_EXERCISE_REQUEST_LIST,
            token
        );
    },

    trainerGetTraineeExerciseRequestDetails(requestId, token) {
        return axios.get(
            commonApi.api +
            apiList.TRAINER_GET_TRAINEE_EXERCISE_REQUEST_DETAILS +
            requestId,
            token
        );
    },

    trainerAssignTraineeExerciseRequest(data, token) {
        return axios.post(
            commonApi.api + apiList.TRAINER_ASSIGN_TRAINEE_EXERCISE_REQUEST,
            data,
            token
        );
    },
};