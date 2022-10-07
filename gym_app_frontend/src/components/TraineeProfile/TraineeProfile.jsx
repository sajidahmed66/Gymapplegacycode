import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import FullPageLoader from "../../Hooks/Loader";

import { traineeProfileApi } from "../../Api";
import commonApi from "../../Api/commonApi";

import { routesList } from "../../Constants";

import { NoData } from "../NoData";

import {
  checkFileExists,
  getFootInchFromCentimeter,
  getFormattedIsoDate,
  getFormattedToken,
} from "../../HelperFunctions";

import no_image from "../../Assets/Image/no_image.jpg";
import "./TraineeProfile.css";

class TraineeProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profileData: null,
      totalApiCount: 1,
      apiLoadedCount: 0,
    };
  }

  componentDidMount() {
    const { formattedToken } = this.props;

    traineeProfileApi
      .traineeGetProfile(formattedToken)
      .then((response) => {
        this.setState({
          profileData: response.data,
          apiLoadedCount: this.state.apiLoadedCount + 1,
        });
      })
      .catch((error) => {
        this.setState({
          profileData: error.response.status === 400 ? undefined : null,
          apiLoadedCount: this.state.apiLoadedCount + 1,
        });

        console.log("profile data error", error);
      });
  }

  showData(profileData) {
    const {
      email,
      address,
      dateOfBirth,
      gender,
      user,
      age,
      bmi,
      height,
      weight,
      image,
    } = profileData;

    const imageExists = image && checkFileExists(commonApi.api + image);

    const { date, month, year } = getFormattedIsoDate(dateOfBirth);
    const { heightFoot, heightInch } = getFootInchFromCentimeter(height);

    return (
      <>
        <p className="h1">Profile Information</p>

        <div className="container mb-2">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="rounded-circle imgPreview">
              <img
                className="rounded-circle"
                src={imageExists ? commonApi.api + image : no_image}
                alt="product brand img..."
              />
            </div>
          </div>
        </div>

        <table className="table table-hover table-bordered">
          <tbody>
            <tr>
              <th scope="row">Name</th>
              <td>{user.firstname + "\xa0" + user.lastname}</td>
            </tr>

            <tr>
              <th scope="row">Mobile</th>
              <td>{user.phone}</td>
            </tr>

            <tr>
              <th scope="row">Gender</th>
              <td>{gender}</td>
            </tr>

            <tr>
              <th scope="row">Age</th>
              <td>{age}</td>
            </tr>

            <tr>
              <th scope="row">Height</th>
              <td>
                {heightFoot + "\xa0"}ft{"\xa0\xa0\xa0" + heightInch}
                inch
              </td>
            </tr>

            <tr>
              <th scope="row">Weight</th>
              <td>{weight} Kilogram</td>
            </tr>

            <tr>
              <th scope="row">BMI</th>
              <td>{bmi}</td>
            </tr>

            <tr>
              <th scope="row">Date of Birth</th>
              <td>{date + " " + month + ", " + year}</td>
            </tr>

            <tr>
              <th scope="row">Address</th>
              <td>{address}</td>
            </tr>

            <tr>
              <th scope="row">Email</th>
              <td>{email}</td>
            </tr>
          </tbody>
        </table>

        <Link
          to={{
            pathname: routesList.TRAINEE_UPDATE_PROFILE,
            state: { data: "test data" },
          }}
          className="btn btn-primary h-auto mt-2 mb-5 edit-button"
        >
          Edit Profile Data Now
        </Link>
      </>
    );
  }

  showNoProfile() {
    return (
      <>
        <NoData message="No profile has been created yet" />

        <Link
          to={{
            pathname: routesList.TRAINEE_UPDATE_PROFILE,
            state: { data: "test data" },
          }}
          className="btn btn-primary h-auto mt-2 assign-button"
        >
          Create Profile Now
        </Link>
      </>
    );
  }

  render() {
    // console.log("profile component", this.state);
    const { totalApiCount, apiLoadedCount, profileData } = this.state;

    return apiLoadedCount < totalApiCount ? (
      <FullPageLoader />
    ) : profileData ? (
      this.showData(profileData)
    ) : profileData === undefined ? (
      this.showNoProfile()
    ) : (
      <NoData />
    );
  }
}

const mapStateToProps = (state) => {
  const formattedToken = getFormattedToken(state.traineeLoginReducer.token);

  return {
    formattedToken,
  };
};

export default connect(mapStateToProps)(TraineeProfile);
