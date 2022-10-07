import React from "react";

import Spinner from "../Assets/Gif/spinner.gif";

import "./Loader.css";

const FullPageLoader = () => {
  return (
    <div className="fp-container">
      <img src={Spinner} className="fp-loader" alt="loading" />
    </div>
  );
};

export default FullPageLoader;
