const mongoose = require("mongoose");
const autopopulate = require("mongoose-autopopulate");

const { singleImageExist, singleImageDelete } = require("../utils/imageUpload");

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: String, required: true },
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

const productSchema = mongoose.Schema({
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
  },

  rating: {
    type: String,
    required: true,
    default: "0",
  },

  numReviews: {
    type: String,
    required: true,
    default: "0",
  },

  reviews: [
    {
      name: { type: String, required: true },
      rating: { type: String, required: true },
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
    type: String,
    required: true,
    default: "0",
  },

  discountPrice: {
    type: String,
    required: true,
    default: "0",
  },
  totalSell: {
    type: String,
    required: true,
    default: "0",
  },
  stock: {
    type: String,
    required: true,
    default: "0",
  },
  qty: {
    type: String,
    required: true,
    default: "0",
  },

  unit: {
    type: String,
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
  createdAt: {
    type: Date,
  },

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    autopopulate: true,
  },
  subcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subcategory",
    autopopulate: true,
  },
  // subsubcategory: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  //   ref: "Subsubcategory",
  // },
});
productSchema.plugin(autopopulate);

// Delete images
productSchema.pre("remove", async function (next) {
  if (this.photo) {
    if (singleImageExist("product", this.photo)) {
      singleImageDelete("product", this.photo);
    }
  }

  next();
});

module.exports = mongoose.model("Product", productSchema);
