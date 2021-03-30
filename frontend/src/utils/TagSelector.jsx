import React, { useState } from "react";

const TagSelector = (props) => {
  const [tags, setTags] = useState([]);
  const removeTags = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };
  const addTags = (event) => {
    if (event.target.value !== "") {
      setTags([...tags, event.target.value]);
      props.selected([...tags, event.target.value]);
      event.target.value = "";
    }
  };
  return (
    <div className="px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full border my-5">
      <div className="tags-input">
        {tags.map((tag, index) => (
          <div key={index}>
            <div className="bg-blue-900 text-white py-2 rounded flex items-center justify-center ">
              <div className="capitalize">{tag}</div>
              <div>
                <svg
                  onClick={() => removeTags(index)}
                  className="w-5 h-5 ml-3 cursor-pointer"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
      <input
        className="focus:outline-none block w-full"
        type="text"
        placeholder="Press enter to add tags"
        onKeyUp={(e) => (e.key === "Enter" ? addTags(e) : null)}
      />
    </div>
  );
};

export default TagSelector;
