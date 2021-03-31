const { UserInputError } = require("apollo-server-express");
const stripe = require("stripe")(
  "sk_test_51Ial7RIVHzgcEShqPOvFBraW05eeH5KF3hmZ6eJZXBJY7jEyUehRcsYqbXXApMrdNTTeeS1kZpuwpZL6KgYBhqOD0087UaH1mq"
);

const { v4: uuidv4 } = require("uuid");
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

    async updateOrderToPaid(_, { input: { id, email, source } }, context) {
      console.log("from update order to paid");
      console.log("id", id);
      console.log("email", email);
      console.log("source", source);

      // 1. check auth
      const user = isBuyer(context);

      const order = await Order.findById(id);

      const idempontencyKey = uuidv4();
      // const idempontencyKey = "uuid()";

      try {
        const customer = await stripe.customers.create({
          email: email,
          source: source,
        });

        if (customer) {
          console.log("customer", customer);
          const newPayment = await stripe.charges.create({
            amount: 499,
            currency: "usd",
            customer: customer.id,
            receipt_email: email,
          });

          console.log("new payment", newPayment);

          if (order) {
            order.isPaid = true;
            order.paidAt = Date.now();

            order.paymentResult = {
              id: newPayment.id,
              status: newPayment.status,
              updateTime: newPayment.created,
              emailAddress: newPayment.receipt_email,
            };

            const updatedOrder = await order.save();
            return updatedOrder;
          } else {
            throw new Error("Order not found");
          }
        }
      } catch (error) {
        console.log(error);
      }

      // return stripe.customers
      //   .create({
      //     email,
      //     source,
      //   })
      //   .then((customer) => {
      //     stripe.charges.create(
      //       {
      //         amount: 203894,
      //         currency: "usd",
      //         customer: customer.id,
      //         receipt_email: email,
      //       },
      //       { idempontencyKey }
      //     );
      //   })
      //   .then((result) => {
      //     return result;
      //   })
      //   .catch((err) => console.log(err));
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
