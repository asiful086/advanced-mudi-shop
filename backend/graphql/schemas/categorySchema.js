module.exports.categorySchema = `
type Category {
    id: ID!
    name: String!
    photo: String!
    subcategories: [Subcategory!]!
    createdAt: String!
    updatedAt: String!
  }
  input CategoryCreateInput {
    name: String!
    #photo: Upload!
  }
  input CategoryUpdateInput {
    id: ID!
    name: String!
    #photo: Upload!
  }
`;
