/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import { connect } from "react-redux";

import {
  trainerAuthActions,
  formValidation,
  uniqueId,
} from "../../HelperFunctions";

import backgroundImage from "../../Assets/Image/gym_background.png";
import "./TrainerLogin.css";

class TrainerLogin extends Component {
  constructor(props) {
    super(props);

    // reset login status
    this.props.dispatch(trainerAuthActions.logout());

    this.state = {
      phone: "",
      password: "",
      submitted: false,
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
      dispatch(trainerAuthActions.login(phone, password));
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
          <h1>Trainer Login</h1>
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

                  <p className="signin button">
                    {loggingIn ? (
                      <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
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
  const { loggingIn, error } = state.trainerLoginReducer;
  return {
    loggingIn,
    error,
  };
}

export default connect(mapStateToProps)(TrainerLogin);
