import axios from "axios";

import commonApi from "./commonApi";
import { apiList } from "./apiList";

export const sAdminTrainerList = {
    sAdminTrainerList(token) {
        return axios.get(commonApi.api + apiList.S_ADMIN_TRAINER_LIST, token);
    },
};