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

const initialState = {
    dataFetching: false,
    dataFetched: false,
    isAdding: false,
    isAdded: false,
    exerciseTypeList: null,
    fetchError: "",
    addError: "",
    exerciseTypeListPositionX: 0,
    exerciseTypeListPositionY: 0,
};

const sAdminExerciseTypeReducer = (state = initialState, action) => {
    switch (action.type) {
        case S_ADMIN_GET_EXERCISE_TYPE_LIST_REQUEST:
            return {
                ...state,
                dataFetching: true,
                dataFetched: false,
            };

        case S_ADMIN_GET_EXERCISE_TYPE_LIST_SUCCESS:
            return {
                ...state,
                dataFetching: false,
                dataFetched: true,
                exerciseTypeList: action.payload.exerciseTypeList,
            };

        case S_ADMIN_GET_EXERCISE_TYPE_LIST_FAILURE:
            return {
                ...state,
                dataFetching: false,
                dataFetched: false,
                fetchError: action.payload.error,
            };

        case S_ADMIN_GET_EXERCISE_TYPE_LIST_NULL:
            return {
                ...state,
                dataFetching: false,
                dataFetched: true,
                exerciseTypeList: null,
            };

        case S_ADMIN_ADD_EXERCISE_TYPE_REQUEST:
            return {
                ...state,
                isAdding: true,
                isAdded: false,
            };

        case S_ADMIN_ADD_EXERCISE_TYPE_SUCCESS:
            return {
                ...state,
                isAdding: false,
                isAdded: true,
                exerciseTypeList: action.payload.updatedExerciseTypeList,
            };

        case S_ADMIN_ADD_EXERCISE_TYPE_FAILURE:
            return {
                ...state,
                isAdding: false,
                isAdded: false,
                addError: action.payload.error,
            };

        case S_ADMIN_EXERCISE_TYPE_LIST_SET_SCROLL_POSITION:
            return {
                ...state,
                exerciseTypeListPositionX: action.payload.positionX,
                exerciseTypeListPositionY: action.payload.positionY,
            };

        default:
            return state;
    }
};

export default sAdminExerciseTypeReducer;