const categoryResolver = require("./categoryResolver");
const userResolver = require("./userResolver");

module.exports = {
  Query: {
    ...userResolver.Query,
    ...categoryResolver.Query,
  },
  Mutation: {
    ...userResolver.Mutation,
    ...categoryResolver.Mutation,
  },
};
