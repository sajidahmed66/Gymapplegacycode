import React, { Component } from "react";
import { confirmAlert } from "react-confirm-alert";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { trainerDietTypeListSetScrollPosition } from "../../Redux";

import { loaderUrl, routesList } from "../../Constants";

import { trainerDietTypeApi } from "../../Api";

import { NoData } from "../NoData";

import {
  formValidation,
  getFormattedToken,
  uniqueId,
} from "../../HelperFunctions";

import "react-confirm-alert/src/react-confirm-alert.css"; // confirm box css
import "./TrainerDietTypeList.css";

class TrainerDietTypeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      quantity: "",
      unit: "",
      calorie: "",
      dietTypeList: null,
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
    const { formattedToken, positionX, positionY } = this.props;

    trainerDietTypeApi
      .trainerGetDietTypeList(formattedToken)
      .then((response) => {
        this.setState({ dietTypeList: response.data });
        window.scrollTo(positionX, positionY);
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
    const { formattedToken } = this.props;

    e.preventDefault();

    let newDietTypeData = {
      name,
      quantity,
      unit,
      calorie,
    };

    trainerDietTypeApi
      .trainerAddDietType(newDietTypeData, formattedToken)
      .then((response) => {
        this.setState({
          dietTypeList: response.data,
          name: "",
          quantity: "",
          unit: "",
          calorie: "",
          submitting: false,
          errorStatus: null,
          submitted: false,
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

  handleDelete(dietTypeId) {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure to delete this item?",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.deleteData(dietTypeId),
        },
        {
          label: "No",
          onClick: () => <></>,
        },
      ],
    });
  }

  deleteData(dietTypeId) {
    const { formattedToken, trainerDietTypeListSetScrollPosition } = this.props;

    trainerDietTypeApi
      .trainerDeleteDietType(dietTypeId, formattedToken)
      .then((response) => {
        this.setState({ dietTypeList: response.data });
        trainerDietTypeListSetScrollPosition(
          window.pageXOffset,
          window.pageYOffset
        );
      });
  }

  getDietTypeList() {
    const { dietTypeList } = this.state;
    const { trainerDietTypeListSetScrollPosition } = this.props;

    return (
      <>
        <table className="table table-hover table-bordered">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Unit</th>
              <th scope="col">Calorie Per Unit</th>
              <th scope="col">Action</th>
            </tr>
          </thead>

          <tbody>
            {dietTypeList.map((data, index) => {
              // console.log("diet type list data", data);

              const { _id, name, unit, quantity, calorie } = data;

              return (
                <tr key={index}>
                  <th scope="row" className="align-middle">
                    {name}
                  </th>

                  <td className="align-middle">
                    {quantity + "\xa0\xa0" + unit}
                  </td>

                  <td className="align-middle">{calorie}</td>

                  <td className="align-middle">
                    <Link
                      to={{
                        pathname:
                          routesList.TRAINER_GET_DIET_TYPE_DETAILS + "/" + _id,
                        state: { data: "test data" },
                      }}
                      className="btn btn-primary text-wrap details-button mb-1"
                      onClick={() => {
                        trainerDietTypeListSetScrollPosition(
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
                          routesList.TRAINER_EDIT_DIET_TYPE_DETAILS + "/" + _id,
                        state: { data: "test data" },
                      }}
                      className="btn btn-primary text-wrap edit-button mb-1"
                      onClick={() => {
                        trainerDietTypeListSetScrollPosition(
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
    const {
      name,
      quantity,
      unit,
      calorie,
      dietTypeList,
      submitted,
      errorStatus,
      nameError,
      quantityError,
      unitError,
      calorieError,
      submitting,
    } = this.state;

    return (
      <>
        <p className="h1">Add Diet Type</p>

        {submitted && errorStatus === 400 && (
          <span className="validation-error mt-2">Adding Diet Type Failed</span>
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
                placeholder="Diet Item Name..."
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
                placeholder="Diet Calorie Per Unit (Only Number)..."
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
            <button type="submit" className="btn btn-primary assign-button">
              Submit
            </button>
          )}
        </form>

        <hr />

        <p className="h1">Diet Type List</p>

        {dietTypeList && dietTypeList.length ? (
          this.getDietTypeList()
        ) : (
          <NoData message="No Diet Type Found, Please Add One" />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const formattedToken = getFormattedToken(state.trainerLoginReducer.token);
  const positionX = state.trainerDietTypeReducer.dietTypeListPositionX;
  const positionY = state.trainerDietTypeReducer.dietTypeListPositionY;

  return {
    formattedToken,
    positionX,
    positionY,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    trainerDietTypeListSetScrollPosition: (positionX, positionY) =>
      dispatch(trainerDietTypeListSetScrollPosition(positionX, positionY)),
  };
};

const connectedTrainerDietTypeList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TrainerDietTypeList);

export { connectedTrainerDietTypeList as TrainerDietTypeList };
