const bannerModel = require("../model/bannerModel");
const fs = require("fs");
const path = require("path");

const filePath = process.env.IMAGE_URL;
const uploadBanner = async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).send("No files uploaded.");
  }
  try {
    const images = req.files.map((item) => `${filePath}${item.filename}`);
    const addBanner = new bannerModel({
      images,
    });
    await addBanner.save();
    return res.status(201).send({
      success: true,
      message: "Banner add  successfully",
      addBanner,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message || error,
    });
  }
};
const updateBanner = async (req, res) => {
  const { bannerId } = req.params;
  const images = req.files.map((item) => `${filePath}${item.filename}`);
  if (!images || !images[0]) {
    return res.status(400).send({
      success: false,
      error: true,
      message: "No image file uploaded",
    });
  }
  try {
    const updateBannerImage = await bannerModel.findByIdAndUpdate(
      { _id: bannerId },
      { images },
      {
        new: true,
      }
    );

    const ImagePathArray = updateBannerImage.images;

    ImagePathArray.forEach((item) => {
      const imagePath = item.split("/");
      const oldImagePath = imagePath[imagePath.length - 1];
      fs.unlink(
        `${path.join(__dirname, "../uploads")}/${oldImagePath}`,
        (err) => {
          if (err) {
            return res.status(500).send({
              success: false,
              error: true,
              message: `${err.message ? err.message : "Internal server error"}`,
            });
          }
        }
      );
    });
    return res.status(200).send({
      success: true,
      error: false,
      message: `Banner Updated successfully`,
      updateBannerImage,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      error: true,
      message: error.message || "Internal server error",
    });
  }
};
module.exports = { uploadBanner, updateBanner };
