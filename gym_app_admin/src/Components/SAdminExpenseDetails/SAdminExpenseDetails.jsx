import React, { Component } from "react";
import { confirmAlert } from "react-confirm-alert";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { getFormattedIsoDate, getFormattedToken } from "../../HelperFunctions";

import { sAdminExpenseApi } from "../../Api";

import { routesList } from "../../Constants";

class SAdminExpenseDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { expenseDetails: null };
  }

  componentDidMount() {
    const { formattedToken } = this.props;
    const { expenseId } = this.props.match.params;

    sAdminExpenseApi
      .sAdminGetExpenseDetails(expenseId, formattedToken)
      .then((response) => {
        this.setState({ expenseDetails: response.data });
      });
  }

  deleteData(expenseId) {
    const { formattedToken, history } = this.props;

    sAdminExpenseApi
      .sAdminDeleteExpense(expenseId, formattedToken)
      .then((response) => {
        // console.log("data deleted", response);
        history.push(routesList.S_ADMIN_EXPENSE);
      });
  }

  handleDelete(expenseId) {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure to delete this item?",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.deleteData(expenseId),
        },
        {
          label: "Cancel",
          onClick: () => <></>,
        },
      ],
    });
  }

  showData = (expenseDetails) => {
    const { expenseId } = this.props.match.params;

    const { name, date, amount, entryBy } = expenseDetails;

    const {
      day: dayOfExpense,
      date: dateOfExpense,
      month: monthOfExpense,
      year: yearOfExpense,
    } = getFormattedIsoDate(date);

    return (
      <>
        <table className="table table-hover table-bordered">
          <tbody>
            <tr>
              <th scope="row">Expense Name</th>

              <td>{name}</td>
            </tr>

            <tr>
              <th scope="row">Expense Amount</th>

              <td>{amount} Taka</td>
            </tr>

            <tr>
              <th scope="row">Expense Date</th>

              <td>
                {dayOfExpense +
                  ", " +
                  dateOfExpense +
                  " " +
                  monthOfExpense +
                  ", " +
                  yearOfExpense}
              </td>
            </tr>

            <tr>
              <th scope="row">Entry By</th>

              <td>{entryBy.firstname + "\xa0\xa0" + entryBy.lastname}</td>
            </tr>
          </tbody>
        </table>

        <Link
          to={{
            pathname: routesList.S_ADMIN_EDIT_EXPENSE + "/" + expenseId,
            state: { data: "test data" },
          }}
          className="btn btn-primary h-auto mt-2 edit-button"
        >
          Edit
        </Link>

        <button
          className="btn btn-primary text-wrap delete-button mt-2"
          type="button"
          onClick={() => this.handleDelete(expenseId)}
        >
          Delete
        </button>
      </>
    );
  };

  render() {
    // console.log("check state", this.state);
    const { expenseDetails } = this.state;

    return (
      <>
        <div className="d-flex justify-content-between">
          <div className="p-2"></div>

          <div className="h1 pl-5">Expense Details</div>

          <div>
            <Link
              to={{
                pathname: routesList.S_ADMIN_EXPENSE,
                state: { data: "test data" },
              }}
              className="btn btn-primary h-auto mt-2 back-button"
            >
              Back
            </Link>
          </div>
        </div>

        {expenseDetails ? this.showData(expenseDetails) : null}
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

const connectedSAdminExpenseDetails =
  connect(mapStateToProps)(SAdminExpenseDetails);

export { connectedSAdminExpenseDetails as SAdminExpenseDetails };
