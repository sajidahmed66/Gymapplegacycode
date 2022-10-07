import commonApi from "./commonApi";
import axios from "axios";
import { apiList } from "./index";

const trainerAuthApi = {
    trainerLogin(data) {
        return axios.post(commonApi.api + apiList.TRAINER_LOG_IN, data);
    },
};

export default trainerAuthApi;