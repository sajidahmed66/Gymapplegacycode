import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

// SAdmin
import AppIndex from "./Components/AppIndex/AppIndex";
import { SAdminAdminRegistration } from "./Components/SAdminAdminRegistration";
import SAdminChangePassword from "./Components/SAdminChangePassword/SAdminChangePassword";
import { SAdminDietTypeDetails } from "./Components/SAdminDietTypeDetails";
import { SAdminDietTypeDetailsEdit } from "./Components/SAdminDietTypeDetailsEdit";
import SAdminDietTypeList from "./Components/SAdminDietTypeList/SAdminDietTypeList";
import { SAdminExerciseTypeDetails } from "./Components/SAdminExerciseTypeDetails";
import { SAdminExerciseTypeDetailsEdit } from "./Components/SAdminExerciseTypeDetailsEdit";
import SAdminExerciseTypeList from "./Components/SAdminExerciseTypeList/SAdminExerciseTypeList";
import { SAdminExpenseDetails } from "./Components/SAdminExpenseDetails";
import { SAdminExpenseEdit } from "./Components/SAdminExpenseEdit";
import { SAdminExpenseList } from "./Components/SAdminExpenseList";
import SAdminFoodList from "./Components/SAdminFoodList/SAdminFoodList";
import SAdminGallery from "./Components/SAdminGallery/SAdminGallery";
import SAdminHome from "./Components/SAdminHome/SAdminHome";
import SAdminInitialApiLoader from "./Components/SAdminInitialApiLoader/SAdminInitialApiLoader";
import SAdminLogin from "./Components/SAdminLogin/SAdminLogin";
import SAdminPaymentPackageAdd from "./Components/SAdminPaymentPackage/SAdminPaymentPackageAdd";
import SAdminPaymentPackageEdit from "./Components/SAdminPaymentPackage/SAdminPaymentPackageEdit";
import SAdminPaymentPackageList from "./Components/SAdminPaymentPackage/SAdminPaymentPackageList";
import SAdminProfile from "./Components/SAdminProfile/SAdminProfile";
import { SAdminTraineeDietRequestAssign } from "./Components/SAdminTraineeDietRequestAssign";
import SAdminTraineeDietRequestDetails from "./Components/SAdminTraineeDietRequestDetails/SAdminTraineeDietRequestDetails";
import SAdminTraineeDietRequestList from "./Components/SAdminTraineeDietRequestList/SAdminTraineeDietRequestList";
import { SAdminTraineeExerciseRequestAssign } from "./Components/SAdminTraineeExerciseRequestAssign";
import { SAdminTraineeExerciseRequestDetails } from "./Components/SAdminTraineeExerciseRequestDetails";
import SAdminTraineeExerciseRequestList from "./Components/SAdminTraineeExerciseRequestList/SAdminTraineeExerciseRequestList";
import SAdminTraineeLastPaymentDetails from "./Components/SAdminTraineeLastPaymentDetails/SAdminTraineeLastPaymentDetails";
import SAdminTraineeList from "./Components/SAdminTraineeList/SAdminTraineeList";
import SAdminTraineeMonthlyPayment from "./Components/SAdminTraineeMonthlyPayment/SAdminTraineeMonthlyPayment";
import SAdminTraineePaymentHistory from "./Components/SAdminTraineePaymentHistory/SAdminTraineePaymentHistory";
import SAdminTraineeRegistration from "./Components/SAdminTraineeRegistration/SAdminTraineeRegistration";
import SAdminTrainerList from "./Components/SAdminTrainerList/SAdminTrainerList";
import { SAdminTrainerPayment } from "./Components/SAdminTrainerPayment";
import { SAdminTrainerPaymentDetails } from "./Components/SAdminTrainerPaymentDetails";
import { SAdminTrainerPaymentEdit } from "./Components/SAdminTrainerPaymentEdit";
import SAdminTrainerRegistration from "./Components/SAdminTrainerRegistration/SAdminTrainerRegistration";
import { SAdminSettings } from "./Components/SAdminSettings";
import SAdminUpdateProfile from "./Components/SAdminUpdateProfile/SAdminUpdateProfile";
import SAdminWorkoutHistory from "./Components/SAdminWorkoutHistory/SAdminWorkoutHistory";
import SAdminWorkoutList from "./Components/SAdminWorkoutList/SAdminWorkoutList";

import SAdminProfileProtectedPrivateRoute from "./HelperFunctions/SAdminProfileProtectedPrivateRoute";
import SAdminPrivateRoute from "./HelperFunctions/SAdminPrivateRoute";
import SAdminPublicRoute from "./HelperFunctions/SAdminPublicRoute";
import { history } from "./HelperFunctions";

import { routesList } from "./Constants";

import "./App.css";

class App extends Component {
  render() {
    const { sAdminLoggedIn, apiLoaded } = this.props;
    const sAdminProfile = true;

    return (
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={AppIndex} />

          <SAdminPrivateRoute
            component={SAdminHome}
            sAdminLoggedIn={sAdminLoggedIn}
            path={routesList.S_ADMIN_HOME} // /dashboard
            exact
          />

          <SAdminPrivateRoute
            component={SAdminInitialApiLoader}
            sAdminLoggedIn={sAdminLoggedIn}
            path={routesList.S_ADMIN_INITIAL_API_LOADER} // /s-admin-initial-api-loader
            exact
          />

          <SAdminPrivateRoute
            component={SAdminTrainerRegistration}
            sAdminLoggedIn={sAdminLoggedIn}
            path={routesList.S_ADMIN_TRAINER_REGISTRATION} // /trainer-regi
            exact
          />

          <SAdminPrivateRoute
            component={SAdminTraineeRegistration}
            sAdminLoggedIn={sAdminLoggedIn}
            path={routesList.S_ADMIN_TRAINEE_REGISTRATION} // /trainee registration
            exact
          />

          <SAdminPrivateRoute
            component={SAdminAdminRegistration}
            sAdminLoggedIn={sAdminLoggedIn}
            path={routesList.S_ADMIN_ADMIN_REGISTRATION} // /admin-registration
            exact
          />

          <SAdminPrivateRoute
            component={SAdminTrainerList}
            sAdminLoggedIn={sAdminLoggedIn}
            path={routesList.S_ADMIN_TRAINER_LIST} // /trainee registration
            exact
          />

          <SAdminPrivateRoute
            component={SAdminTraineeList}
            sAdminLoggedIn={sAdminLoggedIn}
            path={routesList.S_ADMIN_TRAINEE_LIST} // /trainee registration
            exact
          />

          <SAdminProfileProtectedPrivateRoute
            component={SAdminProfile}
            sAdminLoggedIn={sAdminLoggedIn}
            sAdminProfile={sAdminProfile}
            path={routesList.S_ADMIN_PROFILE} // /profile
            exact
          />

          <SAdminPrivateRoute
            component={SAdminUpdateProfile}
            sAdminLoggedIn={sAdminLoggedIn}
            path={routesList.S_ADMIN_UPDATE_PROFILE} // /profile
            exact
          />

          <SAdminPrivateRoute
            component={SAdminDietTypeList}
            sAdminLoggedIn={sAdminLoggedIn}
            path={routesList.S_ADMIN_GET_DIET_TYPE_LIST} // /profile
            exact
          />

          <SAdminPrivateRoute
            component={SAdminDietTypeDetails}
            sAdminLoggedIn={sAdminLoggedIn}
            path={routesList.S_ADMIN_GET_DIET_TYPE_DETAILS + "/:dietTypeId"}
            exact
          />

          <SAdminPrivateRoute
            component={SAdminDietTypeDetailsEdit}
            sAdminLoggedIn={sAdminLoggedIn}
            path={routesList.S_ADMIN_EDIT_DIET_TYPE_DETAILS + "/:dietTypeId"}
            exact
          />

          <SAdminPrivateRoute
            component={SAdminExerciseTypeList}
            sAdminLoggedIn={sAdminLoggedIn}
            path={routesList.S_ADMIN_GET_EXERCISE_TYPE_LIST} // /profile
            exact
          />

          <SAdminPrivateRoute
            component={SAdminExerciseTypeDetails}
            sAdminLoggedIn={sAdminLoggedIn}
            path={
              routesList.S_ADMIN_GET_EXERCISE_TYPE_DETAILS + "/:exerciseTypeId"
            }
            exact
          />

          <SAdminPrivateRoute
            component={SAdminExerciseTypeDetailsEdit}
            sAdminLoggedIn={sAdminLoggedIn}
            path={
              routesList.S_ADMIN_EDIT_EXERCISE_TYPE_DETAILS + "/:exerciseTypeId"
            }
            exact
          />

          <SAdminPrivateRoute
            component={SAdminTraineeDietRequestList}
            sAdminLoggedIn={sAdminLoggedIn}
            path={routesList.S_ADMIN_GET_TRAINEE_DIET_REQUEST_LIST} // /s-admin-trainee-diet-request-list
            exact
          />

          <SAdminPrivateRoute
            component={SAdminTraineeDietRequestAssign}
            sAdminLoggedIn={sAdminLoggedIn}
            path={
              routesList.S_ADMIN_ASSIGN_TRAINEE_DIET_REQUEST + "/:requestId"
            }
            exact
          />

          <SAdminPrivateRoute
            component={SAdminTraineeDietRequestDetails}
            sAdminLoggedIn={sAdminLoggedIn}
            path={
              routesList.S_ADMIN_GET_TRAINEE_DIET_REQUEST_DETAILS +
              "/:requestId"
            }
            exact
          />

          <SAdminPrivateRoute
            component={SAdminTraineeExerciseRequestList}
            sAdminLoggedIn={sAdminLoggedIn}
            path={routesList.S_ADMIN_GET_TRAINEE_EXERCISE_REQUEST_LIST} // /s-admin-trainee-exercise-request-list
            exact
          />

          <SAdminPrivateRoute
            component={SAdminTraineeExerciseRequestDetails}
            sAdminLoggedIn={sAdminLoggedIn}
            path={
              routesList.S_ADMIN_GET_TRAINEE_EXERCISE_REQUEST_DETAILS +
              "/:requestId"
            } // /s-admin-trainee-exercise-request-details/:requestId
            exact
          />

          <SAdminPrivateRoute
            component={SAdminTraineeExerciseRequestAssign}
            sAdminLoggedIn={sAdminLoggedIn}
            path={
              routesList.S_ADMIN_ASSIGN_TRAINEE_EXERCISE_REQUEST + "/:requestId"
            } // /s-admin-trainee-exercise-request-list
            exact
          />

          <SAdminPrivateRoute
            component={SAdminSettings}
            sAdminLoggedIn={sAdminLoggedIn}
            path={routesList.S_ADMIN_SETTINGS} // /s-admin-settings
            exact
          />

          <SAdminPrivateRoute
            component={SAdminGallery}
            sAdminLoggedIn={sAdminLoggedIn}
            path={routesList.S_ADMIN_GALLERY} // /profile
            exact
          />

          <SAdminPrivateRoute
            component={SAdminPaymentPackageAdd}
            sAdminLoggedIn={sAdminLoggedIn}
            path={routesList.S_ADMIN_PACKAGE_SUBSCRIPTION_ADD} // /PackageAdd
            exact
          />

          <SAdminPrivateRoute
            component={SAdminPaymentPackageEdit}
            sAdminLoggedIn={sAdminLoggedIn}
            path={routesList.S_ADMIN_PACKAGE_SUBSCRIPTION_EDIT + "/:id"} // /PackageAdd
            exact
          />

          <SAdminPrivateRoute
            component={SAdminPaymentPackageList}
            sAdminLoggedIn={sAdminLoggedIn}
            path={routesList.S_ADMIN_PACKAGE_SUBSCRIPTION} // /PackageLists
            exact
          />

          <SAdminPrivateRoute
            component={SAdminFoodList}
            sAdminLoggedIn={sAdminLoggedIn}
            path={routesList.S_ADMIN_FOOD_LIST} // /profile
            exact
          />

          <SAdminPrivateRoute
            component={SAdminWorkoutList}
            sAdminLoggedIn={sAdminLoggedIn}
            path={routesList.S_ADMIN_WORKOUT_LIST} // /profile
            exact
          />

          <SAdminPrivateRoute
            component={SAdminWorkoutHistory}
            sAdminLoggedIn={sAdminLoggedIn}
            path={routesList.S_ADMIN_WORKOUT_HISTORY} // /profile
            exact
          />

          <SAdminPrivateRoute
            component={SAdminChangePassword}
            sAdminLoggedIn={sAdminLoggedIn}
            path={routesList.S_ADMIN_CHANGE_PASSWORD} // /profile
            exact
          />

          <SAdminPrivateRoute
            component={SAdminExpenseList}
            sAdminLoggedIn={sAdminLoggedIn}
            path={routesList.S_ADMIN_EXPENSE} // /s-admin-expense
            exact
          />

          <SAdminPrivateRoute
            component={SAdminExpenseDetails}
            sAdminLoggedIn={sAdminLoggedIn}
            path={routesList.S_ADMIN_DETAILS_EXPENSE + "/:expenseId"} // /s-admin-edit-expense/:expenseId
            exact
          />

          <SAdminPrivateRoute
            component={SAdminExpenseEdit}
            sAdminLoggedIn={sAdminLoggedIn}
            path={routesList.S_ADMIN_EDIT_EXPENSE + "/:expenseId"} // /s-admin-edit-expense/:expenseId
            exact
          />

          <SAdminPrivateRoute
            component={SAdminTrainerPayment}
            sAdminLoggedIn={sAdminLoggedIn}
            path={routesList.S_ADMIN_TRAINER_PAYMENT} // /s-admin-trainer-payment
            exact
          />

          <SAdminPrivateRoute
            component={SAdminTrainerPaymentDetails}
            sAdminLoggedIn={sAdminLoggedIn}
            path={
              routesList.S_ADMIN_DETAILS_TRAINER_PAYMENT + "/:trainerPaymentId"
            } // /s-admin-details-trainer-payment/:trainerPaymentId
            exact
          />

          <SAdminPrivateRoute
            component={SAdminTrainerPaymentEdit}
            sAdminLoggedIn={sAdminLoggedIn}
            path={
              routesList.S_ADMIN_EDIT_TRAINER_PAYMENT + "/:trainerPaymentId"
            } // /s-admin-edit-expense/:trainerPaymentId
            exact
          />

          <SAdminPrivateRoute
            component={SAdminTraineePaymentHistory}
            sAdminLoggedIn={sAdminLoggedIn}
            path={routesList.S_ADMIN_TRAINEE_PAYMENT + "/:traineePaymentId"} // /s-admin-details-trainer-payment/:traineePaymentId
            exact
          />
          <SAdminPrivateRoute
            component={SAdminTraineeMonthlyPayment}
            sAdminLoggedIn={sAdminLoggedIn}
            path={
              routesList.S_ADMIN_TRAINEE_MONTHLY_PAYMENT + "/:traineePaymentId"
            } // /s-admin-details-trainer-payment/:traineePaymentId
            exact
          />
          <SAdminPrivateRoute
            component={SAdminTraineeLastPaymentDetails}
            sAdminLoggedIn={sAdminLoggedIn}
            path={
              routesList.S_ADMIN_TRAINEE_PAYMENT_DETAILS + "/:traineePaymentId"
            } // /s-admin-details-trainer-payment/:trainerPaymentId
            exact
          />

          <SAdminPublicRoute
            restricted={true}
            apiLoaded={apiLoaded}
            sAdminLoggedIn={sAdminLoggedIn}
            component={SAdminLogin}
            path={routesList.S_ADMIN_LOG_IN} // /trainee-login
            exact
          />
        </Switch>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  const sAdminLoggedIn = state.sAdminLoginReducer.loggedIn;
  const apiLoaded = state.sAdminLoginReducer.apiLoaded;
  const sAdminProfile = state.sAdminProfileReducer.profileData;

  return {
    sAdminLoggedIn,
    apiLoaded,
    sAdminProfile,
  };
}

export default connect(mapStateToProps)(App);
