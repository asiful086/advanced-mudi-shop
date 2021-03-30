import { gql } from "@apollo/client";

// ============================= CREATE  MUTATION =================>
export const CREATE_PRODUCT = gql`
  mutation createProduct(
    $name: String!
    $photo: Upload
    $description: String
    $stock: String
    $qty: String
    $unit: String
    $price: String
    $discountPrice: String
    $category: ID
    $subcategory: ID #$subsubcategory: ID #$variationvalues: [ID]
  ) {
    createProduct(
      input: {
        name: $name
        photo: $photo
        description: $description
        stock: $stock
        qty: $qty
        unit: $unit
        price: $price
        discountPrice: $discountPrice
        category: $category
        subcategory: $subcategory
        #subsubcategory: $subsubcategory
        #variationvalues: $variationvalues
      }
    ) {
      id
      name
      photo
      description
      stock
      qty
      unit
      price
      discountPrice
      totalSell
      createdAt
      category {
        id
      }
      subcategory {
        id
      }
      #variationvalues {
      #id
      #name
      #}
    }
  }
`;
// ============================= DELETE  MUTATION =================>
export const DELETE_PRODUCT = gql`
  mutation deleteProduct($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
      photo
      createdAt
    }
  }
`;
// ============================= UPDATE  MUTATION =================>
export const UPDATE_PRODUCT = gql`
  mutation updateProduct(
    $id: ID!
    $name: String!
    $photo: Upload
    $description: String
    $stock: String
    $qty: String
    $unit: String
    $price: String
    $discountPrice: String
    $category: ID
    $subcategory: ID #$subsubcategory: ID #$variationvalues: [ID]
  ) {
    updateProduct(
      input: {
        id: $id
        name: $name
        photo: $photo
        description: $description
        stock: $stock
        qty: $qty
        unit: $unit
        price: $price
        discountPrice: $discountPrice
        category: $category
        subcategory: $subcategory
        #subsubcategory: $subsubcategory
        #variationvalues: $variationvalues
      }
    ) {
      id
      name
      photo
      description
      stock
      qty
      unit
      price
      discountPrice
      totalSell
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
