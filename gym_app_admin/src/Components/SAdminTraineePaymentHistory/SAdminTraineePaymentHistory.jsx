import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";

import { getFormattedIsoDate, getFormattedToken } from "../../HelperFunctions";

import { sAdminTraineePaymentApi } from "../../Api/sAdminTraineePaymentApi";
import sAdminPaymentPackageApi from "../../Api/sAdminPaymentPackageApi";

import { sAdminTraineePaymentListSetScrollPosition } from "../../Redux";

import useFullPageLoader from "../../Hooks/useFullPageLoader";

const SAdminTraineePaymentHistory = (props) => {
  const [allTraineePayment, setAllTraineePaymentHistory] = useState([]); // all data from the api
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const [packageTypeName, setPackageType] = useState(null);

  useEffect(() => {
    const getAllTraineePaymentList = () => {
      const { formattedToken, positionX, positionY } = props;
      const { traineePaymentId } = props.match.params;
      showLoader();
      sAdminTraineePaymentApi
        .sAdminGetTraineePaymentList(traineePaymentId, formattedToken)
        .then((response) => {
          // console.log(response.data);
          hideLoader();
          setAllTraineePaymentHistory(response.data);
          window.scrollTo(positionX, positionY);
        });
    };

    getAllTraineePaymentList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const traineePaymentData = useMemo(() => {
    let computedData = allTraineePayment;

    return computedData;
  }, [allTraineePayment]);

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
      <p className="h1">Trainee Payment List</p>

      <table className="table table-hover table-bordered">
        <thead className="thead-dark">
          <tr>
            <th scope="col" className="align-middle text-center">
              Subscription
            </th>
            <th scope="col" className="align-middle text-center">
              Reg Amount
            </th>
            <th scope="col" className="align-middle text-center">
              Subscription Amount
            </th>
            <th scope="col" className="align-middle text-center">
              Total Amount
            </th>
            <th scope="col" className="align-middle text-center">
              Due Amount
            </th>
            <th scope="col" className="align-middle text-center">
              Last Payment Amount
            </th>
            <th scope="col" className="align-middle text-center">
              Last Payment Date
            </th>
            <th scope="col" className="align-middle text-center">
              Installments
            </th>
            {/* <th scope="col" className="align-middle text-center">
              Action
            </th> */}
          </tr>
        </thead>

        <tbody>
          {traineePaymentData &&
            traineePaymentData.map((data, index) => {
              const {
                // _id,
                dueAmount,
                paidAmount,
                paymentDate,
                registrationAmount,
                subscriptionAmount,
                totalAmount,
                subscription,
              } = data;
              // const { sAdminTraineeListSetScrollPosition } = props;
              const { date, month, year } = getFormattedIsoDate(paymentDate);

              return (
                <tr key={index}>
                  {subscription.type === 2 &&
                    packagePaymentType(subscription.packageType)}
                  <td className="align-middle text-center">
                    {subscription.type === 1 ? "Monthly" : packageTypeName}
                  </td>
                  <td className="align-middle text-center">
                    {registrationAmount}
                  </td>
                  <td className="align-middle text-center">
                    {subscriptionAmount}
                  </td>
                  <td className="align-middle text-center">{totalAmount}</td>
                  <td className="align-middle text-center">{dueAmount}</td>
                  <td className="align-middle text-center">{paidAmount}</td>
                  <td className="align-middle text-center">
                    {date + " " + month + ", " + year}
                  </td>

                  <td className="align-middle text-center">
                    {/* <Link> */}
                    <button className="mb-2 btn btn-primary">
                      Installment History
                    </button>
                    {/* </Link> */}
                  </td>
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
    sAdminTraineePaymentListSetScrollPosition: (positionX, positionY) =>
      dispatch(sAdminTraineePaymentListSetScrollPosition(positionX, positionY)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SAdminTraineePaymentHistory);
