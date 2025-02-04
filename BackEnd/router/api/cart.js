const express = require("express");
const { addToCart, singleCart } = require("../../controllers/cartController");


const router = express.Router();
//localhost:3000/api/v1/cart/add-to-cart
router.post("/add-to-cart", addToCart);
//localhost:3000/api/v1/cart/single-cart
router.get("/single-cart/:userId", singleCart);

module.exports = router;
