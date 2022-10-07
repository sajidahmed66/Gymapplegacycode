import React, { Component } from "react";
import * as FaIcons from "react-icons/fa";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { routesList } from "../../Constants";

import commonApi from "../../Api/commonApi";

import { traineeDietApi } from "../../Api";

import { NoData } from "../NoData";

import {
  getFormattedIsoDate,
  getFormattedToken,
  showStatus,
} from "../../HelperFunctions";

class TraineeDietDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dietData: null,
    };
  }

  componentDidMount() {
    const { formattedToken } = this.props;
    const { dietId } = this.props.match.params;
    // const { data } = this.props.location.state;

    traineeDietApi
      .traineeGetDietDetails(dietId, formattedToken)
      .then((response) => {
        // console.log("diet details component did mount", response.data);
        this.setState({ dietData: response.data });
      });
  }

  showDiet(diet) {
    return (
      <>
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
              const { diet_id, quantity, totalCalorie } = data;

              if (diet_id) {
                return (
                  <tr key={index}>
                    <th scope="row">{diet_id.name}</th>
                    <td>{diet_id.quantity + "\xa0" + diet_id.unit}</td>
                    <td>{diet_id.calorie}</td>
                    <td>
                      {parseFloat(diet_id.quantity) * parseFloat(quantity) +
                        "\xa0\xa0" +
                        diet_id.unit}
                    </td>
                    <td>{totalCalorie}</td>
                  </tr>
                );
              } else {
                return (
                  <tr key={index}>
                    <th colSpan={5}>Diet Item Unavailable</th>
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
    const {
      appliedDate,
      approval,
      diet,
      approvedDate,
      fromDate,
      toDate,
      trainer,
      flag,
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
      date: dateFrom,
      month: monthFrom,
      year: yearFrom,
    } = getFormattedIsoDate(fromDate);

    const { date: dateTo, month: monthTo, year: yearTo } = getFormattedIsoDate(
      toDate
    );

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
                <td>{dateFrom + " " + monthFrom + ", " + yearFrom}</td>
              </tr>
            ) : (
              <></>
            )}

            {toDate ? (
              <tr>
                <th scope="row">Diet End Time</th>
                <td>{dateTo + " " + monthTo + ", " + yearTo}</td>
              </tr>
            ) : (
              <></>
            )}
          </tbody>
        </table>

        {!approval === 1 && !flag === 2 && <p className="h1 pt-3">Diet List</p>}

        {approval === 0 && !trainer && (
          <NoData message={"Trainer Not Assigned By Admin Yet"} />
        )}

        {approval === 0 && trainer && (
          <NoData message={"Diet Not Assigned By Trainer Yet"} />
        )}

        {approval === 1 && (!flag || flag === 1) && !diet.length && (
          <NoData message={"No Diet Assigned By Trainer"} />
        )}

        {approval === 1 &&
          diet.length !== 0 &&
          (!flag || flag === 1) &&
          this.showDiet(diet)}

        {approval === 1 && flag === 2 && this.showFile()}
      </>
    );
  }

  render() {
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

        {dietData && this.showData(dietData)}
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

export default connect(mapStateToProps)(TraineeDietDetails);
