const fs = require("fs");
const path = require("path");
const { UserInputError } = require("apollo-server-express");

const autopopulate = require("mongoose-autopopulate");

const mongoose = require("mongoose");
const { singleImageDelete, singleImageExist } = require("../utils/imageUpload");

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    photo: {
      type: String,
      // required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    subcategories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subcategory",
        autopopulate: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

categorySchema.plugin(autopopulate);

// categorySchema.pre("save", async function (next) {
//   if (!this.isModified("photo")) {
//     console.log("photo is not updated");
//     next();
//   }
//   fs.access(__dirname, `../../public/images/category/${this.photo}`, (err) => {
//     if (err) {
//       console.log("File does not exist.");
//     } else {
//       console.log("File exists.");
//     }
//   });

//   next();
// });

// Delete images
categorySchema.pre("remove", async function (next) {
  if (this.photo) {
    if (singleImageExist("category", this.photo)) {
      singleImageDelete("category", this.photo);
    }
  }

  next();
});

module.exports = mongoose.model("Category", categorySchema);

//  // delete a file
//  fs.unlink(
//   // path.join(
//   //   __dirname,
//   //   `../../public/images/category/${category.photo}`
//   // ),
//   `../../../public/images/category/${category.photo}`,
//   (err) => {
//     if (err) {
//       console.log(err);
//       throw new UserInputError("Photo cant be deleted", {
//         errors: {
//           photo: "Photo cant be deleted",
//         },
//       });
//     }

//     console.log("File is deleted.");
//   }
// );
