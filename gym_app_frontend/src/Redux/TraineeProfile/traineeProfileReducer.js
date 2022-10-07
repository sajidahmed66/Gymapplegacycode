import {
    TRAINEE_GET_PROFILE_REQUEST,
    TRAINEE_GET_PROFILE_SUCCESS,
    TRAINEE_GET_PROFILE_FAILURE,
    TRAINEE_GET_PROFILE_NULL,
    TRAINEE_UPDATE_PROFILE_REQUEST,
    TRAINEE_UPDATE_PROFILE_SUCCESS,
    TRAINEE_UPDATE_PROFILE_FAILURE,
} from "./traineeProfileTypes";

const initialState = {
    dataFetching: false,
    dataFetched: false,
    isUpdating: false,
    isUpdated: false,
    profileData: null,
    fetchError: "",
    updateError: "",
};

const traineeProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case TRAINEE_GET_PROFILE_REQUEST:
            return {
                ...state,
                dataFetching: true,
                dataFetched: false,
            };

        case TRAINEE_GET_PROFILE_SUCCESS:
            return {
                ...state,
                dataFetching: false,
                dataFetched: true,
                profileData: action.payload.profileData,
            };

        case TRAINEE_GET_PROFILE_FAILURE:
            return {
                ...state,
                dataFetching: false,
                dataFetched: true,
                error: action.payload.error,
            };

        case TRAINEE_GET_PROFILE_NULL:
            return {
                ...state,
                dataFetching: false,
                dataFetched: true,
                profileData: null,
            };

        case TRAINEE_UPDATE_PROFILE_REQUEST:
            return {
                ...state,
                isUpdating: true,
                isUpdated: false,
            };

        case TRAINEE_UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                isUpdating: false,
                isUpdated: true,
                profileData: action.payload.updatedData,
            };

        case TRAINEE_UPDATE_PROFILE_FAILURE:
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

export default traineeProfileReducer;