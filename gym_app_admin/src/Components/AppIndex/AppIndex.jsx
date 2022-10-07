import React, { Component } from "react";
import { Link } from "react-router-dom";

import { routesList } from "../../Constants/routesList";

import "./AppIndex.css";

class AppIndex extends Component {
  state = {};
  render() {
    return (
      <>
        <Link to={routesList.S_ADMIN_LOG_IN}>super admin Login</Link>
      </>
    );
  }
}

export default AppIndex;
