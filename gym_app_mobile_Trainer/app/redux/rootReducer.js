import { combineReducers } from 'redux';

import trainerLoginReducer from './trainerLogIn/trainerLogInReducer';
import trainerProfileReducer from './trainerProfile/trainerProfileReducer';
import trainerAssignExerciseListReducer from './trainerAssingExercises/trainerAssignExerciseReducer'
const rootReducer = combineReducers({
    trainerLoginReducer,
    trainerProfileReducer,
    trainerAssignExerciseListReducer
});


export default rootReducer;