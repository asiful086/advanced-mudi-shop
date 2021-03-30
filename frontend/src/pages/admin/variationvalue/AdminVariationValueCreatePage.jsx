import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import useForm from "../../../utils/useForm";
import LoaderComponent from "../../../utils/loader/LoaderComponent";
import { removeUser } from "../../../graphql/reactivities/userVariable";
import TagSelector from "../../../utils/TagSelector";
import { CREATE_VARIATION_VALUE } from "../../../graphql/mutations/variationvalueMutation";
import { GET_VARIATIONS } from "../../../graphql/queries/variationQuery";
import { GET_VARIATION_VALUES } from "../../../graphql/queries/variationvalueQuery";

const AdminVariationValueCreatePage = ({ history }) => {
  // 1  ============================= COMPONENT STATE =========================

  const [state, setState] = useState({
    errors: [],
    successMessage: "",
    unmounted: false,
  });
  // 2 ================================ CUSTOM HOOKS FOR FORM ====================

  const { onChange, onSubmit, values, setValues } = useForm(
    createVariationvalueCallback,
    {
      variation_id: "",
      tags: [],
    }
  );
  // 3 =============================== QUERY OPERATION =========================
  const {
    loading: queryLoading,
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
  const [createVariationvalue, { loading: mutationLoading }] = useMutation(
    CREATE_VARIATION_VALUE,
    {
      update(proxy, { data: { createVariationvalue: item } }) {
        console.log("after create", item);
        if (!state.unmounted) {
          const data = proxy.readQuery({
            query: GET_VARIATION_VALUES,
          });
          if (data) {
            proxy.writeQuery({
              query: GET_VARIATION_VALUES,
              data: {
                getVariationvalues: [...item, ...data.getVariationvalues],
              },
            });
          }
          values.variation_id = "";
          setState({
            ...state,
            errors: [],
            successMessage: "Variation Added Successfully",
          });
        }
      },
      onError(err) {
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
        name: values.tags,
        variation: values.variation_id ? values.variation_id : null,
      },
    }
  );

  function createVariationvalueCallback() {
    createVariationvalue();
  }
  const selected = (tags) => {
    setValues({
      ...values,
      tags: tags,
    });
    // console.log(tags);
  };

  // 5 =============================== USE EFFECT FOR UPDATING =========================
  useEffect(() => {
    return () => {
      setState({
        ...state,
        unmounted: true,
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 6 =============================== MAIN RENDER =========================

  if (queryLoading || mutationLoading) {
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

      <TagSelector selected={selected} />
      <form onSubmit={onSubmit}>
        <div className="grid grid-cols-1 mx-5 gap-4 lg:grid-cols-2  lg:gap-8">
          <div className="rounded bg-gray-50 shadow px-5 py-5">
            {/* <label htmlFor="category_id" className="py-2 block">
                Category
              </label> */}
            <select
              // id="category_id"
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

            {/* <div className="relative inline-block w-full text-gray-700 "></div> */}
          </div>
          <div className="rounded bg-gray-50 shadow px-5 py-5">
            {/* photo */}
            {/* <AdminFormInputComponent
              label="upload photo"
              type="file"
              name="photo"
              onChange={onChange}
              error={state.errors.photo}
            />
            <img
              className={`${values.photo && "block "} `}
              src={values.photo && URL.createObjectURL(values.photo[0])}
              alt=""
            /> */}
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

export default AdminVariationValueCreatePage;
