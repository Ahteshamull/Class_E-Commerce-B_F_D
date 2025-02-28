const express = require("express");
const {
  userOrder,
  paymentSuccess,
  paymentFailed,
  paymentCancel,
} = require("../../controllers/orderController");

const router = express.Router();
//localhost:3000/api/v1/order/user-order
router.post("/user-order", userOrder);
//localhost:3000/api/v1/order/payment/success
router.post("/payment/success/:id", paymentSuccess);
//localhost:3000/api/v1/order/payment/failed
router.post("/payment/failed/:id", paymentFailed);
//localhost:3000/api/v1/order/payment/cancel
router.post("/payment/cancel/:id", paymentCancel);

module.exports = router;
