import { combineReducers } from "redux";

import sAdminDietRequestReducer from "./SAdminDietRequest/sAdminDietRequestReducer";
import sAdminDietTypeReducer from "./SAdminDietType/sAdminDietTypeReducer";
import sAdminExerciseRequestReducer from "./SAdminExerciseRequest/sAdminExerciseRequestReducer";
import sAdminExerciseTypeReducer from "./SAdminExerciseType/sAdminExerciseTypeReducer";
import sAdminExpenseReducer from "./SAdminExpense/sAdminExpenseReducer";
import sAdminLoginReducer from "./SAdminLogin/sAdminLoginReducer";
import sAdminPaymentPackageReducer from "./SAdminPaymentPackage/sAdminPaymentPackageReducer";
import sAdminProfileReducer from "./SAdminProfile/sAdminProfileReducer";
import sAdminTraineeReducer from "./SAdminTrainee/sAdminTraineeReducer";
import sAdminTrainerPaymentReducer from "./SAdminTrainerPayment/sAdminTrainerPaymentReducer";
import slideMenuReducer from "./SlideMenu/slideMenuReducer";

const rootReducer = combineReducers({
    sAdminDietRequestReducer,
    sAdminDietTypeReducer,
    sAdminExerciseRequestReducer,
    sAdminExerciseTypeReducer,
    sAdminExpenseReducer,
    sAdminLoginReducer,
    sAdminPaymentPackageReducer,
    sAdminProfileReducer,
    sAdminTraineeReducer,
    sAdminTrainerPaymentReducer,
    slideMenuReducer,
});

export default rootReducer;