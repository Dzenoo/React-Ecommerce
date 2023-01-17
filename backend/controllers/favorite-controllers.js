const { default: mongoose } = require("mongoose");
const HttpError = require("../models/http-error");

const User = require("../models/user");
const Fav = require("../models/favorite");

exports.addItem = async (req, res, next) => {
  const { favorite } = req.body;

  const createdFav = new Fav({
    favorite,
    customer: req.userData.userId,
  });

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

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdFav.save({ session: sess });
    user.carts.push(createdFav);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError("Adding to fav failed, please try again.", 500);
    return next(error);
  }

  res.status(200).json({ favorite: createdFav });
};
