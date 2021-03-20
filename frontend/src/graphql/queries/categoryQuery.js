import { gql } from "@apollo/client";

// ============================= GET CATEGORIES MUTATION =================>

export const GET_CATEGORIES = gql`
  {
    getCategories {
      id
      name
      photo
      createdAt
    }
  }
`;
// ============================= GET CATEGORY MUTATION =================>

export const GET_CATEGORY = gql`
  query getCategory($id: ID!) {
    getCategory(id: $id) {
      id
      name
      photo
      createdAt
    }
  }
`;
