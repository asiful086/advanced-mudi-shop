module.exports.subsubcategorySchema = `
type Subsubcategory {
    id: ID!
    name: String!
    photo: String
    category: Category
    subcategory: Subcategory
    createdAt: String!
    updatedAt: String!
  }
  input SubsubcategoryCreateInput {
    name: String!
    photo: Upload
    category: ID
    subcategory: ID
  }
  input SubsubcategoryUpdateInput {
    id: ID!
    name: String!
    photo: Upload
    category: ID
    subcategory: ID
  }
`;
