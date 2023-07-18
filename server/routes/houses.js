const express = require("express");
const { auth } = require("../middlewares/auth");
const { validateHouses, HousesModel } = require("../models/housesModel");
const router = express.Router();

router.get("/", async (req, res) => {
  addEmailSentField()
  res.json({ msg: "Api Work 200 09:20" });
})

const addEmailSentField = async () => {
  try {
    await HousesModel.updateMany(
      {},
      { $set: { emailSent: false } },
      { new: true, upsert: true }
    );
    console.log("Successfully updated all documents");
  } catch (err) {
    console.error("Error updating documents:", err);
  }
}
const removeFields = async () => {
  try {
    await HousesModel.updateMany(
      {},
      {
        $unset: {
          israel_position: "",
          sayarim_position: ""
        }
      }
    );
    console.log("Successfully removed fields from all documents");
  } catch (err) {
    console.error("Error removing fields:", err);
  }
}



router.get("/count", auth, async (req, res) => {
  let perPage = Number(req.query.perPage) || 5;
  let _machane = req.query.machane;
  try {
    let findQuery = {};
    // בשביל צד לקוח שנעשה עמוד קטגוריה שנוכל לדעת לאותה קטגוריה כמה עמודים יש
    if (_machane) {
      findQuery = { machane: _machane }
    }

    let count = await HousesModel.countDocuments(findQuery);
    // מחזיר את מספר העמודים לפי פר פייג'
    let pages = Math.ceil(count / perPage);
    res.json({ count, pages })

  }
  catch (err) {
    console.log(err);
    res.status(502).json({ err })
  }
})

router.get("/email/:machane", auth, async (req, res) => {
  const { machane } = req.params;
  const houses = await HousesModel.find({ machane: { $in: [machane] }, emailSent: false });
  res.json(houses);
});

router.get("/all", auth, async (req, res) => {

  let sort = req.query.sort || "suma_position";
  let reverse = req.query.reverse == "yes" ? -1 : 1;
  let _machane = req.query.machane;

  try {
    let findQuery = {};
    if (_machane) {
      findQuery = { machane: _machane }
    }

    let data = await HousesModel
      .find(findQuery)
      .sort({ [sort]: reverse })
    res.json(data);
  }
  catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

router.post("/newHouse", auth, async (req, res) => {
  let validBody = validateHouses(req.body);
  console.log(validBody)
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    let house = new HousesModel(req.body);
    await house.save();
    res.status(201).json(house)
  }
  catch (err) {
    if (err.code == 11000) {
      return res.status(401).json({ msg: "Somethinng already in system", code: 11000 })
    }
    console.log(err);
    res.status(500).json(err);
  }
})

router.put("/edit/:id", auth, async (req, res) => {
  let validBody = validateHouses(req.body);

  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    let id = req.params.id;
    let data;
    data = await HousesModel.updateOne({ _id: id }, req.body)

    res.json(data);
  }
  catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

router.patch('/machane/:id', async (req, res) => {
  try {
    const { add, item } = req.body;
    let update;
    if (add) {
      update = { $addToSet: { machane: item } };
    } else {
      update = { $pull: { machane: item } };
    }
    const house = await HousesModel.findByIdAndUpdate(req.params.id, update, { new: true });
    res.json(house);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.patch("/position/", auth, async (req, res) => {

  try {
    const id = req.query._id;
    const key = req.query.key; // the key to update
    const position = req.query.position; // the new value for the key

    const data = await HousesModel.updateOne({ _id: id }, { [key]: position });
    res.json(data);
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

router.patch("/interest/", auth, async (req, res) => {
  try {
    let id = req.query._id;
    let field = req.query.field;
    let interest = req.query.interest;

    if (!['interestWima', 'interestSuma'].includes(field)) {
      return res.status(400).json({ error: 'Invalid field name' });
    }

    let update = {};
    update[field] = interest;

    let data = await HousesModel.updateOne({ _id: id }, { $set: update })
    res.json(data);
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})



router.delete("/delete/:id", auth, async (req, res) => {
  try {
    let id = req.params.id;
    let data;
    data = await HousesModel.deleteOne({ _id: id })

    res.json(data);
  }
  catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})




module.exports = router;