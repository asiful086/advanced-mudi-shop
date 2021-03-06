// const gql = require("graphql-tag");
const { gql } = require("apollo-server-express");

module.exports = gql`
  type User {
    id: ID!
    email: String!
    role: String!
    #token: String!
    name: String!
    #createdAt: String!
  }
  # input type jodi error asee ai comment er jonno asbe

  input RegisterInput {
    name: String!
    email: String!
    password: String!
    confirmPassword: String!
  }

  type Query {
    getUsers: [User!]!
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
  }
`;

// server -> type Query/Mutation  -> resolver
