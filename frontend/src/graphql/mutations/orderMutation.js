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
      paymentMethod
      taxPrice
      shippingPrice
      totalPrice
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
export const UPDATE_ORDER = gql`
  mutation updateOrder(
    $id: ID!
    $name: String!
    $photo: Upload
    $category: ID
  ) {
    updateOrder(
      input: { id: $id, name: $name, photo: $photo, category: $category }
    ) {
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
