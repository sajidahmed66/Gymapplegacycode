import React, { Component } from "react";
import { connect } from "react-redux";

import { getFormattedToken } from "../../HelperFunctions";

import { sAdminSettingsApi } from "../../Api";

import "./SAdminSettings.css";

class SAdminSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dietRequestTimeLimitId: "",
      dietRequestTimeLimit: 0,
      exerciseRequestTimeLimitId: "",
      exerciseRequestTimeLimit: 0,
    };
  }

  componentDidMount() {
    const { formattedToken } = this.props;

    sAdminSettingsApi
      .sAdminGetDietRequestTimeLimit(formattedToken)
      .then((response) => {
        // console.log("diet request time limit", response.data);
        this.setState({
          dietRequestTimeLimitId: response.data._id,
          dietRequestTimeLimit: response.data.noOfDays,
        });
      });

    sAdminSettingsApi
      .sAdminGetExerciseRequestTimeLimit(formattedToken)
      .then((response) => {
        // console.log("exercise request time limit", response.data);
        this.setState({
          exerciseRequestTimeLimitId: response.data._id,
          exerciseRequestTimeLimit: response.data.noOfDays,
        });
      });
  }

  handleChange(propertyName, e) {
    let updatedValue = {};
    updatedValue[propertyName] = e.target.value ? parseInt(e.target.value) : 0;
    this.setState(updatedValue);
  }

  handleSubmit() {
    const {
      dietRequestTimeLimitId,
      dietRequestTimeLimit,
      exerciseRequestTimeLimitId,
      exerciseRequestTimeLimit,
    } = this.state;
    const { formattedToken } = this.props;

    sAdminSettingsApi
      .sAdminUpdateDietRequestTimeLimit(
        dietRequestTimeLimitId,
        dietRequestTimeLimit,
        formattedToken
      )
      .then((response) => {
        // console.log(
        //   "diet request time limit updated successfully",
        //   response.data
        // );
      });

    sAdminSettingsApi
      .sAdminUpdateExerciseRequestTimeLimit(
        exerciseRequestTimeLimitId,
        exerciseRequestTimeLimit,
        formattedToken
      )
      .then((response) => {
        // console.log(
        //   "exercise request time limit updated successfully",
        //   response.data
        // );
      });
  }

  render() {
    const { dietRequestTimeLimit, exerciseRequestTimeLimit } = this.state;

    return (
      <>
        <p className="h1">Settings Panel</p>

        <table className="table table-hover table-bordered">
          <tbody>
            <tr>
              <th className="align-middle">Set Diet Request Day Limit</th>

              <td className="align-middle">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    id="dietRequestTimeLimit"
                    name="dietRequestTimeLimit"
                    placeholder="Set time limit for sending diet request again ..."
                    value={dietRequestTimeLimit}
                    onChange={this.handleChange.bind(
                      this,
                      "dietRequestTimeLimit"
                    )}
                  />
                  <div className="input-group-append">
                    <span className="input-group-text">Days</span>
                  </div>
                </div>
              </td>
            </tr>

            <tr>
              <th className="align-middle">Set Exercise Request Day Limit</th>

              <td className="align-middle">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    id="exerciseRequestTimeLimit"
                    name="exerciseRequestTimeLimit"
                    placeholder="Set time limit for sending diet request again ..."
                    value={exerciseRequestTimeLimit}
                    onChange={this.handleChange.bind(
                      this,
                      "exerciseRequestTimeLimit"
                    )}
                  />
                  <div className="input-group-append">
                    <span className="input-group-text">Days</span>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <button
          type="submit"
          className="btn btn-primary mb-5 edit-button"
          onClick={this.handleSubmit.bind(this)}
        >
          Update Settings
        </button>
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

const connectedSAdminSettings = connect(mapStateToProps)(SAdminSettings);

export { connectedSAdminSettings as SAdminSettings };
