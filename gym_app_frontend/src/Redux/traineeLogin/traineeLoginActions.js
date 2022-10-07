import { TRAINEE_INITIAL_API_LOAD_SUCCESS } from "./traineeLoginTypes";
import { TRAINEE_API_LOAD_INITIALIZE } from "./traineeLoginTypes";

export const traineeApiLoadInitialize = () => {
    return {
        type: TRAINEE_API_LOAD_INITIALIZE,
    };
};

export const traineeApiLoadSuccess = () => {
    return {
        type: TRAINEE_INITIAL_API_LOAD_SUCCESS,
    };
};