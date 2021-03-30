import { gql } from "@apollo/client";

// ============================= GET CATEGORIES QUERY =================>

export const GET_VARIATIONS = gql`
  {
    getVariations {
      id
      name
      createdAt
      variationvalues {
        id
        name
      }
    }
  }
`;
// ============================= GET CATEGORY QUERY =================>

export const GET_VARIATION = gql`
  query getVariation($id: ID!) {
    getVariation(id: $id) {
      id
      name
      createdAt
    }
  }
`;
