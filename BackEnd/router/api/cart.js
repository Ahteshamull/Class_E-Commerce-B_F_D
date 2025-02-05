const express = require("express");
const {
  addToCart,
  singleCart,
  incrementCart,
  decrementCart,
  deleteCartProduct,
} = require("../../controllers/cartController");

const router = express.Router();
//localhost:3000/api/v1/cart/add-to-cart
router.post("/add-to-cart", addToCart);
//localhost:3000/api/v1/cart/single-cart
router.get("/single-cart/:userId", singleCart);
//localhost:3000/api/v1/cart/incrementCart
router.patch("/incrementCart/:cartId", incrementCart);
//localhost:3000/api/v1/cart/decrementCart
router.patch("/decrementCart/:cartId", decrementCart);
//localhost:3000/api/v1/cart/deleteCartProduct
router.delete("/deleteCartProduct/:cartId", deleteCartProduct);

module.exports = router;
