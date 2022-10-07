import commonApi from "./common";
import axios from "axios";
import apiList from "./apiList";

const traineeAuthApi = {
    traineeLogin(data) {
        return axios.post(commonApi.api + apiList.TRAINEE_LOG_IN, data);
        //http://localhost:5000/api/trainee/auth
    },
};

export default traineeAuthApi;