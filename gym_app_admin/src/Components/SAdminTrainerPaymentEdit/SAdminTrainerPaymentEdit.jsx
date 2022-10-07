import React, { Component } from "react";
import DatePicker from "react-date-picker/dist/entry.nostyle";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { loaderUrl, routesList } from "../../Constants";

import { sAdminTrainerPaymentApi } from "../../Api";

import {
  formValidation,
  getFormattedToken,
  uniqueId,
} from "../../HelperFunctions";

class SAdminTrainerPaymentEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: "",
      date: "",
      trainer: null,
      submitting: false,
      submitted: false,
      amountError: [],
      dateError: "",
      errorStatus: null,
    };
  }

  componentDidMount() {
    const { formattedToken } = this.props;
    const { trainerPaymentId } = this.props.match.params;

    sAdminTrainerPaymentApi
      .sAdminGetTrainerPaymentDetails(trainerPaymentId, formattedToken)
      .then((response) => {
        const { amount, date, trainer } = response.data;
        this.setState({ trainer, amount, date });
      });
  }

  handleSubmit = (e) => {
    this.setState({ submitting: true, submitted: true });

    const { trainer, amount, date } = this.state;
    const { trainerPaymentId } = this.props.match.params;
    const { formattedToken, history } = this.props;

    e.preventDefault();
    let data = {
      trainer: trainer._id,
      amount,
      date,
    };

    sAdminTrainerPaymentApi
      .sAdminUpdateTrainerPayment(data, trainerPaymentId, formattedToken)
      .then((response) => {
        this.setState({
          submitting: false,
          errorStatus: null,
          submitted: false,
        });
        // console.log("trainer payment data updated successfully", response.data);
        history.push(
          routesList.S_ADMIN_DETAILS_TRAINER_PAYMENT + "/" + trainerPaymentId
        );
      })
      .catch((error) => {
        this.setState({
          submitting: false,
          errorStatus: error.response.status,
        });
        console.log(error);
      });
  };

  handleChange(e) {
    const { state } = this;
    const { name, value } = e.target;
    let data = {};

    data = formValidation.checkType(state, name, value);

    this.setState(data);
  }

  render() {
    const {
      amount,
      date,
      trainer,
      submitting,
      submitted,
      amountError,
      dateError,
      errorStatus,
    } = this.state;

    return (
      <>
        <div className="d-flex justify-content-between">
          <div className="p-2"></div>
          <div className="h1 pl-5">Edit Trainer Payment Details</div>
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

        {submitted && errorStatus === 400 && (
          <span className="validation-error mt-2">
            Updating trainer payment details failed
          </span>
        )}

        <form onSubmit={(e) => this.handleSubmit(e)}>
          {trainer ? (
            <div className="form-group row">
              <label htmlFor="name" className="col-sm-2 col-form-label">
                Trainer Name
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control-plaintext"
                  id="name"
                  name="name"
                  placeholder="Trainer Name..."
                  value={trainer.firstname + "\xa0\xa0" + trainer.lastname}
                  onChange={this.handleChange.bind(this)}
                />
              </div>
            </div>
          ) : (
            <></>
          )}

          <div className="form-group row">
            <label htmlFor="amount" className="col-sm-2 col-form-label">
              Payment Amount
            </label>
            <div className="col">
              <div className="form-row">
                <div className="col">
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="amount"
                      name="amount"
                      placeholder="Type the payment amount, e.g. 500, 1000, 500000 (number only)..."
                      value={amount}
                      onChange={this.handleChange.bind(this)}
                    />
                    <div className="input-group-append">
                      <span className="input-group-text">Taka</span>
                    </div>
                  </div>

                  {submitted &&
                    (!amount ? (
                      <span className="validation-error">
                        Please give a valid amount
                      </span>
                    ) : (
                      amountError.map((message) => {
                        return (
                          <span
                            key={uniqueId.id()}
                            className="validation-error"
                          >
                            {message}
                          </span>
                        );
                      })
                    ))}
                </div>
              </div>
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="date" className="col-sm-2 col-form-label">
              Payment Date
            </label>

            <span>
              <DatePicker
                value={date ? new Date(date) : ""}
                onChange={(value) => {
                  if (value) {
                    this.setState({
                      date: new Date(value),
                      dateError: "",
                      errorStatus: null,
                    });
                  } else {
                    this.setState({
                      date: "",
                      dateError: "Please select a valid date",
                    });
                  }
                }}
              />

              {submitted && dateError && (
                <span className="validation-error">{dateError}</span>
              )}
            </span>
          </div>

          {submitting ? (
            <img src={loaderUrl} alt="Please Wait..." />
          ) : (
            <button type="submit" className="btn btn-primary edit-button">
              Update Payment Data
            </button>
          )}
        </form>
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

const connectedSAdminTrainerPaymentEdit = connect(mapStateToProps)(
  SAdminTrainerPaymentEdit
);

export { connectedSAdminTrainerPaymentEdit as SAdminTrainerPaymentEdit };
