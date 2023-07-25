const express = require("express");
const cron = require('node-cron');
const { auth } = require("../middlewares/auth");
const { validateDaten, DatenModel, validateDate } = require("../models/machanaDaten");
const router = express.Router();

router.get("/", async (req, res) => {
    res.json({ msg: "daten works" });
})


router.get("/:machane", async (req, res) => {
    try {
        let machane = req.params.machane.toLowerCase();
        let data = await DatenModel.find({ name: { $regex: machane, $options: "i" } })
        res.json(data[0]);
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

router.post("/", auth, async (req, res) => {
    let validBody = validateDaten(req.body);
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

router.put("/:id", auth, async (req, res) => {
    const updateData = req.body; // This should be the entire updated object

    try {
        let id = req.params.id;
        let daten = await DatenModel.findByIdAndUpdate(id, updateData, { new: true });
        if (!daten) {
            return res.status(404).json({ msg: "Machane not found" });
        }
        res.json(daten);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


router.put("/:id/:field", auth, async (req, res) => {
    const field = req.params.field;
    const { date } = req.body;

    let { error } = validateDate(date);
    if (error) {
        return res.status(400).json(error.details);
    }

    try {
        let id = req.params.id;
        let update = { [field]: date };
        let daten = await DatenModel.findByIdAndUpdate(id, update, { new: true });
        if (!daten) {
            return res.status(404).json({ msg: "Machane not found" });
        }
        res.json(daten);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});



module.exports = router;


