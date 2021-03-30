module.exports.productSchema = `
  type Product {
    id: ID!
    name: String!
    photo: String
    description: String
    totalSell: String!
    stock: String!
    qty: String!
    unit: String!
    price: String!
    #variationvalues:[Variationvalue!]!
    discountPrice: String!
    category: Category
    subcategory: Subcategory
    createdAt: String
  }
  input ProductCreateInput {
    name: String!
    photo: Upload
    description: String
    stock: String
    qty: String
    unit: String
    price: String
    discountPrice: String
    category: ID
    subcategory: ID
    #subsubcategory: ID
    #variationvalues: [ID]
  }
  input ProductUpdateInput {
    id: ID!
    name: String!
    photo: Upload
    description: String
    stock: String
    qty: String
    unit: String
    price: String
    discountPrice: String
    category: ID
    subcategory: ID
    #subsubcategory: ID
    #variationvalues: [ID]
  }
`;
