import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";

import { formValidation, uniqueId } from "../../HelperFunctions";

import { loaderUrl } from "../../Constants";

import { registrationApi } from "../../Api";

import "react-toastify/dist/ReactToastify.css";

export class SAdminAdminRegistration extends Component {
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
    // const { history } = this.props;

    let userInfo = {
      firstname,
      lastname,
      phone,
    };

    registrationApi
      .adminRegistration(userInfo)
      .then((res) => {
        this.setState({
          submitting: false,
          submitted: false,
          firstname: "",
          lastname: "",
          phone: "",
        });
        // history.push(routesList.S_ADMIN_TRAINER_LIST);

        toast.success("Admin Registration Successful", {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((err) => {
        this.setState({ submitting: false, errorStatus: err.response.status });
        console.log(err);

        toast.error("Admin Registration Failed", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  }

  render() {
    const {
      submitting,
      submitted,
      firstname,
      lastname,
      phone,
      firstnameError,
      errorStatus,
      lastnameError,
      phoneError,
    } = this.state;
    // console.log("admin registration render", this.state);

    return (
      <>
        <p className="h1">Admin Registration</p>

        {submitted && errorStatus === 400 && (
          <span className="validation-error mt-2">
            Admin Registration Failed
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
                placeholder="Admin's first name..."
                value={this.state.firstname}
                onChange={this.handleChange.bind(this)}
              />

              {submitted &&
                (!firstname ? (
                  <span className="validation-error">
                    Please give a valid first name
                  </span>
                ) : (
                  firstnameError.map((message) => {
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
            <label htmlFor="lastname" className="col-sm-2 col-form-label">
              Last Name
            </label>

            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="lastname"
                name="lastname"
                placeholder="Admin's last name..."
                value={this.state.lastname}
                onChange={this.handleChange.bind(this)}
              />

              {submitted &&
                (!lastname ? (
                  <span className="validation-error">
                    Please give a valid last name
                  </span>
                ) : (
                  lastnameError.map((message) => {
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
            <label htmlFor="phone" className="col-sm-2 col-form-label">
              Mobile Number
            </label>

            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="phone"
                name="phone"
                placeholder="Admin's mobile number..."
                value={this.state.phone}
                onChange={this.handleChange.bind(this)}
              />

              {submitted &&
                (!phone ? (
                  <span className="validation-error">
                    Please give a valid phone number
                  </span>
                ) : (
                  phoneError.map((message) => {
                    return (
                      <span key={uniqueId.id()} className="validation-error">
                        {message}
                      </span>
                    );
                  })
                ))}
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

        <ToastContainer />
      </>
    );
  }
}
