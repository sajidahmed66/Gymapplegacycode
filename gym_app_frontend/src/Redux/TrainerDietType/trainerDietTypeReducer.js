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

const initialState = {
    dataFetching: false,
    dataFetched: false,
    isAdding: false,
    isAdded: false,
    dietTypeList: null,
    fetchError: "",
    addError: "",
    dietTypeListPositionX: 0,
    dietTypeListPositionY: 0,
};

const trainerDietTypeReducer = (state = initialState, action) => {
    switch (action.type) {
        case TRAINER_GET_DIET_TYPE_LIST_REQUEST:
            return {
                ...state,
                dataFetching: true,
                dataFetched: false,
            };

        case TRAINER_GET_DIET_TYPE_LIST_SUCCESS:
            return {
                ...state,
                dataFetching: false,
                dataFetched: true,
                dietTypeList: action.payload.dietTypeList,
            };

        case TRAINER_GET_DIET_TYPE_LIST_FAILURE:
            return {
                ...state,
                dataFetching: false,
                dataFetched: false,
                fetchError: action.payload.error,
            };

        case TRAINER_GET_DIET_TYPE_LIST_NULL:
            return {
                ...state,
                dataFetching: false,
                dataFetched: true,
                dietTypeList: null,
            };

        case TRAINER_ADD_DIET_TYPE_REQUEST:
            return {
                ...state,
                isAdding: true,
                isAdded: false,
            };

        case TRAINER_ADD_DIET_TYPE_SUCCESS:
            return {
                ...state,
                isAdding: false,
                isAdded: true,
                dietTypeList: action.payload.updatedDietTypeList,
            };

        case TRAINER_ADD_DIET_TYPE_FAILURE:
            return {
                ...state,
                isAdding: false,
                isAdded: false,
                addError: action.payload.error,
            };

        case TRAINER_DIET_TYPE_LIST_SET_SCROLL_POSITION:
            return {
                ...state,
                dietTypeListPositionX: action.payload.positionX,
                dietTypeListPositionY: action.payload.positionY,
            };

        default:
            return state;
    }
};

export default trainerDietTypeReducer;