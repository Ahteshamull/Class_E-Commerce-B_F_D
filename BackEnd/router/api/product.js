const express = require("express");
const {
  productController,
  deleteProduct,
  updateProduct,
  allProduct,
  singleProduct,
} = require("../../controllers/productController");
const router = express.Router();
const {
  errorCheck,
  upload,
} = require("../../middleware/imageControlMiddleware");
const authMiddleware = require("../../middleware/authMiddleware");

//localhost:3000/api/v1/product/createProduct
router.post(
  "/createProduct",
  authMiddleware,
  errorCheck,
  upload.array("image"),
  productController
);

//localhost:3000/api/v1/product/deleteProduct/id
router.delete("/deleteProduct/:id", authMiddleware, deleteProduct);
//localhost:3000/api/v1/product/updateProduct/id
router.patch(
  "/updateProduct/:id",
  authMiddleware,
  upload.array("image"),
  errorCheck,
  updateProduct
);
//localhost:3000/api/v1/product/allProduct
router.get("/allProduct", allProduct);
//localhost:3000/api/v1/product/singleProduct/id
router.get("/singleProduct/:id", singleProduct);
module.exports = router;
