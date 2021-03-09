module.exports.categorySchema = `
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
    #photo: Upload!
  }
`;
