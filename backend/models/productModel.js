const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    photo: {
      type: String,
      //   required: true,
    },

    description: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      required: true,
      default: 0,
    },

    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },

    reviews: [
      {
        name: { type: String, required: true },
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
        user: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "User",
        },
      },
      {
        timestamps: true,
      },
    ],

    price: {
      type: Number,
      required: true,
      default: 0,
    },

    discountPrice: {
      type: Number,
      required: true,
      default: 0,
    },

    stock: {
      type: Number,
      required: true,
      default: 0,
    },

    totalSell: {
      type: Number,
      required: true,
      default: 0,
    },

    active: {
      type: Boolean,
      default: true,
    },

    variationvalues: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Variationvalue",
        autopopulate: true,
      },
    ],

    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    subsubcategory: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Subsubcategory",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
