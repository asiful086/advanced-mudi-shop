import React from "react";
// import { useReactiveVar } from "@apollo/client";

import { Route, Redirect, Switch } from "react-router-dom";
import {
  // checkExpireDate,
  // readUser,
  user,
  // user,
} from "../../graphql/reactivities/userVariable";
import AdminLayoutComponent from "./AdminLayoutComponent";
import jwtDecode from "jwt-decode";

const AdminLayoutRoute = ({ component: Component, ...rest }) => {
  // useReactiveVar(readUser());
  // const checkAuth = useReactiveVar(readUser());
  // const checkAuth = useReactiveVar(user);

  return (
    <Switch>
      <Route
        {...rest}
        render={(props) => {
          if (localStorage.getItem("jwtToken")) {
            const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));
            if (decodedToken.exp * 1000 > Date.now()) {
              user(decodedToken);
              if (decodedToken.role === "admin") {
                return (
                  <AdminLayoutComponent>
                    <Component {...props} />
                  </AdminLayoutComponent>
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

  // ================
  // return (
  //   <Switch>
  //     <Route
  //       {...rest}
  //       render={(props) =>
  //         checkAuth ? (
  //           checkAuth.role === "admin" ? (
  //             <AdminLayoutComponent>
  //               <Component {...props} checkAuth={checkAuth} />
  //             </AdminLayoutComponent>
  //           ) : (
  //             <Redirect to="unauthorized" />
  //           )
  //         ) : (
  //           <Redirect to="/admin/login" />
  //         )
  //       }
  //     />
  //   </Switch>
  // );
};

export default AdminLayoutRoute;
