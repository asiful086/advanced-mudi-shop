import { gql } from "@apollo/client";

// ============================= CREATE  MUTATION =================>
export const CREATE_SUBCATEGORY = gql`
  mutation createSubcategory($photo: Upload, $name: String!, $category: ID) {
    createSubcategory(
      input: { photo: $photo, name: $name, category: $category }
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
// ============================= DELETE  MUTATION =================>
export const DELETE_SUBCATEGORY = gql`
  mutation deleteSubcategory($id: ID!) {
    deleteSubcategory(id: $id) {
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
export const UPDATE_SUBCATEGORY = gql`
  mutation updateSubcategory(
    $id: ID!
    $name: String!
    $photo: Upload
    $category: ID
  ) {
    updateSubcategory(
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
