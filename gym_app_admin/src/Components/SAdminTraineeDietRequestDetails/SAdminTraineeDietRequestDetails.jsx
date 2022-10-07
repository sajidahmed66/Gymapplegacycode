import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { sAdminTraineeDietRequestApi } from "../../Api";

import { routesList } from "../../Constants";

import { NoData } from "../NoData";

import {
  getFormattedIsoDate,
  getFormattedToken,
  showStatus,
} from "../../HelperFunctions";

class SAdminTraineeDietRequestDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requestDetails: null,
    };
  }

  componentDidMount() {
    const { formattedToken } = this.props;
    const { requestId } = this.props.match.params;
    // const { data } = this.props.location.state;

    sAdminTraineeDietRequestApi
      .sAdminGetTraineeDietRequestDetails(requestId, formattedToken)
      .then((response) => {
        this.setState({ requestDetails: response.data });
      });
  }

  setTrainerInfo(trainerId) {
    this.setState({ trainerId: trainerId || null });
  }

  showNotApproval() {
    return (
      <>
        <NoData message={"Diet Not Assigned By Trainer Yet"} />
      </>
    );
  }

  showAssignButton() {
    const { requestId } = this.props.match.params;

    return (
      <>
        <div className="h4 pt-3">Diet Request Not Assigned To Trainer Yet</div>
        <Link
          to={{
            pathname:
              routesList.S_ADMIN_ASSIGN_TRAINEE_DIET_REQUEST + "/" + requestId,
            state: { data: "test data" },
          }}
          className="btn btn-primary h-auto mt-2 assign-button"
        >
          Assign Now
        </Link>
      </>
    );
  }

  showDietChart(dietChart) {
    return (
      <>
        <div className="h1 pt-3">Diet List</div>

        {dietChart.length ? (
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
                {dietChart.map((data, index) => {
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
                })}
              </tbody>
            </table>
          </>
        ) : (
          <>
            <NoData message={"No Diet Assigned By Trainer"} />
          </>
        )}
      </>
    );
  }

  showRequestDetails(requestDetails) {
    const { firstname, lastname, phone } = requestDetails.trainee;
    const {
      trainer,
      approval,
      approvedDate,
      fromDate,
      toDate,
      diet,
    } = requestDetails;

    const {
      date,
      month,
      year,
      hour,
      minute,
      second,
      miliSecond,
    } = getFormattedIsoDate(requestDetails.appliedDate);

    const {
      date: dateApproved,
      month: monthApproved,
      year: yearApproved,
      hour: hourApproved,
      minute: minuteApproved,
      second: secondApproved,
      miliSecond: miliSecondApproved,
    } = getFormattedIsoDate(requestDetails.approvedDate);

    const {
      date: dateFrom,
      month: monthFrom,
      year: yearFrom,
      hour: hourFrom,
      minute: minuteFrom,
      second: secondFrom,
      miliSecond: miliSecondFrom,
    } = getFormattedIsoDate(requestDetails.fromDate);

    const {
      date: dateTo,
      month: monthTo,
      year: yearTo,
      hour: hourTo,
      minute: minuteTo,
      second: secondTo,
      miliSecond: miliSecondTo,
    } = getFormattedIsoDate(requestDetails.toDate);

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
              <td className="pb-3">{showStatus(approval)}</td>
            </tr>

            <tr>
              <th scope="row">Requested Date</th>
              <td>
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
                <th scope="row">Approved Date</th>
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
                <th scope="row">Assigned Trainer</th>
                <td>{trainer.firstname + "\xa0\xa0" + trainer.lastname}</td>
              </tr>
            ) : (
              <></>
            )}

            {trainer ? (
              <tr>
                <th scope="row">Trainer Mobile</th>
                <td>{trainer.phone}</td>
              </tr>
            ) : (
              <></>
            )}

            {fromDate ? (
              <tr>
                <th scope="row">Diet Starting Time</th>
                <td>
                  {dateFrom +
                    " " +
                    monthFrom +
                    ", " +
                    yearFrom +
                    " (" +
                    hourFrom +
                    ":" +
                    minuteFrom +
                    ":" +
                    secondFrom +
                    ":" +
                    miliSecondFrom +
                    ")"}
                </td>
              </tr>
            ) : (
              <></>
            )}

            {toDate ? (
              <tr>
                <th scope="row">Diet Ending Time</th>
                <td>
                  {dateTo +
                    " " +
                    monthTo +
                    ", " +
                    yearTo +
                    " (" +
                    hourTo +
                    ":" +
                    minuteTo +
                    ":" +
                    secondTo +
                    ":" +
                    miliSecondTo +
                    ")"}
                </td>
              </tr>
            ) : (
              <></>
            )}
          </tbody>
        </table>

        {approval === 1 ? this.showDietChart(diet) : <></>}
        {approval === 0 && trainer ? this.showNotApproval() : <></>}
        {approval === 0 && !trainer ? this.showAssignButton() : <></>}
      </>
    );
  }

  render() {
    const { requestDetails } = this.state;

    return (
      <>
        <div className="d-flex justify-content-between">
          <div className="p-2"></div>
          <div className="h1 pl-5">Diet Request Details</div>
          <div>
            <Link
              to={{
                pathname: routesList.S_ADMIN_GET_TRAINEE_DIET_REQUEST_LIST,
                state: { data: "test data" },
              }}
              className="btn btn-primary h-auto mt-2 back-button"
            >
              Back
            </Link>
          </div>
        </div>

        {requestDetails ? this.showRequestDetails(requestDetails) : <NoData />}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const formattedToken = getFormattedToken(state.sAdminLoginReducer.token);

  return {
    formattedToken,
  };
};

export default connect(mapStateToProps)(SAdminTraineeDietRequestDetails);
