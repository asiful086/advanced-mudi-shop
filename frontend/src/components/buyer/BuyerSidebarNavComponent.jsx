import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";

import { Link } from "react-router-dom";
import LoaderComponent from "../../utils/loader/LoaderComponent";
import { GET_CATEGORIES } from "../../graphql/queries/categoryQuery";

const BuyerSidebarNavComponent = () => {
  // 2 =============================== QUERY OPERATION =========================
  const {
    loading: queryLoading,
    data: { getCategories: categories } = {},
  } = useQuery(GET_CATEGORIES);

  const toggleUrl = (index) => {
    // setState({
    //   ...state,
    //   urls: state.urls.map((url, i) => {
    //     if (i === index) {
    //       url.open = !url.open;
    //     } else {
    //       url.open = false;
    //     }
    //     return url;
    //   }),
    // });
  };

  // 5 =============================== MAIN RENDER =========================

  if (queryLoading) {
    return <LoaderComponent />;
  }

  return (
    <>
      <div className="fixed inset-y-0 left-0 w-64 border-r bg-indigoo-400 hidden md:block">
        <div className="h-full overflow-x-hidden overflow-y-auto">
          <ul>
            <li className="h-16 border-b flex items-center justify-center">
              <h1 className="font-bold italic text-green-400s text-3xl">
                <Link to="/">the beast</Link>
              </h1>
            </li>
          </ul>
          <ul>
            {categories.map((category, i) => (
              <div key={i}>
                <li
                  className="mx-1 rounded  capitalize"
                  onClick={() => toggleUrl(i)}
                >
                  <Link
                    to={`#`}
                    className="inline-block py-4 px-2 w-full flex items-center"
                  >
                    <span className="mr-3">
                      <svg
                        className={`w-5 h-5`}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          //   d={url.icon}
                        />
                      </svg>
                    </span>
                    <span className="mr-auto font-medium text-gray-500">
                      {category.name}
                    </span>

                    <span>
                      <svg
                        className="w-5 h-5 font-medium text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                          // d={`${
                          //   url.open ? "M19 9l-7 7-7-7" : "M9 5l7 7-7 7"
                          // } `}
                        />
                      </svg>
                    </span>
                  </Link>
                </li>
                {/* childrens */}
                <div
                  className={`ml-4 border-l-2 border-indigo-100  ${
                    false ? "block" : "hidden"
                  } `}
                >
                  <ul className="pl-6">
                    {/* {url.childrens.map((child, i) => (
                      <li className="mb-3" key={i}>
                        <Link
                          to={child.to}
                          className="inline-block  w-full flex items-center pr-2"
                        >
                          <span className="mr-auto">{child.name}</span>
                        </Link>
                      </li>
                    ))} */}
                  </ul>
                </div>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default BuyerSidebarNavComponent;
