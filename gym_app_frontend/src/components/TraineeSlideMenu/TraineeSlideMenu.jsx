import React, { Component } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { IconContext } from "react-icons";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";

import { traineeToggleMenu } from "../../Redux";

import { traineeSlideMenuData } from "../../Constants/traineeSlideMenuData";

import { traineeAuthActions } from "../../HelperFunctions/traineeAuthActions";

import "./TraineeSlideMenu.css";

class TraineeSlideMenu extends Component {
  render() {
    const { toggleMenu, isMenuOpen, logOut, apiLoaded } = this.props;

    return apiLoaded ? (
      <>
        <IconContext.Provider value={{ color: "#fff" }}>
          <div className="navbar">
            <Link to="#" className="menu-bars">
              <FaIcons.FaBars onClick={toggleMenu} />
            </Link>
          </div>
          <nav className={isMenuOpen ? "nav-menu active" : "nav-menu"}>
            <ul className="nav-menu-items">
              <li className="navbar-toggle" onClick={toggleMenu}>
                <Link to="#" className="menu-bars menu-close-button">
                  <AiIcons.AiOutlineClose />
                </Link>
              </li>

              <li></li>
              <li></li>
              <li></li>

              {traineeSlideMenuData.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <NavLink to={item.path} activeClassName="selected">
                      {item.icon}
                      <span>{item.title}</span>
                    </NavLink>
                  </li>
                );
              })}

              <li className="nav-text" onClick={logOut}>
                <NavLink to="#">
                  <AiIcons.AiOutlineLogout />
                  <span>Logout</span>
                </NavLink>
              </li>

              <li></li>
            </ul>
          </nav>
        </IconContext.Provider>
      </>
    ) : null;
  }
}

const mapStateToProps = (state) => {
  return {
    isMenuOpen: state.traineeSlideMenuReducer.isMenuOpen,
    apiLoaded: state.traineeLoginReducer.apiLoaded,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => dispatch(traineeAuthActions.logout()),
    toggleMenu: () => dispatch(traineeToggleMenu()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TraineeSlideMenu);
