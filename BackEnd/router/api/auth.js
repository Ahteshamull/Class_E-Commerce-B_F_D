const express = require("express");
const {
  registrationController,
  loginController,
  allUser,
  OtpVerify,
  ResendOtp,
} = require("../../controllers/authController");
const authMiddleware = require("../../middleware/authMiddleware");
const router = express.Router();
//localhost:3000/api/v1/auth/registration

router.post("/registration", registrationController);
router.post("/login", loginController);
router.post("/otp-verify", OtpVerify);
router.post("/resend-otp", ResendOtp);
router.get("/all-users", authMiddleware, allUser);
module.exports = router;
