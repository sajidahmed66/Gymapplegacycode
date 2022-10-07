import {
    S_ADMIN_GET_PAYMENT_PACKAGE_LIST_REQUEST,
    S_ADMIN_GET_PAYMENT_PACKAGE_LIST_SUCCESS,
    S_ADMIN_GET_PAYMENT_PACKAGE_LIST_FAILURE,
    S_ADMIN_GET_PAYMENT_PACKAGE_LIST_NULL,
    S_ADMIN_ADD_PAYMENT_PACKAGE_REQUEST,
    S_ADMIN_ADD_PAYMENT_PACKAGE_SUCCESS,
    S_ADMIN_ADD_PAYMENT_PACKAGE_FAILURE,
    S_ADMIN_UPDATE_PAYMENT_PACKAGE_REQUEST,
    S_ADMIN_UPDATE_PAYMENT_PACKAGE_SUCCESS,
    S_ADMIN_UPDATE_PAYMENT_PACKAGE_FAILURE,
    S_ADMIN_GET_PAYMENT_PACKAGE_REQUEST,
    S_ADMIN_GET_PAYMENT_PACKAGE_SUCCESS,
    S_ADMIN_GET_PAYMENT_PACKAGE_FAILURE,
} from "./sAdminPaymentPackageTypes";

import sAdminPaymentPackageApi from "../../Api/sAdminPaymentPackageApi";

import { routesList } from "../../Constants/routesList";

export const sAdminGetPaymentPackageListRequest = () => {
    return {
        type: S_ADMIN_GET_PAYMENT_PACKAGE_LIST_REQUEST,
    };
};

export const sAdminGetPaymentPackageListSuccess = (PaymentPackageList) => {
    return {
        type: S_ADMIN_GET_PAYMENT_PACKAGE_LIST_SUCCESS,
        payload: { PaymentPackageList },
    };
};

export const sAdminGetPaymentPackageListFailure = (error) => {
    return {
        type: S_ADMIN_GET_PAYMENT_PACKAGE_LIST_FAILURE,
        payload: { error },
    };
};

export const sAdminGetPaymentPackageListNull = () => {
    return {
        type: S_ADMIN_GET_PAYMENT_PACKAGE_LIST_NULL,
    };
};

export const sAdminAddPaymentPackageRequest = () => {
    return {
        type: S_ADMIN_ADD_PAYMENT_PACKAGE_REQUEST,
    };
};

export const sAdminAddPaymentPackageSuccess = (newPaymentPackageData) => {
    return {
        type: S_ADMIN_ADD_PAYMENT_PACKAGE_SUCCESS,
        payload: { newPaymentPackageData },
    };
};

export const sAdminAddPaymentPackageFailure = (error) => {
    return {
        type: S_ADMIN_ADD_PAYMENT_PACKAGE_FAILURE,
        payload: { error },
    };
};

export const sAdminEditPaymentPackageRequest = () => {
    return {
        type: S_ADMIN_UPDATE_PAYMENT_PACKAGE_REQUEST,
    };
};

export const sAdminEditPaymentPackageSuccess = (packageData) => {
    return {
        type: S_ADMIN_UPDATE_PAYMENT_PACKAGE_SUCCESS,
        payload: { packageData },
    };
};

export const sAdminEditPaymentPackageFailure = (error) => {
    return {
        type: S_ADMIN_UPDATE_PAYMENT_PACKAGE_FAILURE,
        payload: { error },
    };
};

export const sAdminGetPaymentPackageRequest = () => {
    return {
        type: S_ADMIN_GET_PAYMENT_PACKAGE_REQUEST,
    };
};

export const sAdminGetPaymentPackageSuccess = (PaymentPackage) => {
    return {
        type: S_ADMIN_GET_PAYMENT_PACKAGE_SUCCESS,
        payload: { PaymentPackage },
    };
};

export const sAdminGetPaymentPackageFailure = (error) => {
    return {
        type: S_ADMIN_GET_PAYMENT_PACKAGE_FAILURE,
        payload: { error },
    };
};

export const sAdminGetPaymentPackageList = (token) => {
    //can return a pure or impure function, no restrictions and it receives dispatch as an argument
    return function(dispatch) {
        dispatch(sAdminGetPaymentPackageListRequest());
        sAdminPaymentPackageApi
            .sAdminGetPaymentPackageList(token)
            .then((response) => {
                const PaymentPackageList = response.data;
                dispatch(sAdminGetPaymentPackageListSuccess(PaymentPackageList));
            })
            .catch((error) => {
                dispatch(sAdminGetPaymentPackageListFailure(error.message));
            });
    };
};

export const sAdminAddPaymentPackage = (newPaymentPackageData, token) => {
    return function(dispatch) {
        dispatch(sAdminAddPaymentPackageRequest());
        sAdminPaymentPackageApi
            .sAdminAddPaymentPackage(newPaymentPackageData, token)
            .then((response) => {
                dispatch(sAdminAddPaymentPackageSuccess(response.data));
                window.location.href = routesList.S_ADMIN_PACKAGE_SUBSCRIPTION;
            })
            .catch((error) => {
                dispatch(sAdminAddPaymentPackageFailure(error.message));
            });
    };
};

export const sAdminGetPaymentPackage = (id, token) => {
    //can return a pure or impure function, no restrictions and it receives dispatch as an argument
    return function(dispatch) {
        dispatch(sAdminGetPaymentPackageRequest());
        sAdminPaymentPackageApi
            .sAdminGetPaymentPackage(id, token)
            .then((response) => {
                const PaymentPackage = response.data;
                dispatch(sAdminGetPaymentPackageSuccess(PaymentPackage));
            })
            .catch((error) => {
                dispatch(sAdminGetPaymentPackageFailure(error.message));
            });
    };
};

export const sAdminEditPaymentPackage = (history, id, packageData, token) => {
    return function(dispatch) {
        dispatch(sAdminEditPaymentPackageRequest());
        sAdminPaymentPackageApi
            .sAdminEditPaymentPackage(id, packageData, token)
            .then((response) => {
                dispatch(sAdminEditPaymentPackageSuccess(response.data));
                // history.push({ pathname: routesList.S_ADMIN_PACKAGE_SUBSCRIPTION, state: { message: 'Your Package is updated' } });
                window.location.href = routesList.S_ADMIN_PACKAGE_SUBSCRIPTION;
            })
            .catch((error) => {
                dispatch(sAdminEditPaymentPackageFailure(error.message));
            });
    };
};