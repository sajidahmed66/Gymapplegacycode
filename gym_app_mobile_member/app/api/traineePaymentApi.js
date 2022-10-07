import commonApi from "./commonApi";
import apiList from './apiList';
import axios from 'axios';

const traineePaymentApi = {
    traineeGetPaymentList(token) {
        return axios.get(
            commonApi.api + apiList.TRAINEE_GET_PAYMENTS,
            token
        )
    },

};

export default traineePaymentApi;