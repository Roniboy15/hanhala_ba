const Joi = require("joi");
const mongoose = require("mongoose");


const WebsiteSchema = new mongoose.Schema({
    url: String,
    machane: String,
    date_created: {
        type: Date, default: Date.now()
    }
})

exports.WebsiteModel = mongoose.model("websites", WebsiteSchema);

exports.validateWebsite = (reqBody) => {
    let joiSchema = Joi.object({
        url: Joi.string().min(2).max(200).required(),
        machane: Joi.string().min(2).max(20).required(),
    })
    return joiSchema.validate(reqBody);
}