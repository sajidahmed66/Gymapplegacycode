import React, { useEffect } from "react";
import { connect } from "react-redux";

import {
  traineeApiLoadSuccess,
  traineeApiLoadInitialize,
} from "../../Redux/TraineeLogin/traineeLoginActions";
import {
  traineeGetProfileNull,
  traineeGetProfileSuccess,
} from "../../Redux/TraineeProfile/traineeProfileActions";

import { getFormattedToken } from "../../HelperFunctions/formattedToken";

import { routesList } from "../../Constants";

import useFullPageLoader from "../../Hooks/useFullPageLoader";

import { traineeProfileApi } from "../../Api/traineeProfileApi";

const TraineeInitialApiLoader = (props) => {
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const {
    formattedToken,
    traineeApiLoadSuccess,
    history,
    traineeGetProfileNull,
    traineeGetProfileSuccess,
  } = props;

  const getProfileInfo = async (formattedToken) => {
    await traineeProfileApi
      .traineeGetProfile(formattedToken)
      .then((response) => {
        traineeGetProfileSuccess(response.data);
      })
      .catch((error) => {
        if (error.response.status === 400) {
          traineeGetProfileNull();
        }
      });
  };

  const makeApiCall = async () => {
    showLoader();
    traineeApiLoadInitialize();
    await getProfileInfo(formattedToken);
    traineeApiLoadSuccess();
    history.push(routesList.TRAINEE_HOME);
    hideLoader();
  };

  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed) {
      makeApiCall();
    }
    return () => (isSubscribed = false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loader}
      <p>Initial API Loader</p>
    </>
  );
};

const mapStateToProps = (state) => {
  const formattedToken = getFormattedToken(state.traineeLoginReducer.token);
  return {
    formattedToken,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    traineeApiLoadSuccess: () => dispatch(traineeApiLoadSuccess()),
    traineeApiLoadInitialize: () => dispatch(traineeApiLoadInitialize()),
    traineeGetProfileNull: () => dispatch(traineeGetProfileNull()),
    traineeGetProfileSuccess: (profileData) =>
      dispatch(traineeGetProfileSuccess(profileData)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TraineeInitialApiLoader);
