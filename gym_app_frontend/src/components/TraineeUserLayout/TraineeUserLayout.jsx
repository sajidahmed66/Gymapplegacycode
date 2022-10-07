import React, { Component } from "react";
import { connect } from "react-redux";

import "./TraineeUserLayout.css";

class TraineeUserLayout extends Component {
  render() {
    const { isMenuOpen } = this.props;
    return (
      <>
        <div
          className={"container" + (isMenuOpen ? " user-panel" : " force-left")}
        >
          {this.props.children}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isMenuOpen: state.traineeSlideMenuReducer.isMenuOpen,
  };
};

export default connect(mapStateToProps)(TraineeUserLayout);
