const express = require("express");
const { productController, deleteProduct } = require("../../controllers/productController");
const router = express.Router();
const { errorCheck, upload } = require("../../middleware/imageControlMiddleware");



router.post(
  "/createProduct",
  errorCheck,
  upload.array("image"),
  productController
);
//localhost:3000/api/v1/product/createProduct
//localhost:3000/api/v1/product/deleteProduct/id
router.delete("/deleteProduct/:id", deleteProduct);
module.exports = router;

