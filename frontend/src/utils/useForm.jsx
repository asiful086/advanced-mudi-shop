import { useState } from "react";

const useForm = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState);
  const onChange = (event) => {
    // if (
    //   event.target.type === "text" ||
    //   event.target.type === "email" ||
    //   event.target.type === "password"
    // ) {
    //   setValues({ ...values, [event.target.name]: event.target.value });
    // } else {
    //   setValues({
    //     ...values,
    //     [event.target.name]: event.target.files,
    //   });
    // }

    if (event.target.type !== "file") {
      setValues({
        ...values,
        [event.target.name]: event.target.value,
      });
    } else {
      setValues({
        ...values,
        [event.target.name]: event.target.files,
      });
    }
  };



  const onSubmit = (event) => {
    event.preventDefault();
    callback();
  };

  return {
    onChange,
    onSubmit,
    values,
    setValues,
  };
};

export default useForm;
