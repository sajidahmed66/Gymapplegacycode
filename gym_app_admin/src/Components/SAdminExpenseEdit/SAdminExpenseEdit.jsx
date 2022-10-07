import React, { Component } from "react";
import DatePicker from "react-date-picker/dist/entry.nostyle";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import {
  formValidation,
  getFormattedToken,
  uniqueId,
} from "../../HelperFunctions";

import { sAdminExpenseApi } from "../../Api";

import { loaderUrl, routesList } from "../../Constants";

class SAdminExpenseEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      amount: "",
      date: "",
      submitting: false,
      submitted: false,
      nameError: [],
      amountError: [],
      dateError: "",
      errorStatus: null,
    };
  }

  componentDidMount() {
    const { formattedToken } = this.props;
    const { expenseId } = this.props.match.params;

    sAdminExpenseApi
      .sAdminGetExpenseDetails(expenseId, formattedToken)
      .then((response) => {
        const { name, amount, date } = response.data;
        this.setState({ name, amount, date });
      });
  }

  handleSubmit = (e) => {
    this.setState({ submitting: true, submitted: true });

    const { name, amount, date } = this.state;
    const { expenseId } = this.props.match.params;
    const { formattedToken, history } = this.props;

    e.preventDefault();
    let data = {
      name,
      amount,
      date,
    };

    sAdminExpenseApi
      .sAdminUpdateExpense(data, expenseId, formattedToken)
      .then((response) => {
        this.setState({
          submitting: false,
          errorStatus: null,
          submitted: false,
        });
        // console.log("expense data updated successfully", response.data);
        history.push(routesList.S_ADMIN_DETAILS_EXPENSE + "/" + expenseId);
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

    if (name === "name") {
      data = formValidation.checkType(state, "expenseName", value);
    } else if (name === "amount") {
      data = formValidation.checkType(state, "expenseAmount", value);
    } else {
      data = { ...state };
    }

    this.setState(data);
  }

  render() {
    const {
      name,
      amount,
      date,
      submitting,
      submitted,
      nameError,
      amountError,
      dateError,
      errorStatus,
    } = this.state;

    return (
      <>
        <div className="d-flex justify-content-between">
          <div className="p-2"></div>
          <div className="h1 pl-5">Edit Expense Details</div>
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

        {submitted && errorStatus === 400 && (
          <span className="validation-error mt-2">
            Updating expense details failed
          </span>
        )}

        <form onSubmit={(e) => this.handleSubmit(e)}>
          <div className="form-group row">
            <label htmlFor="name" className="col-sm-2 col-form-label">
              Expense Name
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="Type the expense item, e.g. Salary, Rent, Utility etc..."
                value={name}
                onChange={this.handleChange.bind(this)}
              />

              {submitted &&
                (!name ? (
                  <span className="validation-error">
                    Please give a valid expense item name
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
            <label htmlFor="amount" className="col-sm-2 col-form-label">
              Expense Amount
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
                      placeholder="Type the expense amount, e.g. 500, 1000, 500000 (number only)..."
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
              Expense Date
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
              Update Expense Data
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

const connectedSAdminExpenseEdit = connect(mapStateToProps)(SAdminExpenseEdit);

export { connectedSAdminExpenseEdit as SAdminExpenseEdit };
