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
  input SubcategoryCreateInput {
    name: String!
    #photo: Upload!
    category: ID!
  }
  input SubcategoryUpdateInput {
    id: ID!
    name: String!
    #photo: Upload!
    category: ID!
  }
`;
