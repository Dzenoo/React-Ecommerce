const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FavoriteSchema = new Schema({
  favorite: {
     type: Array,
     required: true,
   },
  customer: { type: mongoose.Types.ObjectId, ref: "User" , unique: true},
});

module.exports = mongoose.model("Favorite", FavoriteSchema);
