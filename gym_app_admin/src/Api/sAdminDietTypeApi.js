import axios from "axios";

import commonApi from "./commonApi";
import { apiList } from "./index";

export const sAdminDietTypeApi = {
    sAdminGetDietTypeList(token) {
        return axios.get(commonApi.api + apiList.S_ADMIN_GET_DIET_TYPE_LIST, token);
    },

    sAdminGetDietTypeDetails(dietTypeId, token) {
        return axios.get(
            commonApi.api + apiList.S_ADMIN_GET_DIET_TYPE_DETAILS + dietTypeId,
            token
        );
    },

    sAdminAddDietType(data, token) {
        return axios.post(
            commonApi.api + apiList.S_ADMIN_ADD_DIET_TYPE,
            data,
            token
        );
    },

    sAdminEditDietType(data, dietTypeId, token) {
        return axios.put(
            commonApi.api + apiList.S_ADMIN_EDIT_DIET_TYPE_DETAILS + dietTypeId,
            data,
            token
        );
    },

    sAdminDeleteDietType(dietTypeId, token) {
        return axios.delete(
            commonApi.api + apiList.S_ADMIN_DELETE_DIET_TYPE_DETAILS + dietTypeId,
            token
        );
    },
};