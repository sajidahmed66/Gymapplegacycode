import commonApi from "./commonApi";
import axios from "axios";
import apiList from "./apiList";

export const trainerPaymentsApi = {
    trainerGetPaymentList(token) {

        return axios.get(commonApi.api + apiList.TRAINER_GET_PAYMENT_HISTORY,
            token);
    },
}