module.exports.variationvalueSchema = `
type Variationvalue {
    id: ID!
    name: String!
    variation: Variation!
    createdAt: String!
    updatedAt: String!
  }
  input VariationvalueInput {
    name: String!
    variation: ID!
  }
`;
