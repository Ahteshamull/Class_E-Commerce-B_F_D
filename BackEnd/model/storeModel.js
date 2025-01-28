const { Schema, default: mongoose } = require("mongoose");
const storeSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
      required: true,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    location: {
      type: String,
    },
    contact: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

const storeModel = mongoose.model("Store", storeSchema);
module.exports = storeModel;
