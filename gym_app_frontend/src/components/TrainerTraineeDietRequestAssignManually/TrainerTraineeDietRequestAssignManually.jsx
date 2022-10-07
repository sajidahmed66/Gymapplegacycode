import React, { Component } from "react";
import DatePicker from "react-date-picker/dist/entry.nostyle";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { trainerDietTypeApi, trainerTraineeDietRequestApi } from "../../Api";

import { loaderUrl, routesList } from "../../Constants";

import {
  getFormattedIsoDate,
  getFormattedToken,
  showStatus,
} from "../../HelperFunctions";

class TrainerTraineeDietRequestAssignManually extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dietData: null,
      dietTypeList: null,
      fromDate: "",
      toDate: "",
      traineeDietId: null,
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

    trainerTraineeDietRequestApi
      .trainerGetTraineeDietRequestDetails(requestId, formattedToken)
      .then((response) => {
        this.setState({ dietData: response.data, traineeDietId: requestId });
      });

    trainerDietTypeApi
      .trainerGetDietTypeList(formattedToken)
      .then((response) => {
        response.data.forEach((diet) => {
          diet.selected = false;
          diet.selectedQuantity = 0;
          diet.totalCalorie = 0;
        });

        this.setState({ dietTypeList: response.data });
      });
  }

  handleChange(_id, e) {
    this.setState((prevState) => ({
      dietTypeList: prevState.dietTypeList.map((obj) =>
        obj._id === _id
          ? Object.assign(obj, {
              selectedQuantity: e.target.value ? parseInt(e.target.value) : 0,
              totalCalorie: e.target.value
                ? parseInt(obj.calorie) * parseInt(e.target.value)
                : 0,
            })
          : obj
      ),
    }));
  }

  handleCheckbox(_id, e) {
    this.setState((prevState) => ({
      dietTypeList: prevState.dietTypeList.map((obj) =>
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

    const { fromDate, toDate, traineeDietId, dietTypeList } = this.state;
    const { formattedToken, history } = this.props;
    const diet_id = [];
    const quantity = [];
    const totalCalorie = [];

    dietTypeList.forEach((diet) => {
      if (diet.selected) {
        diet_id.push(diet._id);
        quantity.push(diet.selectedQuantity);
        totalCalorie.push(diet.totalCalorie);
      }
    });

    const data = {
      fromDate,
      toDate,
      traineeDietId,
      diet_id,
      quantity,
      totalCalorie,
      flag: 1,
    };

    // console.log("handle submit", data);

    trainerTraineeDietRequestApi
      .trainerAssignTraineeDietRequest(data, formattedToken)
      .then((response) => {
        console.log("success assign trainee diet request", response);

        this.setState({
          submitting: false,
          submitted: false,
          errorStatus: null,
        });

        history.push(routesList.TRAINER_TRAINEE_DIET_REQUEST_LIST);
      })
      .catch((error) => {
        this.setState({
          submitting: false,
          errorStatus: error.response.status,
        });

        console.log(error);
      });
  }

  showData(dietData) {
    const {
      fromDate,
      toDate,
      fromDateError,
      toDateError,
      submitted,
    } = this.state;
    const { approval, appliedDate, issue } = dietData;
    const { firstname, lastname, phone } = dietData.trainee;

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
            <tr>
              <th scope="row">Physical Issues</th>
              <td>{issue ? issue : "No Issue Available"}</td>
            </tr>
          </tbody>
        </table>
      </>
    );
  }

  showDietTypeList() {
    const { dietTypeList, submitted, errorStatus, submitting } = this.state;

    let isAnyDietChecked = null;

    if (dietTypeList) {
      isAnyDietChecked = dietTypeList.find((data) => data.selected === true);
    }

    return (
      <>
        <p className="h1">Diet Type List</p>

        {submitted && !isAnyDietChecked && (
          <span className="validation-error mt-2 mb-2">
            No diet item selected, Please select at least one item
          </span>
        )}

        <table className="table table-hover table-bordered">
          <thead className="thead-dark">
            <tr>
              <th></th>
              <th scope="col">Name</th>
              <th scope="col">Unit</th>
              <th scope="col">Measurement</th>
              <th scope="col">Kilo Calorie Per Unit</th>
              <th scope="col">Quantity</th>
              <th scope="col">Total Calorie</th>
            </tr>
          </thead>
          <tbody>
            {dietTypeList.map((data, index) => {
              const {
                _id,
                name,
                unit,
                quantity,
                calorie,
                totalCalorie,
                selected,
              } = data;

              // to get the particular data in the list, because user can edit any row
              let obj = dietTypeList.find((o) => o._id === _id);

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
                  <td>{unit}</td>
                  <td>{quantity}</td>
                  <td>{calorie}</td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Your Selected Quantity..."
                      onChange={this.handleChange.bind(this, _id)}
                      value={obj.selectedQuantity}
                    />
                  </td>
                  <td>{totalCalorie}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {submitted && errorStatus === 400 && (
          <span className="validation-error mt-2">
            Assigning diet list failed, please give input correctly and try
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
            Assign Diet
          </button>
        )}
      </>
    );
  }

  render() {
    const { dietData, dietTypeList } = this.state;
    const { requestId } = this.props.match.params;
    // console.log("check state", this.state);

    return (
      <>
        <div className="d-flex justify-content-between">
          <div className="p-2"></div>
          <div className="h1 pl-5">Assign Trainee Diet</div>
          <div>
            <Link
              to={{
                pathname:
                  routesList.TRAINER_TRAINEE_DIET_REQUEST_ASSIGN_TYPE +
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

        {dietData ? this.showData(dietData) : null}

        {dietTypeList ? this.showDietTypeList() : null}
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

const connectedTrainerTraineeDietRequestAssignManually = connect(
  mapStateToProps
)(TrainerTraineeDietRequestAssignManually);

export { connectedTrainerTraineeDietRequestAssignManually as TrainerTraineeDietRequestAssignManually };
