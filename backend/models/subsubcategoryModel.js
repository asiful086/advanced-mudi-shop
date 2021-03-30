const autopopulate = require("mongoose-autopopulate");

const mongoose = require("mongoose");
const { singleImageExist, singleImageDelete } = require("../utils/imageUpload");

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

    // products: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Product",
    //     autopopulate: true,
    //   },
    // ],

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
  },
  {
    timestamps: true,
  }
);

subsubcategorySchema.plugin(autopopulate);

// Delete images
subsubcategorySchema.pre("remove", async function (next) {
  if (this.photo) {
    if (singleImageExist("subsubcategory", this.photo)) {
      singleImageDelete("subsubcategory", this.photo);
    }
  }

  next();
});

module.exports = mongoose.model("Subsubcategory", subsubcategorySchema);
