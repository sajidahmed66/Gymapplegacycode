import React, { Component } from "react";
import * as FaIcons from "react-icons/fa";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { traineeExerciseApi } from "../../Api";

import { routesList } from "../../Constants";

import commonApi from "../../Api/commonApi";

import { NoData } from "../NoData";

import {
  getFormattedIsoDate,
  getFormattedToken,
  showStatus,
} from "../../HelperFunctions";

class TraineeExerciseDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exerciseData: null,
    };
  }

  componentDidMount() {
    const { formattedToken } = this.props;
    const { exerciseId } = this.props.match.params;
    // const { data } = this.props.location.state;

    traineeExerciseApi
      .traineeGetExerciseDetails(exerciseId, formattedToken)
      .then((response) => {
        // console.log("Exercise details component did mount", response.data);
        this.setState({ exerciseData: response.data });
      });
  }

  showExercise(exercise) {
    return (
      <>
        <table className="table table-hover table-bordered">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Sets</th>
              <th scope="col">Reps</th>
            </tr>
          </thead>
          <tbody>
            {exercise.map((data, index) => {
              const { exercise_id, reps, sets } = data;

              if (exercise_id) {
                const { name, description } = exercise_id;

                return (
                  <tr key={index}>
                    <th scope="row">{name}</th>
                    <td>
                      {description ? description : "No descriptions available"}
                    </td>
                    <td>{sets}</td>
                    <td>{reps}</td>
                  </tr>
                );
              } else {
                return (
                  <tr key={index}>
                    <th colSpan={4}>Exercise Item Unavailable</th>
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
      appliedDate,
      approval,
      exercise,
      approvedDate,
      fromDate,
      toDate,
      trainer,
      flag,
    } = exerciseData;

    const {
      date,
      month,
      year,
      hour,
      minute,
      second,
      miliSecond,
    } = getFormattedIsoDate(appliedDate);

    const {
      date: dateApproved,
      month: monthApproved,
      year: yearApproved,
      hour: hourApproved,
      minute: minuteApproved,
      second: secondApproved,
      miliSecond: miliSecondApproved,
    } = getFormattedIsoDate(approvedDate);

    const {
      date: dateFrom,
      month: monthFrom,
      year: yearFrom,
      hour: hourFrom,
      minute: minuteFrom,
      second: secondFrom,
      miliSecond: miliSecondFrom,
    } = getFormattedIsoDate(fromDate);

    const {
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
              <th scope="row" className="align-middle">
                Status
              </th>
              <td className="align-middle pb-3">{showStatus(approval)}</td>
            </tr>

            <tr>
              <th scope="row" className="align-middle">
                Request Time
              </th>
              <td className="align-middle">
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

            {approvedDate ? (
              <tr>
                <th scope="row">Approved Time</th>
                <td>
                  {dateApproved +
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
            ) : (
              <></>
            )}

            {trainer ? (
              <tr>
                <th scope="row" className="align-middle">
                  Assigned Trainer
                </th>
                <td className="align-middle">
                  {trainer.firstname + "\xa0\xa0" + trainer.lastname}
                </td>
              </tr>
            ) : null}

            {trainer ? (
              <tr>
                <th scope="row" className="align-middle">
                  Trainer Phone
                </th>
                <td className="align-middle">{trainer.phone}</td>
              </tr>
            ) : null}

            {fromDate ? (
              <tr>
                <th scope="row">Exercise Starting Time</th>
                <td>
                  {dateFrom +
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
            ) : (
              <></>
            )}

            {toDate ? (
              <tr>
                <th scope="row">Exercise End Time</th>
                <td>
                  {dateTo +
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
            ) : (
              <></>
            )}
          </tbody>
        </table>

        {!approval === 1 && !flag === 2 && (
          <p className="h1 pt-3">Exercise List</p>
        )}

        {approval === 0 && !trainer && (
          <NoData message={"Trainer Not Assigned By Admin Yet"} />
        )}

        {approval === 0 && trainer && (
          <NoData message={"Exercise Not Assigned By Trainer Yet"} />
        )}

        {approval === 1 && (!flag || flag === 1) && !exercise.length && (
          <NoData message={"No Exercise Assigned By Trainer"} />
        )}

        {approval === 1 &&
          exercise.length !== 0 &&
          (!flag || flag === 1) &&
          this.showExercise(exercise)}

        {approval === 1 && flag === 2 && this.showFile()}
      </>
    );
  }

  render() {
    const { exerciseData } = this.state;

    return (
      <>
        <div className="d-flex justify-content-between">
          <div className="p-2"></div>
          <div className="h1 pl-5">Exercise Request Details</div>
          <div>
            <Link
              to={{
                pathname: routesList.TRAINEE_EXERCISE_REQUEST_LIST,
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
  const formattedToken = getFormattedToken(state.traineeLoginReducer.token);

  return {
    formattedToken,
  };
};

const connectedTraineeExerciseDetails = connect(mapStateToProps)(
  TraineeExerciseDetails
);

export { connectedTraineeExerciseDetails as TraineeExerciseDetails };
