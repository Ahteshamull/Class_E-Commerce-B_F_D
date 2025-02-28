const express = require("express");
const { userOrder, paymentSuccess, paymentFailed } = require("../../controllers/orderController");

const router = express.Router();
//localhost:3000/api/v1/order/user-order
router.post("/user-order",userOrder)
//localhost:3000/api/v1/order/payment/success
router.post("/payment/success", paymentSuccess);
//localhost:3000/api/v1/order/payment/failed
router.post("/payment/failed", paymentFailed);

module.exports = router;
