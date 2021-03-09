module.exports.subsubcategorySchema = `
type Subsubcategory {
    id: ID!
    name: String!
    photo: String!
    subcategory: Subcategory!
    createdAt: String!
    updatedAt: String!
  }
  input SubsubcategoryCreateInput {
    name: String!
    #photo: Upload!
    subcategory: ID!
  }
  input SubsubcategoryUpdateInput {
    id: ID!
    name: String!
    #photo: Upload!
    subcategory: ID!
  }
`;
