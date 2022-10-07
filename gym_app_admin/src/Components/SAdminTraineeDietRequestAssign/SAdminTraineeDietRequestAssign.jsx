import { connect } from "react-redux";
import { Link } from "react-router-dom";
import React, { Component } from "react";

import { NoData } from "../NoData";

import {
  getFormattedIsoDate,
  getFormattedToken,
  showStatus,
} from "../../HelperFunctions";

import { routesList } from "../../Constants";

import { sAdminTraineeDietRequestApi, sAdminTrainerList } from "../../Api";

import "./SAdminTraineeDietRequestAssign.css";

class SAdminTraineeDietRequestAssign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requestDetails: null,
      trainerId: "",
      trainerOptions: [],
      validationMessage: "",
    };
  }

  componentDidMount() {
    const { formattedToken } = this.props;
    const { requestId } = this.props.match.params;
    // const { data } = this.props.location.state;

    sAdminTraineeDietRequestApi
      .sAdminGetTraineeDietRequestDetails(requestId, formattedToken)
      .then((response) => {
        this.setState({ requestDetails: response.data });
      });

    sAdminTrainerList.sAdminTrainerList(formattedToken).then((response) => {
      this.setState({
        trainerOptions: response.data,
      });
    });
  }

  setTrainerInfo(trainerId) {
    this.setState({ trainerId: trainerId || null, validationMessage: "" });
  }

  handleSubmit() {
    const { trainerId } = this.state;
    const { _id } = this.state.requestDetails;
    const { formattedToken, history } = this.props;

    const data = { trainer: trainerId, traineeDietId: _id };

    if (!trainerId) {
      this.setState({ validationMessage: "Please Select A Trainer Name" });
    }

    sAdminTraineeDietRequestApi
      .sAdminAssignTraineeDietRequest(data, formattedToken)
      .then((response) => {
        // console.log("success assign trainee diet request", response);
        history.push(routesList.S_ADMIN_GET_TRAINEE_DIET_REQUEST_LIST);
      })
      .catch((error) => {
        // console.log("error assign trainee diet request", error);
      });
  }

  showRequestDetails(requestDetails) {
    const { firstname, lastname, phone } = requestDetails.trainee;
    const { trainerOptions, trainerId, validationMessage } = this.state;
    const { appliedDate, approval } = requestDetails;

    const { date, month, year, hour, minute, second, miliSecond } =
      getFormattedIsoDate(appliedDate);

    return (
      <>
        <table className="table table-hover table-bordered">
          <tbody>
            <tr>
              <th scope="row">Name</th>
              <td>{firstname + "\xa0\xa0" + lastname}</td>
            </tr>

            <tr>
              <th scope="row">Mobile</th>
              <td>{phone}</td>
            </tr>

            <tr>
              <th scope="row">Status</th>
              <td className="pb-3">{showStatus(approval)}</td>
            </tr>

            <tr>
              <th scope="row">Requested Date</th>
              <td>
                {date +
                  " " +
                  month +
                  ", " +
                  year +
                  " (" +
                  hour +
                  ":" +
                  minute +
                  ":" +
                  second +
                  ":" +
                  miliSecond +
                  ")"}
              </td>
            </tr>

            <tr>
              <th scope="row">Assigned Trainer</th>
              <td>
                <select
                  className="custom-select col-md-4 custom-dropdown"
                  value={trainerId || ""}
                  onChange={(e) => {
                    this.setTrainerInfo(e.target.value);
                  }}
                  role="button"
                >
                  <option value="" disabled>
                    Select a trainer
                  </option>
                  {trainerOptions.map((data) => {
                    const name = data.firstname + "\xa0\xa0" + data.lastname;
                    return (
                      <option key={data._id} value={data._id}>
                        {name}
                      </option>
                    );
                  })}
                </select>

                {validationMessage ? (
                  <span className="validation-error">{validationMessage}</span>
                ) : (
                  <></>
                )}
              </td>
            </tr>
          </tbody>
        </table>

        <button
          type="submit"
          className="btn btn-primary assign-button"
          onClick={this.handleSubmit.bind(this)}
        >
          Assign Trainer
        </button>
      </>
    );
  }

  render() {
    const { requestDetails } = this.state;

    return (
      <>
        <div className="d-flex justify-content-between">
          <div className="p-2"></div>
          <div className="h1 pl-5">Diet Request Assign</div>
          <div>
            <Link
              to={{
                pathname: routesList.S_ADMIN_GET_TRAINEE_DIET_REQUEST_LIST,
                state: { data: "test data" },
              }}
              className="btn btn-primary h-auto mt-2 back-button"
            >
              Back
            </Link>
          </div>
        </div>

        {requestDetails ? this.showRequestDetails(requestDetails) : <NoData />}
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

const connectedSAdminTraineeDietRequestAssign = connect(mapStateToProps)(
  SAdminTraineeDietRequestAssign
);

export { connectedSAdminTraineeDietRequestAssign as SAdminTraineeDietRequestAssign };
