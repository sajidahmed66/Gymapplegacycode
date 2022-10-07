import React from "react";
import { Route, Redirect } from "react-router-dom";

import TrainerSlideMenu from "../Components/TrainerSlideMenu/TrainerSlideMenu";
import TrainerUserLayout from "../Components/TrainerUserLayout/TrainerUserLayout";

import { routesList } from "../Constants";

const TrainerProfileProtectedPrivateRoute = ({
  component: Component,
  trainerLoggedIn,
  trainerProfile,
  ...rest
}) => {
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={(props) =>
        trainerLoggedIn && trainerProfile ? (
          <>
            <TrainerSlideMenu />
            <TrainerUserLayout>
              <Component {...props} />
            </TrainerUserLayout>
          </>
        ) : (
          <Redirect to={routesList.TRAINER_UPDATE_PROFILE} />
        )
      }
    />
  );
};

export default TrainerProfileProtectedPrivateRoute;
