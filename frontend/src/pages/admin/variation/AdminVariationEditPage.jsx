import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";

import { Link } from "react-router-dom";
import AdminFormInputComponent from "../../../components/admin/AdminFormInputComponent";
import useForm from "../../../utils/useForm";
import LoaderComponent from "../../../utils/loader/LoaderComponent";
import { removeUser } from "../../../graphql/reactivities/userVariable";
import { UPDATE_VARIATION } from "../../../graphql/mutations/variationMutation";
import { GET_VARIATION } from "../../../graphql/queries/variationQuery";

const AdminVariationEditPage = ({ history, match }) => {
  // 1  ============================= COMPONENT STATE =========================

  const [state, setState] = useState({
    errors: [],
    successMessage: "",
    unmounted: false,
  });
  // 2 ================================ CUSTOM HOOKS FOR FORM ====================

  const { onChange, onSubmit, values, setValues } = useForm(
    updateVariationCallback,
    {
      id: match.params.id,
      name: "",
    }
  );

  // 3 =============================== QUERY OPERATION =======================
  const {
    loading: mainQueryLoading,
    data: { getVariation: mainData } = {},
  } = useQuery(GET_VARIATION, {
    onError(err) {
      //   console.log(err);
      //   console.log(err.graphQLErrors[0]);
      if (err.graphQLErrors[0].extensions.code !== "BAD_USER_INPUT") {
        removeUser(history, "/admin/login");
      }
    },
    variables: {
      id: match.params.id,
    },
  });

  // 4 =============================== MUTATION OPERATION =======================
  const [updateVariation, { loading: mutationLoading }] = useMutation(
    UPDATE_VARIATION,
    {
      update() {
        history.push("/admin/variation/list");
      },
      onError(err) {
        values.name = "";
        if (err.graphQLErrors[0].extensions.code === "BAD_USER_INPUT") {
          setState({
            ...state,
            successMessage: "",
            errors: err.graphQLErrors[0].extensions.exception.errors,
          });
        }
        if (err.graphQLErrors[0].extensions.code !== "BAD_USER_INPUT") {
          // console.log("from server error");
          removeUser(history, "/admin/login");
        }
      },
      variables: {
        id: values.id,
        name: values.name,
      },
    }
  );

  function updateVariationCallback() {
    updateVariation();
  }

  // 5 =============================== USE EFFECT FOR UPDATING =========================
  useEffect(() => {
    if (mainData) {
      const { name } = mainData;
      setValues({
        ...values,
        name: name,
      });
    }

    return () => {
      setState({
        ...state,
        unmounted: true,
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainData]);

  // 6 =============================== MAIN RENDER =========================

  if (mainQueryLoading || mutationLoading) {
    return <LoaderComponent />;
  }

  return (
    <div>
      {/* breadcum */}
      <div className="block md:flex items-center justify-between px-5 bg-gray-50">
        <div>
          <h1 className="capitalize text-3xl font-medium text-center">
            variation
          </h1>
        </div>
        <div className="">
          <nav className="container text-regular text-xs lg:text-base">
            <ol className="list-reset py-4 pl-4 rounded flex bg-grey-light text-grey">
              <li className="px-2">
                <Link to="#" className="no-underline text-indigo capitalize">
                  home
                </Link>
              </li>
              <li>/</li>
              <li className="px-2">
                <Link to="#" className="no-underline text-indigo capitalize">
                  variation
                </Link>
              </li>
              <li>/</li>
              <li className="px-2 capitalize">add variation</li>
            </ol>
          </nav>
        </div>
      </div>
      {/* form */}
      <h1 className="text-center capitalize my-4 text-xl font-medium">
        add variation
      </h1>

      <div className="mb-4">
        {state.successMessage && (
          <div>
            <ul>
              <div className="px-5">
                <li className="bg-green-500 text-white rounded my-2 text-center grid place-items-center py-3">
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
                <div className="px-5" key={index}>
                  <li
                    className="bg-red-500 text-white rounded my-2 text-center grid place-items-center py-1"
                    key={value}
                  >
                    {value}
                  </li>
                </div>
              ))}
            </ul>
          </div>
        )}
      </div>

      <form onSubmit={onSubmit}>
        <div className="grid grid-cols-1 mx-5 gap-4 lg:grid-cols-2  lg:gap-8">
          <div className="rounded bg-gray-50 shadow px-5 py-5">
            {/* name */}
            <AdminFormInputComponent
              label="name"
              type="text"
              placeholder="name"
              name="name"
              onChange={onChange}
              value={values.name}
              error={state.errors.name}
            />
          </div>
          <div className="rounded bg-gray-50 shadow px-5 py-5">
            <button
              className="bg-green-500 text-white active:bg-teal-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 my-3"
              type="submit"
              style={{ transition: "all .15s ease" }}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminVariationEditPage;
