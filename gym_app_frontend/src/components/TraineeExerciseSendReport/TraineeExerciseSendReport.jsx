import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { traineeExerciseApi } from "../../Api";

import { loaderUrl, routesList } from "../../Constants";

import { NoData } from "../NoData";

import {
  getCurrentDateTime,
  getFormattedIsoDate,
  getFormattedToken,
  showStatus,
} from "../../HelperFunctions";

class TraineeExerciseSendReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exerciseData: null,
      submitting: false,
      submitted: false,
      errorStatus: null,
    };
  }

  componentDidMount() {
    const { formattedToken } = this.props;
    const { exerciseId } = this.props.match.params;
    // const { data } = this.props.location.state;

    traineeExerciseApi
      .traineeGetExerciseDetails(exerciseId, formattedToken)
      .then((response) => {
        // console.log("exercise details component did mount", response.data.exercise);

        response.data.exercise.forEach((singleExercise) => {
          singleExercise.selected = false;
          singleExercise.finishedSets = 0;
          singleExercise.finishedReps = 0;
        });

        this.setState({ exerciseData: response.data });
      });
  }

  handleCheckbox(_id, e) {
    this.setState((prevState) => ({
      exerciseData: Object.assign(prevState.exerciseData, {
        exercise: prevState.exerciseData.exercise.map((obj) =>
          obj._id === _id
            ? Object.assign(obj, {
                selected: e.target.checked,
              })
            : obj
        ),
      }),
    }));
  }

  handleChange(_id, propertyName, e) {
    this.setState((prevState) => ({
      exerciseData: Object.assign(prevState.exerciseData, {
        exercise: prevState.exerciseData.exercise.map((obj) =>
          obj._id === _id
            ? Object.assign(obj, {
                [propertyName]: e.target.value ? parseFloat(e.target.value) : 0,
              })
            : obj
        ),
      }),
    }));
  }

  handleSubmit() {
    this.setState({ submitting: true, submitted: true });

    const { _id: traineeExerciseId, exercise } = this.state.exerciseData;
    const { formattedToken, history } = this.props;
    const workout_id = [];
    const sets = [];
    const reps = [];

    exercise.forEach((singleExercise) => {
      if (singleExercise.selected) {
        workout_id.push(singleExercise._id);
        sets.push(singleExercise.finishedSets);
        reps.push(singleExercise.finishedReps);
      }
    });

    const data = {
      traineeExerciseId,
      workout_id,
      sets,
      reps,
    };

    traineeExerciseApi
      .traineeSendExerciseReport(data, formattedToken)
      .then((response) => {
        console.log("success trainee exercise report", response.data);

        this.setState({
          submitting: false,
          submitted: false,
          errorStatus: null,
        });

        history.push(routesList.TRAINEE_EXERCISE_REQUEST_LIST);
      })
      .catch((error) => {
        this.setState({
          submitting: false,
          errorStatus: error.response.status,
        });

        console.log(error);
      });
  }

  showExerciseList(exercise) {
    const { submitted, errorStatus, submitting } = this.state;

    let isAnyExerciseChecked = null;

    if (exercise) {
      isAnyExerciseChecked = exercise.find((data) => data.selected === true);
    }

    return (
      <>
        {submitted && !isAnyExerciseChecked && (
          <span className="validation-error mt-2 mb-2">
            No exercise item selected, Please select at least one item
          </span>
        )}

        <table className="table table-hover table-bordered">
          <thead className="thead-dark">
            <tr>
              <th></th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Assigned Sets</th>
              <th scope="col">Assigned Reps</th>
              <th scope="col">Finished Sets</th>
              <th scope="col">Finished Reps</th>
            </tr>
          </thead>
          <tbody>
            {exercise.map((data, index) => {
              if (data.exercise_id) {
                const { exercise_id, reps, sets, selected, _id } = data;

                let obj = this.state.exerciseData.exercise.find(
                  (o) => o._id === _id
                );

                return (
                  <tr key={index}>
                    <td>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={selected ? "checked" : ""}
                          onChange={this.handleCheckbox.bind(this, _id)}
                        />
                      </div>
                    </td>
                    <th scope="row">{exercise_id.name}</th>
                    <td>{exercise_id.description}</td>
                    <td>{sets}</td>
                    <td>{reps}</td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Your Completed Sets..."
                        onChange={this.handleChange.bind(
                          this,
                          _id,
                          "finishedSets"
                        )}
                        value={obj.finishedSets}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Your Completed Reps..."
                        onChange={this.handleChange.bind(
                          this,
                          _id,
                          "finishedReps"
                        )}
                        value={obj.finishedReps}
                      />
                    </td>
                  </tr>
                );
              } else {
                return (
                  <tr key={index}>
                    <td>Exercise Data Unavailable</td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>

        {submitted && errorStatus === 400 && (
          <span className="validation-error mt-2">
            Sending exercise report failed, please give input correctly and try
            again
          </span>
        )}

        {submitting ? (
          <img src={loaderUrl} alt="Please Wait..." />
        ) : (
          <button
            type="submit"
            className="btn btn-primary mt-2 mb-5 assign-button"
            onClick={this.handleSubmit.bind(this)}
          >
            Send Report Now
          </button>
        )}
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
      day: dayFrom,
      date: dateFrom,
      month: monthFrom,
      year: yearFrom,
    } = getFormattedIsoDate(fromDate);

    const {
      day: dayTo,
      date: dateTo,
      month: monthTo,
      year: yearTo,
    } = getFormattedIsoDate(toDate);

    const currentDateTime = getCurrentDateTime();
    const {
      date: dateToday,
      month: monthToday,
      year: yearToday,
    } = getFormattedIsoDate(currentDateTime);

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
                  {dayFrom +
                    ", " +
                    dateFrom +
                    " " +
                    monthFrom +
                    ", " +
                    yearFrom}
                </td>
              </tr>
            ) : (
              <></>
            )}

            {toDate ? (
              <tr>
                <th scope="row">Exercise End Time</th>
                <td>{dayTo + ", " + dateTo + " " + monthTo + ", " + yearTo}</td>
              </tr>
            ) : (
              <></>
            )}
          </tbody>
        </table>

        <p className="h1 pt-3">
          Send Exercise Report <br />(
          {dateToday + " " + monthToday + ", " + yearToday})
        </p>

        {approval === 0 && !trainer ? (
          <NoData message={"Trainer Not Assigned By Admin Yet"} />
        ) : null}

        {approval === 0 && trainer ? (
          <NoData message={"Exercise Not Assigned By Trainer Yet"} />
        ) : null}

        {approval === 1 && !exercise.length ? (
          <NoData message={"No Exercise Assigned By Trainer"} />
        ) : null}

        {approval === 1 && exercise.length
          ? this.showExerciseList(exercise)
          : null}
      </>
    );
  }

  render() {
    // console.log("exercise send report render", this.state);
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

        {exerciseData ? this.showData(exerciseData) : null}
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

const connectedTraineeExerciseSendReport = connect(mapStateToProps)(
  TraineeExerciseSendReport
);

export { connectedTraineeExerciseSendReport as TraineeExerciseSendReport };
