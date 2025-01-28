const express = require("express");
const router = express.Router()
const baseurl = process.env.BASE_URL
const api = require("./api")
//localhost:3000/api/v1/
http: router.use(baseurl, api);
router.use(baseurl, (req, res) => {
    return res.status(404).send({error:"NO Api Found On This Route"})
})
module.exports = router