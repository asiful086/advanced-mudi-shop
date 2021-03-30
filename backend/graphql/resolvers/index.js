const categoryResolver = require("./categoryResolver");
const orderResolver = require("./orderResolver");
const productResolver = require("./productResolver");
const subcategoryResolver = require("./subcategoryResolver");
const subsubcategoryResolver = require("./subsubcategoryResolver");
const userResolver = require("./userResolver");
const variationResolver = require("./variationResolver");
const variationvalueResolver = require("./variationvalueResolver");

module.exports = {
  Query: {
    ...userResolver.Query,
    ...categoryResolver.Query,
    ...subcategoryResolver.Query,
    ...subsubcategoryResolver.Query,
    ...variationResolver.Query,
    ...variationvalueResolver.Query,
    ...productResolver.Query,
    ...orderResolver.Query,
  },
  Mutation: {
    ...userResolver.Mutation,
    ...categoryResolver.Mutation,
    ...subcategoryResolver.Mutation,
    ...subsubcategoryResolver.Mutation,
    ...variationResolver.Mutation,
    ...variationvalueResolver.Mutation,
    ...productResolver.Mutation,
    ...orderResolver.Mutation,
  },
};
