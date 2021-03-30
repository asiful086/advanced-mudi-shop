import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import AdminFormInputComponent from "../../../components/admin/AdminFormInputComponent";
import useForm from "../../../utils/useForm";
import LoaderComponent from "../../../utils/loader/LoaderComponent";
import { removeUser } from "../../../graphql/reactivities/userVariable";
import { GET_SUBCATEGORIES } from "../../../graphql/queries/subcategoryQuery";
import { GET_CATEGORIES } from "../../../graphql/queries/categoryQuery";
import { UPDATE_SUBSUBCATEGORY } from "../../../graphql/mutations/subsubcategoryMutation";
import { GET_SUBSUBCATEGORY } from "../../../graphql/queries/subsubcategoryQuery";

const AdminSubsubcategoryEditPage = ({ history, match }) => {
  // 1  ============================= COMPONENT STATE =========================

  const [state, setState] = useState({
    errors: [],
    successMessage: "",
    unmounted: false,
  });
  // 2 ================================ CUSTOM HOOKS FOR FORM ====================

  const { onChange, onSubmit, values, setValues } = useForm(
    updateSubsubcategoryCallback,
    {
      id: match.params.id,
      photo: "",
      name: "",
      category_id: "",
      subcategory_id: "",
    }
  );
  // 3 =============================== QUERY OPERATION =========================

  const {
    loading: mainQueryLoading,
    data: { getSubsubcategory: mainData } = {},
  } = useQuery(GET_SUBSUBCATEGORY, {
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
    loading: firstQueryLoading,
    data: { getCategories: categories } = {},
  } = useQuery(GET_CATEGORIES, {
    onError(err) {
      console.log(err);
      console.log(err.graphQLErrors[0]);
      if (err.graphQLErrors[0].extensions.code !== "BAD_USER_INPUT") {
        removeUser(history, "/admin/login");
      }
    },
  });

  const {
    loading: secondQueryLoading,
    data: { getSubcategories: subcategories } = {},
  } = useQuery(GET_SUBCATEGORIES, {
    onError(err) {
      if (err.graphQLErrors[0].extensions.code !== "BAD_USER_INPUT") {
        removeUser(history, "/admin/login");
      }
    },
  });

  // 4 =============================== MUTATION OPERATION =======================
  const [updateSubsubcategory, { loading: mutationLoading }] = useMutation(
    UPDATE_SUBSUBCATEGORY,
    {
      update() {
        history.push("/admin/subsubcategory/list");
      },
      onError(err) {
        values.photo = "";
        values.name = "";
        values.category_id = "";
        values.subcategory_id = "";
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
        photo: values.photo ? values.photo : null,
        name: values.name,
        category: values.category_id ? values.category_id : null,
        subcategory: values.subcategory_id ? values.subcategory_id : null,
      },
    }
  );

  function updateSubsubcategoryCallback() {
    updateSubsubcategory();
  }

  // 5 =============================== USE EFFECT FOR UPDATING =========================
  useEffect(() => {
    if (mainData) {
      const { name, category, subcategory } = mainData;
      setValues({
        ...values,
        name: name,
        category_id: category ? category.id : "",
        subcategory_id: subcategory ? subcategory.id : "",
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

  if (
    mainQueryLoading ||
    firstQueryLoading ||
    secondQueryLoading ||
    mutationLoading
  ) {
    return <LoaderComponent />;
  }

  return (
    <div>
      {/* breadcum */}
      <div className="block md:flex items-center justify-between px-5 bg-gray-50">
        <div>
          <h1 className="capitalize text-3xl font-medium text-center">
            category
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
                  category
                </Link>
              </li>
              <li>/</li>
              <li className="px-2 capitalize">add category</li>
            </ol>
          </nav>
        </div>
      </div>
      {/* form */}
      <h1 className="text-center capitalize my-4 text-xl font-medium">
        add category
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
            {/* categories */}
            <div className="relative inline-block w-full text-gray-700 ">
              <label className="py-2 block">Category</label>
              <select
                className="px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full border"
                placeholder="Regular input"
                name="category_id"
                onChange={onChange}
                value={values.category_id}
                error={state.errors.category}
              >
                <option value="" disabled>
                  Select category
                </option>

                {categories.map((category) => (
                  <option value={category.id} key={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-nonee"></div>
            </div>
          </div>
          <div className="rounded bg-gray-50 shadow px-5 py-5">
            {/* subcategories */}
            <div className="relative inline-block w-full text-gray-700 ">
              <label className="py-2 block">Subcategory</label>
              <select
                className="px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full border"
                placeholder="Regular input"
                name="subcategory_id"
                onChange={onChange}
                value={values.subcategory_id}
                error={state.errors.subcategory}
              >
                <option value="" disabled>
                  Select subcategory
                </option>

                {subcategories
                  .filter(
                    (subcat) =>
                      subcat.category &&
                      subcat.category.id === values.category_id
                  )
                  .map((subcategory) => (
                    <option value={subcategory.id} key={subcategory.id}>
                      {subcategory.name}
                    </option>
                  ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-nonee"></div>
            </div>
            {/* photo */}
            <AdminFormInputComponent
              label="upload photo"
              type="file"
              name="photo"
              onChange={onChange}
              error={state.errors.photo}
            />
            <img
              className={`${values.photo && "block "} `}
              src={
                values.photo
                  ? URL.createObjectURL(values.photo[0])
                  : mainData && `/images/subsubcategory/${mainData.photo}`
              }
              alt=""
            />
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

export default AdminSubsubcategoryEditPage;
