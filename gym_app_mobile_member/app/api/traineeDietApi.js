import axios from 'axios';

import commonApi from './commonApi';
import apiList from './apiList';

export const traineeDietApi = {
    traineeGetDietList(token) {
        return axios.get(commonApi.api + apiList.TRAINEE_GET_DITE_LIST, token);
    },

    traineeGetDietDetails(dietId, token) {
        return axios.get(commonApi.api + apiList.TRAINEE_GET_DITE_DETAILS + dietId, token);
    },

    traineeGetLastDietDetails(token) {
        return axios.get(
            commonApi.api + apiList.TRAINEE_GET_LAST_DIET_DETAILS, token
        );
    },

    traineeSendDietReport(data, token) {
        return axios.post(
            commonApi.api + apiList.TRAINEE_SEND_DIET_REPORT,
            data,
            token
        );
    },
    traineeGetDietRequestTimeLimit(token) {

        return axios.get(
            commonApi.api + apiList.TRAINEE_GET_DIET_REQUEST_TIME_LIMIT,
            token
        )
    }
}