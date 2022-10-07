import { S_ADMIN_TRAINEE_PAYMENT_LIST_SET_SCROLL_POSITION } from "./sAdminTraineePaymentTypes";

const initialState = {
    traineePaymentListPositionX: 0,
    traineePaymentListPositionY: 0,
};

const sAdminTraineePaymentReducer = (state = initialState, action) => {
    switch (action.type) {
        case S_ADMIN_TRAINEE_PAYMENT_LIST_SET_SCROLL_POSITION:
            return {
                ...state,
                traineePaymentListPositionX: action.payload.positionX,
                traineePaymentListPositionY: action.payload.positionY,
            };

        default:
            return state;
    }
};

export default sAdminTrainerPaymentReducer;