import React, { Component } from "react";

import { formValidation, uniqueId } from "../../HelperFunctions";

import { loaderUrl, routesList } from "../../Constants";

import { registrationApi } from "../../Api";

class SAdminTrainerRegistration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstname: "",
      lastname: "",
      phone: "",
      submitting: false,
      submitted: false,
      firstnameError: [],
      lastnameError: [],
      phoneError: [],
      errorStatus: null,
    };
  }

  handleChange(e) {
    const { name, value } = e.target;
    const data = formValidation.checkType(this.state, name, value);
    this.setState(data);
  }

  handleSubmit(e) {
    this.setState({ submitting: true, submitted: true });
    e.preventDefault();

    const { firstname, lastname, phone } = this.state;
    const { history } = this.props;

    let userInfo = {
      firstname,
      lastname,
      phone,
    };

    registrationApi
      .trainerRegistration(userInfo)
      .then((res) => {
        this.setState({ submitting: false });
        history.push(routesList.S_ADMIN_TRAINER_LIST);
      })
      .catch((err) => {
        this.setState({ submitting: false, errorStatus: err.response.status });
        console.log(err);
      });
  }

  render() {
    const {
      submitting,
      submitted,
      firstnameError,
      errorStatus,
      lastnameError,
      phoneError,
    } = this.state;
    // console.log("trainer registration render", this.state);

    return (
      <>
        <p className="h1">Trainer Registration</p>

        {submitted && errorStatus === 400 && (
          <span className="validation-error mt-2">
            Trainer Registration Failed
          </span>
        )}

        {submitted && errorStatus === 404 && (
          <span className="validation-error mt-2">
            Mobile Number Already Exists
          </span>
        )}

        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group row">
            <label htmlFor="firstname" className="col-sm-2 col-form-label">
              First Name
            </label>

            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="firstname"
                name="firstname"
                placeholder="Trainer's first name..."
                value={this.state.firstname}
                onChange={this.handleChange.bind(this)}
              />

              {submitted &&
                firstnameError.map((message) => {
                  return (
                    <span key={uniqueId.id()} className="validation-error">
                      {message}
                    </span>
                  );
                })}
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="lastname" className="col-sm-2 col-form-label">
              Last Name
            </label>

            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="lastname"
                name="lastname"
                placeholder="Trainer's last name..."
                value={this.state.lastname}
                onChange={this.handleChange.bind(this)}
              />

              {submitted &&
                lastnameError.map((message) => {
                  return (
                    <span key={uniqueId.id()} className="validation-error">
                      {message}
                    </span>
                  );
                })}
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="phone" className="col-sm-2 col-form-label">
              Mobile Number
            </label>

            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="phone"
                name="phone"
                placeholder="Trainer's mobile number..."
                value={this.state.phone}
                onChange={this.handleChange.bind(this)}
              />

              {submitted &&
                phoneError.map((message) => {
                  return (
                    <span key={uniqueId.id()} className="validation-error">
                      {message}
                    </span>
                  );
                })}
            </div>
          </div>

          {submitting ? (
            <img src={loaderUrl} alt="Please Wait..." className="mb-5" />
          ) : (
            <button
              type="submit"
              className="btn btn-primary assign-button mb-5"
            >
              Submit
            </button>
          )}
        </form>
      </>
    );
  }
}

export default SAdminTrainerRegistration;
