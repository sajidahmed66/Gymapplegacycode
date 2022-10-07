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

const trainerExerciseTypeReducer = (state = initialState, action) => {
    switch (action.type) {
        case TRAINER_GET_EXERCISE_TYPE_LIST_REQUEST:
            return {
                ...state,
                dataFetching: true,
                dataFetched: false,
            };

        case TRAINER_GET_EXERCISE_TYPE_LIST_SUCCESS:
            return {
                ...state,
                dataFetching: false,
                dataFetched: true,
                exerciseTypeList: action.payload.exerciseTypeList,
            };

        case TRAINER_GET_EXERCISE_TYPE_LIST_FAILURE:
            return {
                ...state,
                dataFetching: false,
                dataFetched: false,
                fetchError: action.payload.error,
            };

        case TRAINER_GET_EXERCISE_TYPE_LIST_NULL:
            return {
                ...state,
                dataFetching: false,
                dataFetched: true,
                exerciseTypeList: null,
            };

        case TRAINER_ADD_EXERCISE_TYPE_REQUEST:
            return {
                ...state,
                isAdding: true,
                isAdded: false,
            };

        case TRAINER_ADD_EXERCISE_TYPE_SUCCESS:
            return {
                ...state,
                isAdding: false,
                isAdded: true,
                exerciseTypeList: action.payload.updatedExerciseTypeList,
            };

        case TRAINER_ADD_EXERCISE_TYPE_FAILURE:
            return {
                ...state,
                isAdding: false,
                isAdded: false,
                addError: action.payload.error,
            };

        case TRAINER_EXERCISE_TYPE_LIST_SET_SCROLL_POSITION:
            return {
                ...state,
                exerciseTypeListPositionX: action.payload.positionX,
                exerciseTypeListPositionY: action.payload.positionY,
            };

        default:
            return state;
    }
};

export default trainerExerciseTypeReducer;