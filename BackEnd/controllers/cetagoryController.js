const cetagoryModel = require("../model/cetagoryModel");
const fs = require("fs");
const path = require("path");
const filePath = process.env.IMAGE_URL;

const createCetagory = async (req, res) => {
  const { name, description } = req.body;
  const { filename } = req.file;

  const category = new cetagoryModel({
    name,
    image: filePath + filename,
    description,
  });
  await category.save();
  return res.status(201).send({
    success: true,
    error: false,
    message: "Category created successfully",
    category,
  });
};
const deleteCetagory = async (req, res) => {
  const { id } = req.params;
  try {
    let cetagory = await cetagoryModel.findOneAndDelete({ _id: id });
    let ImagePath = cetagory.image.split("/");
    let oldImagePath = ImagePath[ImagePath.length - 1];

    fs.unlink(
      `${path.join(__dirname, "../uploads")}/${oldImagePath}`,
      (err) => {
        if (err) {
          return res.status(500).send({
            success: false,
            error: true,
            message: `${err.message ? err.message : "Internal server error"}`,
          });
        } else {
          return res.status(200).send({
            success: true,
            error: false,
            message: `Cetagory deleted successfully`,
            cetagory,
          });
        }
      }
    );
  } catch (error) {
    return res.status(500).send({
      success: false,
      error: true,
      message: `${error.message ? error.message : "Internal server error"}`,
    });
  }
};
const allCetagory = async (req, res) => {
  try {
    const allCetagory = await cetagoryModel.find({});
    return res.status(200).send({
      success: true,
      message: "All Cetagory Here",
      allCetagory,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      error: true,
      message: `${error.message ? error.message : "Internal server error"}`,
    });
  }
};
// Ensure filePath is correctly set

const updateCetagory = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  if (!req.file) {
    return res.status(400).send({
      success: false,
      error: true,
      message: "No image uploaded",
    });
  }

  const { filename } = req.file;

  try {
    let updatedCategory = await cetagoryModel.findOneAndUpdate(
      { _id: id },
      {
        name,
        image: filePath + filename, // Assuming filePath is set correctly for the new image
        description,
      },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).send({
        success: false,
        error: true,
        message: "Category not found",
      });
    }

    // Get the previous image path from the database
    let ImagePath = updatedCategory.image.split("/");
    let oldImageFileName = ImagePath[ImagePath.length - 1];

    // Prepare the path for the old image file
    const oldImagePath = path.join(__dirname, "../uploads", oldImageFileName);

    // Check if the old image file exists before trying to delete
    fs.exists(oldImagePath, (exists) => {
      if (exists) {
        fs.unlink(oldImagePath, (err) => {
          if (err) {
            return res.status(500).send({
              success: false,
              error: true,
              message: err.message || "Error deleting old image",
            });
          }
          // Successfully deleted old image, respond with the updated category
          return res.status(200).send({
            success: true,
            error: false,
            message: "Category updated successfully",
            category: updatedCategory,
          });
        });
      } else {
        // If the old image doesn't exist, just respond with success
        return res.status(200).send({
          success: true,
          error: false,
          message: "Category updated successfully (no old image to delete)",
          category: updatedCategory,
        });
      }
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      error: true,
      message: error.message || "Internal server error",
    });
  }
};

// const updateCetagory = async (req, res) => {
//   const { id } = req.params;
//   const { name, description } = req.body;

//   if (!req.file) {
//     return res.status(400).send({
//       success: false,
//       error: true,
//       message: "No image uploaded",
//     });
//   }

//   const { filename } = req.file;

//   try {
//     let UpdateCetagory = await cetagoryModel.findOneAndUpdate(
//       { _id: id },
//       {
//         name,
//         image: filePath + filename,
//         description,
//       },
//       { new: true }
//     );

//     if (!UpdateCetagory) {
//       return res.status(404).send({
//         success: false,
//         error: true,
//         message: "Category not found",
//       });
//     }

//     // Extract the old image filename
//     let ImagePath = UpdateCetagory.image.split("/");
//     let oldImagePath = ImagePath[ImagePath.length - 1];

//     // Delete the old image file if it exists
//     fs.unlink(path.join(__dirname, "../uploads", oldImagePath), (err) => {
//       if (err) {
//         return res.status(500).send({
//           success: false,
//           error: true,
//           message: err.message || "Error deleting old image",
//         });
//       }
//       return res.status(200).send({
//         success: true,
//         error: false,
//         message: "Category updated successfully",
//         UpdateCetagory,
//       });
//     });
//   } catch (error) {
//     return res.status(500).send({
//       success: false,
//       error: true,
//       message: error.message || "Internal server error",
//     });
//   }
// };

// const updateCetagory = async (req, res) => {
//   const { id } = req.params;
//   const { name, description } = req.body;

//   const image = req.file;
//   const { filename } = image;
//   try {
//     let UpdateCetagory = await cetagoryModel.findOneAndUpdate(
//       { _id: id },
//       {
//         name,
//         image: filePath + filename,
//         description,
//       },
//       { new: true }
//     );
//     let ImagePath = UpdateCetagory.image.split("/");
//     let oldImagePath = ImagePath[ImagePath.length - 1];

//     fs.unlink(
//       `${path.join(__dirname, "../uploads")}/${oldImagePath}`,
//       (err) => {
//         if (err) {
//           return res.status(500).send({
//             success: false,
//             error: true,
//             message: `${err.message ? err.message : "Internal server error"}`,
//           });
//         } else {
//           return res.status(200).send({
//             success: true,
//             error: false,
//             message: `Cetagory Updated successfully`,
//             UpdateCetagory,
//           });
//         }
//       }
//     );
//   } catch (error) {
//     return res.status(500).send({
//       success: false,
//       error: true,
//       message: `${error.message ? error.message : "Internal server error"}`,
//     });
//   }
// };
const singleCetagory = async (req, res) => {
  const { id } = req.params;
  try {
    const singleCetagory = await cetagoryModel.findOne({ _id: id });
    return res.status(200).send({
      success: true,
      error: false,
      message: `Single Cetagory Patch successfully`,
      singleCetagory,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      error: true,
      message: `${error.message ? error.message : "Internal server error"}`,
    });
  }
};
module.exports = {
  createCetagory,
  deleteCetagory,
  allCetagory,
  updateCetagory,
  singleCetagory,
};
