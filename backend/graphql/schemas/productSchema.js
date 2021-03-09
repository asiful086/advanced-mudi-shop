module.exports.productSchema = `
  type Product {
    id: ID!
    name: String!
    description: String!
    totalSell: String!
    stock: String!
    price: String!
    values:[Variationvalue!]!
    discountPrice: String!
    createdAt: String!
    updatedAt: String!
  }
  input ProductInput {
    name: String!
    variationvalue: [ID!]!
  }
`;
