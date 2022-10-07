import { TRAINER_LOGIN_REQUEST } from "../Redux/TrainerLogin/trainerLoginTypes";
import { TRAINER_LOGIN_SUCCESS } from "../Redux/TrainerLogin/trainerLoginTypes";
import { TRAINER_LOGIN_FAILURE } from "../Redux/TrainerLogin/trainerLoginTypes";
import { TRAINER_LOGOUT } from "../Redux/TrainerLogin/trainerLoginTypes";

import trainerAuthApi from "../Api/trainerAuthApi";

export const trainerAuthActions = {
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

        trainerAuthApi
            .trainerLogin(data)
            .then((res1) => {
                const token = JSON.stringify(res1.data.token);

                window.localStorage.setItem("trainerToken", token);
                dispatch(success(phone));
            })
            .catch((err) => {
                console.log(err);
                dispatch(failure(err));
            });
    };

    function request(phone) {
        return { type: TRAINER_LOGIN_REQUEST, phone };
    }

    function success(phone) {
        return { type: TRAINER_LOGIN_SUCCESS, phone };
    }

    function failure(error) {
        return { type: TRAINER_LOGIN_FAILURE, error };
    }
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("trainerToken");
    return { type: TRAINER_LOGOUT };
}