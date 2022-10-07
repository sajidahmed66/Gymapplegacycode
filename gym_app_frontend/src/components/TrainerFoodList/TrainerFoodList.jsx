import React, { Component } from "react";

class TraineeFoodList extends Component {
  state = {};
  render() {
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
