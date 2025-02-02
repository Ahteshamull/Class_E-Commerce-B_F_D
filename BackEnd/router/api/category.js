const express = require("express");
const {
  deleteCetagory,
  createCetagory,
  allCetagory,
  updateCetagory,
  singleCetagory,
} = require("../../controllers/cetagoryController");
const {
  upload,
  errorCheck,
} = require("../../middleware/imageControlMiddleware");
const authMiddleware = require("../../middleware/authMiddleware");
const router = express.Router();

//localhost:3000/api/v1/category/createCategory

router.post(
  "/createCategory",
  // authMiddleware,
  upload.single("image"),
  errorCheck,
  createCetagory
);
router.delete("/deleteCetagory/:id", authMiddleware, deleteCetagory);
//localhost:3000/api/v1/category/deleteCetagory
router.get("/allCetagory", allCetagory);
//localhost:3000/api/v1/category/allCetagory
router.patch(
  "/updateCetagory/:id",
  authMiddleware,
  upload.single("image"),
  errorCheck,
  updateCetagory
);
//localhost:3000/api/v1/category/updateCetagory

router.get("/singleCetagory/:id", singleCetagory);
//localhost:3000/api/v1/category/singleCetagory

module.exports = router;
