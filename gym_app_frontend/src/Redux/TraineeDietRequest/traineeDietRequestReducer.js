import { TRAINEE_DIET_REQUEST_LIST_SET_SCROLL_POSITION } from "./traineeDietRequestTypes";

const initialState = {
    dietRequestListPositionX: 0,
    dietRequestListPositionY: 0,
};

const traineeDietRequestReducer = (state = initialState, action) => {
    switch (action.type) {
        case TRAINEE_DIET_REQUEST_LIST_SET_SCROLL_POSITION:
            return {
                ...state,
                dietRequestListPositionX: action.payload.positionX,
                dietRequestListPositionY: action.payload.positionY,
            };

        default:
            return state;
    }
};

export default traineeDietRequestReducer;