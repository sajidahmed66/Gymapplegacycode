import React, { Component } from "react";
import DatePicker from "react-date-picker/dist/entry.nostyle";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { trainerTraineeExerciseRequestApi } from "../../Api";

import { loaderUrl, routesList } from "../../Constants";

import {
  getFormattedIsoDate,
  getFormattedToken,
  showStatus,
} from "../../HelperFunctions";

class TrainerTraineeExerciseRequestAssignFile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      exerciseData: null,
      fromDate: "",
      toDate: "",
      file: null,
      traineeExerciseId: null,
      submitting: false,
      submitted: false,
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
  }

  handleSubmit() {
    this.setState({ submitting: true, submitted: true });

    const { fromDate, toDate, traineeExerciseId, file } = this.state;
    const { formattedToken, history } = this.props;

    const fileData = new FormData();
    fileData.append("file", file);
    fileData.append("fromDate", fromDate);
    fileData.append("toDate", toDate);
    fileData.append("traineeExerciseId", traineeExerciseId);
    fileData.append("flag", 2);

    trainerTraineeExerciseRequestApi
      .trainerAssignTraineeExerciseRequest(fileData, formattedToken)
      .then((response) => {
        console.log("success assign trainee diet request", response);

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

  handleFileChange(e) {
    this.setState({ file: e.target.files[0] });
  }

  showData(exerciseData) {
    const {
      fromDate,
      toDate,
      fromDateError,
      toDateError,
      submitting,
      submitted,
      errorStatus,
      file,
    } = this.state;
    const { approval, appliedDate, issue } = exerciseData;
    const { firstname, lastname, phone } = exerciseData.trainee;

    const { day, date, month, year, hour, minute, second, miliSecond } =
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
            <tr>
              <th scope="row">Physical Issues</th>
              <td>{issue ? issue : "No Issue Available"}</td>
            </tr>
          </tbody>
        </table>

        <form>
          <div className="form-group">
            <label htmlFor="file" className="h3">
              File for exercise request
            </label>

            {submitted &&
              errorStatus === 400 &&
              (file === null || file === undefined) && (
                <span className="validation-error mt-2">
                  Please select a file
                </span>
              )}

            {submitted && errorStatus === 500 && (
              <span className="validation-error mt-2">
                Only Pdf, Document and Excel file will be acceptable
              </span>
            )}

            <input
              type="file"
              name="file"
              id="file"
              className="form-control-file"
              onChange={this.handleFileChange.bind(this)}
            />
          </div>
        </form>

        {submitted && errorStatus === 400 && (
          <span className="validation-error mt-2">
            Assigning exercise file failed, please give input correctly and try
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
            Assign Exercise File
          </button>
        )}
      </>
    );
  }

  render() {
    const { exerciseData } = this.state;
    const { requestId } = this.props.match.params;

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

const connectedTrainerTraineeExerciseRequestAssignFile = connect(
  mapStateToProps
)(TrainerTraineeExerciseRequestAssignFile);

export { connectedTrainerTraineeExerciseRequestAssignFile as TrainerTraineeExerciseRequestAssignFile };
