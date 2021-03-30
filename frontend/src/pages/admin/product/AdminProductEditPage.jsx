import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import AdminFormInputComponent from "../../../components/admin/AdminFormInputComponent";
import useForm from "../../../utils/useForm";
import LoaderComponent from "../../../utils/loader/LoaderComponent";
import { removeUser } from "../../../graphql/reactivities/userVariable";
import { GET_SUBCATEGORIES } from "../../../graphql/queries/subcategoryQuery";
import { GET_CATEGORIES } from "../../../graphql/queries/categoryQuery";
import { GET_SUBSUBCATEGORIES } from "../../../graphql/queries/subsubcategoryQuery";
import { GET_VARIATIONS } from "../../../graphql/queries/variationQuery";
import {
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
} from "../../../graphql/mutations/productMutation";
import {
  GET_PRODUCT,
  GET_PRODUCTS,
} from "../../../graphql/queries/productQuery";
// import CheckBoxSelector from "../../../utils/CheckBoxSelector";

const AdminProductEditPage = ({ history, match }) => {
  // 1  ============================= COMPONENT STATE =========================

  const [state, setState] = useState({
    errors: [],
    successMessage: "",
    unmounted: false,
    variationvalues: [],
  });
  // 2 ================================ CUSTOM HOOKS FOR FORM ====================

  const { onChange, onSubmit, values, setValues } = useForm(
    updateProductCallback,
    {
      id: match.params.id,
      name: "",
      photo: "",
      description: "",
      stock: "0",
      quantity: "0",
      unit: "",
      price: "0",
      discountPrice: "0",
      category_id: "",
      subcategory_id: "",
      // subsubcategory_id: "",
      // variationvalues: [],
    }
  );

  // 3 =============================== MUTATION OPERATION =======================
  const [updateProduct, { loading: mutationLoading }] = useMutation(
    UPDATE_PRODUCT,
    {
      update(proxy, { data: { updateProduct: item } }) {
        history.push("/admin/product/list");
      },
      onError(err) {
        values.name = "";
        values.description = "";
        values.photo = "";
        values.stock = "0";
        values.quantity = "0";
        values.unit = "";
        values.price = "0";
        values.discountPrice = "0";
        values.category_id = "";
        values.subcategory_id = "";
        // values.subsubcategory_id = "";
        // values.variationvalues = [];
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
          //   removeUser(history, "/admin/login");
        }
      },
      variables: {
        // ...values,
        id: values.id,
        name: values.name,
        photo: values.photo ? values.photo : null,
        description: values.description ? values.description : null,
        stock: values.stock ? values.stock : "0",
        qty: values.quantity ? values.quantity : "0",
        unit: values.unit ? values.unit : "",
        price: values.price ? values.price : "0",
        discountPrice: values.discountPrice ? values.discountPrice : "0",
        category: values.category_id ? values.category_id : null,
        subcategory: values.subcategory_id ? values.subcategory_id : null,
        // subsubcategory: values.subsubcategory_id
        //   ? values.subsubcategory_id
        //   : null,
        // variationvalues: values.variationvalues,
      },
    }
  );

  function updateProductCallback() {
    updateProduct();
  }

  // 4 =============================== QUERY OPERATION =========================

  const {
    loading: mainQueryLoading,
    data: { getProduct: mainData } = {},
  } = useQuery(GET_PRODUCT, {
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

  // const {
  //   loading: thirdQueryLoading,
  //   data: { getSubsubcategories: subsubcategories } = {},
  // } = useQuery(GET_SUBSUBCATEGORIES, {
  //   onError(err) {
  //     if (err.graphQLErrors[0].extensions.code !== "BAD_USER_INPUT") {
  //       removeUser(history, "/admin/login");
  //     }
  //   },
  // });

  // const {
  //   loading: fourthQueryLoading,
  //   data: { getVariations: variations } = {},
  // } = useQuery(GET_VARIATIONS, {
  //   onError(err) {
  //     if (err.graphQLErrors[0].extensions.code !== "BAD_USER_INPUT") {
  //       removeUser(history, "/admin/login");
  //     }
  //   },
  // });

  //   const getCheckedData = (checkIds) => {
  //     console.log(checkIds);
  //     setValues({
  //       ...values,
  //       variationvalues: checkIds,
  //     });
  //   };

  // const handleCheckBox = (id) => {
  //   const haveThis = values.variationvalues.find((vvid) => vvid === id);
  //   if (haveThis) {
  //     setValues({
  //       ...values,
  //       variationvalues: values.variationvalues.filter((vvid) => vvid !== id),
  //     });
  //   } else {
  //     setValues({
  //       ...values,
  //       variationvalues: [...values.variationvalues, id],
  //     });
  //   }
  // };

  // 5 =============================== USE EFFECT FOR UPDATING =========================
  useEffect(() => {
    if (mainData) {
      const {
        name,
        category,
        subcategory,
        description,
        stock,
        qty,
        unit,
        price,
        discountPrice,
      } = mainData;
      setValues({
        ...values,
        name: name,
        category_id: category ? category.id : "",
        subcategory_id: subcategory ? subcategory.id : "",
        description: description ? description : "",
        stock: stock,
        quantity: qty,
        unit: unit,
        price: price,
        discountPrice: discountPrice,
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
            product
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
                  product
                </Link>
              </li>
              <li>/</li>
              <li className="px-2 capitalize">add product</li>
            </ol>
          </nav>
        </div>
      </div>
      <h1 className="text-center capitalize my-4 text-xl font-medium">
        add product
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

      {/* form */}
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
            {/* description */}
            <AdminFormInputComponent
              label="description"
              type="text"
              placeholder="description"
              name="description"
              onChange={onChange}
              value={values.description}
              error={state.errors.description}
            />
            {/* stock */}
            <AdminFormInputComponent
              label="stock"
              type="text"
              placeholder="stock"
              name="stock"
              onChange={onChange}
              value={values.stock}
              error={state.errors.stock}
            />
            {/* quantity */}
            <AdminFormInputComponent
              label="quantity"
              type="text"
              placeholder="quantity"
              name="quantity"
              onChange={onChange}
              value={values.quantity}
              error={state.errors.quantity}
            />
            {/* unit */}
            <AdminFormInputComponent
              label="unit"
              type="text"
              placeholder="Unit (e.g. KG, Pc etc)"
              name="unit"
              onChange={onChange}
              value={values.unit}
              error={state.errors.unit}
            />
            {/* price */}
            <AdminFormInputComponent
              label="price"
              type="text"
              placeholder="price"
              name="price"
              onChange={onChange}
              value={values.price}
              error={state.errors.price}
            />
            {/* discountPrice */}
            <AdminFormInputComponent
              label="discountPrice"
              type="text"
              placeholder="discountPrice"
              name="discountPrice"
              onChange={onChange}
              value={values.discountPrice}
              error={state.errors.discountPrice}
            />
          </div>
          <div className="rounded bg-gray-50 shadow px-5 py-5">
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
            {/* subcategories */}
            <div className="relative inline-block w-full text-gray-700 ">
              <label className="py-2 block">Subcategory</label>
              <select
                // disabled
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
            {/* subsubcategories */}
            {/* <div className="relative inline-block w-full text-gray-700 ">
              <label className="py-2 block">Subsubcategory</label>
              <select
                // disabled
                className="px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full border"
                placeholder="Regular input"
                name="subsubcategory_id"
                onChange={onChange}
                value={values.subsubcategory_id}
                error={state.errors.subcategory}
              >
                <option value="" disabled>
                  Select subcategory
                </option>

                {subsubcategories
                  .filter(
                    (subsubcat) =>
                      subsubcat.subcategory &&
                      subsubcat.subcategory.id === values.subcategory_id
                  )
                  .map((subsubcategory) => (
                    <option value={subsubcategory.id} key={subsubcategory.id}>
                      {subsubcategory.name}
                    </option>
                  ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-nonee"></div>
            </div> */}
            {/* variation values */}
            {/* <div>
              {variations.map((variation) => (
                <div className="my-5" key={variation.id}>
                  <h3 className="font-bold text-center">{variation.name}</h3>
                  <div className="flex items-center justify-center">
                    {variation.variationvalues.map((vv) => (
                      <div key={vv.id}>
                        <div className="m-5">{vv.name}</div>
                        <input
                          className="block m-auto"
                          onChange={() => handleCheckBox(vv.id)}
                          checked={
                            values.variationvalues.find((id) => id === vv.id)
                              ? true
                              : false
                          }
                          type="checkbox"
                          name=""
                          id=""
                        />
                      </div>
                    ))}
                    
                  </div>
                </div>
              ))}
            </div> */}
            {/* photo */}
            <AdminFormInputComponent
              label="upload photo"
              type="file"
              name="photo"
              onChange={onChange}
              error={state.errors.photo}
            />
            <img
              className="block mt-3"
              src={
                values.photo
                  ? URL.createObjectURL(values.photo[0])
                  : mainData && `/images/product/${mainData.photo}`
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

export default AdminProductEditPage;
