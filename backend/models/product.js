const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: String, required: true },
  inStock: { type: String, required: true },
  creator: { type: String, required: true },
});

module.exports = mongoose.model("Product", productSchema);
