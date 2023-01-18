const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
    return next(new HttpError("Nevazeci unosi", 422));
  }

  const { name, email, password } = req.body;

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

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError("Korisnik se ne moze kreirati ", 500);
    return next(error);
  }

  const createdUser = new User({
    name,
    email,
    password: hashedPassword,
    isAdmin: false,
    favorites: [],
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

  let token;
  try {
    token = jwt.sign(
      {
        userId: createdUser.id,
        email: createdUser.email,
        name: createdUser.name,
        isAdmin: createdUser.isAdmin,
      },
      process.env.JWTSTR,
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new HttpError(
      "Registrovanje neuspesno, probajte ponovo",
      500
    );
    return next(error);
  }

  res
    .status(201)
    .json({ userId: createdUser.id, email: createdUser.email, token: token });
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Prijavljivanje neuspesno", 500);
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError(
      "Prijavljivanje neuspesno, netacni podaci",
      500
    );
    return next(error);
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError(
      "Prijavljivanje neuspesno, netacni podaci",
      500
    );
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError(
      "Prijavljivanje neuspesno, netacni podaci",
      500
    );
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      {
        userId: existingUser.id,
        email: existingUser.email,
        name: existingUser.name,
        isAdmin: existingUser.isAdmin,
      },
      process.env.JWTSTR,
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new HttpError(
      "Prijavljivanje neuspesno, probajte ponovo",
      500
    );
    return next(error);
  }

  res.json({
    userId: existingUser.id,
    email: existingUser.email,
    isAdmin: existingUser.isAdmin,
    token: token,
  });
};
