import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { sAdminDietRequestListSetScrollPosition } from "../../Redux";

import useFullPageLoader from "../../Hooks/useFullPageLoader";

import { sAdminTraineeDietRequestApi } from "../../Api";

import { routesList } from "../../Constants";

import {
  getFormattedIsoDate,
  getFormattedToken,
  showStatus,
} from "../../HelperFunctions";

const SAdminTraineeDietRequestList = (props) => {
  const [allDietRequest, setAllDietRequest] = useState([]); // all data from the api
  const [loader, showLoader, hideLoader] = useFullPageLoader();

  useEffect(() => {
    const getAllDietRequest = () => {
      const { formattedToken, positionX, positionY } = props;
      showLoader();
      sAdminTraineeDietRequestApi
        .sAdminGetTraineeDietRequestList(formattedToken)
        .then((response) => {
          hideLoader();
          setAllDietRequest(response.data);
          window.scrollTo(positionX, positionY);
        });
    };

    getAllDietRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const requestData = useMemo(() => {
    let computedData = allDietRequest;

    return computedData;
  }, [allDietRequest]);

  return (
    <>
      {/* {console.log("diet request list return", allDietRequest)} */}
      <p className="h1">Diet Request List</p>

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
              Request Time
            </th>
            <th scope="col" className="align-middle text-center">
              Status
            </th>
            <th scope="col" className="align-middle text-center">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {requestData &&
            requestData.map((data, index) => {
              const { _id, appliedDate, approval, trainer } = data;
              const { firstname, lastname, phone } = data.trainee;
              const { sAdminDietRequestListSetScrollPosition } = props;
              const {
                date,
                month,
                year,
                hour,
                minute,
                second,
                miliSecond,
              } = getFormattedIsoDate(appliedDate);

              return (
                <tr key={index}>
                  <td className="align-middle text-center">{firstname}</td>
                  <td className="align-middle text-center">{lastname}</td>
                  <td className="align-middle text-center">{phone}</td>
                  <td className="align-middle text-center">
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
                  <td className="align-middle text-center">
                    {showStatus(approval)}
                  </td>
                  <td className="align-middle text-center">
                    {!trainer ? (
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
                          sAdminDietRequestListSetScrollPosition(
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
                        sAdminDietRequestListSetScrollPosition(
                          window.pageXOffset,
                          window.pageYOffset
                        );
                      }}
                    >
                      Details
                    </Link>
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
  const positionX = state.sAdminDietRequestReducer.dietRequestListPositionX;
  const positionY = state.sAdminDietRequestReducer.dietRequestListPositionY;

  return {
    formattedToken,
    positionX,
    positionY,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sAdminDietRequestListSetScrollPosition: (positionX, positionY) =>
      dispatch(sAdminDietRequestListSetScrollPosition(positionX, positionY)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SAdminTraineeDietRequestList);
