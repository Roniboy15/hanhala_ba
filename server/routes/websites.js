const express = require("express");
const { auth, authAdmin } = require("../middlewares/auth");
const { validateWebsite, WebsiteModel } = require("../models/websiteModel");
const router = express.Router();

router.get("/", async (req, res) => {
    res.json({ msg: "daten works" });
})


router.get("/all", authAdmin, async (req, res) => {
    try {
        let data = await WebsiteModel.find({})
        res.json(data);
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

router.post("/newWebsite", authAdmin, async (req, res) => {
    let validBody = validateWebsite(req.body);
    console.log(validBody)
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }
    try {
        let website = new WebsiteModel(req.body);
        await website.save();
        res.status(201).json(website)
    }
    catch (err) {
        if (err.code == 11000) {
            return res.status(401).json({ msg: "website already in system", code: 11000 })
        }
        res.status(500).json(err);
    }
})

router.delete("/delete/:id", async (req, res) => {
    let id = req.params.id;
    try {
        let data = await WebsiteModel.deleteOne({ _id: id })
        res.json(data)
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports = router;