module.exports.userSchema = `
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
`;
