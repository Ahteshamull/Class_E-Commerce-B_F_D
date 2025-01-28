const { default: mongoose } = require("mongoose")

let dbConnect = () => {
    mongoose.connect(process.env.DB_URL).then(() => {
        console.log("Database Connected......")
    }).catch((err) => {
        console.log(err)
    })
}

module.exports = dbConnect