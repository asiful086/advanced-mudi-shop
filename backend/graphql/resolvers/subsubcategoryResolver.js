const { UserInputError } = require("apollo-server-express");
const Subcategory = require("../../models/subcategoryModel");
const Subsubcategory = require("../../models/subsubcategoryModel");
const { isAdmin } = require("../../utils/checkAuth");
const {
  validateSubsubcategoryInput,
} = require("../../validors/subsubcategoryValidator");

module.exports = {
  Query: {
    async getSubsubcategories() {
      try {
        const subsubcategories = await Subsubcategory.find();
        return subsubcategories;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getSubsubcategory(_, { id }) {
      try {
        const subsubcategory = await Subsubcategory.findById(id);
        return subsubcategory;
      } catch (error) {
        throw new Error(error);
      }
      sub;
    },
  },
  Mutation: {
    // ============================  Create  =============>

    async createSubsubcategory(
      _,
      { input: { name, photo, subcategory } },
      context
    ) {
      // 1. check auth
      const user = isAdmin(context);

      // 2. validate subcategory data
      const { valid, errors } = validateSubsubcategoryInput(
        name,
        photo,
        subcategory
      );

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      // 3. make sure subcategory doesnot exists
      name = name.trim();
      let subsubcategory = await Subsubcategory.findOne({ name });
      if (subsubcategory) {
        throw new UserInputError("This subsubcategory name exists", {
          errors: {
            name: "This name is taken",
          },
        });
      }

      // 4. create a new subcategory
      const newSubsubcategory = new Subsubcategory({
        name,
        subcategory,
      });
      const data = await newSubsubcategory.save();

      // 5. find the subcategory and push subsubcategory into this subcategory
      const updatedSubcategory = await Subcategory.findOne({
        _id: subcategory,
      });
      updatedSubcategory.subsubcategories.push(data);
      await updatedSubcategory.save();

      // 6. finaly return subcategory
      return data;
    },
    // ============================  Update  =============>

    async updateSubsubcategory(
      _,
      { input: { id, name, photo, subcategory } },
      context
    ) {
      // 1. check auth
      const user = isAdmin(context);

      // 2. validate subcategory data
      const { valid, errors } = validateSubsubcategoryInput(
        name,
        photo,
        subcategory
      );
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      // 3. make sure subcategory  exists
      const subsubcategory = await Subsubcategory.findById(id);

      // 4. find parent  and delete that child from that parent
      let parentModel = await Subcategory.findById({
        _id: subsubcategory.variation.id,
      });

      const filteredChildrens = parentModel.subsubcategories.filter(
        (subsubcategory) => subsubcategory.id != id
      );

      parentModel.subsubcategories = filteredChildrens;
      await parentModel.save();

      // 5. update the subsubcategory
      if (subsubcategory) {
        subsubcategory.name = name;
        subsubcategory.photo = photo;
        subsubcategory.subcategory = subcategory;
        const updatedSubsubcategory = await subsubcategory.save();
        // 6. find the subcategory and push subsubcategory into this subcategory
        const updatedSubcategory = await Subcategory.findOne({
          _id: subcategory,
        });
        updatedSubcategory.subsubcategories.push(updatedSubsubcategory);
        await updatedSubcategory.save();

        // 7. finally return it
        return updatedSubsubcategory;
      } else {
        throw new Error("Subsubcategory not found");
      }
    },
    // ============================  Delete  =============>
    async deleteSubsubcategory(_, { id }, context) {
      // 1. check auth
      const user = isAdmin(context);

      try {
        // 2. make sure subcategory doesnot exists
        const subsubcategory = await Subsubcategory.findById(id);
        if (subsubcategory) {
          const deletedSubsubcategory = await subsubcategory.delete();
          return deletedSubsubcategory;
        } else {
          throw new Error("Subsubcategory not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
