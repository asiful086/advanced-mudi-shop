const { UserInputError } = require("apollo-server-express");
const Category = require("../../models/categoryModel");
const Order = require("../../models/orderModel");
const Subcategory = require("../../models/subcategoryModel");
const { isAdmin, isBuyer } = require("../../utils/checkAuth");
const {
  singleImageExist,
  singleImageDelete,
  singleImageUpload,
} = require("../../utils/imageUpload");
const {
  validateSubcategoryInput,
} = require("../../validors/subcategoryValidator");

module.exports = {
  Query: {
    async getOrders() {
      try {
        const orders = await Order.find().sort({ createdAt: -1 });
        return orders;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getOrder(_, { id }) {
      try {
        const order = await Order.findById(id);
        return order;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    // ============================  Create  =============>

    async createOrder(
      _,
      {
        input: {
          paymentMethod,
          taxPrice,
          shippingPrice,
          totalPrice,
          shippingAddress,
          orderItems,
        },
      },
      context
    ) {
      console.log("order crediential");
      console.log("paymentMethod", paymentMethod);
      console.log("taxPrice", taxPrice);
      console.log("shippingPrice", shippingPrice);
      console.log("totalPrice", totalPrice);
      console.log("shippingAddress", shippingAddress);
      console.log("orderItems", orderItems);

      // 1. check auth
      const user = isBuyer(context);

      if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error("No order items");
        return;
      } else {
        const order = new Order({
          orderItems,
          user: user.id,
          shippingAddress,
          paymentMethod,
          taxPrice,
          shippingPrice,
          totalPrice,
        });

        const createdOrder = await order.save();

        return createdOrder;
      }
    },
    // ============================  Update  =============>

    async updateOrder(_, { input: { id, name, photo, category } }, context) {
      // console.log("hello from subcategory update", id, name, photo, category);
      // 1. check auth
      const user = isAdmin(context);

      // 2. validate subcategory data
      const { valid, errors } = validateSubcategoryInput(name, photo, category);
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      // 3. make sure subcategory  exists
      const subcategory = await Subcategory.findById(id);

      if (subcategory.category) {
        // 4. find parent  and delete that child from that parent
        let findCat = await Category.findById({ _id: subcategory.category.id });

        const filteredSubcategories = findCat.subcategories.filter(
          (subcategory) => subcategory.id != id
        );

        findCat.subcategories = filteredSubcategories;
        await findCat.save();
      }

      // 5. process the image
      if (photo) {
        if (subcategory.photo) {
          if (singleImageExist("subcategory", subcategory.photo)) {
            singleImageDelete("subcategory", subcategory.photo);
          }
        }
        photo = await singleImageUpload("subcategory", photo);
      } else {
        photo = subcategory.photo;
      }

      // 6. update the subcategory
      if (subcategory) {
        subcategory.name = name;
        subcategory.photo = photo;
        subcategory.category = category;
        const updatedSubcategory = await subcategory.save();

        // 7. find the category and push subcategory into this category
        if (category) {
          console.log(category);
          const updatedCategory = await Category.findOne({ _id: category });
          updatedCategory.subcategories.push(updatedSubcategory);
          await updatedCategory.save();
        }

        // 8. finally return it
        return updatedSubcategory;
      } else {
        throw new Error("Subcategory not found");
      }
    },
    // ============================  Delete  =============>
    async deleteOrder(_, { id }, context) {
      console.log("hello from deletesubcategory", id);
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
