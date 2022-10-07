import axios from "axios";

import commonApi from "./commonApi";
import { apiList } from "./index";

export const trainerDietTypeApi = {
    trainerGetDietTypeList(token) {
        return axios.get(commonApi.api + apiList.TRAINER_GET_DIET_TYPE_LIST, token);
    },

    trainerGetDietTypeDetails(dietTypeId, token) {
        return axios.get(
            commonApi.api + apiList.TRAINER_GET_DIET_TYPE_DETAILS + dietTypeId,
            token
        );
    },

    trainerAddDietType(data, token) {
        return axios.post(
            commonApi.api + apiList.TRAINER_ADD_DIET_TYPE,
            data,
            token
        );
    },

    trainerEditDietType(data, dietTypeId, token) {
        return axios.put(
            commonApi.api + apiList.TRAINER_EDIT_DIET_TYPE_DETAILS + dietTypeId,
            data,
            token
        );
    },

    trainerDeleteDietType(dietTypeId, token) {
        return axios.delete(
            commonApi.api + apiList.TRAINER_DELETE_DIET_TYPE_DETAILS + dietTypeId,
            token
        );
    },
};