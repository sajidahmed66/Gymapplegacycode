import React, { Component } from "react";
import { confirmAlert } from "react-confirm-alert";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { getFormattedIsoDate, getFormattedToken } from "../../HelperFunctions";

import { trainerExerciseTypeApi } from "../../Api";

import { routesList } from "../../Constants";

import "./TrainerExerciseTypeDetails.css";

class TrainerExerciseTypeDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { exerciseTypeDetails: null };
  }

  componentDidMount() {
    const { formattedToken } = this.props;
    const { exerciseTypeId } = this.props.match.params;
    // const { data } = this.props.location.state;

    trainerExerciseTypeApi
      .trainerGetExerciseTypeDetails(exerciseTypeId, formattedToken)
      .then((response) => {
        this.setState({ exerciseTypeDetails: response.data });
      });
  }

  handleDelete(exerciseTypeId) {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure to delete this item?",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.deleteData(exerciseTypeId),
        },
        {
          label: "No",
          onClick: () => <></>,
        },
      ],
    });
  }

  deleteData(exerciseTypeId) {
    const { formattedToken, history } = this.props;

    trainerExerciseTypeApi
      .trainerDeleteExerciseType(exerciseTypeId, formattedToken)
      .then((response) => {
        // console.log("data deleted", response);
        // this.setState({ dietTypeList: response.data });
        history.push(routesList.TRAINER_GET_EXERCISE_TYPE_LIST);
      });
  }

  showData(exerciseTypeDetails) {
    const { exerciseTypeId } = this.props.match.params;

    const { name, date, description } = exerciseTypeDetails;

    const {
      day: dayCreated,
      date: dateCreated,
      month: monthCreated,
      year: yearCreated,
      hour: hourCreated,
      minute: minuteCreated,
      second: secondCreated,
    } = getFormattedIsoDate(date);

    return (
      <>
        <table className="table table-hover table-bordered">
          <tbody>
            <tr>
              <th scope="row">Exercise Name</th>

              <td>{name}</td>
            </tr>
            <tr>
              <th scope="row">Description</th>

              <td>{description ? description : "No Description Available"}</td>
            </tr>

            <tr>
              <th scope="row">Entry Date</th>

              <td>
                {dayCreated +
                  ", " +
                  dateCreated +
                  " " +
                  monthCreated +
                  ", " +
                  yearCreated +
                  " (" +
                  hourCreated +
                  ":" +
                  minuteCreated +
                  ":" +
                  secondCreated +
                  ")"}
              </td>
            </tr>
          </tbody>
        </table>

        <Link
          to={{
            pathname:
              routesList.TRAINER_EDIT_EXERCISE_TYPE_DETAILS +
              "/" +
              exerciseTypeId,
            state: { data: "test data" },
          }}
          className="btn btn-primary h-auto mt-2 edit-button"
        >
          Edit
        </Link>

        {/* <button
          className="btn btn-primary text-wrap delete-button mt-2"
          type="button"
          onClick={() => this.handleDelete(exerciseTypeId)}
        >
          Delete
        </button> */}
      </>
    );
  }

  render() {
    // console.log("exercise type details render", this.state);

    const { exerciseTypeDetails } = this.state;

    return (
      <>
        <div className="d-flex justify-content-between">
          <div className="p-2"></div>
          <div className="h1 pl-5">Exercise Type Details</div>
          <div>
            <Link
              to={{
                pathname: routesList.TRAINER_GET_EXERCISE_TYPE_LIST,
                state: { data: "test data" },
              }}
              className="btn btn-primary h-auto mt-2 back-button"
            >
              Back
            </Link>
          </div>
        </div>

        {exerciseTypeDetails ? this.showData(exerciseTypeDetails) : null}
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

const connectedTrainerExerciseTypeDetails = connect(mapStateToProps)(
  TrainerExerciseTypeDetails
);

export { connectedTrainerExerciseTypeDetails as TrainerExerciseTypeDetails };
