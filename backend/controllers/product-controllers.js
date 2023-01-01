const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");

let DUMMY_PRODUCTS = [
  {
    id: "p1",
    title: "Hoodie Game",
    description: "Dobra dukserica",
    price: 1200,
    inStock: "ne",
  },
  {
    id: "p2",
    title: "Dukserica Game",
    description: "Dobra dukserica",
    price: 1200,
    inStock: "ne",
  },
];

exports.getProducts = (req, res, next) => {
  res.json({ products: DUMMY_PRODUCTS });
};

exports.getProductById = (req, res, next) => {
  const productId = req.params.pid;
  const product = DUMMY_PRODUCTS.find((p) => p.id === productId);

  if (!product) {
    throw new HttpError("Product is not found ", 404);
  }

  res.json({ product });
};

exports.createProduct = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid inputs", 422));
  }

  const { title, description, price, inStock } = req.body;

  const createdProduct = {
    id: Math.random().toString(),
    title,
    description,
    price,
    inStock,
  };

  DUMMY_PRODUCTS.push(createdProduct);

  res.status(200).json({ product: createdProduct });
};

exports.editProduct = (req, res, send) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid inputs", 422));
  }

  const { title, description, price, inStock } = req.body;
  const productId = req.params.pid;

  const updatedProduct = { ...DUMMY_PRODUCTS.find((p) => p.id === productId) };
  const productIndex = DUMMY_PRODUCTS.findIndex((p) => p.id === productId);

  updatedProduct.title = title;
  updatedProduct.description = description;
  updatedProduct.price = price;
  updatedProduct.inStock = inStock;

  DUMMY_PRODUCTS[productIndex] = updatedProduct;

  res.status(200).json({ product: updatedProduct });
};

exports.deleteProduct = (req, res, send) => {
  const productId = req.params.pid;

  if (!DUMMY_PRODUCTS.find((p) => p.id === productId)) {
    throw new HttpError("Ne moze se pronaci product po tom id-u", 404);
  }
  DUMMY_PRODUCTS = DUMMY_PRODUCTS.filter((p) => p.id !== productId);

  res.status(200).json({ message: "Deleted Place" });
};
