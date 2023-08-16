import React from "react";

const Alert = ({ message, type }) => {
  return (
    <div
      className={`alert alert-${type} alert-dismissible fade show mt-3 `}
      role="alert"
    >
      {message}
      <button
        type="button"
        className="btn close"
        data-dismiss="alert"
        aria-label="Close"
      >
        X
      </button>
    </div>
  );
};

export default Alert;
