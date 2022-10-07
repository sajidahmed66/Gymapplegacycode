import React, { Component } from "react";
import { connect } from "react-redux";

import { loaderUrl } from "../../Constants";

import {
  formValidation,
  sAdminAuthActions,
  uniqueId,
} from "../../HelperFunctions";

import backgroundImage from "../../Assets/Image/gym_background.png";
import "./SAdminLogin.css";

class SAdminLogin extends Component {
  constructor(props) {
    super(props);

    // reset login status
    this.props.dispatch(sAdminAuthActions.logout());

    this.state = {
      phone: "",
      password: "",
      submitted: false,
      phoneError: "",
      passwordError: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    const data = formValidation.checkType(this.state, name, value);
    this.setState(data);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ submitted: true });

    const { phone, password } = this.state;
    const { dispatch } = this.props;

    if (phone && password) {
      dispatch(sAdminAuthActions.login(phone, password));
    }
  }

  render() {
    const { loggingIn, error } = this.props;

    const { phone, password, submitted, phoneError, passwordError } =
      this.state;

    return (
      <div
        className="container login-background"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <header>
          <h1>Admin Login</h1>
        </header>

        <section>
          <div id="container_demo">
            <div id="wrapper">
              <div id="login" className="animate form">
                <form
                  autoComplete="on"
                  name="form"
                  onSubmit={this.handleSubmit}
                >
                  <h1>Login</h1>

                  {error && error === 404 && (
                    <span className="validation-error text-center">
                      Phone No or Password does not match
                    </span>
                  )}

                  <p>
                    <label htmlFor="phone" className="uname">
                      Your Phone Number
                    </label>

                    <input
                      id="username"
                      name="phone"
                      required="required"
                      type="text"
                      placeholder="89745897145"
                      value={phone}
                      onChange={this.handleChange}
                    />

                    {submitted &&
                      phoneError.map((message) => {
                        return (
                          <span
                            key={uniqueId.id()}
                            className="validation-error"
                          >
                            {message}
                          </span>
                        );
                      })}
                  </p>

                  <p>
                    <label htmlFor="password" className="youpasswd">
                      Your password
                    </label>

                    <input
                      id="password"
                      name="password"
                      required="required"
                      type="password"
                      placeholder="eg. X8df!90EO"
                      value={password}
                      onChange={this.handleChange}
                    />

                    {submitted &&
                      passwordError.map((message) => {
                        return (
                          <span
                            key={uniqueId.id()}
                            className="validation-error"
                          >
                            {message}
                          </span>
                        );
                      })}
                  </p>

                  {/* <p className="keeplogin">
                    <input
                      type="checkbox"
                      name="loginkeeping"
                      id="loginkeeping"
                      value="loginkeeping"
                    />
                    <label htmlFor="loginkeeping">Keep me logged in</label>
                  </p> */}
                  {/* <p className="login button">
                    <a
                      href="http://cookingfoodsworld.blogspot.in/"
                      target="_blank"
                    ></a>
                  </p> */}
                  {/* <p className="change_link">
                    Not a member yet ?
                    <a href="##" className="to_register">
                      Join us
                    </a>
                  </p> */}

                  <p className="signin button">
                    {loggingIn ? (
                      <img src={loaderUrl} alt="Please Wait..." />
                    ) : (
                      <input type="submit" value="Sign In" />
                    )}
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { loggingIn, error, loggedIn } = state.sAdminLoginReducer;

  return {
    loggingIn,
    error,
    loggedIn,
  };
}

export default connect(mapStateToProps)(SAdminLogin);
