module.exports.variationSchema = `
type Variation {
    id: ID!
    name: String!
    values: [Variationvalue!]!
    createdAt: String!
    updatedAt: String!
  }
  input VariationInput {
    name: String!
  }
`;
