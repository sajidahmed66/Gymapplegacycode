import React, { Component } from "react";

class TraineeWorkoutHistory extends Component {
  // state = {  }
  render() {
    return (
      <>
        <p className="h1">Workout History</p>

        <table className="table table-hover table-bordered">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Type</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Push Ups</th>
              <td>Done</td>
            </tr>
            <tr>
              <th scope="row">Dumbbell</th>
              <td>Not Done</td>
            </tr>
            <tr>
              <th scope="row">Treadmill</th>
              <td>Done</td>
            </tr>
            <tr>
              <th scope="row">Jogging</th>
              <td>Done</td>
            </tr>
            <tr>
              <th scope="row">Push Ups</th>
              <td>Done</td>
            </tr>
            <tr>
              <th scope="row">Dumbbell</th>
              <td>Not Done</td>
            </tr>
            <tr>
              <th scope="row">Treadmill</th>
              <td>Done</td>
            </tr>
            <tr>
              <th scope="row">Jogging</th>
              <td>Done</td>
            </tr>
            <tr>
              <th scope="row">Push Ups</th>
              <td>Done</td>
            </tr>
            <tr>
              <th scope="row">Dumbbell</th>
              <td>Not Done</td>
            </tr>
            <tr>
              <th scope="row">Treadmill</th>
              <td>Done</td>
            </tr>
            <tr>
              <th scope="row">Jogging</th>
              <td>Done</td>
            </tr>
          </tbody>
        </table>
      </>
    );
  }
}

export default TraineeWorkoutHistory;
