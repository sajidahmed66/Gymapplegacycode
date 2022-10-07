import commonApi from "./commonApi";
import axios from "axios";
import apiList from "./apiList";


export const trainerDietList = {
    getFullDietList(token) {
        return axios.get(
            commonApi.api + apiList.TRAINER_GET_DIET_TYPE_LIST,
            token
        )
    },
    addDiet(data,token) {
        return axios.post(
            commonApi.api + apiList.TRAINER_ADD_DIET_TYPE,
            data,
            token
        )
    }
}