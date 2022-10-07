import React, { Component } from "react";
import { connect } from "react-redux";

import sAdminPaymentPackageApi from "../../Api/sAdminPaymentPackageApi";
import { registrationApi } from "../../Api";

import { getFormattedToken } from "../../HelperFunctions";

import { routesList } from "../../Constants";

class SAdminTraineeRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      phone: "",
      registrationAmount: "",
      totalAmount: "",
      paidAmount: "",
      subscriptionType: 1,
      monthlyFee: "",
      package: 1,
      packageList: [],
      packageType: "",
      subscriptionAmount: "",
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    sAdminPaymentPackageApi
      .sAdminGetPaymentPackageList(this.props.formattedToken)
      .then((res) => {
        this.setState({ packageList: res.data });
      });
  }

  handleChange(propertyName, e) {
    let updatedValue = {};
    updatedValue[propertyName] = e.target.value;
    this.setState(updatedValue);
  }

  onChangeRadio(e) {
    this.setState({ subscriptionType: e.target.value });
  }

  onChangePackage(e) {
    // console.log(e.target.value);
    this.setState({ packageType: e.target.value });
    this.state.packageList.map((res) => {
      if (res._id === e.target.value) {
        this.setState({ subscriptionAmount: res.amount });
      }
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { history } = this.props;

    const {
      firstname,
      lastname,
      phone,
      subscriptionType,
      registrationAmount,
      paidAmount,
    } = this.state;

    const { formattedToken } = this.props;

    let userInfo = {
      firstname,
      lastname,
      phone,
      subscriptionType,
      packageType: this.state.packageType
        ? this.state.packageType
        : "00a0a000aaa000a0a000a000",
      totalAmount: this.state.totalAmount
        ? this.state.totalAmount
        : this.state.subscriptionAmount
        ? parseInt(this.state.subscriptionAmount) +
          parseInt(this.state.registrationAmount)
        : parseInt(this.state.monthlyFee) +
          parseInt(this.state.registrationAmount),
      registrationAmount,
      paidAmount,
      subscriptionAmount: this.state.subscriptionAmount
        ? this.state.subscriptionAmount
        : this.state.monthlyFee,
    };
    registrationApi
      .traineeRegistration(userInfo, formattedToken)
      .then((res) => {
        // console.log(userInfo);
        // const clearState = {
        //   firstname: "",
        //   lastname: "",
        //   phone: "",
        //   registrationAmount: "",
        //   totalAmount: "",
        // };
        // this.setState(clearState);
        history.push(routesList.S_ADMIN_TRAINEE_LIST);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  paymentType() {
    if (this.state.subscriptionType == 1) {
      return (
        <div className="form-group row">
          <label htmlFor="phone" className="col-sm-3 col-form-label">
            Monthly Fee
          </label>
          <div className="col-sm-9">
            <input
              type="number"
              className="form-control"
              id="monthlyFee"
              name="monthlyFee"
              placeholder="Please enter registration fee ..."
              value={this.state.monthlyFee}
              onChange={this.handleChange.bind(this, "monthlyFee")}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="form-group row">
          <label htmlFor="phone" className="col-sm-3 col-form-label">
            Package
          </label>
          <div className="col-sm-9">
            {this.state.packageList.map((res, key) => (
              <div className="text-left" key={key}>
                <div className="row mb-4">
                  <div className="col-md-1">
                    <input
                      type="radio"
                      checked={this.state.packageType === res._id}
                      onChange={this.onChangePackage.bind(this)}
                      value={res._id}
                    />
                  </div>
                  <div className="col-md-2 pl-0">{res.name}</div>
                  <div className="col-md-2 pl-0">{res.amount}</div>
                  <div className="col-md-4 pl-0">
                    {res.time_duration} {""} days
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <>
        <p className="h1">Trainee Registration</p>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group row">
            <label htmlFor="firstname" className="col-sm-3 col-form-label">
              First Name
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                className="form-control"
                id="firstname"
                name="firstname"
                placeholder="Your first name..."
                value={this.state.firstname}
                onChange={this.handleChange.bind(this, "firstname")}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="lastname" className="col-sm-3 col-form-label">
              Last Name
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                className="form-control"
                id="lastname"
                name="lastname"
                placeholder="Your last name..."
                value={this.state.lastname}
                onChange={this.handleChange.bind(this, "lastname")}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="phone" className="col-sm-3 col-form-label">
              Mobile Number
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                className="form-control"
                id="phone"
                name="phone"
                placeholder="Your mobile number..."
                value={this.state.phone}
                onChange={this.handleChange.bind(this, "phone")}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="phone" className="col-sm-3 col-form-label">
              Registration Fee
            </label>
            <div className="col-sm-9">
              <input
                type="number"
                className="form-control"
                id="registrationAmount"
                name="registrationAmount"
                placeholder="Please enter registration fee ..."
                value={this.state.registrationAmount}
                onChange={this.handleChange.bind(this, "registrationAmount")}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="phone" className="col-sm-3 col-form-label">
              Subscription Type
            </label>
            <div className="col-sm-9">
              <div className="text-left">
                <input
                  type="radio"
                  checked={this.state.subscriptionType == 1}
                  onChange={this.onChangeRadio.bind(this)}
                  value={1}
                />{" "}
                Monthly Fee
              </div>
              <div className="text-left">
                <input
                  type="radio"
                  checked={this.state.subscriptionType == 2}
                  onChange={this.onChangeRadio.bind(this)}
                  value={2}
                />{" "}
                Package Fee
              </div>
            </div>
          </div>
          {this.paymentType()}
          <br />
          <div className="form-group row">
            <label htmlFor="phone" className="col-sm-3 col-form-label">
              Total Amount
            </label>
            <div className="col-sm-9">
              <input
                type="number"
                className="form-control"
                id="totalAmount"
                name="totalAmount"
                placeholder="Please enter total amount ..."
                value={
                  this.state.totalAmount
                    ? this.state.totalAmount
                    : this.state.subscriptionAmount
                    ? parseInt(this.state.subscriptionAmount) +
                      parseInt(this.state.registrationAmount)
                    : parseInt(this.state.monthlyFee) +
                      parseInt(this.state.registrationAmount)
                }
                onChange={this.handleChange.bind(this, "totalAmount")}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="phone" className="col-sm-3 col-form-label">
              Paid Amount
            </label>
            <div className="col-sm-9">
              <input
                type="number"
                className="form-control"
                id="paidAmount"
                name="paidAmount"
                placeholder="Please enter paid amount ..."
                value={this.state.paidAmount}
                onChange={this.handleChange.bind(this, "paidAmount")}
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary mb-5">
            Submit
          </button>
        </form>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  const formattedToken = getFormattedToken(state.sAdminLoginReducer.token);
  return {
    formattedToken,
  };
};
export default connect(mapStateToProps)(SAdminTraineeRegistration);
