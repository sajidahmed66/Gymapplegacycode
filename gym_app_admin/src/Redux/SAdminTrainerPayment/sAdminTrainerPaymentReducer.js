import { S_ADMIN_TRAINER_PAYMENT_LIST_SET_SCROLL_POSITION } from "./sAdminTrainerPaymentTypes";

const initialState = {
    trainerPaymentListPositionX: 0,
    trainerPaymentListPositionY: 0,
};

const sAdminTrainerPaymentReducer = (state = initialState, action) => {
    switch (action.type) {
        case S_ADMIN_TRAINER_PAYMENT_LIST_SET_SCROLL_POSITION:
            return {
                ...state,
                trainerPaymentListPositionX: action.payload.positionX,
                trainerPaymentListPositionY: action.payload.positionY,
            };

        default:
            return state;
    }
};

export default sAdminTrainerPaymentReducer;