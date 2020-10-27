import React from "react"

import "./LoadingSymbol.scss";

const LoadingSymbol = () => (
  <div className="loading-symbol">
    <svg
      className="spinner"
      width="65px"
      height="65px"
      viewBox="0 0 66 66"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className="path"
        fill="none"
        strokeWidth="6"
        cx="33"
        cy="33"
        r="30"
      ></circle>
    </svg>
  </div>
);

export default LoadingSymbol;
