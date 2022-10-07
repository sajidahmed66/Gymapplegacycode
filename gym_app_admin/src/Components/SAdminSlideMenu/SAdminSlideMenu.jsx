import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";
import { IconContext } from "react-icons";
import { connect } from "react-redux";

import { sAdminAuthActions } from "../../HelperFunctions";

import { sAdminSlideMenuData } from "../../Constants";

import { toggleMenu } from "../../Redux";

import "./SAdminSlideMenu.css";

class SAdminSlideMenu extends Component {
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

              {sAdminSlideMenuData.map((item, index) => {
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

              {/* <span className="logout-style" onClick={logOut}>
                Logout
              </span> */}

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
    apiLoaded: state.sAdminLoginReducer.apiLoaded,
    isMenuOpen: state.slideMenuReducer.isMenuOpen,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => dispatch(sAdminAuthActions.logout()),
    toggleMenu: () => dispatch(toggleMenu()),
  };
};

const connectedSAdminSlideMenu = connect(
  mapStateToProps,
  mapDispatchToProps
)(SAdminSlideMenu);

export { connectedSAdminSlideMenu as SAdminSlideMenu };
