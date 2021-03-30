import React, { useEffect, useState } from "react";
import { useReactiveVar, useMutation } from "@apollo/client";
import {
  cartItems,
  clearCart,
  cartAllPrices,
  decreaseItem,
  increaseItem,
  removeToCart,
} from "../../graphql/reactivities/cartVariable";
import { GET_ORDERS } from "../../graphql/queries/orderQuery";
import { CREATE_ORDER } from "../../graphql/mutations/orderMutation";
import LoaderComponent from "../../utils/loader/LoaderComponent";

const BuyerPlaceOrderPage = () => {
  // 1  ============================= COMPONENT STATE =========================

  const [state, setState] = useState({
    errors: [],
    successMessage: "",
    unmounted: false,
  });
  const cartProducts = useReactiveVar(cartItems);

  const {
    cartItemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = cartAllPrices();

  // 3 =============================== MUTATION OPERATION =======================
  const [createOrder, { loading }] = useMutation(CREATE_ORDER, {
    update(proxy, { data: { createOrder: returnedItem } }) {
      console.log(returnedItem);
      if (!state.unmounted) {
        const data = proxy.readQuery({
          query: GET_ORDERS,
        });

        if (data) {
          proxy.writeQuery({
            query: GET_ORDERS,
            data: {
              getOrders: [returnedItem, ...data.getOrders],
            },
          });
        }

        setState({
          ...state,
          errors: [],
          successMessage: "Order Added Successfully",
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
        // console.log("from server error");
        // removeUser(history, "/admin/login");
      }
    },
  });

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

  if (loading) {
    return <LoaderComponent />;
  }

  return (
    <div>
      <h1> shipping address</h1>
      <li>
        {localStorage.getItem("shippingAddress")
          ? JSON.parse(localStorage.getItem("shippingAddress")).phone
          : ""}
      </li>
      <li>
        {localStorage.getItem("shippingAddress")
          ? JSON.parse(localStorage.getItem("shippingAddress")).address
          : ""}
      </li>
      <h1 className="mt-10"> payment method</h1>
      <li>
        {localStorage.getItem("paymentMethod")
          ? JSON.parse(localStorage.getItem("paymentMethod")).paymentMethod
          : ""}
      </li>

      <hr />
      {cartProducts &&
        cartProducts.map((product) => (
          <div className="flex items-center my-5" key={product.id}>
            {console.log(
              "hello",
              cartProducts.map((item) => {
                const { name, count, photo, price, id } = item;
                return {
                  name,
                  qty: count,
                  photo,
                  price,
                  product: id,
                };
              })
            )}
            <div>{product.name}</div>
            <div>
              {" "}
              <img
                src={`/images/product/${product.photo}`}
                alt="product"
                className="w-16"
              />
            </div>
            <div>{product.count}</div>
            <div
              className="text-red-500 pl-10"
              onClick={() => removeToCart(product)}
            >
              x
            </div>
            <div
              className="text-red-500 pl-10"
              onClick={() => increaseItem(product)}
            >
              +
            </div>
            <div
              className="text-red-500 pl-10"
              onClick={() => decreaseItem(product)}
            >
              -
            </div>
          </div>
        ))}
      {cartProducts.length !== 0 && (
        <>
          <div onClick={() => window.confirm("Are you sure ?") && clearCart()}>
            <p>clear the cart</p>
          </div>
        </>
      )}
      <hr className="my-10" />
      <h1>order summary</h1>
      <div className="my-5">
        <p>
          items : <span>{cartItemsPrice}</span>
        </p>
        <p>
          shipping : <span>{shippingPrice}</span>
        </p>
        <p>
          tax : <span>{taxPrice}</span>
        </p>
        <p>
          total : <span>{totalPrice}</span>
        </p>
      </div>

      <hr />
      <button
        className="px-5 border border-green-500 inline-block mb-10"
        onClick={() =>
          createOrder({
            variables: {
              paymentMethod: "Stripe",
              taxPrice,
              shippingPrice,
              totalPrice,

              shippingAddress: {
                phone: JSON.parse(localStorage.getItem("shippingAddress"))
                  .phone,
                address: JSON.parse(localStorage.getItem("shippingAddress"))
                  .address,
              },

              orderItems: cartProducts.map((item) => {
                const { name, count, photo, price, id } = item;
                return {
                  name,
                  qty: count.toString(),
                  photo,
                  price,
                  product: id,
                };
              }),
            },
          })
        }
      >
        {" "}
        place order
      </button>
    </div>
  );
};

export default BuyerPlaceOrderPage;
