import React, { Component } from "react";
import * as FaIcons from "react-icons/fa";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { trainerTraineeDietRequestApi } from "../../Api";

import { routesList } from "../../Constants";

import commonApi from "../../Api/commonApi";

import { NoData } from "../NoData";

import {
  getFormattedIsoDate,
  getFormattedToken,
  showStatus,
} from "../../HelperFunctions";

import "./TrainerTraineeDietRequestDetails.css";

class TrainerTraineeDietRequestDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dietData: null,
    };
  }

  componentDidMount() {
    const { formattedToken } = this.props;
    const { requestId } = this.props.match.params;
    // const { data } = this.props.location.state;

    trainerTraineeDietRequestApi
      .trainerGetTraineeDietRequestDetails(requestId, formattedToken)
      .then((response) => {
        this.setState({ dietData: response.data });
      });
  }

  showNotApproval() {
    const { requestId } = this.props.match.params;

    return (
      <>
        <div className="h3 pt-3">Diet Not Assigned Yet</div>

        <Link
          to={{
            pathname:
              routesList.TRAINER_TRAINEE_DIET_REQUEST_ASSIGN_TYPE +
              "/" +
              requestId,
            state: { data: "test data" },
          }}
          className="btn btn-primary h-auto mt-2 assign-button"
        >
          Assign Now
        </Link>
      </>
    );
  }

  showDiet(diet) {
    return (
      <>
        <p className="h1">Diet List</p>

        <table className="table table-hover table-bordered">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Food</th>
              <th scope="col">Unit</th>
              <th scope="col">Calorie Per Unit</th>
              <th scope="col">Assigned Quantity</th>
              <th scope="col">Total Calorie</th>
            </tr>
          </thead>
          <tbody>
            {diet.map((data, index) => {
              if (data.diet_id) {
                const { diet_id, quantity, totalCalorie } = data;
                const { name, unit, calorie } = data.diet_id;

                return (
                  <tr key={index}>
                    <th scope="row">{name}</th>
                    <td>{diet_id.quantity + "\xa0" + unit}</td>
                    <td>{calorie}</td>
                    <td>
                      {parseFloat(diet_id.quantity) * parseFloat(quantity) +
                        "\xa0" +
                        unit}
                    </td>
                    <td>{totalCalorie}</td>
                  </tr>
                );
              } else {
                return (
                  <tr key={index}>
                    <td>Diet Item Unavailable</td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </>
    );
  }

  showFile() {
    const { dietData } = this.state;
    return (
      <>
        <p className="h1">Diet File</p>
        <a
          href={commonApi.api + dietData.file}
          download
          className="btn btn-primary h-auto mt-2 mb-5 assign-button"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaIcons.FaFileDownload className="file-icon" />
          <span>Download File</span>
        </a>
      </>
    );
  }

  showData(dietData) {
    // console.log("data is", dietData);
    const {
      approval,
      appliedDate,
      approvedDate,
      fromDate,
      toDate,
      diet,
      issue,
      flag,
    } = dietData;

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

    const {
      day: dayApproved,
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

            <tr className="">
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

            {approvedDate ? (
              <tr>
                <th scope="row">Approval Date</th>
                <td>
                  {dayApproved +
                    ", " +
                    dateApproved +
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
            ) : null}

            {toDate && (
              <tr>
                <th scope="row">Diet Ending Time</th>
                <td>{dayTo + ", " + dateTo + " " + monthTo + ", " + yearTo}</td>
              </tr>
            )}

            <tr>
              <th scope="row">Issue</th>
              <td>{issue ? issue : "No Issues Available"}</td>
            </tr>
          </tbody>
        </table>

        {approval === 0 && this.showNotApproval()}

        {diet.length && this.showDiet(diet)}

        {approval === 1 && !diet.length && !flag && (
          <NoData message="No Diet Found, Please Contact Your Admin or Edit Diet Details" />
        )}

        {approval === 1 && flag === 2 && this.showFile()}
      </>
    );
  }

  render() {
    const { dietData } = this.state;

    // console.log("diet request details render", this.state);

    return (
      <>
        <div className="d-flex justify-content-between">
          <div className="p-2"></div>
          <div className="h1 pl-5">Diet Request Details</div>
          <div>
            <Link
              to={{
                pathname: routesList.TRAINER_TRAINEE_DIET_REQUEST_LIST,
                state: { data: "test data" },
              }}
              className="btn btn-primary h-auto mt-2 back-button"
            >
              Back
            </Link>
          </div>
        </div>

        {dietData && this.showData(dietData)}
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

const connectedTrainerTraineeDietRequestDetails = connect(mapStateToProps)(
  TrainerTraineeDietRequestDetails
);

export { connectedTrainerTraineeDietRequestDetails as TrainerTraineeDietRequestDetails };
