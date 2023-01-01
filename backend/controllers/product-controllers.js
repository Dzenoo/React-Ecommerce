const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const Product = require("../models/product");

exports.getProducts = async (req, res, next) => {
  let products;
  try {
    products = await Product.find();
  } catch (err) {
    const error = new HttpError("Ne mogu se naci ovi artikli", 500);
    return next(error);
  }

  res.json({ products });
};

exports.getProductById = async (req, res, next) => {
  const productId = req.params.pid;

  let product;
  try {
    product = await Product.findById(productId);
  } catch (err) {
    const error = new HttpError("Ne moze se naci artikal uspesno", 500);
    return next(error);
  }

  if (!product) {
    const error = new HttpError("Ne moze se naci artikal uspesno", 404);
    return next(error);
  }

  res.json({ product: product.toObject({ getters: true }) });
};

exports.createProduct = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid inputs", 422));
  }

  const { title, description, price, inStock, creator } = req.body;

  const createdProduct = new Product({
    title,
    description,
    image: "https://www.djaksport.com/image.aspx?imageId=168883",
    price,
    inStock,
    creator,
  });

  try {
    await createdProduct.save();
  } catch (err) {
    const error = new HttpError("Kreiranje neuspesno, probaj ponovo", 500);
    return next(error);
  }

  res.status(200).json({ product: createdProduct });
};

exports.editProduct = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid inputs", 422));
  }

  const { title, description, price, inStock } = req.body;
  const productId = req.params.pid;

  let product;
  try {
    product = await Product.findById(productId);
  } catch (err) {
    const error = new HttpError("Editovanje neuspesno, probaj ponovo", 500);
    return next(error);
  }

  product.title = title;
  product.description = description;
  product.price = price;
  product.inStock = inStock;

  try {
    await product.save();
  } catch (err) {
    const error = new HttpError("Nesto nije u redu", 500);
    return next(error);
  }

  res.status(200).json({ product: product.toObject({ getters: true }) });
};

exports.deleteProduct = async (req, res, send) => {
  const productId = req.params.pid;

  let product;
  try {
    product = await Product.findById(productId);
  } catch (err) {
    const error = new HttpError("Brisanje neuspesno, probaj ponovo", 500);
    return next(error);
  }

  try {
    await product.remove();
  } catch (err) {
    const error = new HttpError("Nesto nije u redu", 500);
    return next(error);
  }

  res.status(200).json({ message: "Deleted Product" });
};
