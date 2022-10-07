import commonApi from "./commonApi";
import apiList from "./apiList";
import axios from "axios";

const traineeGallaryApi = {
    traineeGetGallryImage(token) {
        return axios.get(
            commonApi.api + apiList.TRAINEE_GET_GALLARY_IMAGE,
            token
        )
    },

    traineeUploadGallaryImage(updatedImage, token) {
        return axios.post(
            commonApi.api + apiList.TRAINEE_UPLOAD_GALLARY_IMAGE,
            updatedImage,
            token
        )
    }
};

export default traineeGallaryApi;