const express = require("express");
const { uploadBanner, updateBanner } = require("../../controllers/bannerController");
const {
  upload,
  errorCheck,
} = require("../../middleware/imageControlMiddleware");
const authMiddleware = require("../../middleware/authMiddleware");

const router = express.Router();
//localhost:3000/api/v1/banner/add-banner
router.post(
  "/add-banner",
  authMiddleware,
  upload.array("images"),
  errorCheck,
  uploadBanner
);
//localhost:3000/api/v1/banner/update-banner
router.patch(
  "/update-banner/:bannerId",
  authMiddleware,
  upload.array("images"),
  errorCheck,
  updateBanner
);

module.exports = router;
