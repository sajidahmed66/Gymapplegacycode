import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { getFormattedIsoDate, getFormattedToken } from "../../HelperFunctions";

import sAdminPaymentPackageApi from "../../Api/sAdminPaymentPackageApi";

import { sAdminTraineeListSetScrollPosition } from "../../Redux";

import useFullPageLoader from "../../Hooks/useFullPageLoader";

import { sAdminTraineeListApi } from "../../Api";

import { routesList } from "../../Constants";

const SAdminTraineeList = (props) => {
  const [allTrainee, setAllTrainee] = useState([]); // all data from the api
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const [packageTypeName, setPackageType] = useState(null);

  useEffect(() => {
    const getAllTrainee = () => {
      const { formattedToken, positionX, positionY } = props;

      showLoader();
      sAdminTraineeListApi
        .sAdminGetTraineeList(formattedToken)
        .then((response) => {
          hideLoader();
          setAllTrainee(response.data);
          window.scrollTo(positionX, positionY);
        });
    };

    getAllTrainee();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const traineeData = useMemo(() => {
    let computedData = allTrainee;

    return computedData;
  }, [allTrainee]);

  const packagePaymentType = (id) => {
    const { formattedToken } = props;
    sAdminPaymentPackageApi
      .sAdminGetPaymentPackage(id, formattedToken)
      .then((res) => {
        setPackageType(res.data.name);
      });
  };

  return (
    <>
      {/* {console.log("diet request list return", allTrainee)} */}
      <p className="h1">Trainee List</p>

      <table className="table table-hover table-bordered">
        <thead className="thead-dark">
          <tr>
            <th scope="col" className="align-middle text-center">
              First Name
            </th>
            <th scope="col" className="align-middle text-center">
              Last Name
            </th>
            <th scope="col" className="align-middle text-center">
              Contact No
            </th>
            <th scope="col" className="align-middle text-center">
              Registration Date
            </th>
            <th scope="col" className="align-middle text-center">
              Current Payment Date
            </th>
            <th scope="col" className="align-middle text-center">
              Next Payment Date
            </th>
            <th scope="col" className="align-middle text-center">
              Subscription Type
            </th>
            <th scope="col" className="align-middle text-center">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {traineeData &&
            traineeData.map((data, index) => {
              const {
                entryDate,
                currentPaymentDate,
                nextPaymentDate,
                firstname,
                lastname,
                phone,
                subscription,
                _id,
              } = data;
              // const { sAdminTraineeListSetScrollPosition } = props;
              const { date, month, year } = getFormattedIsoDate(entryDate);

              const {
                date: dateLastPayment,
                month: monthLastPayment,
                year: yearLastPayment,
              } = getFormattedIsoDate(currentPaymentDate);

              const {
                date: dateNextPayment,
                month: monthLastNextPayment,
                year: yearNextPayment,
              } = getFormattedIsoDate(nextPaymentDate);

              return (
                <tr key={index}>
                  <td className="align-middle text-center">{firstname}</td>

                  <td className="align-middle text-center">{lastname}</td>

                  <td className="align-middle text-center">{phone}</td>

                  <td className="align-middle text-center">
                    {date + " " + month + ", " + year}
                  </td>

                  <td className="align-middle text-center">
                    {dateLastPayment +
                      " " +
                      monthLastPayment +
                      ", " +
                      yearLastPayment}
                  </td>

                  <td className="align-middle text-center">
                    {nextPaymentDate
                      ? dateNextPayment +
                        " " +
                        monthLastNextPayment +
                        ", " +
                        yearNextPayment
                      : "Invalid Date"}
                  </td>

                  {subscription &&
                    subscription.type === 2 &&
                    packagePaymentType(subscription.packageType)}

                  <td className="align-middle text-center">
                    {subscription && subscription.type === 1
                      ? "Monthly"
                      : packageTypeName
                      ? packageTypeName
                      : "Invalid Package"}
                  </td>

                  <td className="align-middle text-center">
                    <Link
                      to={{
                        pathname:
                          routesList.S_ADMIN_TRAINEE_PAYMENT + "/" + _id,
                        state: { data: "test data" },
                      }}
                      className="btn btn-primary mt-1 details-button"
                    >
                      Payment History
                    </Link>

                    <Link
                      to={{
                        pathname:
                          routesList.S_ADMIN_TRAINEE_PAYMENT_DETAILS +
                          "/" +
                          _id,
                        state: { data: "test data" },
                      }}
                      className="btn btn-primary mt-1 details-button"
                    >
                      Last Payment Details
                    </Link>

                    <Link
                      to={{
                        pathname:
                          routesList.S_ADMIN_TRAINEE_MONTHLY_PAYMENT +
                          "/" +
                          _id,
                        state: { id: _id },
                      }}
                      className="btn btn-primary mt-1 details-button"
                    >
                      Monthly Payment
                    </Link>

                    <Link
                      to={{
                        pathname: routesList.S_ADMIN_TRAINEE_LIST,
                      }}
                      className="btn btn-primary mt-1 details-button"
                    >
                      Installment
                    </Link>

                    <Link
                      to={{
                        pathname:
                          routesList.S_ADMIN_TRAINEE_INSTALLMENT_PAYMENT +
                          "/" +
                          _id,
                        state: { id: _id },
                      }}
                      className="btn btn-primary mt-1 details-button"
                    >
                      Installment
                    </Link>

                    {/* {subscription.type ==
                      1&&(
                        <button className="pl-2 pt-2 btn btn-primary">
                          Monthly Payment
                        </button>
                      )}
                    {subscription.type == 2 &&  (
                      <button className="pl-2 pt-2 btn btn-primary">
                        Package Payment
                      </button>
                    )}{" "} */}
                  </td>

                  {/* <td className="align-middle text-center">
                    {!trainee ? (
                      <Link
                        to={{
                          pathname:
                            routesList.S_ADMIN_ASSIGN_TRAINEE_DIET_REQUEST +
                            "/" +
                            data._id,
                          state: { data: "test data" },
                        }}
                        className="btn btn-primary text-wrap assign-button"
                        onClick={() => {
                          sAdminTraineeListSetScrollPosition(
                            window.pageXOffset,
                            window.pageYOffset
                          );
                        }}
                      >
                        Assign Trainer
                      </Link>
                    ) : null}

                    <Link
                      to={{
                        pathname:
                          routesList.S_ADMIN_GET_TRAINEE_DIET_REQUEST_DETAILS +
                          "/" +
                          _id,
                        state: { data: "test data" },
                      }}
                      className="btn btn-primary text-wrap m-1 details-button"
                      onClick={() => {
                        sAdminTraineeListSetScrollPosition(
                          window.pageXOffset,
                          window.pageYOffset
                        );
                      }}
                    >
                      Details
                    </Link>
                  </td> */}
                </tr>
              );
            })}
        </tbody>
      </table>

      {loader}
    </>
  );
};

const mapStateToProps = (state) => {
  const formattedToken = getFormattedToken(state.sAdminLoginReducer.token);
  const positionX = state.sAdminTraineeReducer.traineeListPositionX;
  const positionY = state.sAdminTraineeReducer.traineeListPositionY;

  return {
    formattedToken,
    positionX,
    positionY,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sAdminTraineeListSetScrollPosition: (positionX, positionY) =>
      dispatch(sAdminTraineeListSetScrollPosition(positionX, positionY)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SAdminTraineeList);
