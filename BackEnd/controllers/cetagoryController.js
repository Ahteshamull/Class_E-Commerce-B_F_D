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
const updateCetagory = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
 
  const image = req.file;
  const { filename } = image;
  try {
    let cetagory = await cetagoryModel.findOneAndUpdate(
      { _id: id },
      {
        name,
        image: filePath + filename,
        description,
      },
      { new: true }
    );
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
            message: `Cetagory Updated successfully`,
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
