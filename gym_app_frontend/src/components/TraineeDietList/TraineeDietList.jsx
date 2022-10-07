import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { traineeDietRequestListSetScrollPosition } from "../../Redux";

import useFullPageLoader from "../../Hooks/useFullPageLoader";

import { routesList } from "../../Constants";

import { traineeDietApi } from "../../Api";

import {
  getFormattedIsoDate,
  getFormattedToken,
  showStatus,
} from "../../HelperFunctions";

const TraineeDietList = (props) => {
  const [allDietList, setAllDietList] = useState([]); // all data from the api
  const [loader, showLoader, hideLoader] = useFullPageLoader();

  useEffect(() => {
    const getAllDietList = () => {
      const { formattedToken, positionX, positionY } = props;

      showLoader();
      traineeDietApi.traineeGetDietList(formattedToken).then((response) => {
        hideLoader();
        setAllDietList(response.data);
        window.scrollTo(positionX, positionY);
      });
    };

    getAllDietList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dietData = useMemo(() => {
    let computedData = allDietList;

    return computedData;
  }, [allDietList]);

  const checkDietValidity = (toDate) => {
    const currentDateTime = new Date().toISOString();
    return toDate > currentDateTime;
  };

  return (
    <>
      {/* {console.log("diet list return", allDietList)} */}
      <p className="h1">Diet Request List</p>

      <table className="table table-hover table-bordered">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Request Time</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>

        <tbody>
          {dietData &&
            dietData.map((data, index) => {
              const { traineeDietRequestListSetScrollPosition } = props;
              const { _id, appliedDate, approval, toDate, flag } = data;
              const {
                date,
                month,
                year,
                hour,
                minute,
                second,
                miliSecond,
              } = getFormattedIsoDate(appliedDate);

              let dietRunning = false;
              if (data.toDate !== undefined) {
                dietRunning = checkDietValidity(toDate);
              }

              return (
                <tr key={index}>
                  <td className="align-middle">
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
                  <td className="align-middle pb-4">{showStatus(approval)}</td>
                  <td className="align-middle">
                    <Link
                      to={{
                        pathname:
                          routesList.TRAINEE_DIET_REQUEST_DETAILS + "/" + _id,
                        state: { data: "test data" },
                      }}
                      className="btn btn-primary details-button"
                      onClick={() => {
                        traineeDietRequestListSetScrollPosition(
                          window.pageXOffset,
                          window.pageYOffset
                        );
                      }}
                    >
                      Details
                    </Link>

                    {dietRunning && (!flag || flag === 1) && (
                      <Link
                        to={{
                          pathname:
                            routesList.TRAINEE_SEND_DIET_REPORT + "/" + _id,
                          state: { data: "test data" },
                        }}
                        className="btn btn-primary mt-1 assign-button"
                        onClick={() => {
                          traineeDietRequestListSetScrollPosition(
                            window.pageXOffset,
                            window.pageYOffset
                          );
                        }}
                      >
                        Send Report
                      </Link>
                    )}
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
  const formattedToken = getFormattedToken(state.traineeLoginReducer.token);
  const positionX = state.traineeDietRequestReducer.dietRequestListPositionX;
  const positionY = state.traineeDietRequestReducer.dietRequestListPositionY;

  return {
    formattedToken,
    positionX,
    positionY,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    traineeDietRequestListSetScrollPosition: (positionX, positionY) =>
      dispatch(traineeDietRequestListSetScrollPosition(positionX, positionY)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TraineeDietList);
