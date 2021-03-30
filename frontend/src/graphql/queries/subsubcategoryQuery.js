import { gql } from "@apollo/client";

// ============================= GET ALL QUERY =================>

export const GET_SUBSUBCATEGORIES = gql`
  {
    getSubsubcategories {
      id
      name
      photo
      createdAt
      category {
        id
        name
      }
      subcategory {
        id
        name
      }
    }
  }
`;
// ============================= GET SINGLE QUERY =================>

export const GET_SUBSUBCATEGORY = gql`
  query getSubsubcategory($id: ID!) {
    getSubsubcategory(id: $id) {
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
