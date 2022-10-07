import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { sAdminExerciseRequestListSetScrollPosition } from "../../Redux";

import useFullPageLoader from "../../Hooks/useFullPageLoader";

import { sAdminTraineeExerciseRequestApi } from "../../Api";

import { routesList } from "../../Constants";

import {
  getFormattedIsoDate,
  getFormattedToken,
  showStatus,
} from "../../HelperFunctions";

const SAdminTraineeExerciseRequestList = (props) => {
  const [allExerciseRequest, setAllExerciseRequest] = useState([]); // all data from the api
  const [loader, showLoader, hideLoader] = useFullPageLoader();

  useEffect(() => {
    const getAllExerciseRequest = () => {
      const { formattedToken, positionX, positionY } = props;
      showLoader();
      sAdminTraineeExerciseRequestApi
        .sAdminGetTraineeExerciseRequestList(formattedToken)
        .then((response) => {
          hideLoader();
          setAllExerciseRequest(response.data);
          window.scrollTo(positionX, positionY);
        });
    };

    getAllExerciseRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const requestData = useMemo(() => {
    let computedData = allExerciseRequest;

    return computedData;
  }, [allExerciseRequest]);

  return (
    <>
      {/* {console.log("exercise request list return", allExerciseRequest)} */}
      <p className="h1">Exercise Request List</p>

      <table className="table table-hover table-bordered">
        <thead className="thead-dark">
          <tr>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Contact No</th>
            <th scope="col">Request Time</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>

        <tbody>
          {requestData &&
            requestData.map((data, index) => {
              const { sAdminExerciseRequestListSetScrollPosition } = props;
              const { _id, appliedDate, trainee, approval, trainer } = data;
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
                  <td className="align-middle">{trainee.firstname}</td>
                  <td className="align-middle">{trainee.lastname}</td>
                  <td className="align-middle">{trainee.phone}</td>
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
                  <td className="align-middle text-center pb-3">
                    {showStatus(approval)}
                  </td>
                  <td className="align-middle text-center">
                    {!trainer ? (
                      <Link
                        to={{
                          pathname:
                            routesList.S_ADMIN_ASSIGN_TRAINEE_EXERCISE_REQUEST +
                            "/" +
                            _id,
                          state: { data: "test data" },
                        }}
                        className="btn btn-primary text-wrap assign-button"
                        onClick={() => {
                          sAdminExerciseRequestListSetScrollPosition(
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
                          routesList.S_ADMIN_GET_TRAINEE_EXERCISE_REQUEST_DETAILS +
                          "/" +
                          _id,
                        state: { data: "test data" },
                      }}
                      className="btn btn-primary text-wrap m-1 details-button"
                      onClick={() => {
                        sAdminExerciseRequestListSetScrollPosition(
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
  const positionX =
    state.sAdminExerciseRequestReducer.exerciseRequestListPositionX;
  const positionY =
    state.sAdminExerciseRequestReducer.exerciseRequestListPositionY;

  return {
    formattedToken,
    positionX,
    positionY,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sAdminExerciseRequestListSetScrollPosition: (positionX, positionY) =>
      dispatch(
        sAdminExerciseRequestListSetScrollPosition(positionX, positionY)
      ),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SAdminTraineeExerciseRequestList);
