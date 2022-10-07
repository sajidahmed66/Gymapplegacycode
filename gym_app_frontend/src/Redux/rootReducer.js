import { combineReducers } from "redux";

import traineeDietRequestReducer from "./TraineeDietRequest/traineeDietRequestReducer";
import traineeExerciseRequestReducer from "./TraineeExerciseRequest/traineeExerciseRequestReducer";
import traineeLoginReducer from "./TraineeLogin/traineeLoginReducer";
import traineeProfileReducer from "./TraineeProfile/traineeProfileReducer";
import traineeSlideMenuReducer from "./TraineeSlideMenu/traineeSlideMenuReducer";
import trainerDietTypeReducer from "./TrainerDietType/trainerDietTypeReducer";
import trainerExerciseTypeReducer from "./TrainerExerciseType/trainerExerciseTypeReducer";
import trainerLoginReducer from "./TrainerLogin/trainerLoginReducer";
import trainerProfileReducer from "./TrainerProfile/trainerProfileReducer";
import trainerSlideMenuReducer from "./TrainerSlideMenu/trainerSlideMenuReducer";
import trainerTraineeDietRequestReducer from "./TrainerTraineeDietRequest/trainerTraineeDietRequestReducer";
import trainerTraineeExerciseRequestReducer from "./TrainerTraineeExerciseRequest/trainerTraineeExerciseRequestReducer";

const rootReducer = combineReducers({
    traineeDietRequestReducer,
    traineeExerciseRequestReducer,
    traineeLoginReducer,
    traineeProfileReducer,
    traineeSlideMenuReducer,
    trainerDietTypeReducer,
    trainerExerciseTypeReducer,
    trainerLoginReducer,
    trainerProfileReducer,
    trainerSlideMenuReducer,
    trainerTraineeDietRequestReducer,
    trainerTraineeExerciseRequestReducer,
});

export default rootReducer;