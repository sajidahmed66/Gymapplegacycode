import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { traineeExerciseRequestListSetScrollPosition } from "../../Redux";

import useFullPageLoader from "../../Hooks/useFullPageLoader";

import { traineeExerciseApi } from "../../Api";

import { routesList } from "../../Constants";

import {
  getFormattedIsoDate,
  getFormattedToken,showStatus
} from "../../HelperFunctions";

const TraineeExerciseList = (props) => {
  const [allExerciseList, setAllExerciseList] = useState([]); // all data from the api
  const [loader, showLoader, hideLoader] = useFullPageLoader();

  useEffect(() => {
    const getAllExerciseList = () => {
      const { formattedToken, positionX, positionY } = props;

      showLoader();
      traineeExerciseApi
        .traineeGetExerciseList(formattedToken)
        .then((response) => {
          hideLoader();
          setAllExerciseList(response.data);
          window.scrollTo(positionX, positionY);
        });
    };

    getAllExerciseList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const exerciseData = useMemo(() => {
    let computedData = allExerciseList;

    return computedData;
  }, [allExerciseList]);

  const checkExerciseValidity = (toDate) => {
    const currentDateTime = new Date().toISOString();
    return toDate > currentDateTime;
  };

  return (
    <>
      <p className="h1">Exercise Request List</p>

      <table className="table table-hover table-bordered">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Request Time</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>

        <tbody>
          {exerciseData &&
            exerciseData.map((data, index) => {
              const { traineeExerciseRequestListSetScrollPosition } = props;
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

              let exerciseRunning = false;
              if (data.toDate !== undefined) {
                exerciseRunning = checkExerciseValidity(toDate);
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
                          routesList.TRAINEE_EXERCISE_REQUEST_DETAILS +
                          "/" +
                          _id,
                        state: { data: "test data" },
                      }}
                      className="btn btn-primary details-button"
                      onClick={() => {
                        traineeExerciseRequestListSetScrollPosition(
                          window.pageXOffset,
                          window.pageYOffset
                        );
                      }}
                    >
                      Details
                    </Link>

                    {exerciseRunning && (!flag || flag === 1) && (
                      <Link
                        to={{
                          pathname:
                            routesList.TRAINEE_SEND_EXERCISE_REPORT + "/" + _id,
                          state: { data: "test data" },
                        }}
                        className="btn btn-primary mt-1 assign-button"
                        onClick={() => {
                          traineeExerciseRequestListSetScrollPosition(
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
  const positionX =
    state.traineeExerciseRequestReducer.exerciseRequestListPositionX;
  const positionY =
    state.traineeExerciseRequestReducer.exerciseRequestListPositionY;

  return {
    formattedToken,
    positionX,
    positionY,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    traineeExerciseRequestListSetScrollPosition: (positionX, positionY) =>
      dispatch(
        traineeExerciseRequestListSetScrollPosition(positionX, positionY)
      ),
  };
};

const connectedTraineeExerciseList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TraineeExerciseList);

export { connectedTraineeExerciseList as TraineeExerciseList };
