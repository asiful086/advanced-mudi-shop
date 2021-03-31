import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import StripeCheckout from "react-stripe-checkout";
import { GET_ORDER } from "../../graphql/queries/orderQuery";
import { UPDATE_ORDER_TO_PAID } from "../../graphql/mutations/orderMutation";
import LoaderComponent from "../../utils/loader/LoaderComponent";

const BuyerOrderPage = ({ match }) => {
  // 1  ============================= COMPONENT STATE =========================

  const [state, setState] = useState({
    errors: [],
    successMessage: "",
    unmounted: false,
  });

  // 3 =============================== MUTATION OPERATION =======================
  const [updateOrderToPaid, { loading: mutationLoading }] = useMutation(
    UPDATE_ORDER_TO_PAID,
    {
      update(proxy, { data: { updateOrderToPaid: returnedItem } }) {
        if (!state.unmounted) {
          setState({
            ...state,
            errors: [],
            successMessage: "Paid Successfully",
          });
        }
      },
      onError(err) {
        console.log(err);
        if (err.graphQLErrors[0].extensions.code === "BAD_USER_INPUT") {
          setState({
            ...state,
            successMessage: "",
            errors: err.graphQLErrors[0].extensions.exception.errors,
          });
        }
        if (err.graphQLErrors[0].extensions.code !== "BAD_USER_INPUT") {
          console.log(err);
          console.log(err.graphQLErrors[0]);
          //   removeUser(history, "/admin/login");
        }
      },
    }
  );
  // 3 =============================== QUERY OPERATION =========================
  const {
    loading: queryLoading,
    data: { getOrder: returnedItem } = {},
  } = useQuery(GET_ORDER, {
    onError(err) {
      console.log(err);
    },
    variables: {
      id: match.params.id,
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

  if (mutationLoading || queryLoading) {
    return <LoaderComponent />;
  }

  return (
    <div>
      <h1> shipping address</h1>
      <li>{returnedItem.shippingAddress.phone}</li>
      <li>{returnedItem.shippingAddress.address}</li>
      <h1 className="mt-10"> payment method</h1>
      <li>{returnedItem.paymentMethod}</li>

      <hr />
      {returnedItem &&
        returnedItem.orderItems.map((product) => (
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
          </div>
        ))}

      <hr className="my-10" />
      <h1>order summary</h1>
      <div className="my-5">
        <p>
          shipping : <span>{returnedItem.shippingPrice}</span>
        </p>
        <p>
          tax : <span>{returnedItem.taxPrice}</span>
        </p>
        <p>
          total : <span>{returnedItem.totalPrice}</span>
        </p>
      </div>
      {returnedItem.isPaid ? (
        <div className="py-5 px-3 border my-3 bg-green-200">paid</div>
      ) : (
        <div className="py-5 px-3 border my-3 bg-red-200">is not paid</div>
      )}
      {returnedItem.isDelivered ? (
        <div className="py-5 px-3 border my-3 bg-green-200">delivered</div>
      ) : (
        <div className="py-5 px-3 border my-3 bg-red-200">is not delivered</div>
      )}

      <hr />
      {/* <StripeCheckout> make payment</StripeCheckout> */}
      <StripeCheckout
        stripeKey="pk_test_51Ial7RIVHzgcEShqLMCzLUymkuojRtornN22vV0lY2EtlzRTCbQJrSlxlku1qFKQSvlyT0briH6ve70bGIHEatBV008KobHsF6"
        // token={makePayment}
        token={(token) =>
          updateOrderToPaid({
            variables: {
              id: match.params.id,
              email: token.email,
              source: token.id,
            },
          })
        }
        name="Mudi Shop"
        amount={returnedItem.totalPrice * 100}
      ></StripeCheckout>
    </div>
  );
};

export default BuyerOrderPage;
