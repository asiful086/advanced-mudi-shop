import React, { useState } from "react";

const CheckBoxSelector = (props) => {
  const [checkIds, setCheckIds] = useState([]);
  //   const [tags, setTags] = useState([]);

  const handleCheckBox = (id) => {
    const haveThis = checkIds.find((checkId) => checkId === id);
    if (haveThis) {
      setCheckIds(checkIds.filter((checkId) => checkId !== id));
      props.getCheckedData(checkIds.filter((checkId) => checkId !== id));
    } else {
      setCheckIds([...checkIds, id]);
      props.getCheckedData([...checkIds, id]);
    }
  };
  return (
    <>
      {props.items.map((vv) => (
        <div key={vv.id}>
          <div className="m-5">{vv.name}</div>
          <input
            className="block m-auto"
            onChange={() => handleCheckBox(vv.id)}
            checked={checkIds.find((id) => id === vv.id) ? true : false}
            type="checkbox"
          />
        </div>
      ))}
    </>
  );
};

export default CheckBoxSelector;
