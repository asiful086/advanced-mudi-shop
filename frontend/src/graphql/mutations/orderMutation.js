import { gql } from "@apollo/client";

// ============================= CREATE  MUTATION =================>
export const CREATE_ORDER = gql`
  mutation createOrder(
    $paymentMethod: String
    $taxPrice: String
    $shippingPrice: String
    $totalPrice: String
    $shippingAddress: ShippingCreateInput
    $orderItems: [OrderItemCreateInput]
  ) {
    createOrder(
      input: {
        paymentMethod: $paymentMethod
        taxPrice: $taxPrice
        shippingPrice: $shippingPrice
        totalPrice: $totalPrice
        shippingAddress: $shippingAddress
        orderItems: $orderItems
      }
    ) {
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
// ============================= DELETE  MUTATION =================>
export const DELETE_ORDER = gql`
  mutation deleteOrder($id: ID!) {
    deleteOrder(id: $id) {
      id
      name
      photo
      createdAt
      category {
        id
      }
    }
  }
`;
// ============================= UPDATE  MUTATION =================>
export const UPDATE_ORDER_TO_PAID = gql`
  mutation updateOrderToPaid($id: ID, $email: String, $source: ID) {
    updateOrderToPaid(input: { id: $id, email: $email, source: $source }) {
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
