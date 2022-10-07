import React, { Component } from "react";
import { confirmAlert } from "react-confirm-alert";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { getFormattedIsoDate, getFormattedToken } from "../../HelperFunctions";

import { sAdminDietTypeApi } from "../../Api";

import { routesList } from "../../Constants";

import "./SAdminDietTypeDetails.css";

class SAdminDietTypeDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { dietTypeDetails: null };
  }

  componentDidMount() {
    const { formattedToken } = this.props;
    const { dietTypeId } = this.props.match.params;
    // const { data } = this.props.location.state;

    sAdminDietTypeApi
      .sAdminGetDietTypeDetails(dietTypeId, formattedToken)
      .then((response) => {
        this.setState({ dietTypeDetails: response.data });
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
    const { formattedToken, history } = this.props;

    sAdminDietTypeApi
      .sAdminDeleteDietType(dietTypeId, formattedToken)
      .then((response) => {
        // console.log("data deleted", response);
        // this.setState({ dietTypeList: response.data });
        history.push(routesList.S_ADMIN_GET_DIET_TYPE_LIST);
      });
  }

  showData(dietTypeDetails) {
    const { dietTypeId } = this.props.match.params;

    const { name, quantity, unit, calorie, date } = dietTypeDetails;

    const {
      day: dayCreated,
      date: dateCreated,
      month: monthCreated,
      year: yearCreated,
      hour: hourCreated,
      minute: minuteCreated,
      second: secondCreated,
      miliSecond: miliSecondCreated,
    } = getFormattedIsoDate(date);

    return (
      <>
        <table className="table table-hover table-bordered">
          <tbody>
            <tr>
              <th scope="row">Diet Name</th>
              <td>{name}</td>
            </tr>

            <tr>
              <th scope="row">Diet Quantity</th>
              <td>{quantity}</td>
            </tr>

            <tr className="">
              <th scope="row">Diet Unit</th>
              <td>{unit}</td>
            </tr>

            <tr>
              <th scope="row">Calorie Per Unit</th>

              <td>{calorie}</td>
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
                  ":" +
                  miliSecondCreated +
                  ")"}
              </td>
            </tr>
          </tbody>
        </table>

        <Link
          to={{
            pathname:
              routesList.S_ADMIN_EDIT_DIET_TYPE_DETAILS + "/" + dietTypeId,
            state: { data: "test data" },
          }}
          className="btn btn-primary h-auto mt-2 edit-button"
        >
          Edit
        </Link>

        <button
          className="btn btn-primary text-wrap delete-button mt-2"
          type="button"
          onClick={() => this.handleDelete(dietTypeId)}
        >
          Delete
        </button>
      </>
    );
  }

  render() {
    // console.log("diet type details render", this.state);

    const { dietTypeDetails } = this.state;

    return (
      <>
        <div className="d-flex justify-content-between">
          <div className="p-2"></div>
          <div className="h1 pl-5">Diet Type Details</div>
          <div>
            <Link
              to={{
                pathname: routesList.S_ADMIN_GET_DIET_TYPE_LIST,
                state: { data: "test data" },
              }}
              className="btn btn-primary h-auto mt-2 back-button"
            >
              Back
            </Link>
          </div>
        </div>

        {dietTypeDetails ? this.showData(dietTypeDetails) : null}
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

const connectedSAdminDietTypeDetails = connect(mapStateToProps)(
  SAdminDietTypeDetails
);

export { connectedSAdminDietTypeDetails as SAdminDietTypeDetails };
