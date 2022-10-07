import React, { Component } from "react";
import DatePicker from "react-date-picker/dist/entry.nostyle";
import { Multiselect } from "multiselect-react-dropdown";
import { connect } from "react-redux";

import { checkFileExists, getFormattedToken } from "../../HelperFunctions";

import { trainerProfileApi } from "../../Api";
import commonApi from "../../Api/commonApi";

import { routesList } from "../../Constants";

import no_image from "../../Assets/Image/no_image.jpg";
import "../../Assets/Css/DatePicker.css";
import "../../Assets/Css/Calendar.css";

class TraineeUpdateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileData: false,
      image: null,
      imagePreviewUrl: null,
      file: null,
      email: "",
      address: "",
      dateOfBirth: "",
      gender: "",
      genderOptions: [
        { optionName: "Male", value: "male" },
        { optionName: "Female", value: "female" },
      ],
    };
  }

  componentDidMount() {
    const { formattedToken } = this.props;

    trainerProfileApi
      .trainerGetProfile(formattedToken)
      .then((response) => {
        // console.log("profile data found", response.data);

        this.setState({
          profileData: true,
          email: response.data.email,
          address: response.data.address,
          dateOfBirth: response.data.dateOfBirth,
          gender: response.data.gender,
          image: response.data.image,
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

  handleChange(propertyName, e) {
    let updatedValue = {};
    updatedValue[propertyName] = e.target.value;
    this.setState(updatedValue);
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ updating: true });

    const { email, address, dateOfBirth, gender, file } = this.state;
    const { formattedToken, history } = this.props;

    const fileData = new FormData();
    fileData.append("image", file ? file : undefined);
    fileData.append("email", email);
    fileData.append("address", address);
    fileData.append("dateOfBirth", dateOfBirth);
    fileData.append("gender", gender);

    trainerProfileApi
      .trainerUpdateProfile(fileData, formattedToken)
      .then((response) => {
        console.log("update success", response);
        this.setState({ updating: false });

        history.push(routesList.TRAINER_PROFILE);
      })
      .catch((error) => {
        this.setState({ updating: false });

        console.log("update error", error);
      });
  }

  onChangeGender = (selectedList, selectedItem) => {
    let changedGender = [];
    selectedList.forEach((option) => changedGender.push(option.value));
    this.setState({ gender: changedGender[0] });
  };

  onRemoveGender = (selectedList, removedItem) => {
    if (!selectedList.length) {
      this.setState({ gender: this.state.gender });
    } else {
      let changedGender = [];
      selectedList.forEach((option) => changedGender.push(option.value));
      this.setState({ gender: changedGender[0] });
    }
  };

  handleImageChange(e) {
    this.setState({
      file: null,
      imagePreviewUrl: null,
    });

    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result,
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  render() {
    // console.log("check state", this.state);
    const {
      imagePreviewUrl,
      image,
      email,
      address,
      dateOfBirth,
      gender,
      genderOptions,
    } = this.state;

    const genderPreSelected = genderOptions.filter(
      (option) => option.value === gender
    );

    const imageExists = checkFileExists(commonApi.api + image);

    return (
      <>
        <p className="h1">Edit Profile Info</p>

        <form onSubmit={this.handleSubmit.bind(this)} className="mb-5">
          {!imagePreviewUrl && (
            <div className="container mb-2">
              <div className="row d-flex justify-content-center align-items-center">
                <div className="rounded-circle imgPreview">
                  <img
                    className="rounded-circle"
                    src={imageExists ? commonApi.api + image : no_image}
                    alt="slider img..."
                  />
                </div>
              </div>
            </div>
          )}

          {imagePreviewUrl && (
            <div className="container mb-2">
              <div className="row d-flex justify-content-center align-items-center">
                <div className="rounded-circle imgPreview">
                  <img
                    className="rounded-circle"
                    src={imagePreviewUrl}
                    alt="slider img..."
                  />
                </div>
              </div>
            </div>
          )}

          <div className="form-group row">
            <label htmlFor="image" className="col-sm-2 col-form-label">
              New Profile Picture
            </label>

            <div className="col-sm-10 text-left">
              <input
                className="fileInput"
                type="file"
                onChange={(e) => this.handleImageChange(e)}
              />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="email" className="col-sm-2 col-form-label">
              Email
            </label>

            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                placeholder="Your email..."
                value={email}
                onChange={this.handleChange.bind(this, "email")}
              />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="address" className="col-sm-2 col-form-label">
              Address
            </label>

            <div className="col-sm-10">
              <textarea
                rows="3"
                className="form-control"
                id="address"
                name="address"
                placeholder="Your address..."
                value={address}
                onChange={this.handleChange.bind(this, "address")}
              />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="dateOfBirth" className="col-sm-2 col-form-label">
              Date of Birth
            </label>

            <span>
              <DatePicker
                value={dateOfBirth ? new Date(dateOfBirth) : ""}
                onChange={(value) => {
                  if (value) {
                    this.setState({
                      dateOfBirth: new Date(value),
                      dateOfBirthError: "",
                      errorStatus: null,
                    });
                  } else {
                    this.setState({
                      dateOfBirth: "",
                      dateOfBirthError: "Please select a valid date",
                    });
                  }
                }}
              />
            </span>
          </div>

          <div className="form-group row">
            <label htmlFor="gender" className="col-sm-2 col-form-label">
              Gender
            </label>

            <div className="col-sm-10">
              <Multiselect
                options={genderOptions}
                displayValue={"optionName"}
                onSelect={this.onChangeGender}
                onRemove={this.onRemoveGender}
                emptyRecordMsg={"No options available"}
                placeholder={"Select Gender"}
                avoidHighlightFirstOption={true}
                closeIcon={"cancel"}
                singleSelect={true}
                selectedValues={genderPreSelected}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary edit-button">
            Update Profile Data
          </button>
        </form>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const formattedToken = getFormattedToken(state.trainerLoginReducer.token);

  return {
    formattedToken,
  };
};

export default connect(mapStateToProps)(TraineeUpdateProfile);
