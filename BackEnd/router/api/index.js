const express = require("express");
const router = express.Router();
const auth = require("./auth");
const category = require("./category");
const product = require("./product");
const store = require("./store");
const cart = require("./cart");
const order = require("./order");
const banner = require("./banner");

//localhost:3000/api/v1/auth/
http: router.use("/auth", auth);
//localhost:3000/api/v1/category/
http: router.use("/category", category);
//localhost:3000/api/v1/product/
http: router.use("/product", product);
//localhost:3000/api/v1/store/
http: router.use("/store", store);
//localhost:3000/api/v1/cart/
http: router.use("/cart", cart);
//localhost:3000/api/v1/order/
http: router.use("/order", order);
//localhost:3000/api/v1/banner/
http: router.use("/banner", banner);

module.exports = router;
