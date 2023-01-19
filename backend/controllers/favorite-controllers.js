const { default: mongoose } = require("mongoose");
const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const fs = require("fs");

const User = require("../models/user");
const Favorite = require("../models/favproduct");

exports.getItemByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  let userFavs;
  try {
    userFavs = await User.findById(userId).populate("favorites");
  } catch (err) {
    const error = new HttpError(
      "Fetching favs failed, please try again later.",
      500
    );
    return next(error);
  }

  if (!userFavs || userFavs.favorites.length === 0) {
    return next(
      new HttpError("Could not find favs for the provided user id.", 404)
    );
  }

  res.json({
    favorites: userFavs.favorites.map((fav) => fav.toObject({ getters: true })),
  });
};

exports.addItem = async (req, res, next) => {
  const { title, image, price } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Nevazeci unosi", 422));
  }

  let user;
  try {
    user = await User.findById(req.userData.userId);
  } catch (err) {
    const error = new HttpError("Adding to fav failed, please try again.", 500);
    return next(error);
  }

  if (!user) {
    const error = new HttpError(
      "Could not find user for this id, please try again.",
      500
    );
    return next(error);
  }

  const createdFav = new Favorite({
    title,
    image,
    price,
    customer: req.userData.userId,
  });

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdFav.save({ session: sess });
    user.favorites.push(createdFav);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError("Adding to fav failed, please try again.", 500);
    return next(error);
  }

  res.status(201).json({ fav: createdFav });
  k;
};

exports.deleteItem = async (req, res, next) => {
  const favoriteId = req.params.fid;

  let favorite;
  try {
    favorite = await Favorite.findById(favoriteId).populate("customer");
  } catch (err) {
    const error = new HttpError("Could not favorite, please try again.", 500);
    return next(error);
  }

  if (!favorite) {
    const error = new HttpError("Could not find favorite for this id.", 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await favorite.remove({ session: sess });
    favorite.customer.favorites.pull(favorite);
    await favorite.customer.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError("Could not delete fav, please try again.", 500);
    return next(error);
  }

  res.json({ message: "Todo deleted..." });
};
