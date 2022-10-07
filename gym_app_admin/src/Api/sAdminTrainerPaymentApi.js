import axios from "axios";

import commonApi from "./commonApi";
import { apiList } from "./apiList";

export const sAdminTrainerPaymentApi = {
    sAdminGetTrainerPaymentList(token) {
        return axios.get(
            commonApi.api + apiList.S_ADMIN_GET_TRAINER_PAYMENT_LIST,
            token
        );
    },

    sAdminGetTrainerPaymentDetails(trainerPaymentId, token) {
        return axios.get(
            commonApi.api +
            apiList.S_ADMIN_GET_TRAINER_PAYMENT_DETAILS +
            trainerPaymentId,
            token
        );
    },

    sAdminAddTrainerPayment(data, token) {
        return axios.post(
            commonApi.api + apiList.S_ADMIN_ADD_TRAINER_PAYMENT,
            data,
            token
        );
    },

    sAdminUpdateTrainerPayment(data, trainerPaymentId, token) {
        return axios.put(
            commonApi.api + apiList.S_ADMIN_UPDATE_TRAINER_PAYMENT + trainerPaymentId,
            data,
            token
        );
    },

    sAdminDeleteTrainerPayment(trainerPaymentId, token) {
        return axios.delete(
            commonApi.api + apiList.S_ADMIN_DELETE_TRAINER_PAYMENT + trainerPaymentId,
            token
        );
    },
};