import axios from "axios";

import commonApi from "./commonApi";
import { apiList } from "./index";

export const trainerExerciseTypeApi = {
    trainerGetExerciseTypeList(token) {
        return axios.get(
            commonApi.api + apiList.TRAINER_GET_EXERCISE_TYPE_LIST,
            token
        );
    },

    trainerAddExerciseType(data, token) {
        return axios.post(
            commonApi.api + apiList.TRAINER_ADD_EXERCISE_TYPE,
            data,
            token
        );
    },

    trainerGetExerciseTypeDetails(exerciseTypeId, token) {
        return axios.get(
            commonApi.api +
            apiList.TRAINER_GET_EXERCISE_TYPE_DETAILS +
            exerciseTypeId,
            token
        );
    },

    trainerEditExerciseType(data, exerciseTypeId, token) {
        return axios.put(
            commonApi.api +
            apiList.TRAINER_EDIT_EXERCISE_TYPE_DETAILS +
            exerciseTypeId,
            data,
            token
        );
    },

    trainerDeleteExerciseType(exerciseTypeId, token) {
        return axios.delete(
            commonApi.api +
            apiList.TRAINER_DELETE_EXERCISE_TYPE_DETAILS +
            exerciseTypeId,
            token
        );
    },
};