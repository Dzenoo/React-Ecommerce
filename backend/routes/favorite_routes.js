const express = require("express");
const favoriteControllers = require("../controllers/favorite-controllers");
const checkAuth = require("../middleware/check-auth");
const { check } = require("express-validator");

const router = express.Router();

router.get("/:uid", favoriteControllers.getItemByUserId);

router.post(
  "/add",
  checkAuth,
  [
    check("title").not().isEmpty(),
    check("image").not().isEmpty(),
    check("price").not().isEmpty(),
  ],
  favoriteControllers.addItem
);

router.delete("/:fid", checkAuth, favoriteControllers.deleteItem);

module.exports = router;
