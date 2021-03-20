const autopopulate = require("mongoose-autopopulate");

const mongoose = require("mongoose");

const subsubcategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    photo: {
      type: String,
      // required: true,
    },

    active: {
      type: Boolean,
      default: true,
    },

    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        autopopulate: true,
      },
    ],

    subcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subcategory",
      autopopulate: true,
    },
  },
  {
    timestamps: true,
  }
);

subsubcategorySchema.plugin(autopopulate);

module.exports = mongoose.model("Subsubcategory", subsubcategorySchema);
