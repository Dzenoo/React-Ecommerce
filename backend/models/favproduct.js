const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  customer: { type: mongoose.Types.ObjectId, ref: "User", unique: true },
});

module.exports = mongoose.model("Favorite", favoriteSchema);
