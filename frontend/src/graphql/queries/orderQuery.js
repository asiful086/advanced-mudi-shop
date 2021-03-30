import { gql } from "@apollo/client";

// ============================= GET ORDERS QUERY =================>

export const GET_ORDERS = gql`
  {
    getOrders {
      id
      paymentMethod
      taxPrice
      shippingPrice
      totalPrice
    }
  }
`;
// ============================= GET ORDER QUERY =================>

export const GET_ORDER = gql`
  query getOrder($id: ID!) {
    getOrder(id: $id) {
      id
      paymentMethod
      taxPrice
      shippingPrice
      totalPrice
    }
  }
`;
