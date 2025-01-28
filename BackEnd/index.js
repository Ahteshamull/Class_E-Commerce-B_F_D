const express = require("express");
require("dotenv").config();
const path = require("path");
const cors = require("cors");
const router = require("./router");
const dbConnect = require("./config/databaseConnect");
const cookieParser = require("cookie-parser");
const app = express();

app.use(cors());
app.use(express.static("uploads"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
dbConnect();
app.use(router);

//http://localhost:3000

app.listen(process.env.SERVER_PORT || 8080, () => {
  console.log("Server Is Running");
});

//info://localhost:3000/api/v1/auth/
