import { S_ADMIN_LOGIN_REQUEST } from "../Redux/SAdminLogin/sAdminLoginTypes";
import { S_ADMIN_LOGIN_SUCCESS } from "../Redux/SAdminLogin/sAdminLoginTypes";
import { S_ADMIN_LOGIN_FAILURE } from "../Redux/SAdminLogin/sAdminLoginTypes";
import { S_ADMIN_LOGOUT } from "../Redux/SAdminLogin/sAdminLoginTypes";

import sAdminAuthApi from "../Api/sAdminAuthApi";

export const sAdminAuthActions = {
    login,
    logout,
};

function login(phone, password) {
    return (dispatch) => {
        dispatch(request(phone));

        let data = {
            phone,
            password,
        };

        sAdminAuthApi
            .sAdminLogin(data)
            .then((res1) => {
                const token = JSON.stringify(res1.data.token);

                window.localStorage.setItem("superAdminToken", token);
                dispatch(success(phone));
            })
            .catch((err) => {
                dispatch(failure(err));
            });
    };

    function request(phone) {
        return { type: S_ADMIN_LOGIN_REQUEST, phone };
    }

    function success(phone) {
        return { type: S_ADMIN_LOGIN_SUCCESS, phone };
    }

    function failure(error) {
        return { type: S_ADMIN_LOGIN_FAILURE, error };
    }
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("superAdminToken");
    return { type: S_ADMIN_LOGOUT };
}