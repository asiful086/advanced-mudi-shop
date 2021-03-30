const { UserInputError } = require("apollo-server-express");
const Product = require("../../models/productModel");
const { isAdmin } = require("../../utils/checkAuth");
const {
  singleImageUpload,
  singleImageExist,
  singleImageDelete,
} = require("../../utils/imageUpload");
const { validateProductInput } = require("../../validors/productValidator");

module.exports = {
  Query: {
    async getProducts() {
      try {
        const products = await Product.find().sort({ createdAt: -1 });
        return products;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getProduct(_, { id }) {
      console.log("hello from single product");
      try {
        const product = await Product.findById(id);
        return product;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    // ============================  Create  =============>

    async createProduct(
      _,
      {
        input: {
          name,
          photo,
          description,
          category,
          subcategory,
          // subsubcategory,
          stock,
          qty,
          unit,
          price,
          discountPrice,
          // variationvalues,
        },
      },
      context
    ) {
      // console.log("name", name);
      // console.log("photo", photo);
      // console.log("description", description);
      // console.log("category", category);
      // console.log("subcategory", subcategory);
      // // console.log("subsubcategory", subsubcategory);
      // console.log("stock", stock);
      // console.log("price", price);
      // console.log("discountPrice", discountPrice);
      // // console.log("variationvalues", variationvalues);
      // 1. check auth
      const user = isAdmin(context);

      // 2. validate product data
      const { valid, errors } = validateProductInput(name);

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      // 3. make sure product doesnot exists
      name = name.trim();
      let product = await Product.findOne({ name });
      if (product) {
        throw new UserInputError("This product name exists", {
          errors: {
            name: "This name is taken",
          },
        });
      }

      // 4. create a new product and upload image
      if (photo) {
        photo = await singleImageUpload("product", photo);
      }

      // 5. create a new product
      const newProduct = new Product({
        name,
        photo,
        description,
        category,
        subcategory,
        // subsubcategory,
        stock,
        qty,
        unit,
        price,
        discountPrice,
        // variationvalues,
        user: user.id,
      });
      const data = await newProduct.save();

      // 5. find the subcategory and push subsubcategory into this subcategory
      // const updatedSubcategory = await Subcategory.findOne({
      //   _id: subcategory,
      // });
      // updatedSubcategory.subsubcategories.push(data);
      // await updatedSubcategory.save();

      // 6. finaly return subcategory
      return data;
    },
    // ============================  Update  =============>

    async updateProduct(
      _,
      {
        input: {
          id,
          name,
          photo,
          description,
          category,
          subcategory,
          // subsubcategory,
          stock,
          qty,
          unit,
          price,
          discountPrice,
          // variationvalues,
        },
      },
      context
    ) {
      // 1. check auth
      const user = isAdmin(context);

      // 2. validate product data
      const { valid, errors } = validateProductInput(name);
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      // 3. make sure product  exists
      const product = await Product.findById(id);

      // 4. find parent  and delete that child from that parent
      // let parentModel = await Subcategory.findById({
      //   _id: subsubcategory.variation.id,
      // });

      // const filteredChildrens = parentModel.subsubcategories.filter(
      //   (subsubcategory) => subsubcategory.id != id
      // );

      // parentModel.subsubcategories = filteredChildrens;
      // await parentModel.save();

      // 4. process the image
      if (photo) {
        if (product.photo) {
          if (singleImageExist("product", product.photo)) {
            singleImageDelete("product", product.photo);
          }
        }
        photo = await singleImageUpload("product", photo);
      } else {
        photo = product.photo;
      }

      // 5. update the product
      if (product) {
        product.name = name;
        product.description = description;
        product.stock = stock;
        product.qty = qty;
        product.unit = unit;
        product.price = price;
        product.discountPrice = discountPrice;
        product.photo = photo;
        product.category = category;
        product.subcategory = subcategory;
        const updatedProduct = await product.save();
        // 6. find the subcategory and push subsubcategory into this subcategory
        // const updatedSubcategory = await Subcategory.findOne({
        //   _id: subcategory,
        // });
        // updatedSubcategory.subsubcategories.push(updatedSubsubcategory);
        // await updatedSubcategory.save();

        // 7. finally return it
        return updatedProduct;
      } else {
        throw new Error("Product not found");
      }
    },
    // ============================  Delete  =============>
    async deleteProduct(_, { id }, context) {
      // 1. check auth
      const user = isAdmin(context);

      try {
        // 2. make sure product does exists
        const product = await Product.findById(id);
        if (product) {
          const deletedProduct = await product.delete();
          return deletedProduct;
        } else {
          throw new Error("Product not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
