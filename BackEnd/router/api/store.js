const express = require("express");
const { storeController, deleteStore } = require("../../controllers/storeController");
const {
  errorCheck,
  upload,
} = require("../../middleware/imageControlMiddleware");

const router = express.Router();

router.post(
  "/productStore",
  errorCheck,
  upload.single("image"),
  storeController
);
router.delete("/deleteStore/:id", deleteStore);
//localhost:3000/api/v1/store/deleteStore

module.exports = router;
//localhost:3000/api/v1/store/productStore
