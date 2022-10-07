import {
    S_ADMIN_GET_EXERCISE_TYPE_LIST_REQUEST,
    S_ADMIN_GET_EXERCISE_TYPE_LIST_SUCCESS,
    S_ADMIN_GET_EXERCISE_TYPE_LIST_FAILURE,
    S_ADMIN_GET_EXERCISE_TYPE_LIST_NULL,
    S_ADMIN_ADD_EXERCISE_TYPE_REQUEST,
    S_ADMIN_ADD_EXERCISE_TYPE_SUCCESS,
    S_ADMIN_ADD_EXERCISE_TYPE_FAILURE,
    S_ADMIN_EXERCISE_TYPE_LIST_SET_SCROLL_POSITION,
} from "./sAdminExerciseTypeTypes";

import { sAdminExerciseTypeApi } from "../../Api/sAdminExerciseTypeApi";

export const sAdminGetExerciseTypeListRequest = () => {
    return {
        type: S_ADMIN_GET_EXERCISE_TYPE_LIST_REQUEST,
    };
};

export const sAdminGetExerciseTypeListSuccess = (exerciseTypeList) => {
    return {
        type: S_ADMIN_GET_EXERCISE_TYPE_LIST_SUCCESS,
        payload: { exerciseTypeList },
    };
};

export const sAdminGetExerciseTypeListFailure = (error) => {
    return {
        type: S_ADMIN_GET_EXERCISE_TYPE_LIST_FAILURE,
        payload: { error },
    };
};

export const sAdminGetExerciseTypeListNull = () => {
    return {
        type: S_ADMIN_GET_EXERCISE_TYPE_LIST_NULL,
    };
};

export const sAdminAddExerciseTypeRequest = () => {
    return {
        type: S_ADMIN_ADD_EXERCISE_TYPE_REQUEST,
    };
};

export const sAdminAddExerciseTypeSuccess = (updatedExerciseTypeList) => {
    return {
        type: S_ADMIN_ADD_EXERCISE_TYPE_SUCCESS,
        payload: { updatedExerciseTypeList },
    };
};

export const sAdminAddExerciseTypeFailure = (error) => {
    return {
        type: S_ADMIN_ADD_EXERCISE_TYPE_FAILURE,
        payload: { error },
    };
};

export const sAdminExerciseTypeListSetScrollPosition = (
    positionX,
    positionY
) => {
    return {
        type: S_ADMIN_EXERCISE_TYPE_LIST_SET_SCROLL_POSITION,
        payload: { positionX, positionY },
    };
};

export const sAdminGetExerciseTypeList = (token) => {
    //can return a pure or impure function, no restrictions and it receieves dispatch as an argument
    return function(dispatch) {
        dispatch(sAdminGetExerciseTypeListRequest());
        sAdminExerciseTypeApi
            .sAdminGetExerciseTypeList(token)
            .then((response) => {
                const exerciseTypeList = response.data;
                dispatch(sAdminGetExerciseTypeListSuccess(exerciseTypeList));
            })
            .catch((error) => {
                dispatch(sAdminGetExerciseTypeListFailure(error.message));
            });
    };
};

export const sAdminAddExerciseType = (newExerciseTypeData, token) => {
    return function(dispatch) {
        dispatch(sAdminAddExerciseTypeRequest());
        sAdminExerciseTypeApi
            .sAdminAddExerciseType(newExerciseTypeData, token)
            .then((response) => {
                dispatch(sAdminAddExerciseTypeSuccess(response.data));
            })
            .catch((error) => {
                dispatch(sAdminAddExerciseTypeFailure(error.message));
            });
    };
};