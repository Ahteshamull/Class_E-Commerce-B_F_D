const { Schema, default: mongoose } = require("mongoose");
const bannerSchema = new Schema(
  {
    images: 
      {
        type: Array,
        required: true,
      },
 
  },

  {
    timestamps: true,
  }
);

const bannerModel = mongoose.model("Banner", bannerSchema);
module.exports = bannerModel;
