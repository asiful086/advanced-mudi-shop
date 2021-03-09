const autopopulate = require("mongoose-autopopulate");

const mongoose = require("mongoose");

const variationvalueSchema = mongoose.Schema(
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
    variation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Variation",
      autopopulate: true,
    },
  },
  {
    timestamps: true,
  }
);

variationvalueSchema.plugin(autopopulate);

module.exports = mongoose.model("Variationvalue", variationvalueSchema);
