import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { loaderUrl, routesList } from "../../Constants";

import { trainerDietTypeApi } from "../../Api";

import {
  formValidation,
  getFormattedToken,
  uniqueId,
} from "../../HelperFunctions";

class TrainerDietTypeDetailsEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      quantity: "",
      unit: "",
      calorie: "",
      submitting: false,
      submitted: false,
      nameError: [],
      quantityError: [],
      unitError: [],
      calorieError: [],
      errorStatus: null,
    };
  }

  componentDidMount() {
    const { formattedToken } = this.props;
    const { dietTypeId } = this.props.match.params;

    trainerDietTypeApi
      .trainerGetDietTypeDetails(dietTypeId, formattedToken)
      .then((response) => {
        const { name, quantity, unit, calorie } = response.data;
        this.setState({ name, quantity, unit, calorie });
      });
  }

  handleChange(e) {
    const { state } = this;
    const { name, value } = e.target;
    let data = {};

    if (name === "name") {
      data = formValidation.checkType(state, "dietName", value);
    } else if (name === "quantity") {
      data = formValidation.checkType(state, "dietQuantity", value);
    } else if (name === "unit") {
      data = formValidation.checkType(state, "dietUnit", value);
    } else if (name === "calorie") {
      data = formValidation.checkType(state, "dietCalorie", value);
    } else {
      data = state;
    }

    this.setState(data);
  }

  handleSubmit(e) {
    this.setState({ submitting: true, submitted: true });

    const { name, quantity, unit, calorie } = this.state;
    const { formattedToken, history } = this.props;
    const { dietTypeId } = this.props.match.params;

    e.preventDefault();

    let updatedDietTypeData = {
      name,
      quantity,
      unit,
      calorie,
    };

    trainerDietTypeApi
      .trainerEditDietType(updatedDietTypeData, dietTypeId, formattedToken)
      .then((response) => {
        // console.log("data submitted", response);

        this.setState({
          submitting: false,
          submitted: false,
          errorStatus: null,
        });

        history.push(
          routesList.TRAINER_GET_DIET_TYPE_DETAILS + "/" + dietTypeId
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
    const {
      name,
      quantity,
      unit,
      calorie,
      submitting,
      submitted,
      nameError,
      quantityError,
      unitError,
      calorieError,
      errorStatus,
    } = this.state;

    return (
      <>
        <div className="d-flex justify-content-between">
          <div className="p-2"></div>
          <div className="h1 pl-5">Diet Type Edit</div>
          <div>
            <Link
              to={{
                pathname: routesList.TRAINER_GET_DIET_TYPE_LIST,
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
            Updating Diet Type Failed
          </span>
        )}

        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group row">
            <label htmlFor="name" className="col-sm-2 col-form-label">
              Diet Name
            </label>

            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="Diet Name..."
                value={name}
                onChange={this.handleChange.bind(this)}
              />

              {submitted &&
                (!name ? (
                  <span className="validation-error">
                    Please give a valid diet item name
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
            <label htmlFor="quantity" className="col-sm-2 col-form-label">
              Diet Quantity
            </label>

            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="quantity"
                name="quantity"
                placeholder="Quantity for a single diet unit, e.g. 1, 50, 100 etc. (only number)..."
                value={quantity}
                onChange={this.handleChange.bind(this)}
              />

              {submitted &&
                (!quantity ? (
                  <span className="validation-error">
                    Please give a valid quantity
                  </span>
                ) : (
                  quantityError.map((message) => {
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
            <label htmlFor="unit" className="col-sm-2 col-form-label">
              Diet Unit
            </label>

            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="unit"
                name="unit"
                placeholder="Unit name for a diet e.g. gram, cup, piece etc..."
                value={unit}
                onChange={this.handleChange.bind(this)}
              />

              {submitted &&
                (!unit ? (
                  <span className="validation-error">
                    Please give a valid unit
                  </span>
                ) : (
                  unitError.map((message) => {
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
            <label htmlFor="calorie" className="col-sm-2 col-form-label">
              Calorie Per Unit
            </label>

            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="calorie"
                name="calorie"
                placeholder="Diet Calorie Per Unit..."
                value={calorie}
                onChange={this.handleChange.bind(this)}
              />

              {submitted &&
                (!calorie ? (
                  <span className="validation-error">
                    Please give a valid calorie
                  </span>
                ) : (
                  calorieError.map((message) => {
                    return (
                      <span key={uniqueId.id()} className="validation-error">
                        {message}
                      </span>
                    );
                  })
                ))}
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

const connectedTrainerDietTypeDetailsEdit = connect(mapStateToProps)(
  TrainerDietTypeDetailsEdit
);

export { connectedTrainerDietTypeDetailsEdit as TrainerDietTypeDetailsEdit };
