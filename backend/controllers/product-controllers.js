const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const HttpError = require("../models/http-error");
const Product = require("../models/product");

exports.getProducts = async (req, res, next) => {
  let products;
  try {
    products = await Product.find();
  } catch (err) {
    const error = new HttpError("Ne mogu se pronaci dati artikli", 500);
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
    const error = new HttpError("Ne moze se naci dati artikal ", 500);
    return next(error);
  }

  if (!product) {
    const error = new HttpError(
      "Ne moze se naci dati artikal, nije kreiran",
      404
    );
    return next(error);
  }

  res.json({ product: product.toObject({ getters: true }) });
};

exports.createProduct = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Nevazeci unosi", 422));
  }

    const { title, description, price, inStock, category } = req.body;


  const createdProduct = new Product({
    title,
    description,
    image: "https://www.djaksport.com/image.aspx?imageId=168883",
    price,
    inStock,
  });

  try {
    await createdProduct.save();
  } catch (err) {
    const error = new HttpError(
      "Kreiranje artikla neuspesno, probajte ponovo",
      500
    );
    return next(error);
  }

  res.status(200).json({ product: createdProduct });
};

exports.editProduct = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Nevazeci unosi", 422));
  }

   const { title, description, price, category, inStock } = req.body;

  const productId = req.params.pid;

  let product;
  try {
    product = await Product.findById(productId);
  } catch (err) {
    const error = new HttpError("Izmene neuspesne, probajte ponovo", 500);
    return next(error);
  }

  product.title = title;
   product.description = description;
  product.price = price;
   product.category = category;
  product.inStock = inStock;

  try {
    await product.save();
  } catch (err) {
    const error = new HttpError("Greska pri uredjivanju artikla", 500);
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
    const error = new HttpError(
      "Greska pri brisanju artikla, probajte ponovo",
      500
    );
    return next(error);
  }

  try {
    await product.remove();
  } catch (err) {
    const error = new HttpError("Nije moguce izbrisati artikal", 500);
    return next(error);
  }

  res.status(200).json({ message: "Deleted Product" });
};
