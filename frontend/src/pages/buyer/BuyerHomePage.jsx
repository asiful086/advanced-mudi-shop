import React from "react";

import { useQuery, useReactiveVar } from "@apollo/client";
import { GET_PRODUCTS } from "../../graphql/queries/productQuery";
import LoaderComponent from "../../utils/loader/LoaderComponent";
import {
  addToCart,
  cartAllPrices,
  cartItems,
  clearCart,
  decreaseItem,
  increaseItem,
  removeToCart,
} from "../../graphql/reactivities/cartVariable";
import { Link } from "react-router-dom";

const BuyerHomePage = () => {
  const cartProducts = useReactiveVar(cartItems);
  const {
    cartItemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = cartAllPrices();
  // 2 =============================== QUERY OPERATION =========================
  const {
    loading: queryLoading,
    data: { getProducts: mainDatas } = {},
  } = useQuery(GET_PRODUCTS);
  if (queryLoading) {
    return <LoaderComponent />;
  }
  return (
    <>
      <div className="grid grid-cols-4 gap-2 place-items-center">
        {mainDatas.map((product) => (
          <div key={product.id}>
            {/* main card */}
            <div className="rounded-tl rounded-tr shadow bg-gray-50n mb-1 relative">
              <span className="inline-block rounded-full text-white bg-red-500 px-2 py-1 text-xs font-bold mr-3 absolute top-3 left-2">
                {product.totalSell > 0 ? product.totalSell : "no sell"}
              </span>
              <div className="w-52">
                <img
                  src={`/images/product/${product.photo}`}
                  alt="product"
                  className="w-full"
                />
              </div>
              <div className="py-2">
                <p className="text-center capitalize text-gray-500 text-xs">
                  {product.name}
                </p>
                <p className="text-center capitalize text-xs font-medium">
                  {product.qty} {product.unit}
                </p>
                <p className="text-center py-2">
                  <span className="font-bold text-green-500 text-xl">
                    ৳ {product.price}
                  </span>
                  <span className="line-through text-gray-500 text-xs">
                    ৳ 400
                  </span>
                </p>
              </div>
            </div>
            {/* add to cart */}
            <div className="rounded-bl rounded-br shadow py-2 text-center border-t">
              <button
                className="capitalize text-xs text-green-500 font-medium"
                onClick={() => addToCart(product)}
              >
                add to cart
              </button>
            </div>
          </div>
        ))}
      </div>

      <hr className="my-5" />
      <div>
        {cartProducts &&
          cartProducts.map((product) => (
            <div className="flex items-center my-5" key={product.id}>
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
            <div
              onClick={() => window.confirm("Are you sure ?") && clearCart()}
            >
              <p>clear the cart</p>
            </div>
            <Link
              to="/shipping"
              className="rounded border border-green-500 px-3 my-5 inline-block"
            >
              proceed to checkout
            </Link>
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
      </div>
    </>
  );
};

export default BuyerHomePage;
