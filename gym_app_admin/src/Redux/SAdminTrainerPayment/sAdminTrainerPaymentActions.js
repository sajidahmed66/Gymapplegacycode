import { S_ADMIN_TRAINER_PAYMENT_LIST_SET_SCROLL_POSITION } from "./sAdminTrainerPaymentTypes";

export const sAdminTrainerPaymentListSetScrollPosition = (
    positionX,
    positionY
) => {
    return {
        type: S_ADMIN_TRAINER_PAYMENT_LIST_SET_SCROLL_POSITION,
        payload: { positionX, positionY },
    };
};