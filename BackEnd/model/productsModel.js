const { Schema, default: mongoose } = require("mongoose");
const productsSchema = new Schema(
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
      type: Array,
      required: true,
    },
    cetagory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cetagory",
    },
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
    },

    stock: {
      type: Number,
    },
    sellingPrice: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
      required: true,
    },
    review: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    rating: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Rating",
      },
    ],
  },

  {
    timestamps: true,
  }
);

const productsModel = mongoose.model("Product", productsSchema);
module.exports = productsModel;
