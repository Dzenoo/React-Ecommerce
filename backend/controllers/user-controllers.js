const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const User = require("../models/user");

exports.getUsers = async (req, res, next) => {
  // Find user without password
  let users;

  try {
    users = await User.find({}, "-password");
  } catch (err) {
    const error = new HttpError("Greska pri nalazenju korisnika ", 500);
    return next(error);
  }

  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Nevazeci unosi su prazni", 422));
  }

  const { name, email, password, isAdmin } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Registrovanje neuspesno", 500);
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError("Korisnik je vec kreiran ", 422);
    return next(error);
  }

  const createdUser = new User({
    name,
    email,
    password,
    isAdmin,
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError(
      "Registrovanje neuspesno, probajte ponovo",
      500
    );
    return next(error);
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

exports.login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Netacni mail ili lozinka , proverite svoje podatke", 422)
    );
  }

  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Ulogovanje neuspesno", 500);
    return next(error);
  }

  if (!existingUser || existingUser.password !== password) {
    const error = new HttpError("Ulogovanje neuspesno, netacni podaci", 500);
    return next(error);
  }

  res.json({ message: "Uspesno Ulogovani" });
};
