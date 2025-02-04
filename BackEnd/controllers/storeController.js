const storeModel = require("../model/storeModel");
const path = require("path");
const fs = require("fs");
const filePath = process.env.IMAGE_URL;

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
const allStore = async (req, res) => {
  try {
    const allStore = await storeModel.find({});
    return res.status(200).send({
      success: true,
      message: "All Store Here",
      allStore,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      error: true,
      message: `${error.message ? error.message : "Internal server error"}`,
    });
  }
};
const updateStore = async (req, res) => {
  const { id } = req.params;
  const { name, description, store, location, contact } = req.body;
  const image = req.file;
  const { filename } = image;
  try {
    let updateStore = await storeModel.findOneAndUpdate(
      { _id: id },
      {
        name,
        store,
        location,
        contact,
        image: filePath + filename,
        description,
      }
    );
    let ImagePath = updateStore.image.split("/");
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
            message: `Store Updated successfully`,
            updateStore,
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
const singleStore = async (req, res) => {
  const { id } = req.params;
  try {
    const singleStore = await storeModel.findOne({ _id: id });
    return res.status(200).send({
      success: true,
      error: false,
      message: `Single Store Patch successfully`,
      singleStore,
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
  storeController,
  deleteStore,
  allStore,
  singleStore,
  updateStore,
};

// const storeModel = require("../model/storeModel");
// const path = require("path");
// const fs = require("fs").promises; // Using fs.promises for cleaner async handling

// const storeController = async (req, res) => {
//   const { name, description, products, location, contact } = req.body;
//   const { filename } = req.file;

//   try {
//     const store = new storeModel({
//       name,
//       description,
//       image: process.env.IMAGE_URL + filename,
//       products,
//       contact,
//       location,
//     });
//     await store.save();
//     return res.status(201).send({
//       success: true,
//       message: "Store created successfully",
//       store,
//     });
//   } catch (error) {
//     return res.status(500).send({
//       success: false,
//       message: error.message || "Internal server error",
//     });
//   }
// };

// const deleteStore = async (req, res) => {
//   const { id } = req.params;
//   try {
//     let store = await storeModel.findById(id); // Using findById instead of findOneAndDelete to handle store deletion safely
//     if (!store) {
//       return res.status(404).send({
//         success: false,
//         message: "Store not found",
//       });
//     }

//     // Check if the store has an image and if it's a valid string
//     if (store.image) {
//       const imageName = store.image.split("/").pop(); // Extract the file name from the URL
//       const imagePath = path.join(__dirname, "../uploads", imageName);

//       try {
//         await fs.unlink(imagePath); // Use fs.promises.unlink for async file deletion
//         console.log(`Deleted image: ${imagePath}`);
//       } catch (err) {
//         console.error(`Error deleting image: ${imagePath}`, err);
//       }
//     }

//     // Now delete the store from the database
//     await storeModel.findByIdAndDelete(id);
//     return res.status(200).send({
//       success: true,
//       message: "Store deleted successfully",
//     });
//   } catch (error) {
//     return res.status(500).send({
//       success: false,
//       message: error.message || "Internal server error",
//     });
//   }
// };

// const allStore = async (req, res) => {
//   try {
//     const allStore = await storeModel.find({});
//     return res.status(200).send({
//       success: true,
//       message: "All stores fetched successfully",
//       allStore,
//     });
//   } catch (error) {
//     return res.status(500).send({
//       success: false,
//       message: error.message || "Internal server error",
//     });
//   }
// };

// const updateStore = async (req, res) => {
//   const { id } = req.params;
//   const { name, description, location, contact, products } = req.body;

//   const image = req.file;
//   const { filename } = image;
//   try {
//     let updateStore = await storeModel.findOneAndUpdate(
//       { _id: id },
//       {
//         name,
//         location,
//         contact,
//         products,
//         image: filePath + filename,
//         description,
//       },
//       { new: true }
//     );
//     let ImagePath = updateStore.image.split("/");
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
//             message: `Store Updated successfully`,
//             updateStore,
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

// const singleStore = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const store = await storeModel.findById(id);
//     if (!store) {
//       return res.status(404).send({
//         success: false,
//         message: "Store not found",
//       });
//     }

//     return res.status(200).send({
//       success: true,
//       message: "Single store fetched successfully", // Fixed message to reflect the GET operation
//       store,
//     });
//   } catch (error) {
//     return res.status(500).send({
//       success: false,
//       message: error.message || "Internal server error",
//     });
//   }
// };

// module.exports = {
//   storeController,
//   deleteStore,
//   allStore,
//   singleStore,
//   updateStore,
// };
