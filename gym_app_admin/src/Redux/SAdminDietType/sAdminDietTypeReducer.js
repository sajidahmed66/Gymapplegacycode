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

const sAdminDietTypeReducer = (state = initialState, action) => {
    switch (action.type) {
        case S_ADMIN_GET_DIET_TYPE_LIST_REQUEST:
            return {
                ...state,
                dataFetching: true,
                dataFetched: false,
            };

        case S_ADMIN_GET_DIET_TYPE_LIST_SUCCESS:
            return {
                ...state,
                dataFetching: false,
                dataFetched: true,
                dietTypeList: action.payload.dietTypeList,
            };

        case S_ADMIN_GET_DIET_TYPE_LIST_FAILURE:
            return {
                ...state,
                dataFetching: false,
                dataFetched: false,
                fetchError: action.payload.error,
            };

        case S_ADMIN_GET_DIET_TYPE_LIST_NULL:
            return {
                ...state,
                dataFetching: false,
                dataFetched: true,
                dietTypeList: null,
            };

        case S_ADMIN_ADD_DIET_TYPE_REQUEST:
            return {
                ...state,
                isAdding: true,
                isAdded: false,
            };

        case S_ADMIN_ADD_DIET_TYPE_SUCCESS:
            return {
                ...state,
                isAdding: false,
                isAdded: true,
                dietTypeList: action.payload.updatedDietTypeList,
            };

        case S_ADMIN_ADD_DIET_TYPE_FAILURE:
            return {
                ...state,
                isAdding: false,
                isAdded: false,
                addError: action.payload.error,
            };

        case S_ADMIN_DIET_TYPE_LIST_SET_SCROLL_POSITION:
            return {
                ...state,
                dietTypeListPositionX: action.payload.positionX,
                dietTypeListPositionY: action.payload.positionY,
            };

        default:
            return state;
    }
};

export default sAdminDietTypeReducer;