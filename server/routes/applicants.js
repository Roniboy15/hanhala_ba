const express = require("express");
const router = express.Router();
const { validateApplicant, Applicantmodel, ApplicantModel } = require("../models/applicantsModel")

router.get("/", async (req, res) => {
    res.json({ msg: "Applicants work" });
})

router.get("/allApplicants", async (req, res) => {
    let perPage = Number(req.query.perPage) || 20;
    let page = Number(req.query.page) || 1
    let sort = req.query.sort || "_id";
    let reverse = req.query.reverse == "yes" ? 1 : -1;
  
    try {
      let data = await ApplicantModel
        .find({})
        .limit(perPage)
        .skip((page - 1) * perPage)
        .sort({ [sort]: reverse })
      res.json(data);
    }
    catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  })

router.post("/", async (req, res) => {
    let validBody = validateApplicant(req.body);
    console.log(validBody)
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }
    try {
        let applicant = new ApplicantModel(req.body);
        await applicant.save();
        res.status(201).json(applicant)
    }
    catch (err) {
        if (err.code == 11000) {
            return res.status(401).json({ msg: "Email already in system, try log in", code: 11000 })
        }
        console.log(err);
        res.status(500).json(err);
    }
})

router.put("/:id", async (req, res) => {
    try {
      let id = req.params.id;
      let validBody = validateApplicant(req.body);
      if (validBody.error) {
        return res.status(400).json(validBody.error.details);
      }
      let applicant = await ApplicantModel.findByIdAndUpdate(id, req.body, { new: true });
      if (!applicant) {
        return res.status(404).json({ msg: "Applicant not found" });
      }
      res.json(applicant);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });


router.delete("/:idDel", async(req,res) => {
    try{
      let idDel = req.params.idDel;
      let data = await ApplicantModel.deleteOne({_id:idDel});
      res.json(data);
    }
    catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  })

module.exports = router;