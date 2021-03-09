const { UserInputError } = require("apollo-server-express");
const Variationvalue = require("../../models/variationvalueModel");
const Variation = require("../../models/variationModel");

const { isAdmin } = require("../../utils/checkAuth");
const {
  validateVariationvalueInput,
} = require("../../validors/variationvalueValidator");

module.exports = {
  Query: {
    async getVariationvalues() {
      try {
        const variationvalues = await Variationvalue.find();
        return variationvalues;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getVariationvalue(_, { id }) {
      try {
        const variationvalue = await Variationvalue.findById(id);
        return variationvalue;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    // ============================  Create  =============>

    async createVariationvalue(_, { input: { name, variation } }, context) {
      // 1. check auth
      const user = isAdmin(context);

      // 2. validate variationvalue data
      const { valid, errors } = validateVariationvalueInput(name, variation);

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      // 3. make sure variationvalue doesnot exists
      name = name.trim();
      let variationvalue = await Variationvalue.findOne({ name });
      if (variationvalue) {
        throw new UserInputError("This variationvalue name exists", {
          errors: {
            name: "This name is taken",
          },
        });
      }

      // 4. create a new variationvalue
      const newVariationvalue = new Variationvalue({
        name,
        variation,
      });
      const data = await newVariationvalue.save();

      // 5. find the variation and push variationvalue into this variation
      const updatedVariation = await Variation.findOne({ _id: variation });
      updatedVariation.variationvalues.push(data);
      await updatedVariation.save();

      // 6. finaly return variationvalue
      return data;
    },
    // ============================  Update  =============>

    async updateVariationvalue(_, { input: { id, name, variation } }, context) {
      // 1. check auth
      const user = isAdmin(context);

      // 2. validate variationvalue  data
      const { valid, errors } = validateVariationvalueInput(name, variation);
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      // 3. make sure variationvalue  exists
      const variationvalue = await Variationvalue.findById(id);
      if (variationvalue) {
        variationvalue.name = name;
        variationvalue.variation = variation;
        const updatedVariationvalue = await variationvalue.save();

        return updatedVariationvalue;
      } else {
        throw new Error("variationvalue not found");
      }
    },
    // ============================  Delete  =============>
    async deleteVariationvalue(_, { id }, context) {
      // 1. check auth
      const user = isAdmin(context);

      try {
        // 2. make sure variationvalue doesnot exists
        const variationvalue = await Variationvalue.findById(id);
        if (variationvalue) {
          const deletedVariationvalue = await variationvalue.delete();
          return deletedVariationvalue;
        } else {
          throw new Error("Variationvalue not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
