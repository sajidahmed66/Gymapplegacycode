import { TRAINEE_EXERCISE_REQUEST_LIST_SET_SCROLL_POSITION } from "./traineeExerciseRequestTypes";

export const traineeExerciseRequestListSetScrollPosition = (
    positionX,
    positionY
) => {
    return {
        type: TRAINEE_EXERCISE_REQUEST_LIST_SET_SCROLL_POSITION,
        payload: { positionX, positionY },
    };
};