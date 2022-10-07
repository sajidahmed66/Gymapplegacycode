import React from "react";
import { Route, Redirect } from "react-router-dom";

import TrainerSlideMenu from "../Components/TrainerSlideMenu/TrainerSlideMenu";
import TrainerUserLayout from "../Components/TrainerUserLayout/TrainerUserLayout";

import { routesList } from "../Constants";

const TrainerPrivateRoute = ({
  component: Component,
  trainerLoggedIn,
  ...rest
}) => {
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={(props) =>
        trainerLoggedIn ? (
          <>
            <TrainerSlideMenu />
            <TrainerUserLayout>
              <Component {...props} />
            </TrainerUserLayout>
          </>
        ) : (
          <Redirect to={routesList.TRAINER_LOG_IN} />
        )
      }
    />
  );
};

export default TrainerPrivateRoute;
