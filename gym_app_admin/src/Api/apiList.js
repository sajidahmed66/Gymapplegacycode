const sAdminCommonApi = "api/admin/";

// list of api s from backend to perform server side action
export const apiList = {
    S_ADMIN_LOG_IN: sAdminCommonApi + "auth",

    S_ADMIN_TRAINEE_REGISTRATION: sAdminCommonApi + "trainees",
    S_ADMIN_TRAINER_REGISTRATION: sAdminCommonApi + "trainers",
    S_ADMIN_ADMIN_REGISTRATION: sAdminCommonApi + "admins",

    S_ADMIN_GET_PROFILE: sAdminCommonApi + "profile/me",
    S_ADMIN_UPDATE_PROFILE: sAdminCommonApi + "profile",
    S_ADMIN_UPDATE_PASSWORD: sAdminCommonApi + "changePassword",

    S_ADMIN_TRAINER_LIST: sAdminCommonApi + "trainers",
    S_ADMIN_GET_TRAINEE_LIST: sAdminCommonApi + "trainees",

    S_ADMIN_GET_DIET_TYPE_LIST: sAdminCommonApi + "diets",
    S_ADMIN_GET_DIET_TYPE_DETAILS: sAdminCommonApi + "diets/", // add dietTypeId in the end
    S_ADMIN_ADD_DIET_TYPE: sAdminCommonApi + "diets",
    S_ADMIN_EDIT_DIET_TYPE_DETAILS: sAdminCommonApi + "diets/", // add dietTypeId in the end
    S_ADMIN_DELETE_DIET_TYPE_DETAILS: sAdminCommonApi + "diets/", // add dietTypeId in the end

    S_ADMIN_GET_EXERCISE_TYPE_LIST: sAdminCommonApi + "exercises",
    S_ADMIN_GET_EXERCISE_TYPE_DETAILS: sAdminCommonApi + "exercises/", // add exerciseTypeId in the end
    S_ADMIN_ADD_EXERCISE_TYPE: sAdminCommonApi + "exercises",
    S_ADMIN_EDIT_EXERCISE_TYPE_DETAILS: sAdminCommonApi + "exercises/", // add exerciseTypeId in the end
    S_ADMIN_DELETE_EXERCISE_TYPE_DETAILS: sAdminCommonApi + "exercises/", // add exerciseTypeId in the end

    S_ADMIN_GET_TRAINEE_DIET_REQUEST_LIST: sAdminCommonApi + "traineeDiets",
    S_ADMIN_GET_TRAINEE_DIET_REQUEST_DETAILS: sAdminCommonApi + "traineeDiets/", // add request id in the end
    S_ADMIN_ASSIGN_TRAINEE_DIET_REQUEST: sAdminCommonApi + "traineeDiets",

    S_ADMIN_GET_TRAINEE_EXERCISE_REQUEST_LIST: sAdminCommonApi + "traineeExercises",
    S_ADMIN_GET_TRAINEE_EXERCISE_REQUEST_DETAILS: sAdminCommonApi + "traineeExercises/", // add request id in the end
    S_ADMIN_ASSIGN_TRAINEE_EXERCISE_REQUEST: sAdminCommonApi + "traineeExercises",

    S_ADMIN_ADD_PAYMENT_PACKAGE: sAdminCommonApi + "packages",
    S_ADMIN_GET_PAYMENT_PACKAGE_LIST: sAdminCommonApi + "packages",
    S_ADMIN_EDIT_PAYMENT_PACKAGE_LIST: sAdminCommonApi + "packages/",

    S_ADMIN_GET_DIET_REQUEST_TIME_LIMIT: sAdminCommonApi + "dietRequestLimits",
    S_ADMIN_UPDATE_DIET_REQUEST_TIME_LIMIT: sAdminCommonApi + "dietRequestLimits/", // add id in the end
    S_ADMIN_GET_EXERCISE_REQUEST_TIME_LIMIT: sAdminCommonApi + "exerciseRequestLimits",
    S_ADMIN_UPDATE_EXERCISE_REQUEST_TIME_LIMIT: sAdminCommonApi + "exerciseRequestLimits/", // add id in the end

    S_ADMIN_GET_EXPENSE_LIST: sAdminCommonApi + "expenses",
    S_ADMIN_GET_EXPENSE_DETAILS: sAdminCommonApi + "expenses/", // add expenseId in the end
    S_ADMIN_ADD_EXPENSE: sAdminCommonApi + "expenses",
    S_ADMIN_UPDATE_EXPENSE: sAdminCommonApi + "expenses/", // add expenseId in the end
    S_ADMIN_DELETE_EXPENSE: sAdminCommonApi + "expenses/", // add expenseId in the end

    S_ADMIN_GET_TRAINER_PAYMENT_LIST: sAdminCommonApi + "trainerPayments",
    S_ADMIN_GET_TRAINER_PAYMENT_DETAILS: sAdminCommonApi + "trainerPayments/", // add trainerPaymentId in the end
    S_ADMIN_ADD_TRAINER_PAYMENT: sAdminCommonApi + "trainerPayments",
    S_ADMIN_UPDATE_TRAINER_PAYMENT: sAdminCommonApi + "trainerPayments/", // add trainerPaymentId in the end
    S_ADMIN_DELETE_TRAINER_PAYMENT: sAdminCommonApi + "trainerPayments/", // add trainerPaymentId in the end

    //Trainee payment
    S_ADMIN_GET_TRAINEE_PAYMENT_LIST: sAdminCommonApi + "payments/trainee/", // add traineePaymentId in the end
    S_ADMIN_GET_TRAINEE_PAYMENT_TYPE: sAdminCommonApi + "payments/", // add traineePaymentId in the end
    S_ADMIN_GET_TRAINEE_PAYMENT_MONTHLY: sAdminCommonApi + "payments", // add traineePaymentId in the end
    // S_ADMIN_GET_TRAINER_PAYMENT_DETAILS: sAdminCommonApi + "trainerPayments/", // add traineePaymentId in the end
    // S_ADMIN_ADD_TRAINER_PAYMENT: sAdminCommonApi + "trainerPayments",
    // S_ADMIN_UPDATE_TRAINER_PAYMENT: sAdminCommonApi + "trainerPayments/", // add trainerPaymentId in the end
    // S_ADMIN_DELETE_TRAINER_PAYMENT: sAdminCommonApi + "trainerPayments/", // add trainerPaymentId in the end
};