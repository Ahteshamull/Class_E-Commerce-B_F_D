const storeModel = require("../model/storeModel");
const path = require("path");
const fs = require("fs")

const storeController = async (req, res) => {
  const { name, description, products, location, contact } = req.body;
  const { filename } = req.file;

  // const images = req.files.map((item)=> `${process.env.IMAGE_URL}  ${item.filename}`)

  try {
    const store = new storeModel({
      name,
      description,
      image: process.env.IMAGE_URL + filename,
      products,
      contact,
      location,
    });
    await store.save();
    return res.status(201).send({
      success: true,
      message: "store created successfully",
      store,
    });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: error.message || error });
  }
};
const deleteStore = async (req, res) => {
  const { id } = req.params;
  try {
    let store = await storeModel.findOneAndDelete({ _id: id });
    if (!store.image || store.image.length === 0) {
      return res.status(400).send({
        success: false,
        error: true,
        message: "No image found for this store.",
      });
    }
    // console.log(store)
    let ImagePath = store.image.split("/");
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
            message: `Store deleted successfully`,
            store,
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
module.exports = { storeController, deleteStore };
