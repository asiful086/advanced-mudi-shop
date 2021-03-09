// const gql = require("graphql-tag");
const { gql } = require("apollo-server-express");

module.exports = gql`
  # =========================   USER START ======================>
  type User {
    id: ID!
    email: String!
    role: String!
    token: String!
    name: String!
    createdAt: String!
    updatedAt: String!
  }

  input RegisterInput {
    name: String!
    email: String!
    password: String!
    confirmPassword: String!
  }
  input LoginInput {
    email: String!
    password: String!
  }
  # =========================   USER END ======================>
  # =========================   CATEGORY START ======================>
  type Category {
    id: ID!
    name: String!
    photo: String!
    subcategories: [Subcategory!]!
    createdAt: String!
    updatedAt: String!
  }
  input CategoryInput {
    name: String!
    photo: Upload!
  }
  # =========================   CATEGORY END ======================>
  # =========================   SUBCATEGORY START ======================>
  type Subcategory {
    id: ID!
    name: String!
    photo: String!
    category: Category!
    subsubcategories: [Subsubcategory!]!
    createdAt: String!
    updatedAt: String!
  }
  input SubcategoryInput {
    name: String!
    photo: Upload!
    category: ID!
  }
  # =========================   SUBCATEGORY END ======================>
  # =========================   SUBSUBCATEGORY START ======================>
  type Subsubcategory {
    id: ID!
    name: String!
    photo: String!
    subcategory: Subcategory!
    createdAt: String!
    updatedAt: String!
  }
  input SubsubcategoryInput {
    name: String!
    photo: Upload!
    subcategory: ID!
  }
  # =========================   SUBSUBCATEGORY END ======================>
  # =========================   ATTRIBUTE START ======================>
  type Attribute {
    id: ID!
    name: String!
    values: [Attributevalue!]!
    createdAt: String!
    updatedAt: String!
  }
  input AttributeInput {
    name: String!
  }
  # =========================   ATTRIBUTE END ======================>
  # =========================   ATTRIBUTEVALUE START ======================>
  type Attributevalue {
    id: ID!
    name: String!
    attribute: Attribute!
    createdAt: String!
    updatedAt: String!
  }
  input AttributevalueInput {
    name: String!
    attribute: ID!
  }
  # =========================   ATTRIBUTEVALUE END ======================>
  # =========================   PRODUCT START ======================>
  type Product {
    id: ID!
    name: String!
    description: String!
    totalSell: String!
    stock: String!
    price: String!
    values:[Attributevalue!]!
    discountPrice: String!
    createdAt: String!
    updatedAt: String!
  }
  input ProductInput {
    name: String!
    attribute: ID!
  }
  # =========================   PRODUCT END ======================>

  type Query {
    getUsers: [User!]!
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    login(loginInput: LoginInput): User!
  }
`;

// server -> type Query/Mutation  -> resolver
