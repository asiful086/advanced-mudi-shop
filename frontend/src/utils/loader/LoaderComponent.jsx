import React from "react";
import "./LoaderStyle.css";

const LoaderComponent = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="loader"></div>
    </div>
  );
};

export default LoaderComponent;
