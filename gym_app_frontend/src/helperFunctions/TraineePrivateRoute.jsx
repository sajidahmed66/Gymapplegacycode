import React from "react";
import { Route, Redirect } from "react-router-dom";

import TraineeSlideMenu from "../Components/TraineeSlideMenu/TraineeSlideMenu";
import TraineeUserLayout from "../Components/TraineeUserLayout/TraineeUserLayout";

import { routesList } from "../Constants";

const TraineePrivateRoute = ({
  component: Component,
  traineeLoggedIn,
  ...rest
}) => {
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={(props) =>
        traineeLoggedIn ? (
          <>
            <TraineeSlideMenu />
            <TraineeUserLayout>
              <Component {...props} />
            </TraineeUserLayout>
          </>
        ) : (
          <Redirect to={routesList.TRAINEE_LOG_IN} />
        )
      }
    />
  );
};

export default TraineePrivateRoute;
