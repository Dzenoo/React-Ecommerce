const express = require("express");
const favoriteControllers = require("../controllers/favorite-controllers");
const checkAuth = require("../middleware/check-auth");
const { check } = require("express-validator");

const router = express.Router();

router.get("/:uid", favoriteControllers.getItemByUserId);

router.delete("/:fid", favoriteControllers.deleteItem);

router.post(
  "/add",
  checkAuth,
  [
    check("title").notEmpty(),
    check("image").notEmpty(),
    check("price").notEmpty(),
  ],
  favoriteControllers.addItem
);

module.exports = router;
