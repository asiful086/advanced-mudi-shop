import React, { useState, useEffect } from "react";
import moment from "moment";
import { useQuery, useMutation } from "@apollo/client";
import LoaderComponent from "../../../utils/loader/LoaderComponent";
import { removeUser } from "../../../graphql/reactivities/userVariable";
import { Link } from "react-router-dom";
import { GET_VARIATION_VALUES } from "../../../graphql/queries/variationvalueQuery";
import { DELETE_VARIATION_VALUE } from "../../../graphql/mutations/variationvalueMutation";
const AdminVariationValueListPage = ({ history }) => {
  // 1  ============================= COMPONENT STATE =========================
  const [state, setState] = useState({
    errors: [],
    successMessage: "",
  });

  // 2 =============================== QUERY OPERATION =========================
  const {
    loading: queryLoading,
    data: { getVariationvalues: mainDatas } = {},
  } = useQuery(GET_VARIATION_VALUES, {
    onError(err) {
      if (err.graphQLErrors[0].extensions.code !== "BAD_USER_INPUT") {
        removeUser(history, "/admin/login");
      }
    },
  });

  // 3 =============================== MUTATION OPERATION =======================
  const [deleteVariationvalue, { loading: mutationLoading }] = useMutation(
    DELETE_VARIATION_VALUE,
    {
      update(proxy, { data: { deleteVariationvalue: returnedItem } }) {
        if (!state.unmounted) {
          const data = proxy.readQuery({
            query: GET_VARIATION_VALUES,
          });

          if (data) {
            proxy.writeQuery({
              query: GET_VARIATION_VALUES,
              data: {
                getVariationvalues: data.getVariationvalues.filter(
                  (c) => c.id !== returnedItem.id
                ),
              },
            });
          }

          setState({
            ...state,
            errors: [],
            successMessage: "Category Added Successfully",
          });
        }
      },
      onError(err) {
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
    }
  );

  // 4 =============================== USE EFFECT FOR UPDATING =========================

  useEffect(() => {
    return () => {
      setState({
        ...state,
        unmounted: true,
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 5 =============================== MAIN RENDER =========================

  if (queryLoading || mutationLoading) {
    return <LoaderComponent />;
  }

  return (
    <>
      {/* breadcum */}
      <div className="block sm:flex items-center justify-between px-5 bg-gray-50">
        <div>
          <h1 className="capitalize text-3xl font-medium text-center">
            variationvalue
          </h1>
        </div>
        <div className="">
          <nav className="container text-regular text-xs lg:text-base">
            <ol className="list-reset py-4  rounded flex items-center justify-center sm:justify-start bg-grey-light text-grey">
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
      <div className="py-20 px-5">
        <div className="mx-auto container bg-white dark:bg-gray-800 shadow-none sm:shadow rounded ">
          <div className="w-full overflow-x-scroll xl:overflow-x-hidden">
            <table className="min-w-full bg-white dark:bg-gray-800 block sm:table">
              <thead className="hidden sm:table-header-group">
                <tr className="w-full h-16 border-gray-300 dark:border-gray-200 border-b py-8 align-middle text-center">
                  <th className="text-gray-600 dark:text-gray-400 font-normal pr-6  text-sm tracking-normal leading-4 font-medium">
                    Name
                  </th>
                  <th className="text-gray-600 dark:text-gray-400 font-normal pr-6  text-sm tracking-normal leading-4 font-medium">
                    Variation
                  </th>

                  <th className="text-gray-600 dark:text-gray-400 font-normal pr-6  text-sm tracking-normal leading-4 font-medium">
                    Date
                  </th>
                  <td className="text-gray-600 dark:text-gray-400 font-normal pr-8  text-sm tracking-normal leading-4 font-medium">
                    Action
                  </td>
                </tr>
              </thead>
              <tbody className="block sm:table-row-group">
                {mainDatas &&
                  mainDatas.map((mainData) => (
                    <tr
                      key={mainData.id}
                      className="h-auto sm:h-24 border-gray-300 dark:border-gray-200 
                      border  sm:border-0 sm:border-b  align-middle text-center block sm:table-row my-10 sm:my-0"
                    >
                      <td
                        className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4 block sm:table-cell text-right sm:text-center relative py-10 sm:py-0 border-b sm:border-b-0"
                        data-label="Name"
                      >
                        {mainData.name}
                      </td>
                      <td
                        className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4 block sm:table-cell text-right sm:text-center relative py-10 sm:py-0 border-b sm:border-b-0"
                        data-label="Variation"
                      >
                        {mainData.variation && mainData.variation.name}
                      </td>
                      <td
                        className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4 block sm:table-cell
                      text-right sm:text-center relative    py-10 sm:py-0 border-b sm:border-b-0"
                        data-label="Date"
                      >
                        {/* { new Date( subcategory. createdAt) } */}
                        {moment
                          .unix(mainData.createdAt)
                          .subtract(10, "days")
                          .calendar()}
                      </td>
                      <td
                        className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4 block sm:table-cell
                      text-right sm:text-center relative py-10 sm:py-0 border-b sm:border-b-0"
                        data-label="Action"
                      >
                        <button
                          className="mr-2"
                          onClick={() =>
                            window.confirm("Are you sure ?") &&
                            deleteVariationvalue({
                              variables: {
                                id: mainData.id,
                              },
                            })
                          }
                        >
                          {" "}
                          <svg
                            className="w-5 h-5 text-red-500"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>{" "}
                        </button>
                        <Link to={`/admin/variationvalue/edit/${mainData.id}`}>
                          <button className="ml-2">
                            {" "}
                            <svg
                              className="w-5 h-5 text-yellow-500"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>{" "}
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
export default AdminVariationValueListPage;
