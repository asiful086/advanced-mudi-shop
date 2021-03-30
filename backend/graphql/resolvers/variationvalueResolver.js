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
        const variationvalues = await Variationvalue.find().sort({
          createdAt: -1,
        });
        return variationvalues;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getVariationvalue(_, { id }) {
      console.log("single value", id);
      try {
        const variationvalue = await Variationvalue.findById(id);
        console.log(variationvalue);
        return variationvalue;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    // ============================  Create  =============>

    async createVariationvalue(_, { input: { name, variation } }, context) {
      console.log("from value", name, variation);
      // 1. check auth
      const user = isAdmin(context);

      // 2. validate variationvalue data
      const { valid, errors } = validateVariationvalueInput(name, variation);

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      let variationValues = [];

      for (value of name) {
        value = value.trim();
        let variationvalue = await Variationvalue.findOne({ name: value });
        if (variationvalue) {
          throw new UserInputError(`${value}  exists already`, {
            errors: {
              name: "This name is taken",
            },
          });
        }

        const newVariationvalue = new Variationvalue({
          name: value,
          variation,
        });
        const data = await newVariationvalue.save();
        variationValues = [...variationValues, data];

        // 5. find the variation and push variationvalue into this variation
        const updatedVariation = await Variation.findOne({ _id: variation });
        updatedVariation.variationvalues.push(data);
        await updatedVariation.save();
      }

      // 3. make sure variationvalue doesnot exists

      // name = name.trim();
      // let variationvalue = await Variationvalue.findOne({ name });
      // if (variationvalue) {
      //   throw new UserInputError("This variationvalue name exists", {
      //     errors: {
      //       name: "This name is taken",
      //     },
      //   });
      // }

      // 4. create a new variationvalue
      // const newVariationvalue = new Variationvalue({
      //   name,
      //   variation,
      // });
      // const data = await newVariationvalue.save();

      // 5. find the variation and push variationvalue into this variation
      // const updatedVariation = await Variation.findOne({ _id: variation });
      // updatedVariation.variationvalues.push(data);
      // await updatedVariation.save();

      // 6. finaly return variationvalue
      return variationValues;
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

      // 3. make sure variationvalue exists
      const variationvalue = await Variationvalue.findById(id);

      // 4. find parent  and delete that child from that parent
      // let parentModel = await Variation.findById({
      //   _id: variationvalue.variation.id,
      // });

      // const filteredChildrens = parentModel.variationvalues.filter(
      //   (variationvalue) => variationvalue.id != id
      // );

      // parentModel.variationvalues = filteredChildrens;
      // await parentModel.save();

      // 5. update the variation value
      if (variationvalue) {
        variationvalue.name = name;
        variationvalue.variation = variation;
        const updatedVariationvalue = await variationvalue.save();

        // 6. find the variation and push variation value to this variation
        // const updatedVariation = await Variation.findOne({ _id: variation });
        // updatedVariation.variationvalues.push(updatedVariationvalue);
        // await updatedVariation.save();
        // 7. finally return it
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
