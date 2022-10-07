import {
    S_ADMIN_GET_DIET_TYPE_LIST_REQUEST,
    S_ADMIN_GET_DIET_TYPE_LIST_SUCCESS,
    S_ADMIN_GET_DIET_TYPE_LIST_FAILURE,
    S_ADMIN_GET_DIET_TYPE_LIST_NULL,
    S_ADMIN_ADD_DIET_TYPE_REQUEST,
    S_ADMIN_ADD_DIET_TYPE_SUCCESS,
    S_ADMIN_ADD_DIET_TYPE_FAILURE,
    S_ADMIN_DIET_TYPE_LIST_SET_SCROLL_POSITION,
} from "./sAdminDietTypeTypes";

import { sAdminDietTypeApi } from "../../Api/sAdminDietTypeApi";

export const sAdminGetDietTypeListRequest = () => {
    return {
        type: S_ADMIN_GET_DIET_TYPE_LIST_REQUEST,
    };
};

export const sAdminGetDietTypeListSuccess = (dietTypeList) => {
    return {
        type: S_ADMIN_GET_DIET_TYPE_LIST_SUCCESS,
        payload: { dietTypeList },
    };
};

export const sAdminGetDietTypeListFailure = (error) => {
    return {
        type: S_ADMIN_GET_DIET_TYPE_LIST_FAILURE,
        payload: { error },
    };
};

export const sAdminGetDietTypeListNull = () => {
    return {
        type: S_ADMIN_GET_DIET_TYPE_LIST_NULL,
    };
};

export const sAdminAddDietTypeRequest = () => {
    return {
        type: S_ADMIN_ADD_DIET_TYPE_REQUEST,
    };
};

export const sAdminAddDietTypeSuccess = (updatedDietTypeList) => {
    return {
        type: S_ADMIN_ADD_DIET_TYPE_SUCCESS,
        payload: { updatedDietTypeList },
    };
};

export const sAdminAddDietTypeFailure = (error) => {
    return {
        type: S_ADMIN_ADD_DIET_TYPE_FAILURE,
        payload: { error },
    };
};

export const sAdminDietTypeListSetScrollPosition = (positionX, positionY) => {
    return {
        type: S_ADMIN_DIET_TYPE_LIST_SET_SCROLL_POSITION,
        payload: { positionX, positionY },
    };
};

export const sAdminGetDietTypeList = (token) => {
    //can return a pure or impure function, no restrictions and it receieves dispatch as an argument
    return function(dispatch) {
        dispatch(sAdminGetDietTypeListRequest());
        sAdminDietTypeApi
            .sAdminGetDietTypeList(token)
            .then((response) => {
                const dietTypeList = response.data;
                dispatch(sAdminGetDietTypeListSuccess(dietTypeList));
            })
            .catch((error) => {
                dispatch(sAdminGetDietTypeListFailure(error.message));
            });
    };
};

export const sAdminAddDietType = (newDietTypeData, token) => {
    return function(dispatch) {
        dispatch(sAdminAddDietTypeRequest());
        sAdminDietTypeApi
            .sAdminAddDietType(newDietTypeData, token)
            .then((response) => {
                dispatch(sAdminAddDietTypeSuccess(response.data));
            })
            .catch((error) => {
                dispatch(sAdminAddDietTypeFailure(error.message));
            });
    };
};