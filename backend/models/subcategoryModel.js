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

module.exports = mongoose.model("Subcategory", subcategorySchema);

subcategorySchema.pre("save", function (next) {
  console.log("hellolaksdjfl;asjdf lsakdjf lasdkfj aslkdfj asldfj salk");
  console.log(this);

  // const modifiedField = this.getUpdate().$set.field;
  // if (!modifiedField) {
  //     return next();
  // }
  // try {
  //     const newFiedValue = // do whatever...
  //     this.getUpdate().$set.field = newFieldValue;
  //     next();
  // } catch (error) {
  //     return next(error);
  // }
});
