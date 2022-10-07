import { TRAINER_INITIAL_API_LOAD_SUCCESS } from "./trainerLoginTypes";
import { TRAINER_API_LOAD_INITIALIZE } from "./trainerLoginTypes";

export const trainerApiLoadInitialize = () => {
    return {
        type: TRAINER_API_LOAD_INITIALIZE,
    };
};

export const trainerApiLoadSuccess = () => {
    return {
        type: TRAINER_INITIAL_API_LOAD_SUCCESS,
    };
};