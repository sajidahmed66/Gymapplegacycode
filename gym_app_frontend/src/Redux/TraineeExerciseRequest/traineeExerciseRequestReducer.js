import { TRAINEE_EXERCISE_REQUEST_LIST_SET_SCROLL_POSITION } from "./traineeExerciseRequestTypes";

const initialState = {
    exerciseRequestListPositionX: 0,
    exerciseRequestListPositionY: 0,
};

const traineeExerciseRequestReducer = (state = initialState, action) => {
    switch (action.type) {
        case TRAINEE_EXERCISE_REQUEST_LIST_SET_SCROLL_POSITION:
            return {
                ...state,
                exerciseRequestListPositionX: action.payload.positionX,
                exerciseRequestListPositionY: action.payload.positionY,
            };

        default:
            return state;
    }
};

export default traineeExerciseRequestReducer;