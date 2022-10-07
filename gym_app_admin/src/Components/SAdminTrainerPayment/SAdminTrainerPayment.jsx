import React, { useEffect, useMemo, useState } from "react";
import DatePicker from "react-date-picker/dist/entry.nostyle";
// import { confirmAlert } from "react-confirm-alert";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { getFormattedIsoDate, getFormattedToken } from "../../HelperFunctions";

import { sAdminTrainerPaymentListSetScrollPosition } from "../../Redux";

import { sAdminTrainerList, sAdminTrainerPaymentApi } from "../../Api";

import useFullPageLoader from "../../Hooks/useFullPageLoader";

import { loaderUrl, routesList } from "../../Constants";

import { NoData } from "../NoData";

const SAdminTrainerPayment = (props) => {
  const [allTrainerPayment, setAllTrainerPayment] = useState(null); // all data from the api
  const [trainer, setTrainer] = useState("");
  const [trainerValidationMessage, setTrainerValidationMessage] = useState("");
  const [amount, setAmount] = useState("");
  const [amountValidationMessage, setAmountValidationMessage] = useState("");
  const [trainerOptions, setTrainerOptions] = useState([]);
  const [date, setDate] = useState("");
  const [dateValidationMessage, setDateValidationMessage] = useState("");
  const [submitting, setSubmitting] = useState("");
  const [submitted, setSubmitted] = useState("");
  const [errorStatus, setErrorStatus] = useState("");
  const [loader, showLoader, hideLoader] = useFullPageLoader();

  useEffect(() => {
    const { formattedToken, positionX, positionY } = props;
    const getAllTrainerPayment = () => {
      showLoader();
      sAdminTrainerPaymentApi
        .sAdminGetTrainerPaymentList(formattedToken)
        .then((response) => {
          hideLoader();
          setAllTrainerPayment(response.data);
          window.scrollTo(positionX, positionY);
        });
    };

    const getAllTrainerList = () => {
      sAdminTrainerList.sAdminTrainerList(formattedToken).then((response) => {
        setTrainerOptions(response.data);
      });
    };

    getAllTrainerPayment();
    getAllTrainerList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const paymentData = useMemo(() => {
    let computedData = allTrainerPayment;

    return computedData;
  }, [allTrainerPayment]);

  const handleSubmit = (e) => {
    const { formattedToken } = props;

    setSubmitting(true);
    setSubmitted(true);
    e.preventDefault();

    let data = {
      trainer,
      amount,
      date,
    };

    if (!trainer) {
      setTrainerValidationMessage("Please Select A Trainer Name");
    }

    if (!amount.match(/^\+?[1-9]\d*$/)) {
      setAmountValidationMessage("Please type a valid amount");
    }

    if (!date) {
      setDateValidationMessage("Please select a valid date");
    }

    sAdminTrainerPaymentApi
      .sAdminAddTrainerPayment(data, formattedToken)
      .then((response) => {
        setAllTrainerPayment(response.data);
        setTrainer("");
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

  const showPaymentForm = () => {
    return (
      <>
        <p className="h1">Add Trainer Payment</p>

        {submitted && errorStatus === 400 && (
          <span className="validation-error mt-2">
            Adding Trainer Payment Failed
          </span>
        )}

        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="form-group row">
            <label htmlFor="name" className="col-sm-2 col-form-label">
              Trainer Name
            </label>
            <div className="col-sm-10">
              <select
                className="custom-select col custom-dropdown"
                value={trainer || ""}
                onChange={(e) => {
                  setTrainer(e.target.value);
                  setTrainerValidationMessage("");
                  setErrorStatus("");
                }}
                role="button"
              >
                <option value="" disabled>
                  Select a trainer
                </option>
                {trainerOptions.map((data) => {
                  const name = data.firstname + "\xa0\xa0" + data.lastname;
                  return (
                    <option key={data._id} value={data._id}>
                      {name}
                    </option>
                  );
                })}
              </select>

              {trainerValidationMessage ? (
                <span className="validation-error">
                  {trainerValidationMessage}
                </span>
              ) : (
                <></>
              )}
            </div>
          </div>

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
                      placeholder="Type the paid amount, e.g. 500, 1000, 500000 (number only)..."
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
              Payment Date
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
              Add Payment
            </button>
          )}
        </form>

        <hr />
      </>
    );
  };

  // const deleteData = (trainerPaymentId) => {
  //   const { formattedToken, sAdminTrainerPaymentListSetScrollPosition } = props;

  //   sAdminTrainerPaymentApi
  //     .sAdminDeleteTrainerPayment(trainerPaymentId, formattedToken)
  //     .then((response) => {
  //       // console.log("data deleted", response);
  //       setAllTrainerPayment(response.data);
  //       sAdminTrainerPaymentListSetScrollPosition(
  //         window.pageXOffset,
  //         window.pageYOffset
  //       );
  //     });
  // };

  // const handleDelete = (trainerPaymentId) => {
  //   confirmAlert({
  //     title: "Confirm to delete",
  //     message: "Are you sure to delete this item?",
  //     buttons: [
  //       {
  //         label: "Yes",
  //         onClick: () => deleteData(trainerPaymentId),
  //       },
  //       {
  //         label: "Cancel",
  //         onClick: () => <></>,
  //       },
  //     ],
  //   });
  // };

  const showPaymentList = () => {
    return (
      <>
        <p className="h1">Payment List</p>

        <table className="table table-hover table-bordered">
          <thead className="thead-dark">
            <tr>
              <th scope="col" className="align-middle text-center">
                Trainer
              </th>
              <th scope="col" className="align-middle text-center">
                Amount (Taka)
              </th>
              <th scope="col" className="align-middle text-center">
                Payment Date
              </th>
              <th scope="col" className="align-middle text-center">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {paymentData &&
              paymentData.map((data, index) => {
                // console.log("trainer payment data", data);
                const { sAdminTrainerPaymentListSetScrollPosition } = props;
                const { _id, amount, date, trainer } = data;
                const { firstname, lastname } = trainer;
                const {
                  date: datePayment,
                  month: monthPayment,
                  year: yearPayment,
                } = getFormattedIsoDate(date);

                return (
                  <tr key={index}>
                    <td className="align-middle text-center">
                      {firstname + "\xa0\xa0" + lastname}
                    </td>

                    <td className="align-middle text-center">{amount}</td>

                    <td className="align-middle text-center">
                      {datePayment + " " + monthPayment + ", " + yearPayment}
                    </td>

                    <td className="align-middle text-center">
                      <Link
                        to={{
                          pathname:
                            routesList.S_ADMIN_DETAILS_TRAINER_PAYMENT +
                            "/" +
                            _id,
                          state: { data: "test data" },
                        }}
                        className="btn btn-primary text-wrap m-1 details-button"
                        onClick={() => {
                          sAdminTrainerPaymentListSetScrollPosition(
                            window.pageXOffset,
                            window.pageYOffset
                          );
                        }}
                      >
                        Details
                      </Link>

                      <Link
                        to={{
                          pathname:
                            routesList.S_ADMIN_EDIT_TRAINER_PAYMENT + "/" + _id,
                          state: { data: "test data" },
                        }}
                        className="btn btn-primary text-wrap m-1 edit-button"
                        onClick={() => {
                          sAdminTrainerPaymentListSetScrollPosition(
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
      {/* {console.log("trainer payment list return", date)} */}

      {showPaymentForm()}

      {allTrainerPayment === null ? (
        <NoData message={"No Data Found"} />
      ) : allTrainerPayment.length ? (
        showPaymentList()
      ) : (
        <NoData message={"No Payment Data Found. Please Add Payment Above."} />
      )}

      {loader}
    </>
  );
};

const mapStateToProps = (state) => {
  const formattedToken = getFormattedToken(state.sAdminLoginReducer.token);
  const positionX =
    state.sAdminTrainerPaymentReducer.trainerPaymentListPositionX;
  const positionY =
    state.sAdminTrainerPaymentReducer.trainerPaymentListPositionY;

  return {
    formattedToken,
    positionX,
    positionY,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sAdminTrainerPaymentListSetScrollPosition: (positionX, positionY) =>
      dispatch(sAdminTrainerPaymentListSetScrollPosition(positionX, positionY)),
  };
};

const connectedSAdminTrainerPayment = connect(
  mapStateToProps,
  mapDispatchToProps
)(SAdminTrainerPayment);

export { connectedSAdminTrainerPayment as SAdminTrainerPayment };
