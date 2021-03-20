import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import useForm from "../../utils/useForm";
import { FORGOT_PASSWORD_USER } from "../../graphql/mutations/userMutation";
import LoaderComponent from "../../utils/loader/LoaderComponent";

const AdminForgotPasswordPage = (props) => {
  const [state, setState] = useState({
    errors: [],
    successMessage: "",
  });
  const { onChange, onSubmit, values } = useForm(forgotPasswordCallback, {
    email: "",
  });
  // mutation
  const [forgotPassword, { loading }] = useMutation(FORGOT_PASSWORD_USER, {
    update(_, { data: { forgotPassword: message } }) {
      setState({
        ...state,
        successMessage: message,
      });
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

  function forgotPasswordCallback() {
    forgotPassword();
  }
  if (loading) {
    return <LoaderComponent />;
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="w-72 h-60h bg-green-200 mx-3 md:mx-0 text-center rounded border shadow">
        <h1 className="font-bold my-3 capitalize text-lg">Forgot Password</h1>
        {state.successMessage && (
          <div>
            <ul>
              <div className="px-3">
                <li className="bg-green-500 text-white rounded-lg my-2">
                  {state.successMessage}
                </li>
              </div>
            </ul>
          </div>
        )}
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

export default AdminForgotPasswordPage;
