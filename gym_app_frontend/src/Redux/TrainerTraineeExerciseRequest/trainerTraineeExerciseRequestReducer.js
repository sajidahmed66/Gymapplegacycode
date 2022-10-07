import { TRAINER_TRAINEE_EXERCISE_REQUEST_LIST_SET_SCROLL_POSITION } from "./trainerTraineeExerciseRequestTypes";

const initialState = {
    exerciseRequestListPositionX: 0,
    exerciseRequestListPositionY: 0,
};

const trainerTraineeExerciseRequestReducer = (state = initialState, action) => {
    switch (action.type) {
        case TRAINER_TRAINEE_EXERCISE_REQUEST_LIST_SET_SCROLL_POSITION:
            return {
                ...state,
                exerciseRequestListPositionX: action.payload.positionX,
                exerciseRequestListPositionY: action.payload.positionY,
            };

        default:
            return state;
    }
};

export default trainerTraineeExerciseRequestReducer;