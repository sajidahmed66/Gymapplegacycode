import { S_ADMIN_EXPENSE_LIST_SET_SCROLL_POSITION } from "./sAdminExpenseTypes";

const initialState = {
    expenseListPositionX: 0,
    expenseListPositionY: 0,
};

const sAdminExpenseReducer = (state = initialState, action) => {
    switch (action.type) {
        case S_ADMIN_EXPENSE_LIST_SET_SCROLL_POSITION:
            return {
                ...state,
                expenseListPositionX: action.payload.positionX,
                expenseListPositionY: action.payload.positionY,
            };

        default:
            return state;
    }
};

export default sAdminExpenseReducer;