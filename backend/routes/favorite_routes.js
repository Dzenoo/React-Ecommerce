const express = require("express");
const favoriteControllers = require("../controllers/favorite-controllers");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("/add", checkAuth, favoriteControllers.addItem);

module.exports = router;
