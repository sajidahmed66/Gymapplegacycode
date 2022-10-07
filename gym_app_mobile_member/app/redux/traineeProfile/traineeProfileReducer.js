import * as actionTypes from './traineeProfileActionTypes';

const initState = {
    profileData: null,
    profileGet: false,
    profileUpdateCount: 1
}

const traineeProfileReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.TRAINEE_PROFILE:
            return {
                ...state,
                profileData: action.payload
            }
        case actionTypes.TRAINEE_PROFILE_SUCCESS:
            return {
                ...state,
                profileData: action.payload,
                profileGet: true
            }
        case actionTypes.TRAINEE_PROFILE_FAILED:
            return {
                ...state,
                profileGet: false
            }
        case actionTypes.TRAINEE_PROFILE_UPDATE_SUCCESS:
            return {
                ...state,
                profileUpdateCount: profileUpdateCount + 1
            }
        default:
            return state
    }
};


export default traineeProfileReducer;