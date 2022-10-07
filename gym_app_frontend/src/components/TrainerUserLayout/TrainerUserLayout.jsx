import React, { Component } from "react";
import { connect } from "react-redux";

import "./TrainerUserLayout.css";

class TrainerUserLayout extends Component {
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
    isMenuOpen: state.trainerSlideMenuReducer.isMenuOpen,
  };
};

export default connect(mapStateToProps)(TrainerUserLayout);
