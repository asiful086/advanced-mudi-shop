module.exports.subcategorySchema = `
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
`;
