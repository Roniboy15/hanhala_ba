const Joi = require("joi");
const mongoose = require("mongoose");


const HousesSchema = new mongoose.Schema({
    name: String,
    machane: [String],
    phone: Number,
    email: String,
    place: String,
    url: String,
    info: String,
    interest: { type: String, default: 'green' },
    suma_position: { type: Number, default: 1 },
    wima_position: { type: Number, default: 1 },
    sayarim_position: { type: Number, default: 1 },
    israel_position: { type: Number, default: 1 },
    date_created: {
        type: Date, default: Date.now()
    }
})

exports.HousesModel = mongoose.model("houses", HousesSchema);

exports.validateHouses = (reqBody) => {
    let joiSchema = Joi.object({
        name: Joi.string().min(2).max(40).required(),
        machane: Joi.array().items(Joi.string()).required(),
        email: Joi.string().email().allow("", null),
        phone: Joi.string().allow("", null),
        place: Joi.string().allow("", null),
        info: Joi.string().allow("", null),
        url: Joi.string().allow("", null)
    })
    return joiSchema.validate(reqBody);
}