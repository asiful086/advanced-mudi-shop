import { gql } from "@apollo/client";

// ============================= GET CATEGORIES QUERY =================>

export const GET_VARIATION_VALUES = gql`
  {
    getVariationvalues {
      id
      name
      createdAt
      variation {
        id
        name
      }
    }
  }
`;
// ============================= GET CATEGORY QUERY =================>

export const GET_VARIATION_VALUE = gql`
  query getVariationvalue($id: ID!) {
    getVariationvalue(id: $id) {
      id
      name
      createdAt
      variation {
        id
      }
    }
  }
`;
