import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { routesList } from "../../Constants";

import { getFormattedToken } from "../../HelperFunctions/formattedToken";

import { sAdminAddPaymentPackage } from "../../Redux/SAdminPaymentPackage/sAdminPaymentPackageActions";

class SAdminPaymentPackageAdd extends Component {
  constructor(props) {
    super(props);
    const { name, amount, time_duration } = props.initialData;
    this.state = {
      name,
      amount,
      time_duration,
    };
  }

  handleChange(propertyName, e) {
    let updatedValue = {};
    updatedValue[propertyName] = e.target.value;
    this.setState(updatedValue);
  }

  handleSubmit(e) {
    const { name, amount, time_duration } = this.state;
    const { formattedToken, sAdminAddPaymentPackage } = this.props;

    e.preventDefault();

    let updatedData = {
      name,
      amount,
      time_duration,
    };

    sAdminAddPaymentPackage(updatedData, formattedToken);
  }

  render() {
    const { name, amount, time_duration } = this.state;

    return (
      <>
        <p className="h1">Add Payment Package</p>
        <hr />
        <Link
          to={routesList.S_ADMIN_PACKAGE_SUBSCRIPTION}
          className="d-flex justify-content-end"
          style={{ width: "100%", textDecoration: "none" }}
        >
          <button className="btn btn-primary">Package List</button>
        </Link>
        <br />
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group row">
            <label htmlFor="name" className="col-sm-3 col-form-label">
              Name
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="Package Name..."
                value={name}
                onChange={this.handleChange.bind(this, "name")}
              />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="amount" className="col-sm-3 col-form-label">
              Amount
            </label>
            <div className="col-sm-9">
              <input
                type="number"
                className="form-control"
                id="amount"
                name="amount"
                placeholder="Package amount..."
                value={amount}
                onChange={this.handleChange.bind(this, "amount")}
              />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="time_duration" className="col-sm-3 col-form-label">
              Time Duration (as days)
            </label>

            <div className="col-sm-9">
              <input
                type="number"
                className="form-control"
                id="time_duration"
                name="time_duration"
                placeholder="Total time duration..."
                value={time_duration}
                onChange={this.handleChange.bind(this, "time_duration")}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const formattedToken = getFormattedToken(state.sAdminLoginReducer.token);

  let initialData = {
    name: "",
    amount: "",
    time_duration: "",
  };

  if (state.sAdminProfileReducer.profileData) {
    const {
      name,
      amount,
      time_duration,
    } = state.sAdminProfileReducer.profileData;

    initialData.name = name;
    initialData.amount = amount;
    initialData.time_duration = time_duration;
  }

  return {
    formattedToken,
    initialData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sAdminAddPaymentPackage: (updatedData, formattedToken) =>
      dispatch(sAdminAddPaymentPackage(updatedData, formattedToken)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SAdminPaymentPackageAdd);
