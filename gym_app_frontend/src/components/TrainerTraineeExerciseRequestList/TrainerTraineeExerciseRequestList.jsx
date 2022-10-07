import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { trainerTraineeExerciseRequestListSetScrollPosition } from "../../Redux";

import useFullPageLoader from "../../Hooks/useFullPageLoader";

import { trainerTraineeExerciseRequestApi } from "../../Api";

import { routesList } from "../../Constants";

import {
  getFormattedIsoDate,
  getFormattedToken,
  showStatus,
} from "../../HelperFunctions";

import "./TrainerTraineeExerciseRequestList.css";

const TrainerTraineeExerciseRequestList = (props) => {
  const [allExerciseRequest, setAllExerciseRequest] = useState([]); // all data from the api
  const [loader, showLoader, hideLoader] = useFullPageLoader();

  useEffect(() => {
    const getAllExerciseRequest = () => {
      const { formattedToken, positionX, positionY } = props;
      showLoader();

      trainerTraineeExerciseRequestApi
        .trainerGetTraineeExerciseRequestList(formattedToken)
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

  const { trainerTraineeExerciseRequestListSetScrollPosition } = props;

  return (
    <>
      {/* {console.log("Exercise request list return", allExerciseRequest)} */}
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
              const { _id, appliedDate, trainee, approval } = data;
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
                  <td className="align-middle text-center">
                    {showStatus(approval)}
                  </td>
                  <td className="align-middle">
                    {approval === 0 ? (
                      <Link
                        to={{
                          pathname:
                            routesList.TRAINER_TRAINEE_EXERCISE_REQUEST_ASSIGN_TYPE +
                            "/" +
                            _id,
                          state: { data: "test data" },
                        }}
                        className="btn btn-primary text-wrap assign-button"
                        onClick={() => {
                          trainerTraineeExerciseRequestListSetScrollPosition(
                            window.pageXOffset,
                            window.pageYOffset
                          );
                        }}
                      >
                        Assign Exercise
                      </Link>
                    ) : null}

                    <Link
                      to={{
                        pathname:
                          routesList.TRAINER_TRAINEE_EXERCISE_REQUEST_DETAILS +
                          "/" +
                          _id,
                        state: { data: "test data" },
                      }}
                      className="btn btn-primary text-wrap m-1 details-button"
                      onClick={() => {
                        trainerTraineeExerciseRequestListSetScrollPosition(
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
  const formattedToken = getFormattedToken(state.trainerLoginReducer.token);
  const positionX =
    state.trainerTraineeExerciseRequestReducer.exerciseRequestListPositionX;
  const positionY =
    state.trainerTraineeExerciseRequestReducer.exerciseRequestListPositionY;

  return {
    formattedToken,
    positionX,
    positionY,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    trainerTraineeExerciseRequestListSetScrollPosition: (
      positionX,
      positionY
    ) =>
      dispatch(
        trainerTraineeExerciseRequestListSetScrollPosition(positionX, positionY)
      ),
  };
};

const connectedTrainerTraineeExerciseRequestList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TrainerTraineeExerciseRequestList);

export { connectedTrainerTraineeExerciseRequestList as TrainerTraineeExerciseRequestList };
