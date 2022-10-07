import { S_ADMIN_INITIAL_API_LOAD_SUCCESS } from "./sAdminLoginTypes";
import { S_ADMIN_API_LOAD_INITIALIZE } from "./sAdminLoginTypes";

export const sAdminApiLoadInitialize = () => {
    return {
        type: S_ADMIN_API_LOAD_INITIALIZE,
    };
};

export const sAdminApiLoadSuccess = () => {
    return {
        type: S_ADMIN_INITIAL_API_LOAD_SUCCESS,
    };
};