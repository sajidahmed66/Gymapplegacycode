import React, { Component } from "react";
import { Link } from "react-router-dom";

import { routesList } from "../../Constants";

import "./AppIndex.css";

class AppIndex extends Component {
  // state = {};
  render() {
    return (
      <>
        <Link to={routesList.TRAINER_LOG_IN}>Trainer Login</Link>
        <Link to={routesList.TRAINEE_LOG_IN}>Trainee Login</Link>
      </>
    );
  }
}

export default AppIndex;
