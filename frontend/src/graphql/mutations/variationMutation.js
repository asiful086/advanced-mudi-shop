import { gql } from "@apollo/client";

// ============================= CREATE CATEGORY MUTATION =================>
export const CREATE_VARIATION = gql`
  mutation createVariation($name: String!) {
    createVariation(input: { name: $name }) {
      id
      name
      createdAt
    }
  }
`;
// ============================= DELETE CATEGORY MUTATION =================>
export const DELETE_VARIATION = gql`
  mutation deleteVariation($id: ID!) {
    deleteVariation(id: $id) {
      id
      name
      createdAt
    }
  }
`;
// ============================= UPDATE CATEGORY MUTATION =================>
export const UPDATE_VARIATION = gql`
  mutation updateVariation($id: ID!, $name: String!) {
    updateVariation(input: { id: $id, name: $name }) {
      id
      name
      createdAt
    }
  }
`;
