import { TRAINEE_LOGIN_REQUEST } from "../Redux/TraineeLogin/traineeLoginTypes";
import { TRAINEE_LOGIN_SUCCESS } from "../Redux/TraineeLogin/traineeLoginTypes";
import { TRAINEE_LOGIN_FAILURE } from "../Redux/TraineeLogin/traineeLoginTypes";
import { TRAINEE_LOGOUT } from "../Redux/TraineeLogin/traineeLoginTypes";

import traineeAuthApi from "../Api/traineeAuthApi";

export const traineeAuthActions = {
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

        traineeAuthApi
            .traineeLogin(data)
            .then((res1) => {
                const token = JSON.stringify(res1.data.token);

                window.localStorage.setItem("traineeToken", token);
                dispatch(success(phone));
            })
            .catch((err) => {
                console.log(err);
                dispatch(failure(err));
            });
    };

    function request(phone) {
        return { type: TRAINEE_LOGIN_REQUEST, phone };
    }

    function success(phone) {
        return { type: TRAINEE_LOGIN_SUCCESS, phone };
    }

    function failure(error) {
        return { type: TRAINEE_LOGIN_FAILURE, error };
    }
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("traineeToken");
    return { type: TRAINEE_LOGOUT };
}