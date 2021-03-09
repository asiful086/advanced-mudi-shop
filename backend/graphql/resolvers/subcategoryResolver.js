const { UserInputError } = require("apollo-server-express");
const Category = require("../../models/categoryModel");
const Subcategory = require("../../models/subcategoryModel");
const { isAdmin } = require("../../utils/checkAuth");
const {
  validateSubcategoryInput,
} = require("../../validors/subcategoryValidator");

module.exports = {
  Query: {
    async getSubcategories() {
      try {
        const subcategories = await Subcategory.find();
        return subcategories;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getSubcategory(_, { id }) {
      try {
        const subcategory = await Subcategory.findById(id);
        return subcategory;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    // ============================  Create  =============>

    async createSubcategory(_, { input: { name, photo, category } }, context) {
      // 1. check auth
      const user = isAdmin(context);

      // 2. validate subcategory data
      const { valid, errors } = validateSubcategoryInput(name, photo, category);

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      // 3. make sure subcategory doesnot exists
      name = name.trim();
      let subcategory = await Subcategory.findOne({ name });
      if (subcategory) {
        throw new UserInputError("This subcategory name exists", {
          errors: {
            name: "This name is taken",
          },
        });
      }

      // 4. create a new subcategory
      const newSubcategory = new Subcategory({
        name,
        category,
      });
      const data = await newSubcategory.save();
      // 5. find the category and push subcategory into this category
      const updatedCategory = await Category.findOne({ _id: category });
      updatedCategory.subcategories.push(data);
      await updatedCategory.save();
      // 6. finaly return subcategory
      return data;
    },
    // ============================  Update  =============>

    async updateSubcategory(
      _,
      { input: { id, name, photo, category } },
      context
    ) {
      // 1. check auth
      const user = isAdmin(context);

      // 2. validate subcategory data
      const { valid, errors } = validateSubcategoryInput(name, photo, category);
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      // 3. make sure subcategory doesnot exists
      const subcategory = await Subcategory.findById(id);
      if (subcategory) {
        subcategory.name = name;
        subcategory.photo = photo;
        subcategory.category = category;
        const updatedSubcategory = await subcategory.save();

        // 4. if the input subcategory's doesnot match with database category then  find the category then delete the subcategory push subcategory into this category
        return updatedSubcategory;
      } else {
        throw new Error("Subcategory not found");
      }
    },
    // ============================  Delete  =============>
    async deleteSubcategory(_, { id }, context) {
      // 1. check auth
      const user = isAdmin(context);

      try {
        // 2. make sure subcategory doesnot exists
        const subcategory = await Subcategory.findById(id);
        if (subcategory) {
          const deletedSubcategory = await subcategory.delete();
          return deletedSubcategory;
        } else {
          throw new Error("Subcategory not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
