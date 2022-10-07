const traineeCommonApi = "api/trainee/";

//list of api from backend to perform serverside action.

const apiList = {
    //trainee app apilist.

    //logIN and profile
    TRAINEE_LOG_IN: traineeCommonApi + "auth",
    TRAINEE_GET_PROFILE: traineeCommonApi + "profile/me",
    TRAINEE_UPDATE_PROFILE: traineeCommonApi + "profile",
    TRAINEE_UPDATE_PASSWORD: traineeCommonApi + "changePassword",

    TRAINEE_GET_GALLARY_IMAGE: traineeCommonApi + "traineeImages/me", //get request 
    TRAINEE_UPLOAD_GALLARY_IMAGE: traineeCommonApi + "traineeImages", //post request Uploads an image from react Native. 

    //send req for diet & exercise.
    TRAINEE_SEND_DITE_REQUEST: traineeCommonApi + "traineeDiets",
    TRAINEE_SEND_EXERCISE_REQUEST: traineeCommonApi + "traineeExercises",
    //dietlist , used in dietScreen.
    TRAINEE_GET_DITE_LIST: traineeCommonApi + "traineeDites/me",
    TRAINEE_GET_DITE_DETAILS: traineeCommonApi + "traineeDites", // add dite id in the end
    TRAINEE_GET_LAST_DIET_DETAILS: traineeCommonApi + "traineeDiets/last",
    TRAINEE_GET_DIET_REQUEST_TIME_LIMIT: traineeCommonApi + "dietRequestLimits",
    TRAINEE_SEND_DIET_REPORT: traineeCommonApi + "traineeDietHistories", // add diet id in the end
    //exercise , used in workoutScreen.
    TRAINEE_GET_EXERCISE_LIST: traineeCommonApi + "traineeExercises/me",
    TRAINEE_GET_EXERCISE_DETAILS: traineeCommonApi + "traineeExercises/", // add exercise id in the end
    TRAINEE_GET_EXERCISE_REQUEST_TIME_LIMIT: traineeCommonApi + "exerciseRequestLimits",
    TRAINEE_GET_LAST_EXERCISE_DETAILS: traineeCommonApi + "traineeExercises/last",
    TRAINEE_SEND_EXERCISE_REPORT: traineeCommonApi + "traineeExerciseHistories", // add exercise id in the end

    //payment details
    TRAINEE_GET_PAYMENTS: traineeCommonApi + "payments",
    TRAINEE_GET_PAYMENTS_DETAILS: traineeCommonApi + "payments" //add paiment id in the end
};

export default apiList;