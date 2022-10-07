import React from "react";
import { Route, Redirect } from "react-router-dom";

import { routesList } from "../Constants";

const TraineePublicRoute = ({
  component: Component,
  restricted,
  traineeLoggedIn,
  apiLoaded,
  ...rest
}) => {
  return (
    // restricted = false meaning public route
    // restricted = true meaning restricted route
    <Route
      {...rest}
      render={(props) =>
        traineeLoggedIn && restricted ? (
          !apiLoaded ? (
            <Redirect to={routesList.TRAINEE_INITIAL_API_LOADER} />
          ) : (
            <Redirect to={routesList.TRAINEE_HOME} />
          )
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default TraineePublicRoute;
