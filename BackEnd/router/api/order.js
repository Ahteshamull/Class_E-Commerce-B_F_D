const express = require("express");
const { userOrder } = require("../../controllers/orderController");

const router = express.Router();
//localhost:3000/api/v1/order/user-order
router.post("/user-order",userOrder)

module.exports = router;
