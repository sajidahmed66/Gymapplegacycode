import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { sAdminTraineeExerciseRequestApi } from "../../Api";

import { routesList } from "../../Constants";

import { NoData } from "../NoData";

import {
  getFormattedIsoDate,
  getFormattedToken,
  showStatus,
} from "../../HelperFunctions";

class SAdminTraineeExerciseRequestDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requestDetails: null,
    };
  }

  componentDidMount() {
    const { formattedToken } = this.props;
    const { requestId } = this.props.match.params;
    // const { data } = this.props.location.state;

    sAdminTraineeExerciseRequestApi
      .sAdminGetTraineeExerciseRequestDetails(requestId, formattedToken)
      .then((response) => {
        this.setState({ requestDetails: response.data });
      });
  }

  setTrainerInfo(trainerId) {
    this.setState({ trainerId: trainerId || null });
  }

  showNotApproval() {
    return (
      <>
        <NoData message={"Exercise Not Assigned By Trainer Yet"} />
      </>
    );
  }

  showAssignButton() {
    const { requestId } = this.props.match.params;

    return (
      <>
        <div className="h4 pt-3">
          Exercise Request Not Assigned To Trainer Yet
        </div>
        <Link
          to={{
            pathname:
              routesList.S_ADMIN_ASSIGN_TRAINEE_EXERCISE_REQUEST +
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

  showExerciseChart(exerciseChart) {
    return (
      <>
        <div className="h1 pt-3">Exercise List</div>

        {exerciseChart.length ? (
          <>
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
                {exerciseChart.map((data, index) => {
                  // console.log("show exercise chart", data);

                  const { exercise_id, sets, reps } = data;
                  const { name, description } = exercise_id;

                  return (
                    <tr key={index}>
                      <th scope="row">{name}</th>
                      <td>{description}</td>
                      <td>{sets}</td>
                      <td>{reps}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        ) : (
          <>
            <NoData message={"No Exercise Assigned By Trainer"} />
          </>
        )}
      </>
    );
  }

  showRequestDetails(requestDetails) {
    const { firstname, lastname, phone } = requestDetails.trainee;

    const {
      trainer,
      approval,
      approvedDate,
      fromDate,
      toDate,
      exercise,
    } = requestDetails;

    const {
      date,
      month,
      year,
      hour,
      minute,
      second,
      miliSecond,
    } = getFormattedIsoDate(requestDetails.appliedDate);

    const {
      date: dateApproved,
      month: monthApproved,
      year: yearApproved,
      hour: hourApproved,
      minute: minuteApproved,
      second: secondApproved,
      miliSecond: miliSecondApproved,
    } = getFormattedIsoDate(requestDetails.approvedDate);

    const {
      date: dateFrom,
      month: monthFrom,
      year: yearFrom,
      hour: hourFrom,
      minute: minuteFrom,
      second: secondFrom,
      miliSecond: miliSecondFrom,
    } = getFormattedIsoDate(requestDetails.fromDate);

    const {
      date: dateTo,
      month: monthTo,
      year: yearTo,
      hour: hourTo,
      minute: minuteTo,
      second: secondTo,
      miliSecond: miliSecondTo,
    } = getFormattedIsoDate(requestDetails.toDate);

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

            {approvedDate ? (
              <tr>
                <th scope="row">Approved Date</th>
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
                <th scope="row">Assigned Trainer</th>
                <td>{trainer.firstname + "\xa0\xa0" + trainer.lastname}</td>
              </tr>
            ) : (
              <></>
            )}

            {trainer ? (
              <tr>
                <th scope="row">Trainer Mobile</th>
                <td>{trainer.phone}</td>
              </tr>
            ) : (
              <></>
            )}

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
                <th scope="row">Exercise Ending Time</th>
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

        {approval === 1 ? this.showExerciseChart(exercise) : <></>}
        {approval === 0 && trainer ? this.showNotApproval() : <></>}
        {approval === 0 && !trainer ? this.showAssignButton() : <></>}
      </>
    );
  }

  render() {
    // console.log("exercise request details render", this.state);
    const { requestDetails } = this.state;

    return (
      <>
        <div className="d-flex justify-content-between">
          <div className="p-2"></div>
          <div className="h1 pl-5">Exercise Request Details</div>
          <div>
            <Link
              to={{
                pathname: routesList.S_ADMIN_GET_TRAINEE_EXERCISE_REQUEST_LIST,
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

const connectedSAdminTraineeExerciseRequestDetails = connect(mapStateToProps)(
  SAdminTraineeExerciseRequestDetails
);

export { connectedSAdminTraineeExerciseRequestDetails as SAdminTraineeExerciseRequestDetails };
