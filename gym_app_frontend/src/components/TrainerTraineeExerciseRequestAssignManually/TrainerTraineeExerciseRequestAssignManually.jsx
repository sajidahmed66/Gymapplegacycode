import React, { Component } from "react";
import DatePicker from "react-date-picker/dist/entry.nostyle";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { loaderUrl, routesList } from "../../Constants";

import {
  trainerExerciseTypeApi,
  trainerTraineeExerciseRequestApi,
} from "../../Api";

import {
  getFormattedIsoDate,
  getFormattedToken,
  showStatus,
} from "../../HelperFunctions";

class TrainerTraineeExerciseRequestAssignManually extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exerciseData: null,
      exerciseTypeList: null,
      fromDate: "",
      toDate: "",
      traineeExerciseId: null,
      submitting: false,
      submitted: false,
      exerciseTypeListError: "",
      fromDateError: "Please select a valid date",
      toDateError: "Please select a valid date",
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

    trainerExerciseTypeApi
      .trainerGetExerciseTypeList(formattedToken)
      .then((response) => {
        response.data.forEach((exercise) => {
          exercise.selected = false;
          exercise.selectedSets = 0;
          exercise.selectedReps = 0;
        });

        this.setState({ exerciseTypeList: response.data });
      });
  }

  handleChange(_id, propertyName, e) {
    this.setState((prevState) => ({
      exerciseTypeList: prevState.exerciseTypeList.map((obj) =>
        obj._id === _id
          ? Object.assign(obj, {
              [propertyName]: e.target.value ? parseFloat(e.target.value) : 0,
            })
          : obj
      ),
    }));
  }

  handleCheckbox(_id, e) {
    this.setState((prevState) => ({
      exerciseTypeList: prevState.exerciseTypeList.map((obj) =>
        obj._id === _id
          ? Object.assign(obj, {
              selected: e.target.checked,
            })
          : obj
      ),
    }));
  }

  handleSubmit() {
    this.setState({ submitting: true, submitted: true });

    const {
      fromDate,
      toDate,
      traineeExerciseId,
      exerciseTypeList,
    } = this.state;

    const { formattedToken, history } = this.props;
    const workout_id = [];
    const sets = [];
    const reps = [];

    exerciseTypeList.forEach((exercise) => {
      if (exercise.selected) {
        workout_id.push(exercise._id);
        sets.push(exercise.selectedSets);
        reps.push(exercise.selectedReps);
      }
    });

    const data = {
      fromDate,
      toDate,
      traineeExerciseId,
      workout_id,
      sets,
      reps,
      flag: 1,
    };

    // console.log("handle submit", data);

    trainerTraineeExerciseRequestApi
      .trainerAssignTraineeExerciseRequest(data, formattedToken)
      .then((response) => {
        console.log("success assign trainee exercise request", response);

        this.setState({
          submitting: false,
          submitted: false,
          errorStatus: null,
        });

        history.push(routesList.TRAINER_TRAINEE_EXERCISE_REQUEST_LIST);
      })
      .catch((error) => {
        this.setState({
          submitting: false,
          errorStatus: error.response.status,
        });

        console.log(error);
      });
  }

  showData(exerciseData) {
    const {
      fromDate,
      toDate,
      submitted,
      fromDateError,
      toDateError,
    } = this.state;
    const { approval, appliedDate } = exerciseData;
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
              <th scope="row">Starting Date</th>
              <td>
                <DatePicker
                  value={fromDate ? new Date(fromDate) : ""}
                  onChange={(value) => {
                    if (value) {
                      this.setState({
                        fromDate: new Date(value),
                        fromDateError: "",
                        errorStatus: null,
                      });
                    } else {
                      this.setState({
                        fromDate: "",
                        fromDateError: "Please select a valid date",
                      });
                    }
                  }}
                />

                {submitted && fromDateError ? (
                  <span className="validation-error">{fromDateError}</span>
                ) : (
                  <></>
                )}
              </td>
            </tr>

            <tr>
              <th scope="row">Ending Date</th>
              <td>
                <DatePicker
                  value={toDate ? new Date(toDate) : ""}
                  onChange={(value) => {
                    if (value) {
                      this.setState({
                        toDate: new Date(value),
                        toDateError: "",
                        errorStatus: null,
                      });
                    } else {
                      this.setState({
                        toDate: "",
                        toDateError: "Please select a valid date",
                      });
                    }
                  }}
                />

                {submitted && toDateError ? (
                  <span className="validation-error">{toDateError}</span>
                ) : (
                  <></>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </>
    );
  }

  showExerciseTypeList() {
    const { exerciseTypeList, submitted, submitting, errorStatus } = this.state;

    let isAnyExerciseChecked = null;

    if (exerciseTypeList) {
      isAnyExerciseChecked = exerciseTypeList.find(
        (data) => data.selected === true
      );
    }

    return (
      <>
        <p className="h1">Exercise Type List</p>

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
              <th scope="col">Sets</th>
              <th scope="col">Reps</th>
            </tr>
          </thead>
          <tbody>
            {exerciseTypeList.map((data, index) => {
              const { _id, name, description, selected } = data;
              let obj = exerciseTypeList.find((o) => o._id === _id);

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
                  <th scope="row">{name}</th>
                  <td>{description}</td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Your Selected Sets..."
                      onChange={this.handleChange.bind(
                        this,
                        _id,
                        "selectedSets"
                      )}
                      value={obj.selectedSets}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Your Selected Sets..."
                      onChange={this.handleChange.bind(
                        this,
                        _id,
                        "selectedReps"
                      )}
                      value={obj.selectedReps}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {submitted && errorStatus === 400 && (
          <span className="validation-error mt-2">
            Assigning exercise list failed, please give input correctly and try
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
            Assign Exercise
          </button>
        )}
      </>
    );
  }

  render() {
    const { exerciseData, exerciseTypeList } = this.state;
    const { requestId } = this.props.match.params;

    // console.log("exercise request assign render", this.state);

    return (
      <>
        <div className="d-flex justify-content-between">
          <div className="p-2"></div>
          <div className="h1 pl-5">Assign Trainee Exercise</div>
          <div>
            <Link
              to={{
                pathname:
                  routesList.TRAINER_TRAINEE_EXERCISE_REQUEST_ASSIGN_TYPE +
                  "/" +
                  requestId,
                state: { data: "test data" },
              }}
              className="btn btn-primary h-auto mt-2 back-button"
            >
              Back
            </Link>
          </div>
        </div>

        {exerciseData ? this.showData(exerciseData) : null}

        {exerciseTypeList ? this.showExerciseTypeList() : null}
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

const connectedTrainerTraineeExerciseRequestAssignManually = connect(
  mapStateToProps
)(TrainerTraineeExerciseRequestAssignManually);

export { connectedTrainerTraineeExerciseRequestAssignManually as TrainerTraineeExerciseRequestAssignManually };
