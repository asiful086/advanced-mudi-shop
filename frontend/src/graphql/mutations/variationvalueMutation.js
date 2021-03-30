import { gql } from "@apollo/client";

// ============================= CREATE  MUTATION =================>
export const CREATE_VARIATION_VALUE = gql`
  mutation createVariationvalue($name: [String!]!, $variation: ID) {
    createVariationvalue(input: { name: $name, variation: $variation }) {
      id
      name
      createdAt
    }
  }
`;
// ============================= DELETE  MUTATION =================>
export const DELETE_VARIATION_VALUE = gql`
  mutation deleteVariationvalue($id: ID!) {
    deleteVariationvalue(id: $id) {
      id
      name
      createdAt
    }
  }
`;
// ============================= UPDATE  MUTATION =================>
export const UPDATE_VARIATION_VALUE = gql`
  mutation updateVariationvalue($id: ID!, $name: String!, $variation: ID) {
    updateVariationvalue(
      input: { id: $id, name: $name, variation: $variation }
    ) {
      id
      name
      createdAt
      variation {
        id
      }
    }
  }
`;
