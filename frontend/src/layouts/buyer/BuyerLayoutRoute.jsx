import React from "react";
import { Route } from "react-router-dom";
import BuyerLayoutComponent from "./BuyerLayoutComponent";

const BuyerLayoutRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => (
        <BuyerLayoutComponent>
          <Component {...props} />
        </BuyerLayoutComponent>
      )}
    />
  );
};

export default BuyerLayoutRoute;
