import {
    TRAINER_GET_PROFILE_REQUEST,
    TRAINER_GET_PROFILE_SUCCESS,
    TRAINER_GET_PROFILE_FAILURE,
    TRAINER_GET_PROFILE_NULL,
    TRAINER_UPDATE_PROFILE_REQUEST,
    TRAINER_UPDATE_PROFILE_SUCCESS,
    TRAINER_UPDATE_PROFILE_FAILURE,
} from "./trainerProfileTypes";

const initialState = {
    dataFetching: false,
    dataFetched: false,
    isUpdating: false,
    isUpdated: false,
    profileData: null,
    fetchError: "",
    updateError: "",
};

const trainerProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case TRAINER_GET_PROFILE_REQUEST:
            return {
                ...state,
                dataFetching: true,
                dataFetched: false,
            };

        case TRAINER_GET_PROFILE_SUCCESS:
            return {
                ...state,
                dataFetching: false,
                dataFetched: true,
                profileData: action.payload.profileData,
            };

        case TRAINER_GET_PROFILE_FAILURE:
            return {
                ...state,
                dataFetching: false,
                dataFetched: true,
                error: action.payload.error,
            };

        case TRAINER_GET_PROFILE_NULL:
            return {
                ...state,
                dataFetching: false,
                dataFetched: true,
                profileData: null,
            };

        case TRAINER_UPDATE_PROFILE_REQUEST:
            return {
                ...state,
                isUpdating: true,
                isUpdated: false,
            };

        case TRAINER_UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                isUpdating: false,
                isUpdated: true,
                profileData: action.payload.updatedData,
            };

        case TRAINER_UPDATE_PROFILE_FAILURE:
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

export default trainerProfileReducer;