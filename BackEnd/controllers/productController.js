const productsModel = require("../model/productsModel");
const cetagoryModel = require("../model/cetagoryModel");
const storeModel = require("../model/storeModel");
const fs = require("fs");
const path = require("path");

const productController = async (req, res) => {
  const {
    name,
    description,
    cetagory,
    sellingPrice,
    discountPrice,
    stock,
    store,
  } = req.body;
  const images = req.files.map(
    (item) => `${process.env.IMAGE_URL}${item.filename}`
  );
  try {
    const createProduct = new productsModel({
      name,
      description,
      image: images,
      cetagory,
      sellingPrice,
      discountPrice,
      stock,
      store,
    });
    await createProduct.save();
    await cetagoryModel.findOneAndUpdate(
      { _id: cetagory },
      { $push: { products: createProduct._id } },
      { new: true }
    );
    await storeModel.findOneAndUpdate(
      { _id: store },
      { $push: { products: createProduct._id } },
      { new: true }
    );
    return res.status(201).send({
      success: true,
      message: "product created successfully",
      createProduct,
    });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: error.message || error });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    let product = await productsModel.findOne({ _id: id });
    if (!product.image || product.image.length === 0) {
      return res.status(400).send({
        success: false,
        error: true,
        message: "No image found for this product.",
      });
    }
    let ImagePath = product.image.map((url) => url.split("/"));
    let oldImagePath = ImagePath[ImagePath.length - 1];

    let finalImagePath = oldImagePath[oldImagePath.length - 1];

    // console.log(product.image.map((url) => url.split("/")));

    fs.unlink(
      `${path.join(__dirname, "../uploads")}/${finalImagePath}`,
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
            message: `Product deleted successfully`,
            product,
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
module.exports = { productController, deleteProduct };
