import axios from "axios";

import commonApi from "./commonApi";
import { apiList } from "./apiList";

export const sAdminTraineeListApi = {
    sAdminGetTraineeList(token) {
        return axios.get(commonApi.api + apiList.S_ADMIN_GET_TRAINEE_LIST, token);
    },
};
export const sAdminPaymentTypeApi = {
    sAdminGetTraineePaymentTypeList(id,token) {
        return axios.get(commonApi.api + apiList.S_ADMIN_GET_TRAINEE_PAYMENT_TYPE, token);
    },
};