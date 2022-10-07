import { combineReducers } from 'redux';

import loginReducer from './userLogIn/loginReducer';
import workoutReducer from './workout/workoutReducer'
import traineeProfileReducer from './traineeProfile/traineeProfileReducer';


const rootReducer = combineReducers({
    loginReducer: loginReducer,
    workoutReducer: workoutReducer,
    traineeProfileReducer: traineeProfileReducer
});


export default rootReducer;