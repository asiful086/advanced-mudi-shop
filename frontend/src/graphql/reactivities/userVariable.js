import { makeVar } from "@apollo/client";
import jwtDecode from "jwt-decode";
import { Redirect } from "react-router";

// export const user = makeVar(null);

export const user = makeVar(
  (() => {
    if (localStorage.getItem("jwtToken")) {
      const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));

      if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem("jwtToken");
        return null;
      } else {
        // console.log("that is true");
        return decodedToken;
      }
    }
  })()
);

export const checkExpireDate = () => {
  console.log("hello");
  if (localStorage.getItem("jwtToken")) {
    const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));

    if (decodedToken.exp * 1000 < Date.now()) {
      localStorage.removeItem("jwtToken");
      user(null);
    } else {
      // initialState.user = decodedToken;
      user(decodedToken);
    }
  }
};

// export const user = makeVar(userData);

// login User

export const storeUser = (userData) => {
  localStorage.setItem("jwtToken", userData.token);
  user(userData);
};

// logout User

export const removeUser = (history, url) => {
  localStorage.removeItem("jwtToken");
  user(null);
  history.push(url);
};
export const logOutOnError = (url) => {
  // localStorage.removeItem("jwtToken");
  // user(null);
  return <Redirect to={url} />;
  // history.push(url);
};

// check user

export const readUser = () => {
  // console.log("hello from readUser");
  if (localStorage.getItem("jwtToken")) {
    const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));

    if (decodedToken.exp * 1000 < Date.now()) {
      localStorage.removeItem("jwtToken");
      user(null);
    } else {
      // initialState.user = decodedToken;
      user(decodedToken);
    }
  }
  return user;
};

// test

// export const darkMode = makeVar(false);

// export const darkModeToggle = () => {
//   console.log("clicked");
//   darkMode(!darkMode());
// };

// export const readDarkMode = () => {
//   return darkMode;
// };
