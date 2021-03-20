import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import useForm from "../../utils/useForm";
import { RESET_PASSWORD_USER } from "../../graphql/mutations/userMutation";
import { storeUser } from "../../graphql/reactivities/userVariable";
import LoaderComponent from "../../utils/loader/LoaderComponent";

const AdminResetPasswordPage = (props) => {
  const [state, setState] = useState({
    errors: [],
    successMessage: "",
  });
  const { onChange, onSubmit, values } = useForm(resetPasswrodCallback, {
    password: "",
    confirmPassword: "",
    resetToken: props.match.params.resetToken,
  });

  // mutation
  const [resetPassword, { loading }] = useMutation(RESET_PASSWORD_USER, {
    update(_, { data: { resetPassword: userData } }) {
      // store the the user with reactive variable in localstorage
      localStorage.setItem("jwtToken", userData.token);
      storeUser(userData);
      props.history.push("/dashboard");
    },
    onError(err) {
        setState({
          ...state,
          errors: err.graphQLErrors[0].extensions.exception.errors,
        });
        //   console.log(err);
      },
    variables: values,
  });

  function resetPasswrodCallback() {
    resetPassword();
  }
  if (loading) {
    return <LoaderComponent />;
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="w-72 h-60h bg-green-200 mx-3 md:mx-0 text-center rounded border shadow">
        <h1 className="font-bold my-3 capitalize text-lg">Reset Password</h1>
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
          {/* Password */}
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
          {/* Confirm Password */}
          <input
            className={`border border-${
              state.errors && state.errors.confirmPassword ? "red" : "green"
            }-600  rounded-lg px-2 focus:outline-none py-1 my-3 w-10/12`}
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={onChange}
            value={values.confirmPassword}
          />
          <div>
            {/* <p className="font-medium text-gray-900">
              <Link to="/admin/forgotpassword">forgot password?</Link>
            </p> */}
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

export default AdminResetPasswordPage;
