import { TRAINER_TRAINEE_EXERCISE_REQUEST_LIST_SET_SCROLL_POSITION } from "./trainerTraineeExerciseRequestTypes";

export const trainerTraineeExerciseRequestListSetScrollPosition = (
    positionX,
    positionY
) => {
    return {
        type: TRAINER_TRAINEE_EXERCISE_REQUEST_LIST_SET_SCROLL_POSITION,
        payload: { positionX, positionY },
    };
};