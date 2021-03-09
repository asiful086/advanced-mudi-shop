module.exports.subsubcategorySchema = `
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
`;
