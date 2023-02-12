const express = require("express");
const { validateDaten, DatenModel } = require("../models/machanaDaten");
const router = express.Router();

router.get("/", async (req, res) => {
    res.json({ msg: "daten works" });
})


router.get("/:machane", async (req, res) => {
    try {
        let machane = req.params.machane.toLowerCase();
        let data = await DatenModel.find({ name: { $regex: machane, $options: "i" } })
        res.json(data);
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

router.post("/", async (req, res) => {
    let validBody = validateDaten(req.body);
    console.log(validBody)
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }
    try {
        let date = new DatenModel(req.body);
        await date.save();
        res.status(201).json(date)
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

router.put("/:id", async (req, res) => {
    let validBody = validateDaten(req.body);
    console.log(validBody)
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }
    try {
        let id = req.params.id;
        let date = await DatenModel.findByIdAndUpdate(id, req.body);
        await date.save();
        if (!date) {
            return res.status(404).json({ msg: "Machane not found" });
          }
        res.status(201).json(date)
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports = router;