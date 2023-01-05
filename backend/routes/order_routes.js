const express = require("express");

const orderController = require("../controllers/order-controllers");
const checkAdmin = require("../middleware/check-admin");

const router = express.Router();

router.get("/", orderController.getOrders);

router.post("/new", orderController.createOrder);

router.delete("/:oid",  orderController.deleteOrder);

module.exports = router;
