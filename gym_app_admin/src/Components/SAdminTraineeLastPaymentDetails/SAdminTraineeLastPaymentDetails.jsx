import React, { Component } from "react";
import { Link } from "react-router-dom";
import { routesList } from "../../Constants";
class SAdminTraineeLastPaymentDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <div className="d-flex justify-content-between">
          <div className="p-2"></div>
          <div className="h1 pl-5">Trainer Payment Details</div>
          <div>
            <Link
              to={{
                pathname: routesList.S_ADMIN_TRAINEE_LIST,
                state: { data: "test data" },
              }}
              className="btn btn-primary h-auto mt-2 back-button"
            >
              Trainee List
            </Link>
          </div>
          <br/>
          <div className="row"></div>
        </div>
      </>
    );
  }
}
export default SAdminTraineeLastPaymentDetails;
