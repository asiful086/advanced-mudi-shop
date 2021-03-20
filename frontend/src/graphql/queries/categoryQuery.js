import { gql } from "@apollo/client";

// ============================= GET CATEGORIES QUERY =================>

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
// ============================= GET CATEGORY QUERY =================>

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
