const jwt = require("jsonwebtoken");
const userModel = require("../model/userModel");
const checkAdminUser = (req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.PRV_TOKEN, async function (err, decoded) {
      if (err) {
        return res.status(400).send({
          success: false,
          error: true,
          message: "Invalid Token Or Expired",
        });
      } else {
        const existAdmin = await userModel.findOne({ email: decoded.email });
        if (existAdmin) {
          if (decoded.role === "admin") {
            next();
          }
        } else {
          return res.status(401).send({
            success: false,
            error: true,
            message: "Admin Not Found",
          });
        }
      }
    });
  }
};
module.exports = checkAdminUser