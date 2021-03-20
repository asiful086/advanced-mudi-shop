module.exports.variationvalueSchema = `
type Variationvalue {
    id: ID!
    name: String!
    variation: Variation
    createdAt: String!
    updatedAt: String!
  }
  input VariationvalueCreateInput {
    name: String!
    variation: ID!
  }
  input VariationvalueUpdateInput {
    id: ID!
    name: String!
    variation: ID!
  }
`;
