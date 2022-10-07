import React, { useEffect } from "react";
import { connect } from "react-redux";

import { getFormattedToken } from "../../HelperFunctions/formattedToken";

import { sAdminProfileApi } from "../../Api/sAdminProfileApi";

import useFullPageLoader from "../../Hooks/useFullPageLoader";

import { routesList } from "../../Constants/routesList";

import {
  sAdminGetProfileNull,
  sAdminGetProfileSuccess,
} from "../../Redux/SAdminProfile/sAdminProfileActions";
import {
  sAdminApiLoadSuccess,
  sAdminApiLoadInitialize,
} from "../../Redux/SAdminLogin/sAdminLoginActions";

const SAdminInitialApiLoader = (props) => {
  const [loader, showLoader, hideLoader] = useFullPageLoader();

  const {
    formattedToken,
    sAdminApiLoadSuccess,
    history,
    sAdminGetProfileNull,
    sAdminGetProfileSuccess,
  } = props;

  const getProfileInfo = async (formattedToken) => {
    await sAdminProfileApi
      .sAdminGetProfile(formattedToken)
      .then((response) => {
        sAdminGetProfileSuccess(response.data);
      })
      .catch((error) => {
        if (error.response.status === 400) {
          sAdminGetProfileNull();
        }
      });
  };

  const makeApiCall = async () => {
    showLoader();
    sAdminApiLoadInitialize();
    await getProfileInfo(formattedToken);
    sAdminApiLoadSuccess();
    history.push(routesList.S_ADMIN_HOME);
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

      <p>Loading Data. Please Wait...</p>
    </>
  );
};

const mapStateToProps = (state) => {
  const formattedToken = getFormattedToken(state.sAdminLoginReducer.token);

  return {
    formattedToken,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sAdminApiLoadInitialize: () => dispatch(sAdminApiLoadInitialize()),
    sAdminApiLoadSuccess: () => dispatch(sAdminApiLoadSuccess()),
    sAdminGetProfileNull: () => dispatch(sAdminGetProfileNull()),
    sAdminGetProfileSuccess: (profileData) =>
      dispatch(sAdminGetProfileSuccess(profileData)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SAdminInitialApiLoader);
