const autopopulate = require("mongoose-autopopulate");

const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      // unique: true,
    },
    photo: {
      type: String,
      // required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    // subcategories: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Subcategory",
    //     autopopulate: true,
    //   },
    // ],
  },
  {
    timestamps: true,
  }
);

categorySchema.plugin(autopopulate);

module.exports = mongoose.model("Category", categorySchema);
