import { gql } from "@apollo/client";

// ============================= LOGIN MUTATION =================>
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(loginInput: { email: $email, password: $password }) {
      id
      role
      name
      email
      createdAt
      token
    }
  }
`;
// ============================= REGISTER MUTATION =================>
export const REGISTER_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(loginInput: { email: $email, password: $password }) {
      id
      name
      email
      createdAt
      token
    }
  }
`;

// ============================= FORGOT PASSWORD MUTATION =================>

export const FORGOT_PASSWORD_USER = gql`
  mutation forgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`;

// ============================= RESET PASSWORD MUTATION =================>
export const RESET_PASSWORD_USER = gql`
  mutation resetPassword(
    $resetToken: String!
    $password: String!
    $confirmPassword: String!
  ) {
    resetPassword(
      input: {
        resetToken: $resetToken
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      name
      email
      createdAt
      token
    }
  }
`;
