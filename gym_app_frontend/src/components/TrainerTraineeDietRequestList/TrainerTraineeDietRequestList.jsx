import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { trainerTraineeDietRequestListSetScrollPosition } from "../../Redux";

import useFullPageLoader from "../../Hooks/useFullPageLoader";

import { trainerTraineeDietRequestApi } from "../../Api";

import { routesList } from "../../Constants";

import {
  getFormattedIsoDate,
  getFormattedToken,
  showStatus,
} from "../../HelperFunctions";

import "./TrainerTraineeDietRequestList.css";

const TrainerTraineeDietRequestList = (props) => {
  const [allDietRequest, setAllDietRequest] = useState([]); // all data from the api
  const [loader, showLoader, hideLoader] = useFullPageLoader();

  useEffect(() => {
    const getAllDietRequest = () => {
      const { formattedToken, positionX, positionY } = props;
      showLoader();
      trainerTraineeDietRequestApi
        .trainerGetTraineeDietRequestList(formattedToken)
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

  const { trainerTraineeDietRequestListSetScrollPosition } = props;

  return (
    <>
      {/* {console.log("diet request list return", allDietRequest)} */}
      <p className="h1">Diet Request List</p>

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
              const {
                date,
                month,
                year,
                hour,
                minute,
                second,
                miliSecond,
              } = getFormattedIsoDate(data.appliedDate);

              return (
                <tr key={index}>
                  <td className="align-middle">{data.trainee.firstname}</td>
                  <td className="align-middle">{data.trainee.lastname}</td>
                  <td className="align-middle">{data.trainee.phone}</td>
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
                    {showStatus(data.approval)}
                  </td>
                  <td className="align-middle">
                    {data.approval === 0 ? (
                      <Link
                        to={{
                          pathname:
                            routesList.TRAINER_TRAINEE_DIET_REQUEST_ASSIGN_TYPE +
                            "/" +
                            data._id,
                          state: { data: "test data" },
                        }}
                        className="btn btn-primary text-wrap assign-button"
                        onClick={() => {
                          trainerTraineeDietRequestListSetScrollPosition(
                            window.pageXOffset,
                            window.pageYOffset
                          );
                        }}
                      >
                        Assign Diet
                      </Link>
                    ) : null}

                    <Link
                      to={{
                        pathname:
                          routesList.TRAINER_TRAINEE_DIET_REQUEST_DETAILS +
                          "/" +
                          data._id,
                        state: { data: "test data" },
                      }}
                      className="btn btn-primary text-wrap m-1 details-button"
                      onClick={() => {
                        trainerTraineeDietRequestListSetScrollPosition(
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
    state.trainerTraineeDietRequestReducer.dietRequestListPositionX;
  const positionY =
    state.trainerTraineeDietRequestReducer.dietRequestListPositionY;

  return {
    formattedToken,
    positionX,
    positionY,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    trainerTraineeDietRequestListSetScrollPosition: (positionX, positionY) =>
      dispatch(
        trainerTraineeDietRequestListSetScrollPosition(positionX, positionY)
      ),
  };
};

const connectedTrainerTraineeDietRequestList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TrainerTraineeDietRequestList);

export { connectedTrainerTraineeDietRequestList as TrainerTraineeDietRequestList };
