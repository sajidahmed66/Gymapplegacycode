import axios from "axios";

import commonApi from "./commonApi";
import { apiList } from "./apiList";

export const sAdminExpenseApi = {
    sAdminGetExpenseList(token) {
        return axios.get(commonApi.api + apiList.S_ADMIN_GET_EXPENSE_LIST, token);
    },

    sAdminGetExpenseDetails(expenseId, token) {
        return axios.get(
            commonApi.api + apiList.S_ADMIN_GET_EXPENSE_DETAILS + expenseId,
            token
        );
    },

    sAdminAddExpense(data, token) {
        return axios.post(commonApi.api + apiList.S_ADMIN_ADD_EXPENSE, data, token);
    },

    sAdminUpdateExpense(data, expenseId, token) {
        return axios.put(
            commonApi.api + apiList.S_ADMIN_UPDATE_EXPENSE + expenseId,
            data,
            token
        );
    },

    sAdminDeleteExpense(expenseId, token) {
        return axios.delete(
            commonApi.api + apiList.S_ADMIN_DELETE_EXPENSE + expenseId,
            token
        );
    },
};