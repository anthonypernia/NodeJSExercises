const express = require("express")
const Food = require("../model/Food")
const router = express.Router()

router.get("/", (req, res) => {
    res.json(  Food.find())
});

router.post("/", async (req, res) => {
    console.log(req.body)
    let body = req.body
    await Food.create(body)
    res.json(body);
});

module.exports = router