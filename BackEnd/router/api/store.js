const express = require("express");
const {
  storeController,
  deleteStore,
  updateStore,
  allStore,
  singleStore,
} = require("../../controllers/storeController");
const {
  errorCheck,
  upload,
} = require("../../middleware/imageControlMiddleware");
const authMiddleware = require("../../middleware/authMiddleware");

const router = express.Router();
//localhost:3000/api/v1/store/productStore
router.post(
  "/productStore",
  authMiddleware,
  errorCheck,
  upload.single("image"),
  storeController
);
router.delete("/deleteStore/:id", authMiddleware, deleteStore);
//localhost:3000/api/v1/store/deleteStore
router.patch("/updateStore/:id", authMiddleware, updateStore);
//localhost:3000/api/v1/store/updateStore
router.get("/singleStore/:id", singleStore);
//localhost:3000/api/v1/store/singleStore
router.get("/allStore", allStore);
//localhost:3000/api/v1/store/allStore

module.exports = router;
