import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// import { icons } from "react-icons";

import { getFormattedToken } from "../../HelperFunctions";

import { sAdminGetPaymentPackageList } from "../../Redux/SAdminPaymentPackage/sAdminPaymentPackageActions";

import { routesList } from "../../Constants";

import { NoData } from "../NoData/NoData";

class SAdminPaymentPackageList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    // console.log(this.props);
    const { PaymentPackageList, sAdminGetPaymentPackageList, formattedToken } =
      this.props;
    if (!PaymentPackageList) {
      sAdminGetPaymentPackageList(formattedToken);
    }
  }

  getPaymentPackageList() {
    const { PaymentPackageList } = this.props;
    return (
      <>
        <table className="table table-hover table-bordered">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Package Name</th>
              <th scope="col">Amount</th>
              <th scope="col">Time Duration</th>
              <th scope="col">Added By</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {PaymentPackageList.map((data, index) => (
              <tr key={index}>
                <th scope="row">{data.name}</th>
                <td>{data.amount}</td>
                <td>{data.time_duration}</td>
                <td>{data.entryBy.firstname + " " + data.entryBy.lastname}</td>
                <td>
                  <Link
                    to={{
                      pathname:
                        routesList.S_ADMIN_PACKAGE_SUBSCRIPTION_EDIT +
                        "/" +
                        data._id,
                      state: { id: data._id },
                    }}
                    className="btn btn-md btn-primary"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }

  render() {
    const { PaymentPackageList } = this.props;
    return (
      <>
        <p className="h1">Payment Package List</p>
        <hr />
        <Link
          to={routesList.S_ADMIN_PACKAGE_SUBSCRIPTION_ADD}
          className="d-flex justify-content-end"
          style={{ width: "100%", textDecoration: "none" }}
        >
          <button className="btn btn-primary">
            <i className="fa fa-plus-square" aria-hidden="true"></i>Add Package
          </button>
        </Link>
        <br />
        {PaymentPackageList && PaymentPackageList.length ? (
          this.getPaymentPackageList()
        ) : (
          <NoData message="No Payment package Found, Please Add One" />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const formattedToken = getFormattedToken(state.sAdminLoginReducer.token);
  const PaymentPackageList =
    state.sAdminPaymentPackageReducer.PaymentPackageList;

  return {
    formattedToken,
    PaymentPackageList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sAdminGetPaymentPackageList: (formattedToken) =>
      dispatch(sAdminGetPaymentPackageList(formattedToken)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SAdminPaymentPackageList);
