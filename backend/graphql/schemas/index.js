// const gql = require("graphql-tag");
const { gql } = require("apollo-server-express");
const { userSchema } = require("./userSchema");
const { categorySchema } = require("./categorySchema");
const { subcategorySchema } = require("./subcategorySchema");
const { subsubcategorySchema } = require("./subsubcategorySchema");
const { variationSchema } = require("./variationSchema");
const { variationvalueSchema } = require("./variationvalueSchema");
const { productSchema } = require("./productSchema");

module.exports = gql`
  ${userSchema}
  ${categorySchema}
  ${subcategorySchema}
  ${subsubcategorySchema}
  ${variationSchema}
  ${variationvalueSchema}
  ${productSchema}
  type Query {
    #user
    getUsers: [User!]!
    #category
    getCategories: [Category!]!
    getCategory(id: ID!): Category!
  }

  type Mutation {
    #user
    register(registerInput: RegisterInput): User!
    login(loginInput: LoginInput): User!
    #category
    createCategory(categoryInput: CategoryInput): Category!
    updateCategory(categoryInput: CategoryInput): Category!
    deleteCategory(id: ID!): Category!
  }
`;

// server -> type Query/Mutation  -> resolver
