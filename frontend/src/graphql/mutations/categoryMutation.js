import { gql } from "@apollo/client";

// ============================= CREATE CATEGORY MUTATION =================>
export const CREATE_CATEGORY = gql`
  mutation createCategory($photo: Upload, $name: String!) {
    createCategory(input: { photo: $photo, name: $name }) {
      id
      name
      photo
      createdAt
    }
  }
`;
// ============================= DELETE CATEGORY MUTATION =================>
export const DELETE_CATEGORY = gql`
  mutation deleteCategory($id: ID!) {
    deleteCategory(id: $id) {
      id
      name
      photo
      createdAt
    }
  }
`;
// ============================= UPDATE CATEGORY MUTATION =================>
export const UPDATE_CATEGORY = gql`
  mutation updateCategory($id: ID!, $name: String!, $photo: Upload) {
    updateCategory(input: { id: $id, name: $name, photo: $photo }) {
      id
      name
      photo
      createdAt
    }
  }
`;
