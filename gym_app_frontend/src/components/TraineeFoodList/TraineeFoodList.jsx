import React, { Component } from "react";
// import { Redirect } from "react-router-dom";

import { routesList } from "../../Constants";

class TraineeFoodList extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handlePageRefresh() {
    // console.log("called");
    this.props.history.push(routesList.TRAINEE_HOME);
    // window.location.href = "/trainee-home";

    // <Redirect to={routesList.TRAINEE_INITIAL_API_LOADER} />;
  }

  componentDidMount() {
    // window.addEventListener('beforeunload', alertUser)
    window.addEventListener("unload", this.handlePageRefresh);
  }

  componentWillUnmount() {
    // window.removeEventListener('beforeunload', alertUser)
    window.removeEventListener("unload", this.handlePageRefresh);
  }

  render() {
    // console.log("trainee food render", this.props.history.push);
    return (
      <>
        <p className="h1">Food List</p>

        <table className="table table-hover table-bordered">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Food</th>
              <th scope="col">Unit</th>
              <th scope="col">kCal/Unit</th>
              <th scope="col">Total kCal</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Egg</th>
              <td>2</td>
              <td>20</td>
              <td>40</td>
            </tr>
            <tr>
              <th scope="row">Water</th>
              <td>2</td>
              <td>20</td>
              <td>40</td>
            </tr>
            <tr>
              <th scope="row">Rice</th>
              <td>2</td>
              <td>20</td>
              <td>40</td>
            </tr>
            <tr>
              <th scope="row">Vegetables</th>
              <td>2</td>
              <td>20</td>
              <td>40</td>
            </tr>
            <tr>
              <th scope="row">Fruits</th>
              <td>2</td>
              <td>20</td>
              <td>40</td>
            </tr>
            <tr>
              <th scope="row">Milk</th>
              <td>2</td>
              <td>20</td>
              <td>40</td>
            </tr>
            <tr>
              <th scope="row">Snacks</th>
              <td>2</td>
              <td>20</td>
              <td>40</td>
            </tr>
            <tr>
              <th scope="row">Total kCal</th>
              <td></td>
              <td></td>
              <th scope="row">1400</th>
            </tr>
          </tbody>
        </table>
      </>
    );
  }
}

export default TraineeFoodList;
