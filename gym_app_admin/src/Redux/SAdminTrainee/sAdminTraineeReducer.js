import { S_ADMIN_TRAINEE_LIST_SET_SCROLL_POSITION } from "./sAdminTraineeTypes";

const initialState = {
    traineeListPositionX: 0,
    traineeListPositionY: 0,
};

const sAdminTraineeReducer = (state = initialState, action) => {
    switch (action.type) {
        case S_ADMIN_TRAINEE_LIST_SET_SCROLL_POSITION:
            return {
                ...state,
                traineeListPositionX: action.payload.positionX,
                traineeListPositionY: action.payload.positionY,
            };

        default:
            return state;
    }
};

export default sAdminTraineeReducer;