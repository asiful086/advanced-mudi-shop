const autopopulate = require("mongoose-autopopulate");

const mongoose = require("mongoose");

const subcategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    subsubcategories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subsubcategory",
        autopopulate: true,
      },
    ],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      autopopulate: true,
    },
  },
  {
    timestamps: true,
  }
);

subcategorySchema.plugin(autopopulate);

module.exports = mongoose.model("Subcategory", subcategorySchema);
