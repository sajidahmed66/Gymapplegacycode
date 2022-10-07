import React, { useEffect } from "react";
import { connect } from "react-redux";

import {
  trainerApiLoadSuccess,
  trainerApiLoadInitialize,
} from "../../Redux/TrainerLogin/trainerLoginActions";
import {
  trainerGetProfileNull,
  trainerGetProfileSuccess,
} from "../../Redux/TrainerProfile/trainerProfileActions";

import { getFormattedToken } from "../../HelperFunctions/formattedToken";

import { routesList } from "../../Constants";

import useFullPageLoader from "../../Hooks/useFullPageLoader";

import { trainerProfileApi } from "../../Api/trainerProfileApi";

const TrainerInitialApiLoader = (props) => {
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const {
    formattedToken,
    trainerApiLoadSuccess,
    history,
    trainerGetProfileNull,
    trainerGetProfileSuccess,
  } = props;


  const getProfileInfo = async (formattedToken) => {
    await trainerProfileApi
      .trainerGetProfile(formattedToken)
      .then((response) => {
        trainerGetProfileSuccess(response.data);
      })
      .catch((error) => {
        if (error.response.status === 400) {
          trainerGetProfileNull();
        }
      });
  };

  const makeApiCall = async () => {
    showLoader();
    trainerApiLoadInitialize();
    await getProfileInfo(formattedToken);
    trainerApiLoadSuccess();
    history.push(routesList.TRAINER_HOME);
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
  const formattedToken = getFormattedToken(state.trainerLoginReducer.token);
  return {
    formattedToken,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    trainerApiLoadSuccess: () => dispatch(trainerApiLoadSuccess()),
    trainerApiLoadInitialize: () => dispatch(trainerApiLoadInitialize()),
    trainerGetProfileNull: () => dispatch(trainerGetProfileNull()),
    trainerGetProfileSuccess: (profileData) =>
      dispatch(trainerGetProfileSuccess(profileData)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrainerInitialApiLoader);
