import {
    S_ADMIN_GET_PROFILE_REQUEST,
    S_ADMIN_GET_PROFILE_SUCCESS,
    S_ADMIN_GET_PROFILE_FAILURE,
    S_ADMIN_GET_PROFILE_NULL,
    S_ADMIN_UPDATE_PROFILE_REQUEST,
    S_ADMIN_UPDATE_PROFILE_SUCCESS,
    S_ADMIN_UPDATE_PROFILE_FAILURE,
} from "./sAdminProfileTypes";

const initialState = {
    dataFetching: false,
    dataFetched: false,
    isUpdating: false,
    isUpdated: false,
    profileData: null,
    fetchError: "",
    updateError: "",
};

const sAdminProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case S_ADMIN_GET_PROFILE_REQUEST:
            return {
                ...state,
                dataFetching: true,
                dataFetched: false,
            };

        case S_ADMIN_GET_PROFILE_SUCCESS:
            return {
                ...state,
                dataFetching: false,
                dataFetched: true,
                profileData: action.payload.profileData,
            };

        case S_ADMIN_GET_PROFILE_FAILURE:
            return {
                ...state,
                dataFetching: false,
                dataFetched: true,
                fetchError: action.payload.error,
            };

        case S_ADMIN_GET_PROFILE_NULL:
            return {
                ...state,
                dataFetching: false,
                dataFetched: true,
                profileData: null,
            };

        case S_ADMIN_UPDATE_PROFILE_REQUEST:
            return {
                ...state,
                isUpdating: true,
                isUpdated: false,
            };

        case S_ADMIN_UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                isUpdating: false,
                isUpdated: true,
                profileData: action.payload.updatedData,
            };

        case S_ADMIN_UPDATE_PROFILE_FAILURE:
            return {
                ...state,
                isUpdating: false,
                isUpdated: true,
                updateError: action.payload.error,
            };

        default:
            return state;
    }
};

export default sAdminProfileReducer;