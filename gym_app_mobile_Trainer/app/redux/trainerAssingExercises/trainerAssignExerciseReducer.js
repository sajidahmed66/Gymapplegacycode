import * as actionTypes from './trainerAssignExerciseActonType';

const initState = {
    traineeReqListExercise: [],
    traineeReqListDiet: [],
}

const trainerAssignExerciseListReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_TRAINEE_EXERCISE_REQUEST_LIST:
            return {}
        case actionTypes.GET_TRAINEE_DIET_REQUEST_LIST:
            return {

            }
        default:
            return state
    }
}

export default trainerAssignExerciseListReducer;