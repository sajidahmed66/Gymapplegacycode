import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { trainerTraineeDietRequestApi } from "../../Api";

import { routesList } from "../../Constants";

import {
  getFormattedIsoDate,
  getFormattedToken,
  showStatus,
} from "../../HelperFunctions";

class TrainerTraineeDietRequestAssignType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dietData: null,
      traineeDietId: null,
      submitting: false,
      submitted: false,
      errorStatus: null,
    };
  }

  componentDidMount() {
    const { formattedToken } = this.props;
    const { requestId } = this.props.match.params;
    // const { data } = this.props.location.state;

    trainerTraineeDietRequestApi
      .trainerGetTraineeDietRequestDetails(requestId, formattedToken)
      .then((response) => {
        this.setState({ dietData: response.data, traineeDietId: requestId });
      });
  }

  showData() {
    const { dietData } = this.state;
    const { approval, appliedDate, issue } = dietData;
    const { firstname, lastname, phone } = dietData.trainee;
    const {
      day,
      date,
      month,
      year,
      hour,
      minute,
      second,
      miliSecond,
    } = getFormattedIsoDate(appliedDate);
    const { requestId } = this.props.match.params;

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
              <td className="p-2">{showStatus(approval)}</td>
            </tr>

            <tr>
              <th scope="row">Requested Date</th>
              <td>
                {day +
                  ", " +
                  date +
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
              <th scope="row">Physical Issues</th>
              <td>{issue ? issue : "No Issue Available"}</td>
            </tr>
          </tbody>
        </table>

        <div className="h3 pt-3">Diet Not Assigned Yet</div>

        <Link
          to={{
            pathname:
              routesList.TRAINER_TRAINEE_DIET_REQUEST_ASSIGN_MANUALLY +
              "/" +
              requestId,
            state: { data: "test data" },
          }}
          className="btn btn-primary h-auto mt-2 assign-button"
        >
          Assign Manually
        </Link>

        <Link
          to={{
            pathname:
              routesList.TRAINER_TRAINEE_DIET_REQUEST_ASSIGN_FILE +
              "/" +
              requestId,
            state: { data: "test data" },
          }}
          className="btn btn-primary h-auto mt-2 assign-button"
        >
          Upload File
        </Link>
      </>
    );
  }

  render() {
    // console.log("check state", this.state);
    const { dietData } = this.state;

    return (
      <>
        <div className="d-flex justify-content-between">
          <div className="p-2"></div>
          <div className="h1 pl-5">Assign Trainee Diet</div>
          <div>
            <Link
              to={{
                pathname: routesList.TRAINER_TRAINEE_DIET_REQUEST_LIST,
                state: { data: "test data" },
              }}
              className="btn btn-primary h-auto mt-2 back-button"
            >
              Back
            </Link>
          </div>
        </div>

        {dietData ? this.showData() : <></>}
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

const connectedTrainerTraineeDietRequestAssignType = connect(mapStateToProps)(
  TrainerTraineeDietRequestAssignType
);

export { connectedTrainerTraineeDietRequestAssignType as TrainerTraineeDietRequestAssignType };
