import React, { Component } from "react";
import { connect } from "react-redux";
// import SAdminInitialApiLoader from "../SAdminInitialApiLoader/SAdminInitialApiLoader";

class SAdminHome extends Component {
  // state = {  }
  render() {
    return (
      <>
        <h1 className="demo-class">admin home page</h1>
      </>
    );
  }
}

// export default SAdminHome;

function mapStateToProps(state) {
  const token = state.sAdminLoginReducer.token;

  return {
    token,
  };
}

export default connect(mapStateToProps)(SAdminHome);
