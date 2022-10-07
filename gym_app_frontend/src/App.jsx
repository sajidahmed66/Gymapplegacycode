import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import AppIndex from "./Components/AppIndex/AppIndex";

import TraineeChangePassword from "./Components/TraineeChangePassword/TraineeChangePassword";
import TraineeDietDetails from "./Components/TraineeDietDetails/TraineeDietDetails";
import TraineeDietList from "./Components/TraineeDietList/TraineeDietList";
import { TraineeDietSendReport } from "./Components/TraineeDietSendReport";
import { TraineeExerciseDetails } from "./Components/TraineeExerciseDetails";
import { TraineeExerciseList } from "./Components/TraineeExerciseList";
import { TraineeExerciseSendReport } from "./Components/TraineeExerciseSendReport";
import TraineeFoodList from "./Components/TraineeFoodList/TraineeFoodList";
import TraineeGallery from "./Components/TraineeGallery/TraineeGallery";
import TraineeHome from "./Components/TraineeHome/TraineeHome";
import TraineeInitialApiLoader from "./Components/TraineeInitialApiLoader/TraineeInitialApiLoader";
import TraineeLogin from "./Components/TraineeLogin/TraineeLogin";
import TraineeProfile from "./Components/TraineeProfile/TraineeProfile";
import TraineeSendRequest from "./Components/TraineeSendRequest/TraineeSendRequest";
import TraineeUpdateProfile from "./Components/TraineeUpdateProfile/TraineeUpdateProfile";
import TraineeWorkoutHistory from "./Components/TraineeWorkoutHistory/TraineeWorkoutHistory";
import TraineeWorkoutList from "./Components/TraineeWorkoutList/TraineeWorkoutList";

import TrainerChangePassword from "./Components/TrainerChangePassword/TrainerChangePassword";
import { TrainerDietTypeDetails } from "./Components/TrainerDietTypeDetails";
import { TrainerDietTypeDetailsEdit } from "./Components/TrainerDietTypeDetailsEdit";
import { TrainerDietTypeList } from "./Components/TrainerDietTypeList";
import { TrainerExerciseTypeDetails } from "./Components/TrainerExerciseTypeDetails";
import { TrainerExerciseTypeList } from "./Components/TrainerExerciseTypeList";
import TrainerFoodList from "./Components/TrainerFoodList/TrainerFoodList";
import TrainerGallery from "./Components/TrainerGallery/TrainerGallery";
import TrainerHome from "./Components/TrainerHome/TrainerHome";
import TrainerInitialApiLoader from "./Components/TrainerInitialApiLoader/TrainerInitialApiLoader";
import TrainerLogin from "./Components/TrainerLogin/TrainerLogin";
import TrainerProfile from "./Components/TrainerProfile/TrainerProfile";
import { TrainerTraineeDietRequestAssignFile } from "./Components/TrainerTraineeDietRequestAssignFile";
import { TrainerTraineeDietRequestAssignManually } from "./Components/TrainerTraineeDietRequestAssignManually";
import { TrainerTraineeDietRequestAssignType } from "./Components/TrainerTraineeDietRequestAssignType";
import { TrainerTraineeDietRequestDetails } from "./Components/TrainerTraineeDietRequestDetails";
import { TrainerTraineeDietRequestList } from "./Components/TrainerTraineeDietRequestList";
import { TrainerTraineeExerciseRequestAssignFile } from "./Components/TrainerTraineeExerciseRequestAssignFile";
import { TrainerTraineeExerciseRequestAssignManually } from "./Components/TrainerTraineeExerciseRequestAssignManually";
import { TrainerTraineeExerciseRequestAssignType } from "./Components/TrainerTraineeExerciseRequestAssignType";
import { TrainerTraineeExerciseRequestDetails } from "./Components/TrainerTraineeExerciseRequestDetails";
import { TrainerTraineeExerciseRequestList } from "./Components/TrainerTraineeExerciseRequestList";
import TrainerUpdateProfile from "./Components/TrainerUpdateProfile/TrainerUpdateProfile";
import TrainerWorkoutHistory from "./Components/TrainerWorkoutHistory/TrainerWorkoutHistory";
import TrainerWorkoutList from "./Components/TrainerWorkoutList/TrainerWorkoutList";

import { history } from "./HelperFunctions";
import TraineePrivateRoute from "./HelperFunctions/TraineePrivateRoute";
import TraineeProfileProtectedPrivateRoute from "./HelperFunctions/TraineeProfileProtectedPrivateRoute";
import TraineePublicRoute from "./HelperFunctions/TraineePublicRoute";
import TrainerPrivateRoute from "./HelperFunctions/TrainerPrivateRoute";
import TrainerProfileProtectedPrivateRoute from "./HelperFunctions/TrainerProfileProtectedPrivateRoute";
import TrainerPublicRoute from "./HelperFunctions/TrainerPublicRoute";

import { routesList } from "./Constants";

import "./App.css";
import { TrainerExerciseTypeDetailsEdit } from "./Components/TrainerExerciseTypeDetailsEdit";
import { TraineeUploadImage } from "./Components/TraineeUploadImage/TraineeUploadImage";

class App extends Component {
  render() {
    const {
      trainerLoggedIn,
      trainerApiLoaded,
      traineeLoggedIn,
      traineeApiLoaded,
    } = this.props;

    const trainerProfile = true;
    const traineeProfile = true;

    return (
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={AppIndex} />

          {/* Routing for trainee panel */}

          <TraineePrivateRoute
            traineeLoggedIn={traineeLoggedIn}
            component={TraineeHome}
            path={routesList.TRAINEE_HOME} // /profile
            exact
          />

          <TraineePrivateRoute
            component={TraineeInitialApiLoader}
            traineeLoggedIn={traineeLoggedIn}
            path={routesList.TRAINEE_INITIAL_API_LOADER} // /s-admin-initial-api-loader
            exact
          />

          <TraineeProfileProtectedPrivateRoute
            component={TraineeProfile}
            traineeLoggedIn={traineeLoggedIn}
            traineeProfile={traineeProfile}
            path={routesList.TRAINEE_PROFILE} // /profile
            exact
          />

          <TraineePrivateRoute
            component={TraineeUpdateProfile}
            traineeLoggedIn={traineeLoggedIn}
            path={routesList.TRAINEE_UPDATE_PROFILE} // /profile
            exact
          />

          <TraineePrivateRoute
            component={TraineeSendRequest}
            traineeLoggedIn={traineeLoggedIn}
            path={routesList.TRAINEE_SEND_REQUEST} // /profile
            exact
          />

          <TraineePrivateRoute
            component={TraineeDietList}
            traineeLoggedIn={traineeLoggedIn}
            path={routesList.TRAINEE_DIET_REQUEST_LIST} // /profile
            exact
          />

          <TraineePrivateRoute
            component={TraineeDietDetails}
            traineeLoggedIn={traineeLoggedIn}
            path={routesList.TRAINEE_DIET_REQUEST_DETAILS + "/:dietId"} // /profile
            exact
          />

          <TraineePrivateRoute
            component={TraineeDietSendReport}
            traineeLoggedIn={traineeLoggedIn}
            path={routesList.TRAINEE_SEND_DIET_REPORT + "/:dietId"} // /profile
            exact
          />

          <TraineePrivateRoute
            component={TraineeExerciseList}
            traineeLoggedIn={traineeLoggedIn}
            path={routesList.TRAINEE_EXERCISE_REQUEST_LIST} // /trainee-exercise-request-list
            exact
          />

          <TraineePrivateRoute
            component={TraineeExerciseDetails}
            traineeLoggedIn={traineeLoggedIn}
            path={routesList.TRAINEE_EXERCISE_REQUEST_DETAILS + "/:exerciseId"} // /trainee-exercise-request-details/:exerciseId
            exact
          />

          <TraineePrivateRoute
            component={TraineeExerciseSendReport}
            traineeLoggedIn={traineeLoggedIn}
            path={routesList.TRAINEE_SEND_EXERCISE_REPORT + "/:exerciseId"} // /profile
            exact
          />

          <TraineePrivateRoute
            component={TraineeGallery}
            traineeLoggedIn={traineeLoggedIn}
            path={routesList.TRAINEE_GALLERY} // /profile
            exact
          />

          <TraineePrivateRoute
            component={TraineeFoodList}
            traineeLoggedIn={traineeLoggedIn}
            path={routesList.TRAINEE_FOOD_LIST} // /profile
            exact
          />

          <TraineePrivateRoute
            component={TraineeWorkoutList}
            traineeLoggedIn={traineeLoggedIn}
            path={routesList.TRAINEE_WORKOUT_LIST} // /profile
            exact
          />

          <TraineePrivateRoute
            component={TraineeWorkoutHistory}
            traineeLoggedIn={traineeLoggedIn}
            path={routesList.TRAINEE_WORKOUT_HISTORY} // /profile
            exact
          />

          <TraineePrivateRoute
            component={TraineeUploadImage}
            traineeLoggedIn={traineeLoggedIn}
            path={routesList.TRAINEE_UPLOAD_IMAGE} // /trainee-upload-image
            exact
          />

          <TraineePrivateRoute
            component={TraineeChangePassword}
            traineeLoggedIn={traineeLoggedIn}
            path={routesList.TRAINEE_CHANGE_PASSWORD} // /profile
            exact
          />

          <TraineePublicRoute
            restricted={true}
            apiLoaded={traineeApiLoaded}
            traineeLoggedIn={traineeLoggedIn}
            component={TraineeLogin}
            path={routesList.TRAINEE_LOG_IN} // /trainee-login
            exact
          />

          {/* Routing for trainer panel */}

          <TrainerPrivateRoute
            trainerLoggedIn={trainerLoggedIn}
            component={TrainerHome}
            path={routesList.TRAINER_HOME} // /profile
            exact
          />

          <TrainerPrivateRoute
            component={TrainerInitialApiLoader}
            trainerLoggedIn={trainerLoggedIn}
            path={routesList.TRAINER_INITIAL_API_LOADER} // /s-admin-initial-api-loader
            exact
          />

          <TrainerProfileProtectedPrivateRoute
            component={TrainerProfile}
            trainerLoggedIn={trainerLoggedIn}
            trainerProfile={trainerProfile}
            path={routesList.TRAINER_PROFILE} // /profile
            exact
          />

          <TrainerPrivateRoute
            component={TrainerUpdateProfile}
            trainerLoggedIn={trainerLoggedIn}
            path={routesList.TRAINER_UPDATE_PROFILE} // /profile
            exact
          />

          <TrainerPrivateRoute
            component={TrainerDietTypeList}
            trainerLoggedIn={trainerLoggedIn}
            path={routesList.TRAINER_GET_DIET_TYPE_LIST} // /trainer-diet-type-list
            exact
          />

          <TrainerPrivateRoute
            component={TrainerDietTypeDetails}
            trainerLoggedIn={trainerLoggedIn}
            path={routesList.TRAINER_GET_DIET_TYPE_DETAILS + "/:dietTypeId"} // /trainer-diet-type-details
            exact
          />

          <TrainerPrivateRoute
            component={TrainerDietTypeDetailsEdit}
            trainerLoggedIn={trainerLoggedIn}
            path={routesList.TRAINER_EDIT_DIET_TYPE_DETAILS + "/:dietTypeId"} // /trainer-diet-type-details-edit
            exact
          />

          <TrainerPrivateRoute
            component={TrainerExerciseTypeList}
            trainerLoggedIn={trainerLoggedIn}
            path={routesList.TRAINER_GET_EXERCISE_TYPE_LIST} // /trainer-exercise-type-list
            exact
          />

          <TrainerPrivateRoute
            component={TrainerExerciseTypeDetails}
            trainerLoggedIn={trainerLoggedIn}
            path={
              routesList.TRAINER_GET_EXERCISE_TYPE_DETAILS + "/:exerciseTypeId"
            } // /trainer-exercise-type-details
            exact
          />

          <TrainerPrivateRoute
            component={TrainerExerciseTypeDetailsEdit}
            trainerLoggedIn={trainerLoggedIn}
            path={
              routesList.TRAINER_EDIT_EXERCISE_TYPE_DETAILS + "/:exerciseTypeId"
            } // /trainer-exercise-type-details-edit
            exact
          />

          <TrainerPrivateRoute
            component={TrainerTraineeDietRequestList}
            trainerLoggedIn={trainerLoggedIn}
            path={routesList.TRAINER_TRAINEE_DIET_REQUEST_LIST} // /profile
            exact
          />

          <TrainerPrivateRoute
            component={TrainerTraineeDietRequestDetails}
            trainerLoggedIn={trainerLoggedIn}
            path={
              routesList.TRAINER_TRAINEE_DIET_REQUEST_DETAILS + "/:requestId"
            }
            exact
          />

          <TrainerPrivateRoute
            component={TrainerTraineeDietRequestAssignType}
            trainerLoggedIn={trainerLoggedIn}
            path={
              routesList.TRAINER_TRAINEE_DIET_REQUEST_ASSIGN_TYPE +
              "/:requestId"
            } // /trainer-trainee-diet-request-assign-type/:requestId
            exact
          />

          <TrainerPrivateRoute
            component={TrainerTraineeDietRequestAssignManually}
            trainerLoggedIn={trainerLoggedIn}
            path={
              routesList.TRAINER_TRAINEE_DIET_REQUEST_ASSIGN_MANUALLY +
              "/:requestId"
            } // /trainer-trainee-diet-request-assign-manually/:requestId
            exact
          />

          <TrainerPrivateRoute
            component={TrainerTraineeDietRequestAssignFile}
            trainerLoggedIn={trainerLoggedIn}
            path={
              routesList.TRAINER_TRAINEE_DIET_REQUEST_ASSIGN_FILE +
              "/:requestId"
            } // /trainer-trainee-diet-request-assign-file/:requestId
            exact
          />

          <TrainerPrivateRoute
            component={TrainerTraineeExerciseRequestList}
            trainerLoggedIn={trainerLoggedIn}
            path={routesList.TRAINER_TRAINEE_EXERCISE_REQUEST_LIST} // /trainer-trainee-exercise-request-list
            exact
          />

          <TrainerPrivateRoute
            component={TrainerTraineeExerciseRequestDetails}
            trainerLoggedIn={trainerLoggedIn}
            path={
              routesList.TRAINER_TRAINEE_EXERCISE_REQUEST_DETAILS +
              "/:requestId"
            } // /trainer-trainee-exercise-request-details/:requestId
            exact
          />

          <TrainerPrivateRoute
            component={TrainerTraineeExerciseRequestAssignType}
            trainerLoggedIn={trainerLoggedIn}
            path={
              routesList.TRAINER_TRAINEE_EXERCISE_REQUEST_ASSIGN_TYPE +
              "/:requestId"
            } // /trainer-trainee-exercise-request-assign-type/:requestId
            exact
          />

          <TrainerPrivateRoute
            component={TrainerTraineeExerciseRequestAssignManually}
            trainerLoggedIn={trainerLoggedIn}
            path={
              routesList.TRAINER_TRAINEE_EXERCISE_REQUEST_ASSIGN_MANUALLY +
              "/:requestId"
            }
            exact
          />

          <TrainerPrivateRoute
            component={TrainerTraineeExerciseRequestAssignFile}
            trainerLoggedIn={trainerLoggedIn}
            path={
              routesList.TRAINER_TRAINEE_EXERCISE_REQUEST_ASSIGN_FILE +
              "/:requestId"
            } // /trainer-trainee-exercise-request-assign-file/:requestId
            exact
          />

          <TrainerPrivateRoute
            component={TrainerGallery}
            trainerLoggedIn={trainerLoggedIn}
            path={routesList.TRAINER_GALLERY} // /profile
            exact
          />

          <TrainerPrivateRoute
            component={TrainerFoodList}
            trainerLoggedIn={trainerLoggedIn}
            path={routesList.TRAINER_FOOD_LIST} // /profile
            exact
          />

          <TrainerPrivateRoute
            component={TrainerWorkoutList}
            trainerLoggedIn={trainerLoggedIn}
            path={routesList.TRAINER_WORKOUT_LIST} // /profile
            exact
          />

          <TrainerPrivateRoute
            component={TrainerWorkoutHistory}
            trainerLoggedIn={trainerLoggedIn}
            path={routesList.TRAINER_WORKOUT_HISTORY} // /profile
            exact
          />

          <TrainerPrivateRoute
            component={TrainerChangePassword}
            trainerLoggedIn={trainerLoggedIn}
            path={routesList.TRAINER_CHANGE_PASSWORD} // /profile
            exact
          />

          <TrainerPublicRoute
            restricted={true}
            apiLoaded={trainerApiLoaded}
            trainerLoggedIn={trainerLoggedIn}
            component={TrainerLogin}
            path={routesList.TRAINER_LOG_IN} // /trainer-login
            exact
          />
        </Switch>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  const traineeApiLoaded = state.traineeLoginReducer.apiLoaded;
  const traineeLoggedIn = state.traineeLoginReducer.loggedIn;
  const traineeProfile = state.traineeProfileReducer.profileData;
  const trainerApiLoaded = state.trainerLoginReducer.apiLoaded;
  const trainerLoggedIn = state.trainerLoginReducer.loggedIn;
  const trainerProfile = state.trainerProfileReducer.profileData;

  return {
    traineeApiLoaded,
    traineeLoggedIn,
    traineeProfile,
    trainerApiLoaded,
    trainerLoggedIn,
    trainerProfile,
  };
}

export default connect(mapStateToProps)(App);
