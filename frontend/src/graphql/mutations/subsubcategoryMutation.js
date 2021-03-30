import { gql } from "@apollo/client";

// ============================= CREATE  MUTATION =================>
export const CREATE_SUBSUBCATEGORY = gql`
  mutation createSubsubcategory(
    $photo: Upload
    $name: String!
    $category: ID
    $subcategory: ID
  ) {
    createSubsubcategory(
      input: {
        photo: $photo
        name: $name
        category: $category
        subcategory: $subcategory
      }
    ) {
      id
      name
      photo
      createdAt
      category {
        id
      }
      subcategory {
        id
      }
    }
  }
`;
// ============================= DELETE  MUTATION =================>
export const DELETE_SUBSUBCATEGORY = gql`
  mutation deleteSubsubcategory($id: ID!) {
    deleteSubsubcategory(id: $id) {
      id
      name
      photo
      createdAt
    }
  }
`;
// ============================= UPDATE  MUTATION =================>
export const UPDATE_SUBSUBCATEGORY = gql`
  mutation updateSubsubcategory(
    $id: ID!
    $name: String!
    $photo: Upload
    $category: ID
    $subcategory: ID
  ) {
    updateSubsubcategory(
      input: {
        id: $id
        name: $name
        photo: $photo
        category: $category
        subcategory: $subcategory
      }
    ) {
      id
      name
      photo
      createdAt
      category {
        id
      }
      subcategory {
        id
      }
    }
  }
`;
