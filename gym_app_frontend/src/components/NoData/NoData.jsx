import React from "react";

export const NoData = ({ message = "No Data Found" }) => {
  return (
    <>
      <div className="jumbotron">
        <p className="lead">{message}</p>
      </div>
    </>
  );
};
