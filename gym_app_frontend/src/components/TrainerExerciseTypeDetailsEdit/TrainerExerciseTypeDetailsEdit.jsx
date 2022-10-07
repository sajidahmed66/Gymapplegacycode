import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { loaderUrl, routesList } from "../../Constants";

import { trainerExerciseTypeApi } from "../../Api";

import {
  formValidation,
  getFormattedToken,
  uniqueId,
} from "../../HelperFunctions";

class TrainerExerciseTypeDetailsEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    const { formattedToken } = this.props;
    const { exerciseTypeId } = this.props.match.params;

    trainerExerciseTypeApi
      .trainerGetExerciseTypeDetails(exerciseTypeId, formattedToken)
      .then((response) => {
        const { name, description } = response.data;
        this.setState({ name, description });
      });
  }

  handleChange(e) {
    const { state } = this;
    const { name, value } = e.target;
    let data = {};

    if (name === "name") {
      data = formValidation.checkType(state, "exerciseName", value);
    } else if (name === "description") {
      data = formValidation.checkType(state, "exerciseDescription", value);
    } else {
      data = state;
    }

    this.setState(data);
  }

  handleSubmit(e) {
    this.setState({ submitting: true, submitted: true });

    const { name, description } = this.state;
    const { formattedToken, history } = this.props;
    const { exerciseTypeId } = this.props.match.params;

    e.preventDefault();

    let updatedExerciseTypeData = {
      name,
      description,
    };

    trainerExerciseTypeApi
      .trainerEditExerciseType(
        updatedExerciseTypeData,
        exerciseTypeId,
        formattedToken
      )
      .then((response) => {
        // console.log("data submitted", response);

        this.setState({
          submitting: false,
          submitted: false,
          errorStatus: null,
        });

        history.push(
          routesList.TRAINER_GET_EXERCISE_TYPE_DETAILS + "/" + exerciseTypeId
        );
      })
      .catch((error) => {
        this.setState({
          submitting: false,
          errorStatus: error.response.status,
        });

        console.log(error);
      });
  }

  render() {
    // console.log("edit render", this.state);
    const { name, description, submitting, submitted, nameError, errorStatus } =
      this.state;

    return (
      <>
        <div className="d-flex justify-content-between">
          <div className="p-2"></div>
          <div className="h1 pl-5">Exercise Type Edit</div>
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

        {submitted && errorStatus === 400 && (
          <span className="validation-error mt-2">
            Updating Exercise Type Failed
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
                    Please give a valid exercise item name
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
                placeholder="Write something about this exercise..."
                value={description}
                onChange={this.handleChange.bind(this)}
              />

              {/* {submitted &&
                (!description ? (
                  <span className="validation-error">
                    Please give a valid description
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
            <button type="submit" className="btn btn-primary edit-button">
              Submit
            </button>
          )}
        </form>
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

const connectedTrainerExerciseTypeDetailsEdit = connect(mapStateToProps)(
  TrainerExerciseTypeDetailsEdit
);

export { connectedTrainerExerciseTypeDetailsEdit as TrainerExerciseTypeDetailsEdit };
