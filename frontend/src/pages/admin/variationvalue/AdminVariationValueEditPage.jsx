import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import AdminFormInputComponent from "../../../components/admin/AdminFormInputComponent";
import useForm from "../../../utils/useForm";
import LoaderComponent from "../../../utils/loader/LoaderComponent";
import { removeUser } from "../../../graphql/reactivities/userVariable";
import { UPDATE_VARIATION_VALUE } from "../../../graphql/mutations/variationvalueMutation";
import { GET_VARIATIONS } from "../../../graphql/queries/variationQuery";
import { GET_VARIATION_VALUE } from "../../../graphql/queries/variationvalueQuery";

const AdminVariationValueEditPage = ({ history, match }) => {
  // 1  ============================= COMPONENT STATE =========================

  const [state, setState] = useState({
    errors: [],
    successMessage: "",
    unmounted: false,
  });
  // 2 ================================ CUSTOM HOOKS FOR FORM ====================

  const { onChange, onSubmit, values, setValues } = useForm(
    updateVariationvalueCallback,
    {
      id: match.params.id,
      variation_id: "",
      name: "",
    }
  );
  // 3 =============================== QUERY OPERATION =========================
  const {
    loading: mainQueryLoading,
    data: { getVariationvalue: mainData } = {},
  } = useQuery(GET_VARIATION_VALUE, {
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

  const {
    loading: secondQueryLoading,
    data: { getVariations: variations } = {},
  } = useQuery(GET_VARIATIONS, {
    onError(err) {
      console.log(err);
      console.log(err.graphQLErrors[0]);
      if (err.graphQLErrors[0].extensions.code !== "BAD_USER_INPUT") {
        removeUser(history, "/admin/login");
      }
    },
  });

  // 4 =============================== MUTATION OPERATION =======================
  const [updateVariationvalue, { loading: mutationLoading }] = useMutation(
    UPDATE_VARIATION_VALUE,
    {
      update() {
        history.push("/admin/variationvalue/list");
      },
      onError(err) {
        values.name = "";
        values.variation_id = "";
        console.log(err);
        console.log(err.graphQLErrors[0]);
        if (err.graphQLErrors[0].extensions.code === "BAD_USER_INPUT") {
          setState({
            ...state,
            successMessage: "",
            errors: err.graphQLErrors[0].extensions.exception.errors,
          });
        }
        if (err.graphQLErrors[0].extensions.code !== "BAD_USER_INPUT") {
          removeUser(history, "/admin/login");
        }
      },
      variables: {
        id: values.id,
        name: values.name,
        variation: values.variation_id ? values.variation_id : null,
      },
    }
  );

  function updateVariationvalueCallback() {
    updateVariationvalue();
  }

  // 5 =============================== USE EFFECT FOR UPDATING =========================
  useEffect(() => {
    if (mainData) {
      const { name, variation } = mainData;
      setValues({
        ...values,
        name: name,
        variation_id: variation ? variation.id : "",
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

  if (mainQueryLoading || secondQueryLoading || mutationLoading) {
    return <LoaderComponent />;
  }

  return (
    <div>
      {/* breadcum */}
      <div className="block md:flex items-center justify-between px-5 bg-gray-50">
        <div>
          <h1 className="capitalize text-3xl font-medium text-center">
            variationvalue
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
                  variationvalue
                </Link>
              </li>
              <li>/</li>
              <li className="px-2 capitalize">add variationvalue</li>
            </ol>
          </nav>
        </div>
      </div>
      {/* form */}
      <h1 className="text-center capitalize my-4 text-xl font-medium">
        add variationvalue
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

      {/* <TagSelector selected={selected} /> */}
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

            <label className="py-2 block">Variation</label>
            <select
              className="px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full border"
              placeholder="Regular input"
              name="variation_id"
              onChange={onChange}
              value={values.variation_id}
              error={state.errors.variation_id}
            >
              <option value="" disabled>
                Select variation
              </option>

              {variations.map((variation) => (
                <option value={variation.id} key={variation.id}>
                  {variation.name}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-nonee"></div>
          </div>
          <div className="rounded bg-gray-50 shadow px-5 py-5">
            <button
              className="bg-green-500 text-white active:bg-teal-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 my-3s"
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

export default AdminVariationValueEditPage;
