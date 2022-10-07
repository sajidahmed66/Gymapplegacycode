import React, { Component } from "react";
import * as FaIcons from "react-icons/fa";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { trainerTraineeExerciseRequestApi } from "../../Api";

import { routesList } from "../../Constants";

import commonApi from "../../Api/commonApi";

import { NoData } from "../NoData";

import {
  getFormattedIsoDate,
  getFormattedToken,
  showStatus,
} from "../../HelperFunctions";

import "./TrainerTraineeExerciseRequestDetails.css";

class TrainerTraineeExerciseRequestDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exerciseData: null,
    };
  }

  componentDidMount() {
    const { formattedToken } = this.props;
    const { requestId } = this.props.match.params;
    // const { data } = this.props.location.state;

    trainerTraineeExerciseRequestApi
      .trainerGetTraineeExerciseRequestDetails(requestId, formattedToken)
      .then((response) => {
        this.setState({ exerciseData: response.data });
      });
  }

  showNotApproval() {
    const { requestId } = this.props.match.params;

    return (
      <>
        <div className="h3 pt-3">Exercise Not Assigned Yet</div>

        <Link
          to={{
            pathname:
              routesList.TRAINER_TRAINEE_EXERCISE_REQUEST_ASSIGN_TYPE +
              "/" +
              requestId,
            state: { data: "test data" },
          }}
          className="btn btn-primary h-auto mt-2 assign-button"
        >
          Assign Now
        </Link>
      </>
    );
  }

  showExercise(exercise) {
    return (
      <>
        <p className="h1">Exercise List</p>

        <table className="table table-hover table-bordered">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Exercise Name</th>
              <th scope="col">Description</th>
              <th scope="col">Sets</th>
              <th scope="col">Reps</th>
            </tr>
          </thead>
          <tbody>
            {exercise.map((data, index) => {
              if (data.exercise_id) {
                const { sets, reps, exercise_id } = data;
                const { name, description } = exercise_id;

                return (
                  <tr key={index}>
                    <th scope="row">{name}</th>
                    <td>{description}</td>
                    <td>{sets}</td>
                    <td>{reps}</td>
                  </tr>
                );
              } else {
                return (
                  <tr key={index}>
                    <td>Exercise Item Unavailable</td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </>
    );
  }

  showFile() {
    const { exerciseData } = this.state;
    return (
      <>
        <p className="h1">Exercise File</p>
        <a
          href={commonApi.api + exerciseData.file}
          download
          className="btn btn-primary h-auto mt-2 mb-5 assign-button"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaIcons.FaFileDownload className="file-icon" />
          <span>Download File</span>
        </a>
      </>
    );
  }

  showData(exerciseData) {
    const {
      approval,
      appliedDate,
      approvedDate,
      fromDate,
      toDate,
      exercise,
      issue,
      flag,
    } = exerciseData;

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

    const {
      day: dayApproved,
      date: dateApproved,
      month: monthApproved,
      year: yearApproved,
      hour: hourApproved,
      minute: minuteApproved,
      second: secondApproved,
      miliSecond: miliSecondApproved,
    } = getFormattedIsoDate(approvedDate);

    const {
      day: dayFrom,
      date: dateFrom,
      month: monthFrom,
      year: yearFrom,
      hour: hourFrom,
      minute: minuteFrom,
      second: secondFrom,
      miliSecond: miliSecondFrom,
    } = getFormattedIsoDate(fromDate);

    const {
      day: dayTo,
      date: dateTo,
      month: monthTo,
      year: yearTo,
      hour: hourTo,
      minute: minuteTo,
      second: secondTo,
      miliSecond: miliSecondTo,
    } = getFormattedIsoDate(toDate);

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

            <tr className="">
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

            {approvedDate ? (
              <tr>
                <th scope="row">Approval Date</th>
                <td>
                  {dayApproved +
                    ", " +
                    dateApproved +
                    " " +
                    monthApproved +
                    ", " +
                    yearApproved +
                    " (" +
                    hourApproved +
                    ":" +
                    minuteApproved +
                    ":" +
                    secondApproved +
                    ":" +
                    miliSecondApproved +
                    ")"}
                </td>
              </tr>
            ) : null}

            {fromDate ? (
              <tr>
                <th scope="row">Exercise Starting Time</th>
                <td>
                  {dayFrom +
                    ", " +
                    dateFrom +
                    " " +
                    monthFrom +
                    ", " +
                    yearFrom +
                    " (" +
                    hourFrom +
                    ":" +
                    minuteFrom +
                    ":" +
                    secondFrom +
                    ":" +
                    miliSecondFrom +
                    ")"}
                </td>
              </tr>
            ) : null}

            {toDate && (
              <tr>
                <th scope="row">Exercise Ending Time</th>
                <td>
                  {dayTo +
                    ", " +
                    dateTo +
                    " " +
                    monthTo +
                    ", " +
                    yearTo +
                    " (" +
                    hourTo +
                    ":" +
                    minuteTo +
                    ":" +
                    secondTo +
                    ":" +
                    miliSecondTo +
                    ")"}
                </td>
              </tr>
            )}

            <tr>
              <th scope="row">Issue</th>
              <td>{issue ? issue : "No Issues Available"}</td>
            </tr>
          </tbody>
        </table>

        {approval === 0 && this.showNotApproval()}

        {exercise.length !== 0 && this.showExercise(exercise)}

        {approval === 1 && !exercise.length && !flag && (
          <NoData message="No Exercise Found, Please Contact Your Admin or Edit Exercise Details" />
        )}

        {approval === 1 && flag === 2 && this.showFile()}
      </>
    );
  }

  render() {
    const { exerciseData } = this.state;

    // console.log("exercise request details render", this.state);

    return (
      <>
        <div className="d-flex justify-content-between">
          <div className="p-2"></div>
          <div className="h1 pl-5">Exercise Request Details</div>
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

        {exerciseData && this.showData(exerciseData)}
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

const connectedTrainerTraineeExerciseRequestDetails = connect(mapStateToProps)(
  TrainerTraineeExerciseRequestDetails
);

export { connectedTrainerTraineeExerciseRequestDetails as TrainerTraineeExerciseRequestDetails };
