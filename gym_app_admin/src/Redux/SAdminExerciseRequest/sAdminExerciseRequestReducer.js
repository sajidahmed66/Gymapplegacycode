import { S_ADMIN_EXERCISE_REQUEST_LIST_SET_SCROLL_POSITION } from "./sAdminExerciseRequestTypes";

const initialState = {
    exerciseRequestListPositionX: 0,
    exerciseRequestListPositionY: 0,
};

const sAdminExerciseRequestReducer = (state = initialState, action) => {
    switch (action.type) {
        case S_ADMIN_EXERCISE_REQUEST_LIST_SET_SCROLL_POSITION:
            return {
                ...state,
                exerciseRequestListPositionX: action.payload.positionX,
                exerciseRequestListPositionY: action.payload.positionY,
            };

        default:
            return state;
    }
};

export default sAdminExerciseRequestReducer;