// const gql = require("graphql-tag");
const { gql } = require("apollo-server-express");
const { userSchema } = require("./userSchema");
const { categorySchema } = require("./categorySchema");
const { subcategorySchema } = require("./subcategorySchema");
const { subsubcategorySchema } = require("./subsubcategorySchema");
const { variationSchema } = require("./variationSchema");
const { variationvalueSchema } = require("./variationvalueSchema");
const { productSchema } = require("./productSchema");
const { orderSchema } = require("./orderSchema");

module.exports = gql`
  ${userSchema}
  ${categorySchema}
  ${subcategorySchema}
  ${subsubcategorySchema}
  ${variationSchema}
  ${variationvalueSchema}
  ${productSchema}
  ${orderSchema}
  type Query {
    # 1. user
    getUsers: [User!]!

    # 2. category
    getCategories: [Category!]!
    getCategory(id: ID!): Category!

    # 3. subcategory
    getSubcategories: [Subcategory!]!
    getSubcategory(id: ID!): Subcategory!

    # 4. subcategory
    getSubsubcategories: [Subsubcategory!]!
    getSubsubcategory(id: ID!): Subsubcategory!

    # 5. variation
    getVariations: [Variation!]!
    getVariation(id: ID!): Variation!

    # 5. variationvalue
    getVariationvalues: [Variationvalue!]!
    getVariationvalue(id: ID!): Variationvalue!

    # 6. product
    getProducts: [Product!]!
    getProduct(id: ID!): Product!

    # 7. order
    getOrders: [Order!]!
    getOrder(id: ID!): Order!
  }

  type Mutation {
    # 1. user
    register(registerInput: RegisterInput): User!
    login(loginInput: LoginInput): User!
    forgotPassword(email: String!): String!
    resetPassword(input: ResetPasswordInput): User!

    # 2. category
    createCategory(input: CategoryCreateInput): Category!
    updateCategory(input: CategoryUpdateInput): Category!
    deleteCategory(id: ID!): Category!

    # 3. subcategory
    createSubcategory(input: SubcategoryCreateInput): Subcategory!
    updateSubcategory(input: SubcategoryUpdateInput): Subcategory!
    deleteSubcategory(id: ID!): Subcategory!

    # 4. subsubcategory
    createSubsubcategory(input: SubsubcategoryCreateInput): Subsubcategory!
    updateSubsubcategory(input: SubsubcategoryUpdateInput): Subsubcategory!
    deleteSubsubcategory(id: ID!): Subsubcategory!

    # 5. variation
    createVariation(input: VariationCreateInput): Variation!
    updateVariation(input: VariationUpdateInput): Variation!
    deleteVariation(id: ID!): Variation!

    # 5. variationvalue
    createVariationvalue(input: VariationvalueCreateInput): [Variationvalue!]!
    updateVariationvalue(input: VariationvalueUpdateInput): Variationvalue!
    deleteVariationvalue(id: ID!): Variationvalue!

    # 6. product
    createProduct(input: ProductCreateInput): Product!
    updateProduct(input: ProductUpdateInput): Product!
    deleteProduct(id: ID!): Product!

    # 7. order
    createOrder(input: OrderCreateInput): Order!
    updateOrderToPaid(input: OrderUpdateToPaidInput): Order!
    deleteOrder(id: ID!): Order!
  }
`;

// server -> type Query/Mutation  -> resolver
