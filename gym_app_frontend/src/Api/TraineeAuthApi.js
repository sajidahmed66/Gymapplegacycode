import commonApi from "./commonApi";
import axios from "axios";
import { apiList } from "./index";

const traineeAuthApi = {
    traineeLogin(data) {
        return axios.post(commonApi.api + apiList.TRAINEE_LOG_IN, data);
    },
};

export default traineeAuthApi;