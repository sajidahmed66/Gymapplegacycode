import commonApi from "./commonApi";
import apiList from './apiList';
import axios from 'axios';

const traineeAuthApi = {
    
    traineeLogIN(data) {
        // console.log(data)
        return axios.post(commonApi.api + apiList.TRAINEE_LOG_IN, data);
    }
}

export default traineeAuthApi;