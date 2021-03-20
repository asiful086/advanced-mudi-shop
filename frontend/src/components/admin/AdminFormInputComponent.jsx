import React from "react";

const AdminFormInputComponent = ({
  label,
  type,
  placeholder,
  name,
  onChange,
  value,
  error,
  multiple = false,
}) => {
  return (
    <div>
      <div className="w-4/5m m-auto ">
        <label htmlFor={label.replace(/ /g, "")} className="py-2 block">
          {label}
        </label>
        <div className="mb-3s pt-0">
          <input
            className={`px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full border border-${
              error ? "red" : ""
            }-600`}
            id={label.replace(/ /g, "")}
            type={type}
            placeholder={placeholder}
            name={name}
            onChange={onChange}
            value={value}
            error={error}
            multiple={multiple}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminFormInputComponent;
