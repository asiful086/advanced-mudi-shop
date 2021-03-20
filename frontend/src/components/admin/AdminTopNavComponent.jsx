import React from "react";

const AdminTopNavComponent = () => {
  return (
    <>
      <div className="h-16 bg-white border-b fixed w-full  flex items-center z-10">
        <div className="flex items-center w-full mr-0 md:mr-64 px-5">
          <div className="pr-4">
            <svg
              className="w-5 h-5 font-medium text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>
          <div className="px-4">
            <svg
              className="w-5 h-5 font-medium text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <div className="ml-auto flex items-center">
            <img
              className=" w-8 h-8 rounded-full "
              src="https://randomuser.me/api/portraits/men/10.jpg"
              alt=""
            />
            <span className="capitalize  pl-3 text-sm">john doe</span>
          </div>
        </div>
      </div>
      <div className="h-16"></div>
    </>
  );
};

export default AdminTopNavComponent;
