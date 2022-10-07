import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { trainerTraineeExerciseRequestApi } from "../../Api";

import { routesList } from "../../Constants";

import {
  getFormattedIsoDate,
  getFormattedToken,
  showStatus,
} from "../../HelperFunctions";

class TrainerTraineeExerciseRequestAssignType extends Component {
  constructor(props) {
    super(props);

    this.state = {
      exerciseData: null,
      traineeExerciseId: null,
      submitting: false,
      submitted: false,
      errorStatus: null,
    };
  }

  componentDidMount() {
    const { formattedToken } = this.props;
    const { requestId } = this.props.match.params;
    // const { data } = this.props.location.state;

    trainerTraineeExerciseRequestApi
      .trainerGetTraineeExerciseRequestDetails(requestId, formattedToken)
      .then((response) => {
        this.setState({
          exerciseData: response.data,
          traineeExerciseId: requestId,
        });
      });
  }

  showData() {
    const { exerciseData } = this.state;
    const { approval, appliedDate, issue } = exerciseData;
    const { firstname, lastname, phone } = exerciseData.trainee;
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

        <div className="h3 pt-3">Exercise Not Assigned Yet</div>

        <Link
          to={{
            pathname:
              routesList.TRAINER_TRAINEE_EXERCISE_REQUEST_ASSIGN_MANUALLY +
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
              routesList.TRAINER_TRAINEE_EXERCISE_REQUEST_ASSIGN_FILE +
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
    const { exerciseData } = this.state;

    return (
      <>
        <div className="d-flex justify-content-between">
          <div className="p-2"></div>
          <div className="h1 pl-5">Assign Trainee Exercise</div>
          <div>
            <Link
              to={{
                pathname: routesList.TRAINER_TRAINEE_EXERCISE_REQUEST_LIST,
                state: { data: "test data" },
              }}
              className="btn btn-primary h-auto mt-2 back-button"
            >
              Back
            </Link>
          </div>
        </div>

        {exerciseData ? this.showData() : <></>}
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

const connectedTrainerTraineeExerciseRequestAssignType = connect(
  mapStateToProps
)(TrainerTraineeExerciseRequestAssignType);

export { connectedTrainerTraineeExerciseRequestAssignType as TrainerTraineeExerciseRequestAssignType };
