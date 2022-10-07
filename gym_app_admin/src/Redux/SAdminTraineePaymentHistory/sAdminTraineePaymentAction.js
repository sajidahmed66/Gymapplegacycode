import { S_ADMIN_TRAINEE_PAYMENT_LIST_SET_SCROLL_POSITION } from "./sAdminTraineePaymentTypes";

export const sAdminTraineePaymentListSetScrollPosition = (
    positionX,
    positionY
) => {
    return {
        type: S_ADMIN_TRAINEE_PAYMENT_LIST_SET_SCROLL_POSITION,
        payload: { positionX, positionY },
    };
};