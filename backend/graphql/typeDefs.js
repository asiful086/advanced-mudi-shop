const gql = require("graphql-tag");

module.exports = gql`
  

  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }
  # input type jodi error asee ai comment er jonno asbe

  input RegisterInput {
    username: String!
    email: String!
    password: String!
    confirmPassword: String!
  }

  type Query {
    getUsers: [User]
  }
  
 #type Mutation {
  
  #}
`;

// server -> type Query/Mutation  -> resolver
