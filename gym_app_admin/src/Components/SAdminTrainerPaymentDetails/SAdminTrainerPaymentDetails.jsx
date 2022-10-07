import React, { Component } from "react";
import { confirmAlert } from "react-confirm-alert";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { getFormattedIsoDate, getFormattedToken } from "../../HelperFunctions";

import { sAdminTrainerPaymentApi } from "../../Api";

import { routesList } from "../../Constants";

class SAdminTrainerPaymentDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { paymentDetails: null };
  }

  componentDidMount() {
    const { formattedToken } = this.props;
    const { trainerPaymentId } = this.props.match.params;

    sAdminTrainerPaymentApi
      .sAdminGetTrainerPaymentDetails(trainerPaymentId, formattedToken)
      .then((response) => {
        this.setState({ paymentDetails: response.data });
      });
  }

  deleteData(trainerPaymentId) {
    const { formattedToken, history } = this.props;

    sAdminTrainerPaymentApi
      .sAdminDeleteTrainerPayment(trainerPaymentId, formattedToken)
      .then((response) => {
        // console.log("data deleted", response);
        history.push(routesList.S_ADMIN_TRAINER_PAYMENT);
      });
  }

  handleDelete(trainerPaymentId) {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure to delete this item?",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.deleteData(trainerPaymentId),
        },
        {
          label: "Cancel",
          onClick: () => <></>,
        },
      ],
    });
  }

  showData = (paymentDetails) => {
    const { trainerPaymentId } = this.props.match.params;

    const { trainer, date, amount } = paymentDetails;

    const {
      day: dayOfPayment,
      date: dateOfPayment,
      month: monthOfPayment,
      year: yearOfPayment,
    } = getFormattedIsoDate(date);

    return (
      <>
        <table className="table table-hover table-bordered">
          <tbody>
            <tr>
              <th scope="row">Trainer Name</th>
              <td>{trainer.firstname + "\xa0\xa0" + trainer.lastname}</td>
            </tr>
            <tr>
              <th scope="row">Payment Amount</th>
              <td>{amount} Taka</td>
            </tr>

            <tr>
              <th scope="row">Payment Date</th>
              <td>
                {dayOfPayment +
                  ", " +
                  dateOfPayment +
                  " " +
                  monthOfPayment +
                  ", " +
                  yearOfPayment}
              </td>
            </tr>
          </tbody>
        </table>

        <Link
          to={{
            pathname:
              routesList.S_ADMIN_EDIT_TRAINER_PAYMENT + "/" + trainerPaymentId,
            state: { data: "test data" },
          }}
          className="btn btn-primary h-auto mt-2 edit-button"
        >
          Edit
        </Link>

        <button
          className="btn btn-primary text-wrap delete-button mt-2"
          type="button"
          onClick={() => this.handleDelete(trainerPaymentId)}
        >
          Delete
        </button>
      </>
    );
  };

  render() {
    // console.log("payment details render", this.state);
    const { paymentDetails } = this.state;

    return (
      <>
        <div className="d-flex justify-content-between">
          <div className="p-2"></div>
          <div className="h1 pl-5">Trainer Payment Details</div>
          <div>
            <Link
              to={{
                pathname: routesList.S_ADMIN_TRAINER_PAYMENT,
                state: { data: "test data" },
              }}
              className="btn btn-primary h-auto mt-2 back-button"
            >
              Back
            </Link>
          </div>
        </div>

        {paymentDetails ? this.showData(paymentDetails) : null}
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

const connectedSAdminTrainerPaymentDetails = connect(mapStateToProps)(
  SAdminTrainerPaymentDetails
);

export { connectedSAdminTrainerPaymentDetails as SAdminTrainerPaymentDetails };
