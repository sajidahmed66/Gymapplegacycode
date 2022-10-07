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

const initialState = {
    dataFetching: false,
    dataFetched: false,
    isAdding: false,
    isAdded: false,
    PaymentPackageList: null,
    PaymentPackage: null,
    packageData: null,
    fetchError: "",
    addError: "",
};

const sAdminPaymentPackageReducer = (state = initialState, action) => {
    switch (action.type) {
        case S_ADMIN_GET_PAYMENT_PACKAGE_LIST_REQUEST:
            return {
                ...state,
                dataFetching: true,
                dataFetched: false,
            };

        case S_ADMIN_GET_PAYMENT_PACKAGE_LIST_SUCCESS:
            return {
                ...state,
                dataFetching: false,
                dataFetched: true,
                PaymentPackageList: action.payload.PaymentPackageList,
            };

        case S_ADMIN_GET_PAYMENT_PACKAGE_LIST_FAILURE:
            return {
                ...state,
                dataFetching: false,
                dataFetched: false,
                fetchError: action.payload.error,
            };

        case S_ADMIN_GET_PAYMENT_PACKAGE_LIST_NULL:
            return {
                ...state,
                dataFetching: false,
                dataFetched: true,
                PaymentPackageList: null,
            };

        case S_ADMIN_ADD_PAYMENT_PACKAGE_REQUEST:
            return {
                ...state,
                isAdding: true,
                isAdded: false,
            };

        case S_ADMIN_ADD_PAYMENT_PACKAGE_SUCCESS:
            return {
                ...state,
                isAdding: false,
                isAdded: true,
                PaymentPackageList: action.payload.packageData,
            };

        case S_ADMIN_ADD_PAYMENT_PACKAGE_FAILURE:
            return {
                ...state,
                isAdding: false,
                isAdded: false,
                addError: action.payload.error,
            };

        case S_ADMIN_UPDATE_PAYMENT_PACKAGE_REQUEST:
            return {
                ...state,
                isUpdating: true,
                isUpdated: false,
            };

        case S_ADMIN_UPDATE_PAYMENT_PACKAGE_SUCCESS:
            return {
                ...state,
                isUpdating: false,
                isUpdated: true,
                packageData: action.payload.packageData,
            };

        case S_ADMIN_UPDATE_PAYMENT_PACKAGE_FAILURE:
            return {
                ...state,
                isUpdating: false,
                isUpdated: true,
                updateError: action.payload.error,
            };

            case S_ADMIN_GET_PAYMENT_PACKAGE_REQUEST:
            return {
                ...state,
                dataFetching: true,
                dataFetched: false,
            };

        case S_ADMIN_GET_PAYMENT_PACKAGE_SUCCESS:
            return {
                ...state,
                dataFetching: false,
                dataFetched: true,
                PaymentPackage: action.payload.PaymentPackage,
            };

        case S_ADMIN_GET_PAYMENT_PACKAGE_FAILURE:
            return {
                ...state,
                dataFetching: false,
                dataFetched: false,
                fetchError: action.payload.error,
            };

        default:
            return state;
    }
};

export default sAdminPaymentPackageReducer;