import * as actionTypes from './trainerProfileActionTypes';

const initState = {
    profileData: null,
    profileGet: false,
    profileUpdateCount: 1
}

const trainerProfileReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.TRAINER_PROFILE_FAILED:
            return {
                ...state,
                profileGet: false
            }
        case actionTypes.TRAINER_PROFILE_SUCCESS:
            return {
                ...state,
                profileGet: true,
                profileData: action.payload
            }
        default:
            return state
    }
}

export default trainerProfileReducer;