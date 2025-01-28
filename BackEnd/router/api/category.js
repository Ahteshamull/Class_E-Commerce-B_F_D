const express = require("express");
const {
  deleteCetagory,
  createCetagory,
} = require("../../controllers/cetagoryController");
const {
  upload,
  errorCheck,
} = require("../../middleware/imageControlMiddleware");
const router = express.Router();

//localhost:3000/api/v1/category/createCategory

router.post(
  "/createCategory",
  upload.single("image"),
  errorCheck,
  createCetagory
);
router.delete("/deleteCetagory/:id", deleteCetagory);
//localhost:3000/api/v1/category/deleteCetagory

module.exports = router;
