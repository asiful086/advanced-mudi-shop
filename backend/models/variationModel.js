const autopopulate = require("mongoose-autopopulate");

const mongoose = require("mongoose");

const variationSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
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
  },
  {
    timestamps: true,
  }
);

variationSchema.plugin(autopopulate);

module.exports = mongoose.model("Variation", variationSchema);
