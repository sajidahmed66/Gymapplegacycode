import axios from "axios";

import commonApi from "./commonApi";
import { apiList } from "./apiList";

export const sAdminExerciseTypeApi = {
    sAdminGetExerciseTypeList(token) {
        return axios.get(
            commonApi.api + apiList.S_ADMIN_GET_EXERCISE_TYPE_LIST,
            token
        );
    },

    sAdminGetExerciseTypeDetails(exerciseTypeId, token) {
        return axios.get(
            commonApi.api +
            apiList.S_ADMIN_GET_EXERCISE_TYPE_DETAILS +
            exerciseTypeId,
            token
        );
    },

    sAdminAddExerciseType(data, token) {
        return axios.post(
            commonApi.api + apiList.S_ADMIN_ADD_EXERCISE_TYPE,
            data,
            token
        );
    },

    sAdminEditExerciseType(data, exerciseTypeId, token) {
        return axios.put(
            commonApi.api +
            apiList.S_ADMIN_EDIT_EXERCISE_TYPE_DETAILS +
            exerciseTypeId,
            data,
            token
        );
    },

    sAdminDeleteExerciseType(exerciseTypeId, token) {
        return axios.delete(
            commonApi.api +
            apiList.S_ADMIN_DELETE_EXERCISE_TYPE_DETAILS +
            exerciseTypeId,
            token
        );
    },
};