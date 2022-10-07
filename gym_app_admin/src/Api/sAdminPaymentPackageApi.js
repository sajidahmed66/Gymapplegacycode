import commonApi from "./commonApi";
import axios from "axios";
import { apiList } from "./apiList";

const sAdminPaymentPackageApi = {
    sAdminGetPaymentPackageList(token) {
        return axios.get(
            commonApi.api + apiList.S_ADMIN_GET_PAYMENT_PACKAGE_LIST,
            token
        );
    },
    sAdminGetPaymentPackage(id, token) {
        return axios.get(
            commonApi.api + apiList.S_ADMIN_EDIT_PAYMENT_PACKAGE_LIST + id,
            token
        );
    },
    sAdminAddPaymentPackage(data, token) {
        return axios.post(
            commonApi.api + apiList.S_ADMIN_ADD_PAYMENT_PACKAGE,
            data,
            token
        );
    },
    sAdminEditPaymentPackage(id, data, token) {
        // console.log(id);
        return axios.put(
            commonApi.api + apiList.S_ADMIN_EDIT_PAYMENT_PACKAGE_LIST + id,
            data,
            token
        );
    },
};

export default sAdminPaymentPackageApi;