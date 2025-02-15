

const multer = require("multer");
const path = require("path");

// Define storage options for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads"); // Define the folder to store uploaded files
  },
  filename: function (req, file, cb) {
    const fileExt = path.extname(file.originalname);
    const fileName =
      file.originalname
        .replace(fileExt, "")
        .toLowerCase()
        .split(" ")
        .join("-") +
      "-" +
      Date.now(); // Generate a unique filename using the current timestamp
    cb(null, fileName + fileExt);
  },
});

// Define the multer upload configuration
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // Limit file size to 5MB
  },
  // fileFilter: (req, file, cb) => {
  //   if (
  //     file.mimetype === "image/png" ||
  //     file.mimetype === "image/jpeg" ||
  //     file.mimetype === "image/jpg"
  //   ) {
  //     cb(null, true); // Accept the file if it's a valid image
  //   } else {
  //     // Reject the file if it's not a valid image type
  //     cb(new Error("Only jpeg, jpg, or png file allowed"));
  //   }
  // },
});

// Middleware to handle errors
function errorCheck(err, req, res, next) {
  if (err) {
    if (err instanceof multer.MulterError) {
      // Specific error for multer (e.g., file size exceeded)
      return res
        .status(400)
        .send({ message: `File upload error: ${err.message}` });
    }
    // General error handling
    return res
      .status(500)
      .send({ message: err.message || "Internal server error" });
  }
  next();
}

module.exports = { errorCheck, upload };
