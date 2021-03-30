module.exports.variationSchema = `
type Variation {
    id: ID!
    name: String!
    variationvalues: [Variationvalue]
    createdAt: String!
    updatedAt: String!
  }
  input VariationCreateInput {
    name: String!
  }
  input VariationUpdateInput {
    id: ID!
    name: String!
  }
`;
