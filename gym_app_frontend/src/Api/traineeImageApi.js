import axios from "axios";

import commonApi from "./commonApi";
import { apiList } from "./index";

export const traineeImageApi = {
    traineeUpLoadImage(images, token) {
        return axios.post(
            commonApi.api + apiList.TRAINEE_UPLOAD_IMAGE,
            images,
            token
        );
    },
};