import { S_ADMIN_EXPENSE_LIST_SET_SCROLL_POSITION } from "./sAdminExpenseTypes";

export const sAdminExpenseListSetScrollPosition = (positionX, positionY) => {
    return {
        type: S_ADMIN_EXPENSE_LIST_SET_SCROLL_POSITION,
        payload: { positionX, positionY },
    };
};