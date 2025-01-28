const cetagoryModel = require("../model/cetagoryModel");
const fs = require("fs");
const path = require("path");
const filePath = process.env.IMAGE_URL;

const createCetagory = async (req, res) => {
  const { name, description } = req.body;
  const { filename } = req.file;

  const category = new cetagoryModel({
    name,
    image: filePath + req.file.filename,
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
    if (!cetagory.image || cetagory.image.length === 0) {
      return res.status(400).send({
        success: false,
        error: true,
        message: "No image found for this cetagory.",
      });
    }
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
module.exports = { createCetagory, deleteCetagory };
