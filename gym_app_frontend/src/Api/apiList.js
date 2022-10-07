const traineeCommonApi = "api/trainee/";
const trainerCommonApi = "api/trainer/";

// list of api s from backend to perform server side action
export const apiList = {
    // trainee panel api list
    TRAINEE_LOG_IN: traineeCommonApi + "auth",

    TRAINEE_GET_PROFILE: traineeCommonApi + "profile/me",
    TRAINEE_UPDATE_PROFILE: traineeCommonApi + "profile",

    TRAINEE_UPDATE_PASSWORD: traineeCommonApi + "changePassword",

    TRAINEE_GET_DIET_REQUEST_TIME_LIMIT: traineeCommonApi + "dietRequestLimits",
    TRAINEE_GET_EXERCISE_REQUEST_TIME_LIMIT: traineeCommonApi + "exerciseRequestLimits",

    TRAINEE_SEND_DIET_REQUEST: traineeCommonApi + "traineeDiets",
    TRAINEE_SEND_EXERCISE_REQUEST: traineeCommonApi + "traineeExercises",

    TRAINEE_GET_DIET_LIST: traineeCommonApi + "traineeDiets/me",
    TRAINEE_GET_DIET_DETAILS: traineeCommonApi + "traineeDiets/", // add diet id in the end
    TRAINEE_GET_LAST_DIET_DETAILS: traineeCommonApi + "traineeDiets/last",
    TRAINEE_SEND_DIET_REPORT: traineeCommonApi + "traineeDietHistories", // add diet id in the end

    TRAINEE_GET_EXERCISE_LIST: traineeCommonApi + "traineeExercises/me",
    TRAINEE_GET_EXERCISE_DETAILS: traineeCommonApi + "traineeExercises/", // add exercise id in the end
    TRAINEE_GET_LAST_EXERCISE_DETAILS: traineeCommonApi + "traineeExercises/last",
    TRAINEE_SEND_EXERCISE_REPORT: traineeCommonApi + "traineeExerciseHistories", // add exercise id in the end

    TRAINEE_UPLOAD_IMAGE: traineeCommonApi + "traineeImages",

    // trainer panel api list
    TRAINER_LOG_IN: trainerCommonApi + "auth",

    TRAINER_GET_PROFILE: trainerCommonApi + "profile/me",
    TRAINER_UPDATE_PROFILE: trainerCommonApi + "profile",

    TRAINER_GET_DIET_TYPE_LIST: trainerCommonApi + "diets",
    TRAINER_GET_DIET_TYPE_DETAILS: trainerCommonApi + "diets/", // add dietTypeId in the end
    TRAINER_ADD_DIET_TYPE: trainerCommonApi + "diets",
    TRAINER_EDIT_DIET_TYPE_DETAILS: trainerCommonApi + "diets/", // add dietTypeId in the end
    TRAINER_DELETE_DIET_TYPE_DETAILS: trainerCommonApi + "diets/", // add dietTypeId in the end

    TRAINER_GET_EXERCISE_TYPE_LIST: trainerCommonApi + "exercises",
    TRAINER_GET_EXERCISE_TYPE_DETAILS: trainerCommonApi + "exercises/", // add exerciseTypeId in the end
    TRAINER_ADD_EXERCISE_TYPE: trainerCommonApi + "exercises",
    TRAINER_EDIT_EXERCISE_TYPE_DETAILS: trainerCommonApi + "exercises/", // add exerciseTypeId in the end
    TRAINER_DELETE_EXERCISE_TYPE_DETAILS: trainerCommonApi + "exercises/", // add exerciseTypeId in the end

    TRAINER_UPDATE_PASSWORD: trainerCommonApi + "changePassword",

    TRAINER_GET_TRAINEE_DIET_REQUEST_LIST: trainerCommonApi + "traineeDiets",
    TRAINER_GET_TRAINEE_DIET_REQUEST_DETAILS: trainerCommonApi + "traineeDiets/", // add request id in the end
    TRAINER_ASSIGN_TRAINEE_DIET_REQUEST: trainerCommonApi + "traineeDiets",

    TRAINER_GET_TRAINEE_EXERCISE_REQUEST_LIST: trainerCommonApi + "traineeExercises",
    TRAINER_GET_TRAINEE_EXERCISE_REQUEST_DETAILS: trainerCommonApi + "traineeExercises/", // add request id in the end
    TRAINER_ASSIGN_TRAINEE_EXERCISE_REQUEST: trainerCommonApi + "traineeExercises",
};