import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import { connect } from "react-redux";

import { getFormattedToken } from "../../HelperFunctions";

import { traineeImageApi } from "../../Api";

import { loaderUrl } from "../../Constants";

import no_image from "../../Assets/Image/no_image.jpg";
import "react-toastify/dist/ReactToastify.css";
import "./TraineeUploadImage.css";

class TraineeUploadImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imagePreviewUrl: null,
      file: null,
      fileError: "",
      submitting: false,
      submitted: false,
    };
  }

  componentDidMount() {
    // const { formattedToken } = this.props;
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitting: true });

    const { file } = this.state;

    const { formattedToken } = this.props;

    const fileData = new FormData();
    fileData.append("image", file ? file : undefined);

    // file.map((file) => fileData.append("image[]", file.file));

    if (file) {
      traineeImageApi
        .traineeUpLoadImage(fileData, formattedToken)
        .then((response) => {
          console.log("upload success", response);

          this.setState({
            submitting: false,
            submitted: true,
            file: null,
            imagePreviewUrl: null,
          });

          toast.success("Image Upload Successful", {
            position: toast.POSITION.TOP_RIGHT,
          });
        })
        .catch((error) => {
          this.setState({ submitting: false, submitted: true });

          console.log("upload error", error);

          toast.error("Image Upload Failed", {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
    } else {
      this.setState({
        submitting: false,
        submitted: true,
        fileError: "Please select an image first",
      });

      toast.error("No Image Selected", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }

  // fileSelectedHandler = (e) => {
  //   e.preventDefault();

  //   this.setState({ file: [...this.state.file, ...e.target.files] });
  // };

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
        fileError: "",
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  render() {
    // console.log("check state", this.state);
    const { imagePreviewUrl, submitted, fileError, submitting } = this.state;

    return (
      <>
        <p className="h1">Body Image</p>

        <form onSubmit={this.handleSubmit.bind(this)} className="mb-5">
          <div className="form-group row">
            <label htmlFor="image" className="col-sm-2 col-form-label">
              New Body Image
            </label>

            <div className="col-sm-10 text-left">
              <input
                className="fileInput"
                type="file"
                onChange={(e) => this.handleImageChange(e)}
              />

              {/* <input
                className="fileInput"
                type="file"
                multiple
                onChange={this.fileSelectedHandler}
              /> */}
            </div>
          </div>

          <div className="container mb-2">
            <div className="row d-flex justify-content-center align-items-center">
              <div className="bodyImagePreview">
                <img
                  src={imagePreviewUrl ? imagePreviewUrl : no_image}
                  alt="body img..."
                />
              </div>
            </div>
          </div>

          {submitted && fileError && (
            <span className="validation-error mb-1">{fileError}</span>
          )}

          {submitting ? (
            <img src={loaderUrl} alt="Please Wait..." />
          ) : (
            <button type="submit" className="btn btn-primary submit-button">
              Submit New Image
            </button>
          )}
        </form>

        <ToastContainer />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const formattedToken = getFormattedToken(state.traineeLoginReducer.token);

  return {
    formattedToken,
  };
};

const connectedTraineeUploadImage =
  connect(mapStateToProps)(TraineeUploadImage);

export { connectedTraineeUploadImage as TraineeUploadImage };
