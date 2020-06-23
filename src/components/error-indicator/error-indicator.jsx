import React from "react";

const ErrorIndicator = () => {
  return (
    <div className="text-center bg-danger w-25 mx-auto mt-3 rounded-lg">
      <div>Wrong command</div>
      <div>Please try again</div>
    </div>
  );
};

export default ErrorIndicator;
