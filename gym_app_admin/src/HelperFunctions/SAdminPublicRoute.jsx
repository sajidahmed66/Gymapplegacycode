import React from "react";
import { Route, Redirect } from "react-router-dom";

import { routesList } from "../Constants/routesList";

const SAdminPublicRoute = ({
  component: Component,
  restricted,
  sAdminLoggedIn,
  apiLoaded,
  ...rest
}) => {
  return (
    // restricted = false meaning public route
    // restricted = true meaning restricted route
    <Route
      {...rest}
      render={(props) =>
        sAdminLoggedIn && restricted ? (
          !apiLoaded ? (
            <Redirect to={routesList.S_ADMIN_INITIAL_API_LOADER} />
          ) : (
            <Redirect to={routesList.S_ADMIN_HOME} />
          )
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default SAdminPublicRoute;
