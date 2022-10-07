import {
    TRAINER_GET_EXERCISE_TYPE_LIST_REQUEST,
    TRAINER_GET_EXERCISE_TYPE_LIST_SUCCESS,
    TRAINER_GET_EXERCISE_TYPE_LIST_FAILURE,
    TRAINER_GET_EXERCISE_TYPE_LIST_NULL,
    TRAINER_ADD_EXERCISE_TYPE_REQUEST,
    TRAINER_ADD_EXERCISE_TYPE_SUCCESS,
    TRAINER_ADD_EXERCISE_TYPE_FAILURE,
    TRAINER_EXERCISE_TYPE_LIST_SET_SCROLL_POSITION,
} from "./trainerExerciseTypeTypes";

import { trainerExerciseTypeApi } from "../../Api";

export const trainerGetExerciseTypeListRequest = () => {
    return {
        type: TRAINER_GET_EXERCISE_TYPE_LIST_REQUEST,
    };
};

export const trainerGetExerciseTypeListSuccess = (exerciseTypeList) => {
    return {
        type: TRAINER_GET_EXERCISE_TYPE_LIST_SUCCESS,
        payload: { exerciseTypeList },
    };
};

export const trainerGetExerciseTypeListFailure = (error) => {
    return {
        type: TRAINER_GET_EXERCISE_TYPE_LIST_FAILURE,
        payload: { error },
    };
};

export const trainerGetExerciseTypeListNull = () => {
    return {
        type: TRAINER_GET_EXERCISE_TYPE_LIST_NULL,
    };
};

export const trainerAddExerciseTypeRequest = () => {
    return {
        type: TRAINER_ADD_EXERCISE_TYPE_REQUEST,
    };
};

export const trainerAddExerciseTypeSuccess = (updatedExerciseTypeList) => {
    return {
        type: TRAINER_ADD_EXERCISE_TYPE_SUCCESS,
        payload: { updatedExerciseTypeList },
    };
};

export const trainerAddExerciseTypeFailure = (error) => {
    return {
        type: TRAINER_ADD_EXERCISE_TYPE_FAILURE,
        payload: { error },
    };
};

export const trainerExerciseTypeListSetScrollPosition = (
    positionX,
    positionY
) => {
    return {
        type: TRAINER_EXERCISE_TYPE_LIST_SET_SCROLL_POSITION,
        payload: { positionX, positionY },
    };
};

export const trainerGetExerciseTypeList = (token) => {
    //can return a pure or impure function, no restrictions and it receieves dispatch as an argument
    return function(dispatch) {
        dispatch(trainerGetExerciseTypeListRequest());
        trainerExerciseTypeApi
            .trainerGetExerciseTypeList(token)
            .then((response) => {
                const exerciseTypeList = response.data;
                dispatch(trainerGetExerciseTypeListSuccess(exerciseTypeList));
            })
            .catch((error) => {
                dispatch(trainerGetExerciseTypeListFailure(error.message));
            });
    };
};

export const trainerAddExerciseType = (newExerciseTypeData, token) => {
    return function(dispatch) {
        dispatch(trainerAddExerciseTypeRequest());
        trainerExerciseTypeApi
            .trainerAddExerciseType(newExerciseTypeData, token)
            .then((response) => {
                dispatch(trainerAddExerciseTypeSuccess(response.data));
            })
            .catch((error) => {
                dispatch(trainerAddExerciseTypeFailure(error.message));
            });
    };
};