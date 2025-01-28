const { Schema, default: mongoose } = require("mongoose")
const cetagorySchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim:true
    },
    description: {
        type:String
    },
    image: {
        type: String,
        required:true
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Product"
    }]
}, {
    timestamps:true
})
 
const cetagoryModel =mongoose.model("Cetagory", cetagorySchema)
module.exports= cetagoryModel