const { UserInputError } = require("apollo-server-express");
const Category = require("../../models/categoryModel");
const { validateCategoryInput } = require("../../validors/categoryValidator");
const { isAdmin } = require("../../utils/checkAuth");
module.exports = {
  Query: {
    async getCategories() {
      try {
        const categories = await Category.find();
        return categories;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getCategory(_, { id }) {
      try {
        const category = await Category.findById(id);
        return category;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    // ============================  Create  =============>

    async createCategory(_, { input: { name, photo } }, context) {
      // 1. check auth
      const user = isAdmin(context);

      // 2. validate category data
      const { valid, errors } = validateCategoryInput(name, photo);

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      // 3. make sure category doesnot exists
      name = name.trim();
      let category = await Category.findOne({ name });
      if (category) {
        throw new UserInputError("This category name exists", {
          errors: {
            name: "This name is taken",
          },
        });
      }

      // 4. create a new category
      const newCategory = new Category({
        name,
      });
      const data = await newCategory.save();
      // 5. finaly return it
      return data;
    },
    // ============================  Update  =============>

    async updateCategory(_, { input: { id, name, photo } }, context) {
      // 1. check auth
      const user = isAdmin(context);

      // 2. validate category data
      const { valid, errors } = validateCategoryInput(name, photo);
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      // 3. make sure category doesnot exists
      const category = await Category.findById(id);
      if (category) {
        category.name = name;
        category.photo = photo;
        const updatedCategory = await category.save();
        return updatedCategory;
      } else {
        throw new Error("Category not found");
      }
    },
    // ============================  Delete  =============>
    async deleteCategory(_, { id }, context) {
      // 1. check auth
      const user = isAdmin(context);

      try {
        // 2. make sure category doesnot exists
        const category = await Category.findById(id);
        if (category) {
          const deletedCategory = await category.delete();
          return deletedCategory;
        } else {
          throw new Error("Category not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
