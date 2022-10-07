import React, { Component } from "react";
import { confirmAlert } from "react-confirm-alert";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { sAdminExerciseTypeListSetScrollPosition } from "../../Redux";

import { loaderUrl, routesList } from "../../Constants";

import { sAdminExerciseTypeApi } from "../../Api";

import { NoData } from "../NoData";

import {
  formValidation,
  getFormattedIsoDate,
  getFormattedToken,
  uniqueId,
} from "../../HelperFunctions";

class SAdminExerciseTypeList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      exerciseTypeList: null,
      name: "",
      description: "",
      submitting: false,
      submitted: false,
      nameError: [],
      descriptionError: [],
      errorStatus: null,
    };
  }

  componentDidMount() {
    const { formattedToken, positionX, positionY } = this.props;
    // console.log("position", positionX, positionY);
    sAdminExerciseTypeApi
      .sAdminGetExerciseTypeList(formattedToken)
      .then((response) => {
        this.setState({ exerciseTypeList: response.data });
        window.scrollTo(positionX, positionY);
      });
  }

  handleChange(e) {
    const { state } = this;
    const { name, value } = e.target;
    let data = {};

    if (name === "name") {
      data = formValidation.checkType(this.state, "exerciseName", value);
    } else if (name === "description") {
      data = formValidation.checkType(this.state, "exerciseDescription", value);
    } else {
      data = state;
    }

    this.setState(data);
  }

  handleSubmit(e) {
    this.setState({ submitting: true, submitted: true });

    const { name, description } = this.state;
    const { formattedToken } = this.props;

    e.preventDefault();

    let newExerciseTypeData = {
      name,
      description,
    };

    sAdminExerciseTypeApi
      .sAdminAddExerciseType(newExerciseTypeData, formattedToken)
      .then((response) => {
        this.setState({
          exerciseTypeList: response.data,
          name: "",
          description: "",
          submitting: false,
          submitted: false,
          errorStatus: null,
        });
      })
      .catch((error) => {
        this.setState({
          submitting: false,
          errorStatus: error.response.status,
        });
        console.log(error);
      });
  }

  deleteData(exerciseTypeId) {
    const { formattedToken, sAdminExerciseTypeListSetScrollPosition } =
      this.props;

    sAdminExerciseTypeApi
      .sAdminDeleteExerciseType(exerciseTypeId, formattedToken)
      .then((response) => {
        this.setState({ exerciseTypeList: response.data });
        sAdminExerciseTypeListSetScrollPosition(
          window.pageXOffset,
          window.pageYOffset
        );
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

  getExerciseTypeList() {
    const { exerciseTypeList } = this.state;
    const { sAdminExerciseTypeListSetScrollPosition } = this.props;

    return (
      <>
        <table className="table table-hover table-bordered">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Exercise Name</th>
              <th scope="col">Entry Time</th>
              <th scope="col">Entry By</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {exerciseTypeList.map((data, index) => {
              const { _id, name, date, entryBy } = data;
              const { firstname, lastname } = entryBy;

              const {
                day: dayOfEntry,
                date: dateOfEntry,
                month: monthOfEntry,
                year: yearOfEntry,
                hour: hourOfEntry,
                minute: minuteOfEntry,
                second: secondOfEntry,
              } = getFormattedIsoDate(date);

              return (
                <tr key={index}>
                  <th scope="row" className="align-middle">
                    {name}
                  </th>

                  <td className="align-middle">
                    {dayOfEntry +
                      ", " +
                      dateOfEntry +
                      " " +
                      monthOfEntry +
                      ", " +
                      yearOfEntry +
                      " (" +
                      hourOfEntry +
                      ":" +
                      minuteOfEntry +
                      ":" +
                      secondOfEntry +
                      ")"}
                  </td>

                  <td className="align-middle">
                    {firstname + "\xa0\xa0\xa0" + lastname}
                  </td>

                  <td className="align-middle">
                    <Link
                      to={{
                        pathname:
                          routesList.S_ADMIN_GET_EXERCISE_TYPE_DETAILS +
                          "/" +
                          _id,
                        state: { data: "test data" },
                      }}
                      className="btn btn-primary text-wrap details-button mb-1"
                      onClick={() => {
                        sAdminExerciseTypeListSetScrollPosition(
                          window.pageXOffset,
                          window.pageYOffset
                        );
                      }}
                    >
                      Details
                    </Link>
                    <Link
                      to={{
                        pathname:
                          routesList.S_ADMIN_EDIT_EXERCISE_TYPE_DETAILS +
                          "/" +
                          _id,
                        state: { data: "test data" },
                      }}
                      className="btn btn-primary text-wrap edit-button mb-1"
                      onClick={() => {
                        sAdminExerciseTypeListSetScrollPosition(
                          window.pageXOffset,
                          window.pageYOffset
                        );
                      }}
                    >
                      Edit
                    </Link>
                    {/* <button
                      className="btn btn-primary text-wrap delete-button"
                      type="button"
                      onClick={() => this.handleDelete(_id)}
                    >
                      Delete
                    </button> */}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  }

  render() {
    // console.log("exercise type render", this.state);
    const {
      exerciseTypeList,
      name,
      description,
      submitting,
      submitted,
      nameError,
      // descriptionError,
      errorStatus,
    } = this.state;

    return (
      <>
        <p className="h1">Add Exercise Type</p>

        {submitted && errorStatus === 400 && (
          <span className="validation-error mt-2">
            Adding Exercise Type Failed
          </span>
        )}

        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group row">
            <label htmlFor="name" className="col-sm-2 col-form-label">
              Exercise Name
            </label>

            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="Exercise Name..."
                value={name}
                onChange={this.handleChange.bind(this)}
              />

              {submitted &&
                (!name ? (
                  <span className="validation-error">
                    Please give a valid exercise name
                  </span>
                ) : (
                  nameError.map((message) => {
                    return (
                      <span key={uniqueId.id()} className="validation-error">
                        {message}
                      </span>
                    );
                  })
                ))}
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="description" className="col-sm-2 col-form-label">
              Exercise Description
            </label>

            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                placeholder="Exercise Description...(Optional Field)"
                value={description}
                onChange={this.handleChange.bind(this)}
              />

              {/* {submitted &&
                (!description ? (
                  <span className="validation-error">
                    Please write something about the exercise
                  </span>
                ) : (
                  descriptionError.map((message) => {
                    return (
                      <span key={uniqueId.id()} className="validation-error">
                        {message}
                      </span>
                    );
                  })
                ))} */}
            </div>
          </div>

          {submitting ? (
            <img src={loaderUrl} alt="Please Wait..." />
          ) : (
            <button type="submit" className="btn btn-primary assign-button">
              Submit
            </button>
          )}
        </form>

        <hr />

        <p className="h1">Exercise Type List</p>

        {exerciseTypeList && exerciseTypeList.length ? (
          this.getExerciseTypeList()
        ) : (
          <NoData message="No Exercise Type Found, Please Add One" />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const formattedToken = getFormattedToken(state.sAdminLoginReducer.token);
  const positionX = state.sAdminExerciseTypeReducer.exerciseTypeListPositionX;
  const positionY = state.sAdminExerciseTypeReducer.exerciseTypeListPositionY;

  return {
    formattedToken,
    positionX,
    positionY,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sAdminExerciseTypeListSetScrollPosition: (positionX, positionY) =>
      dispatch(sAdminExerciseTypeListSetScrollPosition(positionX, positionY)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SAdminExerciseTypeList);
