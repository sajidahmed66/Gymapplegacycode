import { S_ADMIN_TRAINEE_LIST_SET_SCROLL_POSITION } from "./sAdminTraineeTypes";

export const sAdminTraineeListSetScrollPosition = (positionX, positionY) => {
    return {
        type: S_ADMIN_TRAINEE_LIST_SET_SCROLL_POSITION,
        payload: { positionX, positionY },
    };
};