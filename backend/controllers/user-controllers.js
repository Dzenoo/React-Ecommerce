const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");

let DUMMY_USERS = [
  {
    id: "u1",
    email: "dg@gmail.com",
    name: "Dzenis",
    password: "123123",
    isAdmin: true,
  },

  {
    id: "u2",
    email: "dsdg@gmail.com",
    name: "Cima",
    password: "123123",
    isAdmin: false,
  },
];

exports.getUsers = (req, res, next) => {
  res.json({ DUMMY_USERS });
};

exports.signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { name, email, password, isAdmin } = req.body;

  const createdUser = {
    id: Math.random().toString(),
    name,
    email,
    password,
    isAdmin: isAdmin || false,
  };

  DUMMY_USERS.push(createdUser);

  res.status(201).json({ createdUser });
};

exports.login = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid email or password , please check your data.", 422)
    );
  }

  const { email, password } = req.body;

  const identifiedUser = DUMMY_USERS.find((u) => u.email === email);
  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError("User se ne moze identifikovati greska");
  }

  res.json({ message: "Ulogovan si" });
};
