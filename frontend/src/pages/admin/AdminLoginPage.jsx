import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import useForm from "../../utils/useForm";
import { LOGIN_USER } from "../../graphql/mutations/userMutation";
import { storeUser } from "../../graphql/reactivities/userVariable";
import LoaderComponent from "../../utils/loader/LoaderComponent";
import { Link } from "react-router-dom";

const AdminLoginPage = (props) => {
  const [state, setState] = useState({
    errors: [],
    successMessage: "",
  });
  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    email: "",
    password: "",
  });

  // mutation
  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      localStorage.setItem("jwtToken", userData.token);
      // store the the user with reactive variable in localstorage
      storeUser(userData);
      props.history.push("/dashboard");
    },
    onError(err) {
      setState({
        ...state,
        errors: err.graphQLErrors[0].extensions.exception.errors,
      });
      // setErrors(err.graphQLErrors[0].extensions.exception.errors);
      // console.log(err);
    },
    variables: values,
  });

  function loginUserCallback() {
    loginUser();
  }
  if (loading) {
    return <LoaderComponent />;
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="w-72 h-60h bg-green-200 mx-3 md:mx-0 text-center rounded border shadow">
        <h1 className="font-bold my-3 capitalize text-lg">login</h1>
        {Object.keys(state.errors).length > 0 && (
          <div>
            <ul>
              {Object.values(state.errors).map((value, index) => (
                <div className="px-3" key={index}>
                  <li
                    className="bg-red-500 text-white rounded-lg my-2"
                    key={value}
                  >
                    {value}
                  </li>
                </div>
              ))}
            </ul>
          </div>
        )}
        <form onSubmit={onSubmit}>
          <input
            className={`border border-${
              state.errors && state.errors.email ? "red" : "green"
            }-600  rounded-lg px-2 focus:outline-none py-1 my-3 w-10/12`}
            type="email"
            placeholder="email"
            name="email"
            onChange={onChange}
            value={values.email}
          />
          <input
            className={`border border-${
              state.errors && state.errors.password ? "red" : "green"
            }-600  rounded-lg px-2 focus:outline-none py-1 my-3 w-10/12`}
            type="password"
            placeholder="password"
            name="password"
            onChange={onChange}
            value={values.password}
          />
          {/* <div className="relative flex w-full flex-wrap items-stretch mb-3">
            <span className="z-10 h-full leading-snug font-normal absolute text-center text-gray-400 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
              <i className="fas fa-lock"></i>
            </span>
            <input
              type="text"
              placeholder="Placeholder"
              className="px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full pl-10"
            />
          </div> */}
          <div>
            <p className="font-medium text-gray-900">
              <Link to="/admin/forgotpassword">forgot password?</Link>
            </p>
            <button
              className="capitalize font-normal border rounded bg-green-800 px-3 py-1 mt-3 focus:outline-none text-white my-2"
              type="submit"
            >
              submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
