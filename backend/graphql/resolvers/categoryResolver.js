const { UserInputError } = require("apollo-server-express");
const Category = require("../../models/categoryModel");
const { validateCategoryInput } = require("../../validors/categoryValidator");
const { isAdmin } = require("../../utils/checkAuth");
const {
  singleImageUpload,
  singleImageDelete,
  singleImageExist,
} = require("../../utils/imageUpload");

module.exports = {
  Query: {
    async getCategories() {
      // console.log("hello from categories");
      try {
        const categories = await Category.find().sort({ createdAt: -1 });
        return categories;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getCategory(_, { id }) {
      console.log("hello from single category");
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

    async createCategory(_, { input: { photo, name } }, context) {
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

      // 4. create a new category and upload image
      if (photo) {
        photo = await singleImageUpload("category", photo);
      }
      const newCategory = new Category({
        name,
        photo,
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

      // 4. process the image
      if (photo) {
        if (category.photo) {
          console.log("inside", category.photo);

          if (singleImageExist("category", category.photo)) {
            singleImageDelete("category", category.photo);
          }
        }
        photo = await singleImageUpload("category", photo);
      } else {
        photo = category.photo;
      }

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

// const category = Category.findOneAndUpdate(
//   { _id: id },
//   {
//     name,
//     photo,
//   },
//   null,
//   function (err, docs) {
//     if (err) {
//       throw new Error("Category not found");
//     } else {
//       console.log("Original Doc : ", docs);
//       return docs;
//     }
//   }
// );

// return category;
