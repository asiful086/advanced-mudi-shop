const { UserInputError } = require("apollo-server-express");
const Variation = require("../../models/variationModel");
const { isAdmin } = require("../../utils/checkAuth");
const { validateVariationInput } = require("../../validors/variationValidator");
module.exports = {
  Query: {
    async getVariations() {
      try {
        const variations = await Variation.find().sort({ createdAt: -1 });
        return variations;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getVariation(_, { id }) {
      try {
        const variation = await Variation.findById(id);
        if (variation) {
          return variation;
        } else {
          throw new Error("Variation not found");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    // ============================  Create  =============>

    async createVariation(_, { input: { name } }, context) {
      // 1. check auth
      const user = isAdmin(context);

      // 2. validate variation data
      const { valid, errors } = validateVariationInput(name);

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      // 3. make sure variation doesnot exists
      name = name.trim();
      let variation = await Variation.findOne({ name });
      if (variation) {
        throw new UserInputError("This variation name exists", {
          errors: {
            name: "This name is taken",
          },
        });
      }

      // 4. create a new variation
      const newVariation = new Variation({
        name,
      });
      const data = await newVariation.save();
      // 5. finaly return it
      return data;
    },
    // ============================  Update  =============>

    async updateVariation(_, { input: { id, name } }, context) {
      console.log("update", id, name);
      // 1. check auth
      const user = isAdmin(context);

      // 2. validate variation data
      const { valid, errors } = validateVariationInput(name);
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      // 3. make sure variation doesnot exists
      const variation = await Variation.findById(id);
      if (variation) {
        variation.name = name;
        const updatedVariation = await variation.save();
        return updatedVariation;
      } else {
        throw new Error("Variation not found");
      }
    },
    // ============================  Delete  =============>
    async deleteVariation(_, { id }, context) {
      // 1. check auth
      const user = isAdmin(context);

      try {
        // 2. make sure variation doesnot exists
        const variation = await Variation.findById(id);
        if (variation) {
          const deletedVariation = await variation.delete();
          return deletedVariation;
        } else {
          throw new Error("Variation not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
