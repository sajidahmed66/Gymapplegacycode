import { TRAINER_TRAINEE_DIET_REQUEST_LIST_SET_SCROLL_POSITION } from "./trainerTraineeDietRequestTypes";

export const trainerTraineeDietRequestListSetScrollPosition = (
    positionX,
    positionY
) => {
    return {
        type: TRAINER_TRAINEE_DIET_REQUEST_LIST_SET_SCROLL_POSITION,
        payload: { positionX, positionY },
    };
};