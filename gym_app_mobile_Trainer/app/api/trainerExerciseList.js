import commonApi from "./commonApi";
import axios from "axios";
import apiList from "./apiList";


export const trainerExerciseList = {
    getFullExerciseList(token) {
        return axios.get(
            commonApi.api + apiList.TRAINER_GET_EXERCISE_TYPE_LIST,
            token
        )
    },
    addExercise(data,token) {
        return axios.post(
            commonApi.api + apiList.TRAINER_ADD_EXERCISE_TYPE,
            data,
            token
        )
    }
}