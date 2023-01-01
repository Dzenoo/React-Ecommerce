const express = require("express");
const { check } = require("express-validator");

const productControllers = require("../controllers/product-controllers");

const router = express.Router();

router.get("/", productControllers.getProducts);

router.get("/:pid", productControllers.getProductById);

router.post(
  "/new",
  [
    check("title").not().isEmpty(),
    check("description").not().isLength({ min: 20 }),
    check("price").not().isEmpty(),
    check("inStock").not().isEmpty(),
  ],
  productControllers.createProduct
);

router.patch(
  "/:pid",
  [
    check("title").not().isEmpty(),
    check("description").not().isLength({ min: 20 }),
    check("price").not().isEmpty(),
    check("inStock").not().isEmpty(),
  ],
  productControllers.editProduct
);

router.delete("/:pid", productControllers.deleteProduct);

module.exports = router;
