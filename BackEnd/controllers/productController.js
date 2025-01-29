const productsModel = require("../model/productsModel");
const cetagoryModel = require("../model/cetagoryModel");
const storeModel = require("../model/storeModel");
const fs = require("fs");
const path = require("path");
const filePath = process.env.IMAGE_URL;

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
    let deleteProduct = await productsModel.findOneAndDelete({ _id: id });

    const ImagePathArray = deleteProduct.image;
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
      message: `Product deleted successfully`,
      deleteProduct,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      error: true,
      message: `${error.message ? error.message : "Internal server error"}`,
    });
  }
};
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    description,
    cetagory,
    store,
    stock,
    rating,
    review,
    discountPrice,
    sellingPrice,
  } = req.body;

  // Handle both single file (req.file) and multiple files (req.files)
  const image = req.files ? req.files : req.file;
  const imagePaths = [];

  // If multiple images are uploaded
  if (Array.isArray(image)) {
    image.forEach((item) => {
      imagePaths.push(process.env.IMAGE_URL + item.filename);
    });
  } else {
    // If only one image is uploaded
    imagePaths.push(process.env.IMAGE_URL + image.filename);
  }

  try {
    // Update the product in the database
    let updatedProduct = await productsModel.findOneAndUpdate(
      { _id: id },
      {
        name,
        cetagory,
        store,
        stock,
        rating,
        review,
        discountPrice,
        sellingPrice,
        image: imagePaths, // Set the image(s) in an array
        description,
      },
      { new: true }
    );

    // If the product had an image before, delete the old ones
    if (updatedProduct.image && updatedProduct.image.length > 0) {
      const oldImages = updatedProduct.image;

      // Loop through old images and delete them
     async function deleteImage(oldImage) {
       const imageName = oldImage.split("/").pop();
       const imagePath = path.join(__dirname, "../uploads", imageName);

       try {
         await fs.unlink(imagePath); // Delete the image asynchronously
         console.log(`Deleted old image: ${imagePath}`);
       } catch (err) {
         console.error(`Error deleting image: ${imagePath}`, err);
       }
      }
      for (const oldImage of oldImages) {
        await deleteImage(oldImage); // Ensure this runs asynchronously
      }
    }

    return res.status(200).send({
      success: true,
      message: "Product updated successfully",
      updatedProduct,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

// const updateProduct = async (req, res) => {
//   const { id } = req.params;
//   const {
//     name,
//     description,
//     cetagory,
//     store,
//     stock,
//     rating,
//     review,
//     discountPrice,
//     sellingPrice,
//   } = req.body;
//   const image = req.files;

//   const { filename } = image;
//   try {
//     let updateProduct = await productsModel.findOneAndUpdate(
//       { _id: id },
//       {
//         name,
//         cetagory,
//         store,
//         stock,
//         rating,
//         review,
//         discountPrice,
//         sellingPrice,
//         image: filePath + filename,
//         description,
//       },
//       { new: true }
//     );

//     const ImagePathArray = updateProduct.image;
//     ImagePathArray.forEach((item) => {
//       const imagePath = item.split("/");
//       const oldImagePath = imagePath[imagePath.length - 1];
//       fs.unlink(
//         `${path.join(__dirname, "../uploads")}/${oldImagePath}`,
//         (err) => {
//           if (err) {
//             return res.status(500).send({
//               success: false,
//               error: true,
//               message: `${err.message ? err.message : "Internal server error"}`,
//             });
//           } else {
//             return res.status(200).send({
//               success: true,
//               error: false,
//               message: `Product Updated successfully`,
//               updateProduct,
//             });
//           }
//         }
//       );
//     });
//   } catch (error) {
//     return res.status(500).send({
//       success: false,
//       error: true,
//       message: `${error.message ? error.message : "Internal server error"}`,
//     });
//   }
// };
const allProduct = async (req, res) => {
  try {
    const allProduct = await productsModel.find({});
    return res.status(200).send({
      success: true,
      message: "All Product Here",
      allProduct,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      error: true,
      message: `${error.message ? error.message : "Internal server error"}`,
    });
  }
};
const singleProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const singleProduct = await productsModel.findOne({ _id: id });
    return res.status(200).send({
      success: true,
      error: false,
      message: `Single Product Patch successfully`,
      singleProduct,
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
  productController,
  deleteProduct,
  updateProduct,
  allProduct,
  singleProduct,
};
