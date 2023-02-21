const Joi = require("joi");
const mongoose = require("mongoose");


const DatenSchema = new mongoose.Schema({
    name: String,
    datum: String,
    active: Boolean,
    formsLink: String,
    spreadLink: String,
    date_created: {
        type: Date, default: Date.now()
    }
})

exports.DatenModel = mongoose.model("daten", DatenSchema);

exports.validateDaten = (reqBody) => {
    let joiSchema = Joi.object({
        name: Joi.string().min(2).max(40).required(),
        datum: Joi.string().required(),
        active: Joi.boolean().required(),
        formsLink: Joi.string().allow("", null),
        spreadLink: Joi.string().allow("", null)
    })
    return joiSchema.validate(reqBody);
}