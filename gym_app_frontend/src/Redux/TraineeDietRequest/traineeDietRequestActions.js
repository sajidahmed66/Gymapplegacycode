import { TRAINEE_DIET_REQUEST_LIST_SET_SCROLL_POSITION } from "./traineeDietRequestTypes";

export const traineeDietRequestListSetScrollPosition = (
    positionX,
    positionY
) => {
    return {
        type: TRAINEE_DIET_REQUEST_LIST_SET_SCROLL_POSITION,
        payload: { positionX, positionY },
    };
};