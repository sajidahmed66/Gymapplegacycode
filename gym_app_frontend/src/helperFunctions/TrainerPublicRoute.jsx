import React from "react";
import { Route, Redirect } from "react-router-dom";

import { routesList } from "../Constants";

const TrainerPublicRoute = ({
  component: Component,
  restricted,
  trainerLoggedIn,
  apiLoaded,
  ...rest
}) => {
  return (
    // restricted = false meaning public route
    // restricted = true meaning restricted route
    <Route
      {...rest}
      render={(props) =>
        trainerLoggedIn && restricted ? (
          !apiLoaded ? (
            <Redirect to={routesList.TRAINER_INITIAL_API_LOADER} />
          ) : (
            <Redirect to={routesList.TRAINER_HOME} />
          )
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default TrainerPublicRoute;
