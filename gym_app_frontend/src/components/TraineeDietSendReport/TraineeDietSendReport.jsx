import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { loaderUrl, routesList } from "../../Constants";

import { traineeDietApi } from "../../Api";

import { NoData } from "../NoData";

import {
  getCurrentDateTime,
  getFormattedIsoDate,
  getFormattedToken,
  showStatus,
} from "../../HelperFunctions";

class TraineeDietSendReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dietData: null,
      submitting: false,
      submitted: false,
      errorStatus: null,
    };
  }

  componentDidMount() {
    const { formattedToken } = this.props;
    const { dietId } = this.props.match.params;
    // const { data } = this.props.location.state;

    traineeDietApi
      .traineeGetDietDetails(dietId, formattedToken)
      .then((response) => {
        // console.log("diet details component did mount", response.data.diet);

        response.data.diet.forEach((singleDiet) => {
          singleDiet.selected = false;
          singleDiet.takenQuantity = 0;
          singleDiet.takenTotalCalorie = 0;
        });

        this.setState({ dietData: response.data });
      });
  }

  handleCheckbox(_id, e) {
    this.setState((prevState) => ({
      dietData: Object.assign(prevState.dietData, {
        diet: prevState.dietData.diet.map((obj) =>
          obj._id === _id
            ? Object.assign(obj, {
                selected: e.target.checked,
              })
            : obj
        ),
      }),
    }));
  }

  handleChange(_id, e) {
    this.setState((prevState) => ({
      dietData: Object.assign(prevState.dietData, {
        diet: prevState.dietData.diet.map((obj) =>
          obj._id === _id
            ? Object.assign(obj, {
                takenQuantity: e.target.value ? parseFloat(e.target.value) : 0,
                takenTotalCalorie: e.target.value
                  ? parseFloat(obj.diet_id.calorie) * parseFloat(e.target.value)
                  : 0,
              })
            : obj
        ),
      }),
    }));
  }

  handleSubmit() {
    this.setState({ submitting: true, submitted: true });

    const { _id: traineeDietId, diet } = this.state.dietData;
    const { formattedToken, history } = this.props;
    const diet_id = [];
    const quantity = [];
    const totalCalorie = [];

    diet.forEach((singleDiet) => {
      if (singleDiet.selected) {
        diet_id.push(singleDiet._id);
        quantity.push(singleDiet.takenQuantity);
        totalCalorie.push(singleDiet.takenTotalCalorie);
      }
    });

    const data = {
      traineeDietId,
      diet_id,
      quantity,
      totalCalorie,
    };

    traineeDietApi
      .traineeSendDietReport(data, formattedToken)
      .then((response) => {
        console.log("success trainee diet report", response.data);

        this.setState({
          submitting: false,
          submitted: false,
          errorStatus: null,
        });

        history.push(routesList.TRAINEE_DIET_REQUEST_LIST);
      })
      .catch((error) => {
        this.setState({
          submitting: false,
          errorStatus: error.response.status,
        });

        console.log(error);
      });
  }

  showDietList(diet) {
    const { submitted, errorStatus, submitting } = this.state;

    let isAnyDietChecked = null;

    if (diet) {
      isAnyDietChecked = diet.find((data) => data.selected === true);
    }

    return (
      <>
        {submitted && !isAnyDietChecked && (
          <span className="validation-error mt-2 mb-2">
            No diet item selected, Please select at least one item
          </span>
        )}

        <table className="table table-hover table-bordered">
          <thead className="thead-dark">
            <tr>
              <th></th>
              <th scope="col">Food</th>
              <th scope="col">Unit</th>
              <th scope="col">Calorie Per Unit</th>
              <th scope="col">Assigned Unit</th>
              <th scope="col">Assigned Quantity</th>
              <th scope="col">Assigned Calorie</th>
              <th scope="col">Taken Unit</th>
              <th scope="col">Taken Calorie</th>
            </tr>
          </thead>
          <tbody>
            {diet.map((data, index) => {
              if (data.diet_id) {
                const {
                  diet_id,
                  quantity,
                  totalCalorie,
                  selected,
                  _id,
                  takenTotalCalorie,
                } = data;
                let obj = this.state.dietData.diet.find((o) => o._id === _id);

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
                    <th scope="row">{diet_id.name}</th>
                    <td>{diet_id.quantity + "\xa0" + diet_id.unit}</td>
                    <td>{diet_id.calorie}</td>
                    <td>{quantity}</td>
                    <td>
                      {parseFloat(diet_id.quantity) * parseFloat(quantity) +
                        "\xa0\xa0" +
                        diet_id.unit}
                    </td>
                    <td>{totalCalorie}</td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Your Selected Quantity..."
                        onChange={this.handleChange.bind(this, _id)}
                        value={obj.takenQuantity}
                      />
                    </td>
                    <td>{takenTotalCalorie}</td>
                  </tr>
                );
              } else {
                return (
                  <tr>
                    <td>Diet Unavailable</td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>

        {submitted && errorStatus === 400 && (
          <span className="validation-error mt-2">
            Sending diet report failed, please give input correctly and try
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

  showData(dietData) {
    const {
      appliedDate,
      approval,
      diet,
      approvedDate,
      fromDate,
      toDate,
      trainer,
    } = dietData;

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
                <th scope="row">Diet Starting Time</th>
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
                <th scope="row">Diet End Time</th>
                <td>{dayTo + ", " + dateTo + " " + monthTo + ", " + yearTo}</td>
              </tr>
            ) : (
              <></>
            )}
          </tbody>
        </table>

        <p className="h1 pt-3">
          Send Diet Report <br />(
          {dateToday + " " + monthToday + ", " + yearToday})
        </p>

        {approval === 0 && !trainer ? (
          <NoData message={"Trainer Not Assigned By Admin Yet"} />
        ) : null}

        {approval === 0 && trainer ? (
          <NoData message={"Diet Not Assigned By Trainer Yet"} />
        ) : null}

        {approval === 1 && !diet.length ? (
          <NoData message={"No Diet Assigned By Trainer"} />
        ) : null}

        {approval === 1 && diet.length ? this.showDietList(diet) : null}
      </>
    );
  }

  render() {
    // console.log("diet send report render", this.state);
    const { dietData } = this.state;

    return (
      <>
        <div className="d-flex justify-content-between">
          <div className="p-2"></div>
          <div className="h1 pl-5">Diet Request Details</div>
          <div>
            <Link
              to={{
                pathname: routesList.TRAINEE_DIET_REQUEST_LIST,
                state: { data: "test data" },
              }}
              className="btn btn-primary h-auto mt-2 back-button"
            >
              Back
            </Link>
          </div>
        </div>

        {dietData ? this.showData(dietData) : null}
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

const connectedTraineeDietSendReport = connect(mapStateToProps)(
  TraineeDietSendReport
);

export { connectedTraineeDietSendReport as TraineeDietSendReport };
