const express = require("express");

const orderController = require("../controllers/order-controllers");
const checkAdmin = require("../middleware/check-admin");

const router = express.Router();

router.get("/", orderController.getOrders);

router.post("/new", checkAdmin, orderController.createOrder);

router.delete("/:oid", checkAdmin, orderController.deleteOrder);

module.exports = router;
