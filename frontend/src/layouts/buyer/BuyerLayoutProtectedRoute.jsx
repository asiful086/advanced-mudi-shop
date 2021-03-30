import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import jwtDecode from "jwt-decode";

import { user } from "../../graphql/reactivities/userVariable";

import BuyerLayoutComponent from "./BuyerLayoutComponent";

const BuyerLayoutProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Switch>
      <Route
        {...rest}
        render={(props) => {
          if (localStorage.getItem("jwtToken")) {
            const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));
            if (decodedToken.exp * 1000 > Date.now()) {
              user(decodedToken);
              if (decodedToken.role === "buyer") {
                return (
                  <BuyerLayoutComponent>
                    <Component {...props} />
                  </BuyerLayoutComponent>
                );
              } else {
                return <Redirect to="/unauthorized" />;
              }
            } else {
              localStorage.removeItem("jwtToken");
              user(null);
              return <Redirect to="/admin/login" />;
            }
          } else {
            return <Redirect to="/admin/login" />;
          }
        }}
      />
    </Switch>
  );
};

export default BuyerLayoutProtectedRoute;
