import React, { Component } from "react";
import { connect } from "react-redux";

import { getFormattedToken, history } from "../../HelperFunctions";

import { trainerProfileApi } from "../../Api";

import { routesList } from "../../Constants";

class TrainerChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileData: null,
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    };
  }

  componentDidMount() {
    const { formattedToken } = this.props;
    trainerProfileApi.trainerGetProfile(formattedToken).then((response) => {
      // console.log("profile data", response.data);
      this.setState({ profileData: response.data });
    });
  }

  handleChange(propertyName, e) {
    var updatedValue = {};
    updatedValue[propertyName] = e.target.value;
    this.setState(updatedValue);
  }

  handleSubmit(e) {
    const { oldPassword, newPassword, confirmPassword } = this.state;
    const { formattedToken } = this.props;

    e.preventDefault();

    let updatedData = {
      oldPassword,
      newPassword,
      confirmPassword,
    };

    trainerProfileApi
      .trainerChangePassword(updatedData, formattedToken)
      .then((response) => {
        console.log("password updated successfully", response.data);
        history.push(routesList.TRAINER_PROFILE);
      });
  }

  render() {
    const { profileData, oldPassword, newPassword, confirmPassword } =
      this.state;

    return (
      <>
        <p className="h1">Change Password</p>

        <form onSubmit={this.handleSubmit.bind(this)}>
          {profileData && profileData.email ? (
            <>
              <div className="form-group row">
                <label htmlFor="email" className="col-sm-2 col-form-label">
                  Email
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    readOnly
                    className="form-control-plaintext"
                    id="email"
                    value={profileData.email}
                  />
                </div>
              </div>
            </>
          ) : null}

          <div className="form-group row">
            <label htmlFor="oldPassword" className="col-sm-2 col-form-label">
              Old Password
            </label>
            <div className="col-sm-10">
              <input
                type="password"
                className="form-control"
                id="oldPassword"
                name="oldPassword"
                placeholder="Your Old Password..."
                value={oldPassword}
                onChange={this.handleChange.bind(this, "oldPassword")}
              />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="newPassword" className="col-sm-2 col-form-label">
              New Password
            </label>
            <div className="col-sm-10">
              <input
                type="password"
                className="form-control"
                id="newPassword"
                name="newPassword"
                placeholder="Your New Password..."
                value={newPassword}
                onChange={this.handleChange.bind(this, "newPassword")}
              />
            </div>
          </div>

          <div className="form-group row">
            <label
              htmlFor="confirmPassword"
              className="col-sm-2 col-form-label"
            >
              Confirm Password
            </label>
            <div className="col-sm-10">
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your New Password..."
                value={confirmPassword}
                onChange={this.handleChange.bind(this, "confirmPassword")}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary edit-button">
            Update Password
          </button>
        </form>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const formattedToken = getFormattedToken(state.trainerLoginReducer.token);

  return {
    formattedToken,
  };
};

export default connect(mapStateToProps)(TrainerChangePassword);
