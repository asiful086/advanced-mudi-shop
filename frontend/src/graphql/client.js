import {
  ApolloClient,
  // ApolloLink,
  from,
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import cache from "./cache";
// import { removeUser, user } from "./reactivities/userVariable";
// import jwtDecode from "jwt-decode";
// import { Redirect } from "react-router";

let uploadLink = createUploadLink({
  uri: "http://localhost:5000/graphql",
});

if (process.env.NODE_ENV === "production") {
  console.log("production");
  uploadLink = createUploadLink({
    uri: "https://advanced-mudi-shop.herokuapp.com/graphql",
  });
}

const authLink = setContext(() => {
  const token = localStorage.getItem("jwtToken");
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// logout
const logoutLink = onError(({ graphQLErrors }) => {
  // console.log("ehllo", graphQLErrors[0].extensions.code);
  if (graphQLErrors[0].extensions.code !== "BAD_USER_INPUT") {
    // removeUser(history, "/admin/login");
  }

  // if (graphQLErrors[0].extensions.code === "INTERNAL_SERVER_ERROR") {
  //   console.log("hi from server");
  //   removeUser("/admin/login");
  // }
});

// middleware
// const authMiddleware = new ApolloLink((operation, forward) => {
// if (localStorage.getItem("jwtToken")) {
//   const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));

//   if (decodedToken.exp * 1000 < Date.now()) {
//     localStorage.removeItem("jwtToken");
//     user(null);
//   } else {
//     // initialState.user = decodedToken;
//     user(decodedToken);
//   }
// } else {
//   return <Redirect to="/admin/login" />;
// }

// if (operation.operationName !== "login") {
//   if (localStorage.getItem("jwtToken")) {
//     const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));

//     if (decodedToken.exp * 1000 < Date.now()) {
//       localStorage.removeItem("jwtToken");
//       user(null);
//       return <Redirect to="/admin/login" />;
//     } else {
//       user(decodedToken);
//     }
//   } else {
//     return <Redirect to="/admin/login" />;
//   }
// }

//   const token = localStorage.getItem("jwtToken");

//   // add the authorization to the headers
//   operation.setContext({
//     headers: {
//       Authorization: token ? `Bearer ${token}` : "",
//     },
//   });

//   return forward(operation);
// });

const client = new ApolloClient({
  // link: authLink.concat(uploadLink),
  link: from([authLink, logoutLink, uploadLink]),
  cache,
});
export default client;
