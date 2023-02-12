const Joi = require("joi");
const mongoose = require("mongoose");


const applicantSchema = new mongoose.Schema({
    age: Number,
    name: String,
    phone: Number,
    email: String,
    date_created: {
        type: Date, default: Date.now()
    }
})

exports.ApplicantModel = mongoose.model("sumaApplicannts", applicantSchema);

exports.validateApplicant = (reqBody) => {
    let joiSchema = Joi.object({
        age: Joi.number().required(),
        name: Joi.string().min(2).max(40).required(),
        phone: Joi.number().required(),
        email: Joi.string().email().allow(null,""),
    })
    return joiSchema.validate(reqBody);
}