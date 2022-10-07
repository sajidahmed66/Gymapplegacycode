import commonApi from "./commonApi";
import axios from "axios";
import apiList from "./apiList";

export const trainerUploadFileApi = {
    trainerExerciseUploadFile(data, token) {
        return axios.post(
            commonApi.api + apiList.TRAINER_ASSIGN_TRAINEE_EXERCISE_REQUEST,
            data,
            token
        )
    }
    ,
    trainerDietUploadFile(data, token) {
        // console.log("from api", commonApi.api + apiList.TRAINER_ASSIGN_TRAINEE_DIET_REQUEST, data, token)
        return axios.post(commonApi.api + apiList.TRAINER_ASSIGN_TRAINEE_DIET_REQUEST, data, token);
    },

};
