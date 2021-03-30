import React, { useState } from "react";
import AdminFormInputComponent from "../../components/admin/AdminFormInputComponent";
import useForm from "../../utils/useForm";

const BuyerShippingPage = ({ history }) => {
  // 1  ============================= COMPONENT STATE =========================

  const [state, setState] = useState({
    errors: [],
    successMessage: "",
    unmounted: false,
  });
  // 2 ================================ CUSTOM HOOKS FOR FORM ====================

  const { onChange, onSubmit, values } = useForm(createShippingCallback, {
    phone: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress")).phone
      : "",
    address: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress")).address
      : "",
  });

  function createShippingCallback() {
    // createShipping();
    localStorage.setItem("shippingAddress", JSON.stringify(values));
    history.push("/payment");
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="grid grid-cols-1 mx-5 gap-4 lg:grid-cols-2  lg:gap-8">
          <div className="rounded bg-gray-50 shadow px-5 py-5">
            {/* phone */}
            <AdminFormInputComponent
              label="phone"
              type="text"
              placeholder="phone"
              name="phone"
              onChange={onChange}
              value={values.phone}
              error={state.errors.phone}
            />
            {/* address */}
            <AdminFormInputComponent
              label="address"
              type="text"
              placeholder="address"
              name="address"
              onChange={onChange}
              value={values.address}
              error={state.errors.address}
            />
            <button
              className="bg-green-500 text-white active:bg-teal-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 my-3"
              type="submit"
              style={{ transition: "all .15s ease" }}
            >
              Continue
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BuyerShippingPage;
