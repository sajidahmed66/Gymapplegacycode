import React, { useEffect, useMemo, useState } from "react";
import DatePicker from "react-date-picker/dist/entry.nostyle";
import { Link } from "react-router-dom";
// import { confirmAlert } from "react-confirm-alert";
import { connect } from "react-redux";

import { sAdminExpenseListSetScrollPosition } from "../../Redux";

import useFullPageLoader from "../../Hooks/useFullPageLoader";

import { sAdminExpenseApi } from "../../Api";

import { loaderUrl, routesList } from "../../Constants";

import { NoData } from "../NoData";

import { getFormattedIsoDate, getFormattedToken } from "../../HelperFunctions";
// import generatePDF from "./reportGenerator";

const SAdminExpenseList = (props) => {
  const [allExpense, setAllExpense] = useState(null); // all data from the api
  const [name, setName] = useState("");
  const [nameValidationMessage, setNameValidationMessage] = useState("");
  const [amount, setAmount] = useState("");
  const [amountValidationMessage, setAmountValidationMessage] = useState("");
  const [date, setDate] = useState("");
  const [dateValidationMessage, setDateValidationMessage] = useState("");
  const [submitting, setSubmitting] = useState("");
  const [submitted, setSubmitted] = useState("");
  const [errorStatus, setErrorStatus] = useState(null);
  const [loader, showLoader, hideLoader] = useFullPageLoader();

  useEffect(() => {
    const getAllExpense = () => {
      const { formattedToken, positionX, positionY } = props;

      showLoader();
      sAdminExpenseApi.sAdminGetExpenseList(formattedToken).then((response) => {
        hideLoader();
        setAllExpense(response.data);
        window.scrollTo(positionX, positionY);
      });
    };

    getAllExpense();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const expenseData = useMemo(() => {
    let computedData = allExpense;

    return computedData;
  }, [allExpense]);

  const handleSubmit = (e) => {
    const { formattedToken } = props;

    e.preventDefault();
    setSubmitting(true);
    setSubmitted(true);

    let data = {
      name,
      amount,
      date,
    };

    if (!name) {
      setNameValidationMessage("Please give a expense item name");
    }

    if (!amount.match(/^\+?[1-9]\d*$/)) {
      setAmountValidationMessage("Please type a valid amount");
    }

    if (!date) {
      setDateValidationMessage("Please select a valid date");
    }

    sAdminExpenseApi
      .sAdminAddExpense(data, formattedToken)
      .then((response) => {
        setAllExpense(response.data);
        setName("");
        setAmount("");
        setDate("");
        setSubmitting(false);
        setSubmitted(false);
      })
      .catch((error) => {
        setSubmitting(false);
        setErrorStatus(error.response.status);

        console.log(error);
      });
  };

  const showExpenseForm = () => {
    return (
      <>
        <p className="h1">Add Expense</p>

        {submitted && errorStatus === 400 && (
          <span className="validation-error mt-2">
            Adding Expense Details Failed
          </span>
        )}

        <form onSubmit={(e) => handleSubmit(e)}>
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
                onChange={(e) => {
                  setName(e.target.value);
                  if (e.target.value.trim() === "") {
                    setNameValidationMessage(
                      "Please type a valid expense item name"
                    );
                  } else {
                    setNameValidationMessage("");
                    setErrorStatus("");
                  }
                }}
              />
              {nameValidationMessage ? (
                <span className="validation-error">
                  {nameValidationMessage}
                </span>
              ) : (
                <></>
              )}
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
                      onChange={(e) => {
                        setAmount(e.target.value);
                        if (!e.target.value.match(/^\+?[1-9]\d*$/)) {
                          setAmountValidationMessage(
                            "Please type a valid amount"
                          );
                        } else {
                          setAmountValidationMessage("");
                          setErrorStatus("");
                        }
                      }}
                    />
                    <div className="input-group-append">
                      <span className="input-group-text">Taka</span>
                    </div>
                  </div>

                  {amountValidationMessage ? (
                    <span className="validation-error">
                      {amountValidationMessage}
                    </span>
                  ) : (
                    <></>
                  )}
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
                value={date ? date : ""}
                onChange={(value) => {
                  setDate(value ? value : "");
                  setDateValidationMessage(
                    value ? "" : "Please select a valid date"
                  );
                  if (value) {
                    setErrorStatus("");
                  }
                }}
              />

              {dateValidationMessage ? (
                <span className="validation-error">
                  {dateValidationMessage}
                </span>
              ) : (
                <></>
              )}
            </span>
          </div>

          {submitting ? (
            <img src={loaderUrl} alt="Please Wait..." />
          ) : (
            <button type="submit" className="btn btn-primary assign-button">
              Add Expense
            </button>
          )}
        </form>

        <hr />
      </>
    );
  };

  // const deleteData = (expenseId) => {
  //   const { formattedToken, sAdminExpenseListSetScrollPosition } = props;

  //   sAdminExpenseApi
  //     .sAdminDeleteExpense(expenseId, formattedToken)
  //     .then((response) => {
  //       // console.log("data deleted", response);
  //       setAllExpense(response.data);
  //       sAdminExpenseListSetScrollPosition(
  //         window.pageXOffset,
  //         window.pageYOffset
  //       );
  //     });
  // };

  // const handleDelete = (expenseId) => {
  //   confirmAlert({
  //     title: "Confirm to delete",
  //     message: "Are you sure to delete this item?",
  //     buttons: [
  //       {
  //         label: "Yes",
  //         onClick: () => deleteData(expenseId),
  //       },
  //       {
  //         label: "Cancel",
  //         onClick: () => <></>,
  //       },
  //     ],
  //   });
  // };

  const showExpenseList = () => {
    // console.log("all expense", allExpense);
    return (
      <>
        <p className="h1">Expense List</p>

        {/* <button
          className="btn btn-primary mb-2"
          onClick={() => generatePDF(allExpense)}
        >
          All Expense Pdf
        </button> */}

        <table className="table table-hover table-bordered">
          <thead className="thead-dark">
            <tr>
              <th scope="col" className="align-middle text-center">
                Expense Name
              </th>
              <th scope="col" className="align-middle text-center">
                Amount (Taka)
              </th>
              <th scope="col" className="align-middle text-center">
                Date
              </th>
              <th scope="col" className="align-middle text-center">
                Entry By
              </th>
              <th scope="col" className="align-middle text-center">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {expenseData &&
              expenseData.map((data, index) => {
                const { sAdminExpenseListSetScrollPosition } = props;
                const { _id, amount, date, entryBy, name } = data;
                const { firstname, lastname } = entryBy;
                const {
                  date: dateEntry,
                  month: monthEntry,
                  year: yearEntry,
                } = getFormattedIsoDate(date);

                return (
                  <tr key={index}>
                    <td className="align-middle text-center">{name}</td>
                    <td className="align-middle text-center">{amount}</td>
                    <td className="align-middle text-center">
                      {dateEntry + " " + monthEntry + ", " + yearEntry}
                    </td>
                    <td className="align-middle text-center">
                      {firstname + "\xa0\xa0" + lastname}
                    </td>

                    <td className="align-middle text-center">
                      <Link
                        to={{
                          pathname:
                            routesList.S_ADMIN_DETAILS_EXPENSE + "/" + _id,
                          state: { data: "test data" },
                        }}
                        className="btn btn-primary text-wrap m-1 details-button"
                        onClick={() => {
                          sAdminExpenseListSetScrollPosition(
                            window.pageXOffset,
                            window.pageYOffset
                          );
                        }}
                      >
                        Details
                      </Link>

                      <Link
                        to={{
                          pathname: routesList.S_ADMIN_EDIT_EXPENSE + "/" + _id,
                          state: { data: "test data" },
                        }}
                        className="btn btn-primary text-wrap m-1 edit-button"
                        onClick={() => {
                          sAdminExpenseListSetScrollPosition(
                            window.pageXOffset,
                            window.pageYOffset
                          );
                        }}
                      >
                        Edit
                      </Link>

                      {/* <button
                        className="btn btn-primary text-wrap delete-button"
                        type="button"
                        onClick={() => handleDelete(_id)}
                      >
                        Delete
                      </button> */}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </>
    );
  };

  return (
    <>
      {/* {console.log("Expense list return", allExpense)} */}

      {showExpenseForm()}

      {allExpense === null ? (
        <NoData message={"No Data Found"} />
      ) : allExpense.length ? (
        showExpenseList()
      ) : (
        <NoData message={"No Expense Data Found. Please Add Expense Above."} />
      )}

      {loader}
    </>
  );
};

const mapStateToProps = (state) => {
  const formattedToken = getFormattedToken(state.sAdminLoginReducer.token);
  const positionX = state.sAdminExpenseReducer.expenseListPositionX;
  const positionY = state.sAdminExpenseReducer.expenseListPositionY;

  return {
    formattedToken,
    positionX,
    positionY,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sAdminExpenseListSetScrollPosition: (positionX, positionY) =>
      dispatch(sAdminExpenseListSetScrollPosition(positionX, positionY)),
  };
};

const connectedSAdminExpenseList = connect(
  mapStateToProps,
  mapDispatchToProps
)(SAdminExpenseList);

export { connectedSAdminExpenseList as SAdminExpenseList };
