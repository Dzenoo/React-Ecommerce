const express = require("express");
const { check } = require("express-validator");

const productControllers = require("../controllers/product-controllers");
const fileUpload = require("../middleware/file-upload");
const checkAdmin = require("../middleware/check-admin");

const router = express.Router();

router.get("/", productControllers.getProducts);

router.get("/:pid", productControllers.getProductById);

router.post(
  "/new",
  checkAdmin,
  fileUpload.single("image"),
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 6 }),
    check("price").not().isEmpty(),
    check("inStock").not().isEmpty(),
  ],
  productControllers.createProduct
);

router.patch(
  "/:pid",
  checkAdmin,
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 6 }),
    check("price").not().isEmpty(),
    check("inStock").not().isEmpty(),
  ],
  productControllers.editProduct
);

router.delete("/:pid", checkAdmin, productControllers.deleteProduct);

module.exports = router;
