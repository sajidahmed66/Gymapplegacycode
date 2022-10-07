import commonApi from "./commonApi";
import axios from "axios";
import apiList from "./apiList";



export const traineeRequestsList = {
    traineeExerciseReqList(token) {
        return axios.get(
            commonApi.api + apiList.TRAINER_GET_TRAINEE_EXERCISE_REQUEST_LIST,
            token
        )
    },
    traineeExerciseReqListDetails(id, token) {
        return axios.get(
            commonApi.api + apiList.TRAINER_GET_TRAINEE_EXERCISE_REQUEST_DETAILS + id,
            token
        )
    },
    traineeDietReqList(token) {
        return axios.get(
            commonApi.api + apiList.TRAINER_GET_TRAINEE_DIET_REQUEST_LIST, token
        )
    }
}