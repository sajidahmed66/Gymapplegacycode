const trainerCommonApi = "api/trainer/";


const apiList = {
    TRAINER_LOG_IN: trainerCommonApi + "auth",
    TRAINER_GET_PROFILE: trainerCommonApi + "profile/me",
    TRAINEE_GET_PROFILE: trainerCommonApi + "profile/trainee",
    TRAINEE_GET_IMAGES: trainerCommonApi + "trainee/images",
    TRAINER_UPDATE_PROFILE: trainerCommonApi + "profile",
    TRAINER_UPDATE_PASSWORD: trainerCommonApi + "changePassword",

    TRAINER_GET_TRAINEE_DIET_REQUEST_LIST: trainerCommonApi + "traineeDiets",
    TRAINER_GET_TRAINEE_DIET_REQUEST_DETAILS: trainerCommonApi + "traineeDiets/", // add request id in the end
    TRAINER_ASSIGN_TRAINEE_DIET_REQUEST: trainerCommonApi + "traineeDiets", // assign pdf file for upload.

    TRAINER_GET_TRAINEE_EXERCISE_REQUEST_LIST: trainerCommonApi + "traineeExercises",
    TRAINER_GET_TRAINEE_EXERCISE_REQUEST_DETAILS: trainerCommonApi + "traineeExercises/", // add request id in the end

    TRAINER_ASSIGN_TRAINEE_EXERCISE_REQUEST: trainerCommonApi + "traineeExercises",//assign exercise as pdf/doc/image

    TRAINER_GET_DIET_TYPE_LIST: trainerCommonApi + "diets",
    TRAINER_ADD_DIET_TYPE: trainerCommonApi + "diets", // add id in the end.
    TRAINER_GET_EXERCISE_TYPE_LIST: trainerCommonApi + "exercises",
    TRAINER_ADD_EXERCISE_TYPE: trainerCommonApi + "exercises", // add id in the end 

    //PAYMENTs
    TRAINER_GET_PAYMENT_HISTORY: trainerCommonApi + "trainerPayments/me",
    TRAINER_GET_PAYMENT_DETAILS: trainerCommonApi + "trainerPayments/" // add id on the end
}

export default apiList;