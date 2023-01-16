const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CartSchema = new Schema({
  items: {
    favorite: {
      type: Array,
      required: true,
    },
  },
  customer: { type: mongoose.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Favorite", CartSchema);
