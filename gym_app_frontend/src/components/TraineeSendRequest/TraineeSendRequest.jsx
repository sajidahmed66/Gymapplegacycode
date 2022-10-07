import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { loaderUrl, routesList } from "../../Constants";

import FullPageLoader from "../../Hooks/Loader";

// import { NoData } from "../NoData";

import {
  getCurrentDateTime,
  getFormattedIsoDate,
  getFormattedToken,
} from "../../HelperFunctions";

import {
  traineeDietApi,
  traineeProfileApi,
  traineeSendRequest,
  traineeExerciseApi,
} from "../../Api";

class TraineeSendRequest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dietRequestTimeLimit: null,
      exerciseRequestTimeLimit: null,
      lastDietDetails: null,
      lastExerciseDetails: null,
      totalInitialApiInThisComponent: 5,
      apiLoadedCount: 0,
      profileFound: false,
      dietIssue: "",
      dietIssueSubmitting: false,
      dietIssueSubmitted: false,
      dietIssueErrorStatus: null,
      exerciseIssue: "",
      exerciseIssueSubmitting: false,
      exerciseIssueSubmitted: false,
      exerciseIssueErrorStatus: null,
    };
  }

  componentDidMount() {
    const { formattedToken } = this.props;

    traineeProfileApi
      .traineeGetProfile(formattedToken)
      .then((response) => {
        this.setState({
          profileData: response.data,
          profileFound: true,
          apiLoadedCount: this.state.apiLoadedCount + 1,
        });
      })
      .catch((error) => {
        this.setState({
          profileFound: false,
          apiLoadedCount: this.state.apiLoadedCount + 1,
        });

        console.log(error);
      });

    traineeSendRequest
      .traineeGetDietRequestTimeLimit(formattedToken)
      .then((response) => {
        this.setState({
          dietRequestTimeLimit: response.data.noOfDays,
          apiLoadedCount: this.state.apiLoadedCount + 1,
        });
      })
      .catch((error) => {
        this.setState({
          apiLoadedCount: this.state.apiLoadedCount + 1,
        });

        console.log(error);
      });

    traineeSendRequest
      .traineeGetExerciseRequestTimeLimit(formattedToken)
      .then((response) => {
        this.setState({
          apiLoadedCount: this.state.apiLoadedCount + 1,
          exerciseRequestTimeLimit: response.data.noOfDays,
        });
      })
      .catch((error) => {
        this.setState({
          apiLoadedCount: this.state.apiLoadedCount + 1,
        });

        console.log(error);
      });

    traineeDietApi
      .traineeGetLastDietDetails(formattedToken)
      .then((response) => {
        this.setState({
          apiLoadedCount: this.state.apiLoadedCount + 1,
          lastDietDetails: response.data,
        });
      })
      .catch((error) => {
        this.setState({
          apiLoadedCount: this.state.apiLoadedCount + 1,
        });

        console.log(error);
      });

    traineeExerciseApi
      .traineeGetLastExerciseDetails(formattedToken)
      .then((response) => {
        this.setState({
          apiLoadedCount: this.state.apiLoadedCount + 1,
          lastExerciseDetails: response.data,
        });
      })
      .catch((error) => {
        this.setState({
          apiLoadedCount: this.state.apiLoadedCount + 1,
        });

        console.log(error);
      });
  }

  handleDietRequest() {
    this.setState({ dietIssueSubmitting: true, dietIssueSubmitted: true });

    const { formattedToken, history } = this.props;
    traineeSendRequest
      .traineeSendDietRequest({ issue: this.state.dietIssue }, formattedToken)
      .then((response) => {
        console.log("success", response.data);

        this.setState({
          dietIssueSubmitting: false,
          dietIssueSubmitted: false,
          dietIssueErrorStatus: null,
        });

        history.push(routesList.TRAINEE_DIET_REQUEST_LIST);
      })
      .catch((error) => {
        console.log("error", error);

        this.setState({
          dietIssueSubmitting: false,
          dietIssueErrorStatus: error.response.status,
        });
      });
  }

  handleExerciseRequest() {
    this.setState({
      exerciseIssueSubmitting: true,
      exerciseIssueSubmitted: true,
    });

    const { formattedToken, history } = this.props;
    traineeSendRequest
      .traineeSendExerciseRequest(
        { issue: this.state.exerciseIssue },
        formattedToken
      )
      .then((response) => {
        console.log("success", response.data);

        this.setState({
          exerciseIssueSubmitting: false,
          exerciseIssueSubmitted: false,
          exerciseIssueErrorStatus: null,
        });

        history.push(routesList.TRAINEE_EXERCISE_REQUEST_LIST);
      })
      .catch((error) => {
        console.log("error", error);

        this.setState({
          exerciseIssueSubmitting: false,
          exerciseIssueErrorStatus: error.response.status,
        });
      });
  }

  checkRequestAvailability(noOfDays, requestDetails) {
    let timeNow = new Date(getCurrentDateTime()); // getting current date and time
    let nextDate = new Date(requestDetails.appliedDate);
    nextDate.setDate(nextDate.getDate() + parseInt(noOfDays)); // setting next date to the calculated date
    // setting hour, minute and second to 0
    nextDate.setHours(parseInt(0));
    nextDate.setMinutes(parseInt(0));
    nextDate.setSeconds(parseInt(0));
    const requestAvailable = timeNow >= nextDate ? true : false;
    return requestAvailable;
  }

  nextRequestDate(noOfDays, requestDetails) {
    let nextDate = new Date(requestDetails.appliedDate);
    nextDate.setDate(nextDate.getDate() + parseInt(noOfDays)); // setting next date to calculated date

    const { date, month, year } = getFormattedIsoDate(nextDate);
    const message = "Next request on " + date + " " + month + ", " + year;
    return message;
  }

  handleDietIssue(e) {
    this.setState({ dietIssue: e.target.value });
  }

  handleExerciseIssue(e) {
    this.setState({ exerciseIssue: e.target.value });
  }

  render() {
    // console.log("check state", this.state);
    const {
      dietRequestTimeLimit,
      exerciseRequestTimeLimit,
      lastDietDetails,
      lastExerciseDetails,
      apiLoadedCount,
      totalInitialApiInThisComponent,
      // profileFound,
      dietIssue,
      dietIssueSubmitting,
      dietIssueSubmitted,
      dietIssueErrorStatus,
      exerciseIssue,
      exerciseIssueSubmitting,
      exerciseIssueSubmitted,
      exerciseIssueErrorStatus,
    } = this.state;

    const dietRequestAvailable =
      lastDietDetails && (dietRequestTimeLimit || dietRequestTimeLimit === 0)
        ? this.checkRequestAvailability(dietRequestTimeLimit, lastDietDetails)
        : lastDietDetails === ""
        ? true
        : false;

    const exerciseRequestAvailable =
      lastExerciseDetails &&
      (exerciseRequestTimeLimit || exerciseRequestTimeLimit === 0)
        ? this.checkRequestAvailability(
            exerciseRequestTimeLimit,
            lastExerciseDetails
          )
        : lastExerciseDetails === ""
        ? true
        : false;

    const nextDietRequestDay =
      lastDietDetails && (dietRequestTimeLimit || dietRequestTimeLimit === 0)
        ? this.nextRequestDate(dietRequestTimeLimit, lastDietDetails)
        : "Diet Request Unavailable";

    const nextExerciseRequestDay =
      lastExerciseDetails &&
      (exerciseRequestTimeLimit || exerciseRequestTimeLimit === 0)
        ? this.nextRequestDate(exerciseRequestTimeLimit, lastExerciseDetails)
        : "Exercise Request Unavailable";

    return apiLoadedCount < totalInitialApiInThisComponent ? (
      <FullPageLoader />
    ) : (
      // !profileFound ? (
      //   <>
      //     <p className="h1 mt-3 mb-3">Trainee Send Request</p>

      //     <NoData message="Your profile is not completed yet" />

      //     <Link
      //       to={{
      //         pathname: routesList.TRAINEE_UPDATE_PROFILE,
      //         state: { data: "test data" },
      //       }}
      //       className="btn btn-primary mt-1 assign-button"
      //     >
      //       Complete Profile Now
      //     </Link>
      //   </>
      // ) :

      <>
        <p className="h1 mt-3 mb-3">Trainee Send Request</p>

        <table className="table table-hover table-bordered">
          <tbody>
            <tr>
              <td className="align-middle">
                <h4>Send a request for diet chart</h4>
              </td>

              <td className="align-middle">
                {dietRequestAvailable && (
                  <div className="form-group">
                    <label htmlFor="diet_issue">Diet Issues</label>
                    <textarea
                      className="form-control"
                      rows="5"
                      id="diet_issue"
                      placeholder="Please type your physical issues. If no issues there type 'No Issue'"
                      value={dietIssue}
                      onChange={this.handleDietIssue.bind(this)}
                    ></textarea>
                  </div>
                )}

                {!dietIssue &&
                  dietIssueSubmitted &&
                  dietIssueErrorStatus === 400 && (
                    <span className="validation-error m-2">
                      If you have no physical issue, please type "No Issue"
                    </span>
                  )}

                {dietIssueSubmitting ? (
                  <img src={loaderUrl} alt="Please Wait..." />
                ) : (
                  dietRequestAvailable && (
                    <button
                      type="submit"
                      className="btn btn-primary assign-button"
                      onClick={this.handleDietRequest.bind(this)}
                    >
                      Send Diet Request
                    </button>
                  )
                )}

                {!dietRequestAvailable && (
                  <Link
                    to={{
                      pathname: routesList.TRAINEE_DIET_REQUEST_LIST,
                      state: { data: "test data" },
                    }}
                    className="btn btn-primary assign-button disabled"
                  >
                    {nextDietRequestDay}
                  </Link>
                )}
              </td>
            </tr>

            <tr>
              <td className="align-middle">
                <h4>Send a request for exercise chart</h4>
              </td>

              <td className="align-middle">
                {exerciseRequestAvailable && (
                  <div className="form-group">
                    <label htmlFor="exercise_issue">Exercise Issues</label>
                    <textarea
                      className="form-control"
                      rows="5"
                      id="exercise_issue"
                      placeholder="Please type your physical issues. If no issues there type 'No Issue'"
                      value={exerciseIssue}
                      onChange={this.handleExerciseIssue.bind(this)}
                    ></textarea>
                  </div>
                )}

                {!exerciseIssue &&
                  exerciseIssueSubmitted &&
                  exerciseIssueErrorStatus === 400 && (
                    <span className="validation-error m-2">
                      If you have no physical issue, please type "No Issue"
                    </span>
                  )}

                {exerciseIssueSubmitting ? (
                  <img src={loaderUrl} alt="Please Wait..." />
                ) : (
                  exerciseRequestAvailable && (
                    <button
                      type="submit"
                      className="btn btn-primary assign-button"
                      onClick={this.handleExerciseRequest.bind(this)}
                    >
                      Send Exercise Request
                    </button>
                  )
                )}

                {!exerciseRequestAvailable && (
                  <Link
                    to={{
                      pathname: routesList.TRAINEE_EXERCISE_REQUEST_LIST,
                      state: { data: "test data" },
                    }}
                    className="btn btn-primary assign-button disabled"
                  >
                    {nextExerciseRequestDay}
                  </Link>
                )}
              </td>
            </tr>
          </tbody>
        </table>
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

export default connect(mapStateToProps)(TraineeSendRequest);
