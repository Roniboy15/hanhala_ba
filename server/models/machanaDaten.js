const Joi = require("joi");
const mongoose = require("mongoose");


// Mongoose schema
const DatenSchema = new mongoose.Schema({
    name: String,
    datum: String, 
    datum2: String, 
    datum3: String,
    datum4: String, 
    active: Boolean,
    formsLink: String,
    spreadLink: String,
    message: String,
    date_created: {
        type: Date, default: Date.now()
    }
})

exports.DatenModel = mongoose.model("daten",DatenSchema);


// Validation
exports.validateDaten = (reqBody) => {
    let joiSchema = Joi.object({
        name: Joi.string().min(2).max(40).required(),
        datum: Joi.string().required(), 
        datum2: Joi.string().required(), 
        datum3: Joi.string().required(), 
        datum4: Joi.string().required(), 
        active: Joi.boolean().required(),
        formsLink: Joi.string().allow("", null),
        spreadLink: Joi.string().allow("", null),
        message: Joi.string().allow("", null),
    })
    return joiSchema.validate(reqBody);
}

exports.validateDate = (date) => {
    let joiSchema = Joi.string().required();
    return joiSchema.validate(date);
}
