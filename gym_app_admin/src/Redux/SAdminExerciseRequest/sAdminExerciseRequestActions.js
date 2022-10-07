import { S_ADMIN_EXERCISE_REQUEST_LIST_SET_SCROLL_POSITION } from "./sAdminExerciseRequestTypes";

export const sAdminExerciseRequestListSetScrollPosition = (
    positionX,
    positionY
) => {
    return {
        type: S_ADMIN_EXERCISE_REQUEST_LIST_SET_SCROLL_POSITION,
        payload: { positionX, positionY },
    };
};