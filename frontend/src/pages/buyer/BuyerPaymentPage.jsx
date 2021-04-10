import React, { useState } from "react";
import AdminFormInputComponent from "../../components/admin/AdminFormInputComponent";
import useForm from "../../utils/useForm";

const BuyerPaymentPage = ({ history }) => {
  // 1  ============================= COMPONENT STATE =========================

  const [state, setState] = useState({
    errors: [],
    successMessage: "",
    unmounted: false,
  });
  // 2 ================================ CUSTOM HOOKS FOR FORM ====================

  const { onChange, onSubmit, values } = useForm(createShippingCallback, {
    paymentMethod: localStorage.getItem("paymentMethod")
      ? JSON.parse(localStorage.getItem("paymentMethod")).paymentMethod
      : "Stripe",
  });

  function createShippingCallback() {
    // createShipping();
    localStorage.setItem("paymentMethod", JSON.stringify(values));
    history.push("/placeorder");
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="grid grid-cols-1 mx-5 gap-4 lg:grid-cols-2  lg:gap-8">
          <div className="rounded bg-gray-50 shadow px-5 py-5">
            {/* paymentMethod */}
            Stripe
            <AdminFormInputComponent
              label="paymentMethod"
              type="radio"
              placeholder="paymentMethod"
              name="paymentMethod"
              onChange={onChange}
              value="Stripe"
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

export default BuyerPaymentPage;
