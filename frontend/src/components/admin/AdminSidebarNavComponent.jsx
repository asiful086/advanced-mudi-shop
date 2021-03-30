import React, { useState } from "react";

import { Link } from "react-router-dom";
const AdminSidebarNavComponent = () => {
  const [state, setState] = useState({
    colors: ["red", "green", "yellow", "blue", "indigo", "purple"],
    urls: [
      {
        name: "home",
        icon:
          "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
        to: "/dashboard",
        childrens: [],
        open: false,
      },
      {
        name: "category",
        icon:
          "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z",
        to: "",
        childrens: [
          {
            name: "add category",
            to: "/admin/category/add",
          },
          {
            name: "list category",
            to: "/admin/category/list",
          },
        ],
        open: false,
      },
      {
        name: "subcategory",
        icon:
          "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z",
        to: "",
        childrens: [
          {
            name: "add subcategory",
            to: "/admin/subcategory/add",
          },
          {
            name: "list subcategory",
            to: "/admin/subcategory/list",
          },
        ],
        open: false,
      },
      // {
      //   name: "subsubcategory",
      //   icon:
      //     "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4",
      //   to: "",
      //   childrens: [
      //     {
      //       name: "add subsubcategory",
      //       to: "/admin/subsubcategory/add",
      //     },
      //     {
      //       name: "list subsubcategory",
      //       to: "/admin/subsubcategory/list",
      //     },
      //   ],
      //   open: false,
      // },
      // {
      //   name: "variation",
      //   icon:
      //     "M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z",
      //   to: "",
      //   childrens: [
      //     {
      //       name: "add variation",
      //       to: "/admin/variation/add",
      //     },
      //     {
      //       name: "list variation",
      //       to: "/admin/variation/list",
      //     },
      //   ],
      //   open: false,
      // },
      // {
      //   name: "variationvalue",
      //   icon:
      //     "M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4",
      //   to: "",
      //   childrens: [
      //     {
      //       name: "add variationvalue",
      //       to: "/admin/variationvalue/add",
      //     },
      //     {
      //       name: "list variationvalue",
      //       to: "/admin/variationvalue/list",
      //     },
      //   ],
      //   open: false,
      // },
      {
        name: "product",
        icon:
          "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z",
        to: "/",
        childrens: [
          {
            name: "add product",
            to: "/admin/product/add",
          },
          {
            name: "list product",
            to: "/admin/product/list",
          },
        ],
        open: false,
      },
      {
        icon:
          "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
        name: "api",
        to: "/api",
        childrens: [],
        open: false,
      },
    ],
  });

  const toggleUrl = (index) => {
    setState({
      ...state,
      urls: state.urls.map((url, i) => {
        if (i === index) {
          url.open = !url.open;
        } else {
          url.open = false;
        }

        return url;
      }),
    });
  };

  return (
    <>
      <div className="fixed inset-y-0 left-0 w-64 border-r bg-indigoo-400 hidden md:block">
        <div className="h-full overflow-x-hidden overflow-y-auto">
          <ul>
            <li className="h-16 border-b flex items-center justify-center">
              <h1 className="font-bold italic text-green-400s text-3xl">
                the beast
              </h1>
            </li>
          </ul>
          <ul>
            {state.urls.map((url, i) => (
              <div key={i}>
                <li
                  className="mx-1 rounded  capitalize"
                  onClick={() => toggleUrl(i)}
                >
                  <Link
                    to={`${
                      url.to && url.childrens.length === 0 ? `${url.to}` : "#"
                    }`}
                    className="inline-block py-4 px-2 w-full flex items-center"
                  >
                    <span className="mr-3">
                      <svg
                        className={`w-5 h-5 text-${
                          state.colors[
                            Math.floor(Math.random() * state.colors.length)
                          ]
                        }-600`}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d={url.icon}
                        />
                      </svg>
                    </span>
                    <span className="mr-auto font-medium text-gray-500">
                      {url.name}
                    </span>
                    {url.to && url.childrens.length === 0 ? null : (
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
                            d={`${
                              url.open ? "M19 9l-7 7-7-7" : "M9 5l7 7-7 7"
                            } `}
                          />
                        </svg>
                      </span>
                    )}
                  </Link>
                </li>
                {/* childrens */}
                <div
                  className={`ml-4 border-l-2 border-indigo-100  ${
                    url.open ? "block" : "hidden"
                  } `}
                >
                  <ul className="pl-6">
                    {url.childrens.map((child, i) => (
                      <li className="mb-3" key={i}>
                        <Link
                          to={child.to}
                          className="inline-block  w-full flex items-center pr-2"
                        >
                          <span className="mr-auto">{child.name}</span>
                        </Link>
                      </li>
                    ))}
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

export default AdminSidebarNavComponent;
