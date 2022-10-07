import commonApi from "./commonApi";
import axios from "axios";
import { apiList } from "./apiList";

const sAdminAuthApi = {
  sAdminLogin(data) {
    return axios.post(commonApi.api + apiList.S_ADMIN_LOG_IN, data);
  },
};

export default sAdminAuthApi;
