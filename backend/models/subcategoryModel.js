const autopopulate = require("mongoose-autopopulate");

const mongoose = require("mongoose");
const { singleImageExist, singleImageDelete } = require("../utils/imageUpload");

const subcategorySchema = mongoose.Schema(
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

// Delete images
subcategorySchema.pre("remove", async function (next) {
  console.log("pre");
  if (this.photo) {
    console.log("inside");
    if (singleImageExist("subcategory", this.photo)) {
      singleImageDelete("subcategory", this.photo);
    }
  }

  next();
});

module.exports = mongoose.model("Subcategory", subcategorySchema);
