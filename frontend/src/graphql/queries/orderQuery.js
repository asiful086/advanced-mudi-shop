import { gql } from "@apollo/client";

// ============================= GET ORDERS QUERY =================>

export const GET_ORDERS = gql`
  {
    getOrders {
      id
      user {
        name
      }
      orderItems {
        name
        qty
        photo
        price
        product {
          name
        }
      }
      shippingAddress {
        phone
        address
      }
      paymentResult {
        updateTime
      }
      paymentMethod
      taxPrice
      shippingPrice
      totalPrice
      isPaid
      isDelivered
    }
  }
`;
// ============================= GET ORDER QUERY =================>

export const GET_ORDER = gql`
  query getOrder($id: ID!) {
    getOrder(id: $id) {
      id
      user {
        name
      }
      orderItems {
        name
        qty
        photo
        price
        product {
          name
        }
      }
      shippingAddress {
        phone
        address
      }
      paymentResult {
        updateTime
      }
      paymentMethod
      taxPrice
      shippingPrice
      totalPrice
      isPaid
      isDelivered
    }
  }
`;
