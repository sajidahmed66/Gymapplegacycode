import {
    TRAINER_GET_DIET_TYPE_LIST_REQUEST,
    TRAINER_GET_DIET_TYPE_LIST_SUCCESS,
    TRAINER_GET_DIET_TYPE_LIST_FAILURE,
    TRAINER_GET_DIET_TYPE_LIST_NULL,
    TRAINER_ADD_DIET_TYPE_REQUEST,
    TRAINER_ADD_DIET_TYPE_SUCCESS,
    TRAINER_ADD_DIET_TYPE_FAILURE,
    TRAINER_DIET_TYPE_LIST_SET_SCROLL_POSITION,
} from "./trainerDietTypeTypes";

import { trainerDietTypeApi } from "../../Api";

export const trainerGetDietTypeListRequest = () => {
    return {
        type: TRAINER_GET_DIET_TYPE_LIST_REQUEST,
    };
};

export const trainerGetDietTypeListSuccess = (dietTypeList) => {
    return {
        type: TRAINER_GET_DIET_TYPE_LIST_SUCCESS,
        payload: { dietTypeList },
    };
};

export const trainerGetDietTypeListFailure = (error) => {
    return {
        type: TRAINER_GET_DIET_TYPE_LIST_FAILURE,
        payload: { error },
    };
};

export const trainerGetDietTypeListNull = () => {
    return {
        type: TRAINER_GET_DIET_TYPE_LIST_NULL,
    };
};

export const trainerAddDietTypeRequest = () => {
    return {
        type: TRAINER_ADD_DIET_TYPE_REQUEST,
    };
};

export const trainerAddDietTypeSuccess = (updatedDietTypeList) => {
    return {
        type: TRAINER_ADD_DIET_TYPE_SUCCESS,
        payload: { updatedDietTypeList },
    };
};

export const trainerAddDietTypeFailure = (error) => {
    return {
        type: TRAINER_ADD_DIET_TYPE_FAILURE,
        payload: { error },
    };
};

export const trainerDietTypeListSetScrollPosition = (positionX, positionY) => {
    return {
        type: TRAINER_DIET_TYPE_LIST_SET_SCROLL_POSITION,
        payload: { positionX, positionY },
    };
};

export const trainerGetDietTypeList = (token) => {
    //can return a pure or impure function, no restrictions and it receieves dispatch as an argument
    return function(dispatch) {
        dispatch(trainerGetDietTypeListRequest());
        trainerDietTypeApi
            .trainerGetDietTypeList(token)
            .then((response) => {
                const dietTypeList = response.data;
                dispatch(trainerGetDietTypeListSuccess(dietTypeList));
            })
            .catch((error) => {
                dispatch(trainerGetDietTypeListFailure(error.message));
            });
    };
};

export const trainerAddDietType = (newDietTypeData, token) => {
    return function(dispatch) {
        dispatch(trainerAddDietTypeRequest());
        trainerDietTypeApi
            .trainerAddDietType(newDietTypeData, token)
            .then((response) => {
                dispatch(trainerAddDietTypeSuccess(response.data));
            })
            .catch((error) => {
                dispatch(trainerAddDietTypeFailure(error.message));
            });
    };
};