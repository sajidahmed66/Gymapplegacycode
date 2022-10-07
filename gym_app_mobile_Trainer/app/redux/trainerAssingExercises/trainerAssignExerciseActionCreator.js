import * as actionTypes from './trainerAssignExerciseActonType';
import { traineeRequestsList } from '../../api/traineeRequestsList';

export const setTraineeExerciseReqList = (reqList) => {
    return {
        type: actionTypes.GET_TRAINEE_EXERCISE_REQUEST_LIST,
        payload: reqList
    }
};

export const setTraineeDietReqList = (reqList) => {
    return {
        type: actionTypes.GET_TRAINEE_DIET_REQUEST_LIST,
        payload: reqList
    }
}

export const getTraineeExerciseReqList = (token) => dispatch => {
    console.log("HIT")
    traineeRequestsList.GET_TRAINEE_EXERCISE_REQUEST_LIST(token).then(
        res => { console.log("get Exercise rqu list data", res.data) }
    )
        .catch(err => console.log("get Exercise Req List data:error", err))
}

export const getTraineeDietReqList = token => dispatch => {
    traineeRequestsList.GET_TRAINEE_DIET_REQUEST_LIST(token).then(
        res => { console.log("get diet Reqlist data", res.data) }
    )
        .catch(err => console.log("get diet Reqlist data:error", err))
}