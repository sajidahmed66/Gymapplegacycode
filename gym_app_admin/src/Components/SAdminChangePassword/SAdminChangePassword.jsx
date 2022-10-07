import React, { Component } from "react";
import { connect } from "react-redux";

import { loaderUrl, routesList } from "../../Constants";

import { sAdminProfileApi } from "../../Api";

import {
  formValidation,
  getFormattedToken,
  history,
  uniqueId,
} from "../../HelperFunctions";

class SAdminChangePassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profileData: null,
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      submitting: false,
      submitted: false,
      oldPasswordError: [],
      newPasswordError: [],
      confirmPasswordError: [],
      errorStatus: null,
    };
  }

  componentDidMount() {
    const { formattedToken } = this.props;

    sAdminProfileApi.sAdminGetProfile(formattedToken).then((response) => {
      this.setState({ profileData: response.data });
    });
  }

  handleChange(e) {
    const { name, value } = e.target;

    const data = formValidation.checkType(this.state, name, value);
    this.setState(data);
  }

  handleSubmit(e) {
    this.setState({ submitting: true, submitted: true });

    const { oldPassword, newPassword, confirmPassword } = this.state;
    const { formattedToken } = this.props;

    e.preventDefault();

    let updatedData = {
      oldPassword,
      newPassword,
      confirmPassword,
    };

    sAdminProfileApi
      .sAdminChangePassword(updatedData, formattedToken)
      .then((response) => {
        // console.log("password updated successfully", response.data);
        this.setState({
          submitting: false,
          errorStatus: null,
          submitted: false,
        });
        history.push(routesList.S_ADMIN_PROFILE);
      })
      .catch((error) => {
        this.setState({
          submitting: false,
          errorStatus: error.response.status,
        });
        console.log(error);
      });
  }

  render() {
    const {
      profileData,
      oldPassword,
      newPassword,
      confirmPassword,
      submitting,
      submitted,
      oldPasswordError,
      newPasswordError,
      confirmPasswordError,
      errorStatus,
    } = this.state;

    return (
      <>
        <p className="h1">Change Password</p>

        {submitted && errorStatus === 400 && (
          <span className="validation-error mt-2">
            Changing Password Failed
          </span>
        )}

        {submitted && errorStatus === 404 && (
          <span className="validation-error mt-2">
            Your old password is incorrect
          </span>
        )}

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
                    className="form-control-plaintext"
                    id="email"
                    defaultValue={profileData.email}
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
                onChange={this.handleChange.bind(this)}
              />

              {submitted &&
                (!oldPassword ? (
                  <span className="validation-error">
                    Minimum 6 characters are required
                  </span>
                ) : (
                  oldPasswordError.map((message) => {
                    return (
                      <span key={uniqueId.id()} className="validation-error">
                        {message}
                      </span>
                    );
                  })
                ))}
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
                onChange={this.handleChange.bind(this)}
              />

              {submitted &&
                (!newPassword ? (
                  <span className="validation-error">
                    Minimum 6 characters are required
                  </span>
                ) : (
                  newPasswordError.map((message) => {
                    return (
                      <span key={uniqueId.id()} className="validation-error">
                        {message}
                      </span>
                    );
                  })
                ))}
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
                onChange={this.handleChange.bind(this)}
              />

              {submitted &&
                (!confirmPassword ? (
                  <span className="validation-error">
                    Minimum 6 characters are required
                  </span>
                ) : (
                  confirmPasswordError.map((message) => {
                    return (
                      <span key={uniqueId.id()} className="validation-error">
                        {message}
                      </span>
                    );
                  })
                ))}

              {submitted && newPassword !== confirmPassword && (
                <span className="validation-error">
                  New password does not match
                </span>
              )}
            </div>
          </div>

          {submitting ? (
            <img src={loaderUrl} alt="Please Wait..." />
          ) : (
            <button type="submit" className="btn btn-primary edit-button">
              Update Password
            </button>
          )}
        </form>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const formattedToken = getFormattedToken(state.sAdminLoginReducer.token);

  return {
    formattedToken,
  };
};

export default connect(mapStateToProps)(SAdminChangePassword);
